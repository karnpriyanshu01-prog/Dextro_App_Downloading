'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Screenshot = { id: string; image_url: string; caption: string | null; sort_order: number; is_published: boolean }

const MIGRATION_SQL = `create table if not exists app_screenshots (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table app_screenshots enable row level security;

create policy "Public can read published screenshots"
  on app_screenshots for select
  using (is_published = true);

create policy "Admins can manage screenshots"
  on app_screenshots for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public)
values ('screenshots', 'screenshots', true)
on conflict (id) do nothing;

create policy "Public can view screenshot files"
  on storage.objects for select
  using (bucket_id = 'screenshots');

create policy "Admins can upload screenshot files"
  on storage.objects for insert
  with check (bucket_id = 'screenshots' and auth.role() = 'authenticated');

create policy "Admins can update screenshot files"
  on storage.objects for update
  using (bucket_id = 'screenshots' and auth.role() = 'authenticated');

create policy "Admins can delete screenshot files"
  on storage.objects for delete
  using (bucket_id = 'screenshots' and auth.role() = 'authenticated');`

function slugifyFilename(name: string) {
  const dot = name.lastIndexOf('.')
  const ext = dot >= 0 ? name.slice(dot) : ''
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext.toLowerCase()}`
}

// Best-effort extraction of the storage object path from a public URL, so
// we can delete the old file when replacing/removing a screenshot. Never
// throws — returns null if the URL doesn't look like our bucket.
function pathFromPublicUrl(url: string): string | null {
  const marker = '/storage/v1/object/public/screenshots/'
  const idx = url.indexOf(marker)
  if (idx === -1) return null
  return decodeURIComponent(url.slice(idx + marker.length).split('?')[0])
}

export default function ScreenshotsManager({
  initial,
  tableMissing = false,
}: {
  initial: Screenshot[]
  tableMissing?: boolean
}) {
  const router = useRouter()
  const supabase = createClient()
  const [shots, setShots] = useState(initial)
  const [needsMigration, setNeedsMigration] = useState(tableMissing)
  const [copied, setCopied] = useState(false)

  // Add form
  const [newFile, setNewFile] = useState<File | null>(null)
  const [newPreview, setNewPreview] = useState<string | null>(null)
  const [newCaption, setNewCaption] = useState('')
  const [adding, setAdding] = useState(false)
  const [addError, setAddError] = useState('')
  const addFileRef = useRef<HTMLInputElement>(null)

  // Per-row busy state (so only the row being edited shows a spinner/disable)
  const [busyId, setBusyId] = useState<string | null>(null)
  const replaceRefs = useRef<Record<string, HTMLInputElement | null>>({})

  function copySql() {
    navigator.clipboard.writeText(MIGRATION_SQL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function refresh() {
    const { data, error } = await supabase.from('app_screenshots').select('*').order('sort_order')
    if (error) {
      if (/relation .* does not exist/i.test(error.message)) setNeedsMigration(true)
      return
    }
    if (data) setShots(data as Screenshot[])
  }

  function handlePickNewFile(file: File | null) {
    setNewFile(file)
    setNewPreview(file ? URL.createObjectURL(file) : null)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newFile) return
    setAdding(true)
    setAddError('')

    const path = slugifyFilename(newFile.name)
    const { error: uploadError } = await supabase.storage.from('screenshots').upload(path, newFile, {
      cacheControl: '3600',
      upsert: false,
    })
    if (uploadError) {
      setAdding(false)
      if (/bucket not found/i.test(uploadError.message)) {
        setNeedsMigration(true)
      } else {
        setAddError(uploadError.message)
      }
      return
    }

    const { data: pub } = supabase.storage.from('screenshots').getPublicUrl(path)

    const { error: insertError } = await supabase.from('app_screenshots').insert({
      image_url: pub.publicUrl,
      caption: newCaption.trim() || null,
      sort_order: shots.length,
      is_published: true,
    })

    setAdding(false)
    if (insertError) {
      if (/relation .* does not exist/i.test(insertError.message)) setNeedsMigration(true)
      else setAddError(insertError.message)
      return
    }

    setNewCaption('')
    handlePickNewFile(null)
    if (addFileRef.current) addFileRef.current.value = ''
    await refresh()
    router.refresh()
  }

  async function updateCaption(shot: Screenshot, caption: string) {
    setBusyId(shot.id)
    await supabase.from('app_screenshots').update({ caption: caption.trim() || null }).eq('id', shot.id)
    setBusyId(null)
    await refresh()
    router.refresh()
  }

  async function togglePublished(shot: Screenshot) {
    setBusyId(shot.id)
    await supabase.from('app_screenshots').update({ is_published: !shot.is_published }).eq('id', shot.id)
    setBusyId(null)
    await refresh()
    router.refresh()
  }

  async function replaceImage(shot: Screenshot, file: File) {
    setBusyId(shot.id)
    const path = slugifyFilename(file.name)
    const { error: uploadError } = await supabase.storage.from('screenshots').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
    if (uploadError) {
      setBusyId(null)
      alert(`Couldn't upload new image: ${uploadError.message}`)
      return
    }
    const { data: pub } = supabase.storage.from('screenshots').getPublicUrl(path)
    const oldPath = pathFromPublicUrl(shot.image_url)

    await supabase.from('app_screenshots').update({ image_url: pub.publicUrl }).eq('id', shot.id)
    if (oldPath) await supabase.storage.from('screenshots').remove([oldPath])

    setBusyId(null)
    await refresh()
    router.refresh()
  }

  async function move(shot: Screenshot, direction: -1 | 1) {
    const idx = shots.findIndex((s) => s.id === shot.id)
    const swapWith = shots[idx + direction]
    if (!swapWith) return
    setBusyId(shot.id)
    await Promise.all([
      supabase.from('app_screenshots').update({ sort_order: swapWith.sort_order }).eq('id', shot.id),
      supabase.from('app_screenshots').update({ sort_order: shot.sort_order }).eq('id', swapWith.id),
    ])
    setBusyId(null)
    await refresh()
    router.refresh()
  }

  async function remove(shot: Screenshot) {
    if (!confirm('Delete this screenshot?')) return
    setBusyId(shot.id)
    await supabase.from('app_screenshots').delete().eq('id', shot.id)
    const path = pathFromPublicUrl(shot.image_url)
    if (path) await supabase.storage.from('screenshots').remove([path])
    setBusyId(null)
    await refresh()
    router.refresh()
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-white">Screenshots</h1>
      <p className="mt-1 text-sm text-muted">Upload, edit, reorder, and publish the screenshots shown on the site.</p>

      {needsMigration && (
        <div className="card mt-6 max-w-2xl border-yellow-500/30 bg-yellow-500/5 p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-yellow-400">
            One-time setup required
          </h2>
          <p className="mt-2 text-sm text-white/80">
            The <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs">app_screenshots</code> table and/or the{' '}
            <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs">screenshots</code> storage bucket don&apos;t
            exist yet. Open your Supabase dashboard → <span className="font-semibold text-white">SQL Editor</span>,
            paste the SQL below, and click Run. Then come back and upload.
          </p>
          <div className="relative mt-3">
            <pre className="max-h-56 overflow-auto rounded-lg bg-black/50 p-3 text-[11px] leading-relaxed text-white/70">
              {MIGRATION_SQL}
            </pre>
            <button
              type="button"
              onClick={copySql}
              className="absolute right-2 top-2 rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white hover:bg-white/20"
            >
              {copied ? 'Copied ✓' : 'Copy SQL'}
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleAdd} className="card mt-6 max-w-xl space-y-3 p-6">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">Add a screenshot</h2>

        <input
          ref={addFileRef}
          type="file"
          accept="image/*"
          onChange={(e) => handlePickNewFile(e.target.files?.[0] || null)}
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
        />

        {newPreview && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={newPreview} alt="Preview" className="h-40 rounded-lg border border-line object-contain" />
        )}

        <input
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
          placeholder="Caption (e.g. Home screen)"
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink"
        />

        {addError && <p className="text-sm text-red">{addError}</p>}

        <button type="submit" disabled={adding || !newFile} className="btn-primary !px-5 !py-2.5 text-sm disabled:opacity-50">
          {adding ? 'Uploading…' : 'Add screenshot'}
        </button>
      </form>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shots.map((s, i) => (
          <div key={s.id} className={`card overflow-hidden ${busyId === s.id ? 'opacity-50' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image_url} alt={s.caption || 'Screenshot'} className="aspect-[9/19.5] w-full bg-cream object-cover" />

            <div className="space-y-2 p-3">
              <input
                defaultValue={s.caption || ''}
                placeholder="Untitled"
                disabled={busyId === s.id}
                onBlur={(e) => {
                  if (e.target.value.trim() !== (s.caption || '')) updateCaption(s, e.target.value)
                }}
                className="w-full rounded-md border border-line bg-white px-2 py-1 text-xs text-ink"
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => togglePublished(s)}
                  disabled={busyId === s.id}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    s.is_published ? 'bg-red/10 text-red' : 'bg-cream text-muted'
                  }`}
                >
                  {s.is_published ? 'Published' : 'Hidden'}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(s, -1)}
                    disabled={i === 0 || busyId === s.id}
                    className="rounded px-1.5 py-0.5 text-xs text-muted hover:text-ink disabled:opacity-30"
                    aria-label="Move earlier"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => move(s, 1)}
                    disabled={i === shots.length - 1 || busyId === s.id}
                    className="rounded px-1.5 py-0.5 text-xs text-muted hover:text-ink disabled:opacity-30"
                    aria-label="Move later"
                  >
                    ↓
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => replaceRefs.current[s.id]?.click()}
                  disabled={busyId === s.id}
                  className="text-xs text-muted hover:text-ink"
                >
                  Replace image
                </button>
                <button onClick={() => remove(s)} disabled={busyId === s.id} className="text-xs text-muted hover:text-red">
                  Delete
                </button>
              </div>
              <input
                ref={(el) => {
                  replaceRefs.current[s.id] = el
                }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) replaceImage(s, file)
                  e.target.value = ''
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
