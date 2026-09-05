'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Mirror = { id: string; label: string; file_url: string; region: string | null; sort_order: number }
type Release = {
  id: string
  version: string
  version_code: number
  file_size: number
  sha256: string
  min_android_version: string
  release_date: string
  release_notes: { added: string[]; improved: string[]; fixed: string[] }
  is_latest: boolean
  is_published: boolean
  release_mirrors: Mirror[]
}

function bytesFromMb(mb: string) {
  const n = parseFloat(mb)
  return isNaN(n) ? 0 : Math.round(n * 1024 * 1024)
}
function mbFromBytes(bytes: number) {
  return bytes ? (bytes / (1024 * 1024)).toFixed(1) : ''
}

export default function ReleasesManager({ initialReleases }: { initialReleases: Release[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [releases, setReleases] = useState(initialReleases)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    version: '',
    version_code: '',
    file_size_mb: '',
    sha256: '',
    min_android_version: '8.0',
    release_date: new Date().toISOString().slice(0, 10),
    added: '',
    improved: '',
    fixed: '',
    is_published: true,
    is_latest: true,
    mirrors: [{ label: 'Primary Server', file_url: '', region: 'Global' }],
  })

  function updateMirror(i: number, field: string, value: string) {
    setForm((f) => {
      const mirrors = [...f.mirrors]
      mirrors[i] = { ...mirrors[i], [field]: value }
      return { ...f, mirrors }
    })
  }
  function addMirror() {
    setForm((f) => ({ ...f, mirrors: [...f.mirrors, { label: '', file_url: '', region: '' }] }))
  }
  function removeMirror(i: number) {
    setForm((f) => ({ ...f, mirrors: f.mirrors.filter((_, idx) => idx !== i) }))
  }

  async function refresh() {
    const { data } = await supabase
      .from('app_releases')
      .select('*, release_mirrors(*)')
      .order('release_date', { ascending: false })
    if (data) setReleases(data as any)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    if (form.mirrors.some((m) => !m.label.trim() || !m.file_url.trim())) {
      setError('Every mirror needs a label and a URL.')
      setSaving(false)
      return
    }

    if (form.is_latest) {
      // Only one release may be is_latest — clear the flag on others first.
      await supabase.from('app_releases').update({ is_latest: false }).eq('is_latest', true)
    }

    const { data: release, error: insertError } = await supabase
      .from('app_releases')
      .insert({
        version: form.version,
        version_code: parseInt(form.version_code) || 0,
        file_size: bytesFromMb(form.file_size_mb),
        sha256: form.sha256,
        min_android_version: form.min_android_version,
        release_date: form.release_date,
        release_notes: {
          added: form.added.split('\n').map((s) => s.trim()).filter(Boolean),
          improved: form.improved.split('\n').map((s) => s.trim()).filter(Boolean),
          fixed: form.fixed.split('\n').map((s) => s.trim()).filter(Boolean),
        },
        is_published: form.is_published,
        is_latest: form.is_latest,
      })
      .select()
      .single()

    if (insertError || !release) {
      setError(insertError?.message || 'Could not create release.')
      setSaving(false)
      return
    }

    const mirrorRows = form.mirrors.map((m, i) => ({
      release_id: release.id,
      label: m.label,
      file_url: m.file_url,
      region: m.region || null,
      sort_order: i,
    }))
    const { error: mirrorError } = await supabase.from('release_mirrors').insert(mirrorRows)

    if (mirrorError) {
      setError(mirrorError.message)
      setSaving(false)
      return
    }

    setShowForm(false)
    setSaving(false)
    setForm({
      version: '', version_code: '', file_size_mb: '', sha256: '', min_android_version: '8.0',
      release_date: new Date().toISOString().slice(0, 10), added: '', improved: '', fixed: '',
      is_published: true, is_latest: true, mirrors: [{ label: 'Primary Server', file_url: '', region: 'Global' }],
    })
    await refresh()
    router.refresh()
  }

  async function togglePublished(release: Release) {
    await supabase.from('app_releases').update({ is_published: !release.is_published }).eq('id', release.id)
    await refresh()
    router.refresh()
  }

  async function setAsLatest(release: Release) {
    await supabase.from('app_releases').update({ is_latest: false }).eq('is_latest', true)
    await supabase.from('app_releases').update({ is_latest: true }).eq('id', release.id)
    await refresh()
    router.refresh()
  }

  async function deleteRelease(release: Release) {
    if (!confirm(`Delete release v${release.version}? This also deletes its mirrors.`)) return
    await supabase.from('app_releases').delete().eq('id', release.id)
    await refresh()
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">APK Releases</h1>
          <p className="mt-1 text-sm text-muted">Publish versions and manage their download mirrors.</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary !px-5 !py-2.5 text-sm">
          {showForm ? 'Cancel' : 'New release'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card mt-6 space-y-5 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-muted">Version</label>
              <input required value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })}
                placeholder="2.4.0" className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Version code</label>
              <input required type="number" value={form.version_code} onChange={(e) => setForm({ ...form, version_code: e.target.value })}
                placeholder="24" className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">File size (MB)</label>
              <input required value={form.file_size_mb} onChange={(e) => setForm({ ...form, file_size_mb: e.target.value })}
                placeholder="38" className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Min Android version</label>
              <input required value={form.min_android_version} onChange={(e) => setForm({ ...form, min_android_version: e.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">SHA-256</label>
              <input required value={form.sha256} onChange={(e) => setForm({ ...form, sha256: e.target.value })}
                placeholder="Real checksum of the uploaded APK" className="w-full rounded-lg border border-white/10 bg-black px-3 py-2.5 text-sm font-mono" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Release date</label>
              <input required type="date" value={form.release_date} onChange={(e) => setForm({ ...form, release_date: e.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs text-muted">New (one per line)</label>
              <textarea rows={3} value={form.added} onChange={(e) => setForm({ ...form, added: e.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Improved (one per line)</label>
              <textarea rows={3} value={form.improved} onChange={(e) => setForm({ ...form, improved: e.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted">Fixed (one per line)</label>
              <textarea rows={3} value={form.fixed} onChange={(e) => setForm({ ...form, fixed: e.target.value })}
                className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink" />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs text-muted">Download mirrors</label>
              <button type="button" onClick={addMirror} className="text-xs font-semibold text-red">+ Add mirror</button>
            </div>
            <div className="space-y-2">
              {form.mirrors.map((m, i) => (
                <div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_100px_auto] gap-2">
                  <input placeholder="Label (e.g. Primary Server)" value={m.label}
                    onChange={(e) => updateMirror(i, 'label', e.target.value)}
                    className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink" />
                  <input placeholder="https://cdn.example.com/app.apk" value={m.file_url}
                    onChange={(e) => updateMirror(i, 'file_url', e.target.value)}
                    className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink" />
                  <input placeholder="Region" value={m.region}
                    onChange={(e) => updateMirror(i, 'region', e.target.value)}
                    className="rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink" />
                  <button type="button" onClick={() => removeMirror(i)} className="text-xs text-muted hover:text-red">Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
              Publish immediately
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.is_latest} onChange={(e) => setForm({ ...form, is_latest: e.target.checked })} />
              Mark as latest version
            </label>
          </div>

          {error && <p className="text-sm text-red">{error}</p>}

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'Saving…' : 'Create release'}
          </button>
        </form>
      )}

      <div className="mt-8 space-y-4">
        {releases.length === 0 && <p className="text-sm text-muted">No releases yet.</p>}
        {releases.map((r) => (
          <div key={r.id} className="card p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-lg font-extrabold text-ink">v{r.version}</h3>
              {r.is_latest && <span className="rounded-full bg-red/10 px-3 py-1 font-mono text-[11px] text-red">Latest</span>}
              <span className={`rounded-full px-3 py-1 font-mono text-[11px] ${r.is_published ? 'bg-red/10 text-red' : 'bg-cream text-muted'}`}>
                {r.is_published ? 'Published' : 'Draft'}
              </span>
              <span className="text-xs text-muted">{mbFromBytes(r.file_size)} MB · Android {r.min_android_version}+</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {r.release_mirrors?.length ? (
                r.release_mirrors.map((m) => (
                  <span key={m.id} className="rounded-lg border border-line px-2.5 py-1 text-xs text-ink-soft">
                    {m.label}
                  </span>
                ))
              ) : (
                <span className="text-xs text-red">No mirrors added — download button will be empty</span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <button onClick={() => togglePublished(r)} className="btn-secondary !px-4 !py-2 text-xs">
                {r.is_published ? 'Unpublish' : 'Publish'}
              </button>
              {!r.is_latest && (
                <button onClick={() => setAsLatest(r)} className="btn-secondary !px-4 !py-2 text-xs">
                  Set as latest
                </button>
              )}
              <button onClick={() => deleteRelease(r)} className="btn-secondary !px-4 !py-2 text-xs hover:!border-red hover:!text-red">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
