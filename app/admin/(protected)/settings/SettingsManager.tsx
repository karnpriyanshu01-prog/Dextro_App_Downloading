'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const MIGRATION_SQL = `create table if not exists site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

create policy "Public can read site settings"
  on site_settings for select
  using (true);

create policy "Admins can manage site settings"
  on site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into site_settings (key, value)
values ('whatsapp_channel_link', 'https://whatsapp.com/channel/0029VbDHBnFADTOD6fejmv0l')
on conflict (key) do nothing;`

function slugifyFilename(prefix: string, name: string) {
  const dot = name.lastIndexOf('.')
  const ext = dot >= 0 ? name.slice(dot) : ''
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext.toLowerCase()}`
}

function pathFromPublicUrl(url: string): string | null {
  const marker = '/storage/v1/object/public/screenshots/'
  const idx = url.indexOf(marker)
  if (idx === -1) return null
  return decodeURIComponent(url.slice(idx + marker.length).split('?')[0])
}

function HeroImageField({
  label,
  settingKey,
  value,
  onSaved,
  onMigrationNeeded,
}: {
  label: string
  settingKey: string
  value: string
  onSaved: (url: string) => void
  onMigrationNeeded: () => void
}) {
  const supabase = createClient()
  const fileRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function upload(file: File) {
    setBusy(true)
    setError('')

    const path = `hero/${slugifyFilename(settingKey, file.name)}`
    const { error: uploadError } = await supabase.storage.from('screenshots').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
    if (uploadError) {
      setBusy(false)
      if (/bucket not found/i.test(uploadError.message)) onMigrationNeeded()
      else setError(uploadError.message)
      return
    }

    const { data: pub } = supabase.storage.from('screenshots').getPublicUrl(path)
    const { error: upsertError } = await supabase
      .from('site_settings')
      .upsert({ key: settingKey, value: pub.publicUrl, updated_at: new Date().toISOString() })

    if (upsertError) {
      setBusy(false)
      if (/relation .* does not exist/i.test(upsertError.message)) onMigrationNeeded()
      else setError(upsertError.message)
      return
    }

    const oldPath = value ? pathFromPublicUrl(value) : null
    if (oldPath) await supabase.storage.from('screenshots').remove([oldPath])

    setBusy(false)
    onSaved(pub.publicUrl)
  }

  async function removeImage() {
    setBusy(true)
    await supabase.from('site_settings').upsert({ key: settingKey, value: '', updated_at: new Date().toISOString() })
    const oldPath = value ? pathFromPublicUrl(value) : null
    if (oldPath) await supabase.storage.from('screenshots').remove([oldPath])
    setBusy(false)
    onSaved('')
  }

  return (
    <div className="flex gap-4">
      <div className="phone-frame w-[70px] shrink-0">
        <div className="phone-screen">
          {value ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt={label} className="h-full w-full object-cover" />
          ) : (
            <span className="px-1 text-center font-mono text-[7px] text-white/40">Placeholder</span>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-ink">{label}</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) upload(file)
            e.target.value = ''
          }}
          className="block w-full text-xs text-muted file:mr-3 file:rounded-md file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="text-xs font-semibold text-ink underline underline-offset-2 hover:text-red disabled:opacity-40"
          >
            {value ? 'Replace image' : 'Upload image'}
          </button>
          {value && (
            <button
              type="button"
              onClick={removeImage}
              disabled={busy}
              className="text-xs text-muted hover:text-red disabled:opacity-40"
            >
              Remove (use placeholder)
            </button>
          )}
          {busy && <span className="text-xs text-muted">Saving…</span>}
        </div>
        {error && <p className="text-xs text-red">{error}</p>}
      </div>
    </div>
  )
}

export default function SettingsManager({
  initialWhatsappLink,
  initialHeroPhone1,
  initialHeroPhone2,
  tableMissing = false,
}: {
  initialWhatsappLink: string
  initialHeroPhone1: string
  initialHeroPhone2: string
  tableMissing?: boolean
}) {
  const router = useRouter()
  const supabase = createClient()
  const [whatsappLink, setWhatsappLink] = useState(initialWhatsappLink)
  const [heroPhone1, setHeroPhone1] = useState(initialHeroPhone1)
  const [heroPhone2, setHeroPhone2] = useState(initialHeroPhone2)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [needsMigration, setNeedsMigration] = useState(tableMissing)
  const [copied, setCopied] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const { error: upsertError } = await supabase
      .from('site_settings')
      .upsert({ key: 'whatsapp_channel_link', value: whatsappLink.trim(), updated_at: new Date().toISOString() })

    setSaving(false)
    if (upsertError) {
      if (/relation .* does not exist/i.test(upsertError.message)) {
        setNeedsMigration(true)
      } else {
        setError(upsertError.message)
      }
      return
    }
    setSavedAt(Date.now())
    router.refresh()
  }

  function copySql() {
    navigator.clipboard.writeText(MIGRATION_SQL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-white">Settings</h1>
      <p className="mt-1 text-sm text-muted">Site-wide settings that don&apos;t need a redeploy.</p>

      {needsMigration && (
        <div className="card mt-6 max-w-xl border-yellow-500/30 bg-yellow-500/5 p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-yellow-400">
            One-time setup required
          </h2>
          <p className="mt-2 text-sm text-white/80">
            The <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs">site_settings</code> table (or the{' '}
            <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs">screenshots</code> storage bucket) doesn&apos;t
            exist yet. Open your Supabase dashboard → <span className="font-semibold text-white">SQL Editor</span>,
            paste the SQL below, and click Run. Then come back and save.
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

      <form onSubmit={handleSave} className="card mt-6 max-w-xl space-y-3 p-6">
        <div>
          <label htmlFor="whatsapp-link" className="font-display text-sm font-bold uppercase tracking-wide text-ink">
            WhatsApp channel link
          </label>
          <p className="mt-1 text-xs text-muted">
            Shown as a floating button on every page. Leave blank to hide the button.
          </p>
          <input
            id="whatsapp-link"
            type="url"
            value={whatsappLink}
            onChange={(e) => setWhatsappLink(e.target.value)}
            placeholder="https://whatsapp.com/channel/xxxxxxxxxxxxxxxxx"
            className="mt-3 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink"
          />
        </div>

        {error && <p className="text-sm text-red">{error}</p>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary !px-5 !py-2.5 text-sm disabled:opacity-50">
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          {savedAt && !saving && <span className="text-xs text-muted">Saved ✓</span>}
        </div>
      </form>

      <div className="card mt-6 max-w-xl space-y-6 p-6">
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">Homepage hero images</h2>
          <p className="mt-1 text-xs text-muted">
            The two phone mockups at the top of the homepage. Upload a screenshot for each — saves instantly, no
            redeploy needed.
          </p>
        </div>

        <HeroImageField
          label="Phone 1 (left)"
          settingKey="hero_phone_1_image"
          value={heroPhone1}
          onSaved={(url) => {
            setHeroPhone1(url)
            router.refresh()
          }}
          onMigrationNeeded={() => setNeedsMigration(true)}
        />
        <HeroImageField
          label="Phone 2 (right)"
          settingKey="hero_phone_2_image"
          value={heroPhone2}
          onSaved={(url) => {
            setHeroPhone2(url)
            router.refresh()
          }}
          onMigrationNeeded={() => setNeedsMigration(true)}
        />
      </div>
    </div>
  )
}
