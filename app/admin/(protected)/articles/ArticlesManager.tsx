'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Article = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  published: boolean
  updated_at: string
}

function slugify(title: string) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ArticlesManager({ initialArticles }: { initialArticles: Article[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [articles, setArticles] = useState(initialArticles)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', published: false })

  async function refresh() {
    const { data } = await supabase.from('articles').select('*').order('updated_at', { ascending: false })
    if (data) setArticles(data)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.')
      return
    }
    setSaving(true)
    setError('')

    const { error: insertError } = await supabase.from('articles').insert({
      title: form.title.trim(),
      slug: slugify(form.title),
      excerpt: form.excerpt.trim() || null,
      content: form.content.trim(),
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
    })

    if (insertError) {
      setError(insertError.message.includes('duplicate') ? 'An article with this title already exists.' : insertError.message)
      setSaving(false)
      return
    }

    setForm({ title: '', excerpt: '', content: '', published: false })
    setShowForm(false)
    setSaving(false)
    await refresh()
    router.refresh()
  }

  async function togglePublished(article: Article) {
    await supabase
      .from('articles')
      .update({ published: !article.published, published_at: !article.published ? new Date().toISOString() : null })
      .eq('id', article.id)
    await refresh()
    router.refresh()
  }

  async function remove(article: Article) {
    if (!confirm(`Delete "${article.title}"?`)) return
    await supabase.from('articles').delete().eq('id', article.id)
    await refresh()
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Articles</h1>
          <p className="mt-1 text-sm text-muted">Guides and blog-style content.</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary !px-5 !py-2.5 text-sm">
          {showForm ? 'Cancel' : 'New article'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card mt-6 space-y-3 p-6">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink"
          />
          <input
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder="Short excerpt (shown in cards/previews)"
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink"
          />
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Full content (Markdown or plain text)"
            rows={8}
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink font-mono"
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Publish immediately
          </label>
          {error && <p className="text-sm text-red">{error}</p>}
          <button type="submit" disabled={saving} className="btn-primary !px-5 !py-2.5 text-sm disabled:opacity-50">
            {saving ? 'Saving…' : 'Create article'}
          </button>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {articles.length === 0 && <p className="text-sm text-muted">No articles yet.</p>}
        {articles.map((a) => (
          <div key={a.id} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display font-bold text-ink">{a.title}</p>
                <p className="mt-1 text-xs text-muted">/{a.slug}</p>
                {a.excerpt && <p className="mt-2 text-sm text-muted">{a.excerpt}</p>}
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] ${a.published ? 'bg-red/10 text-red' : 'bg-cream text-muted'}`}>
                {a.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => togglePublished(a)} className="btn-secondary !px-3 !py-1.5 text-xs">
                {a.published ? 'Unpublish' : 'Publish'}
              </button>
              <button onClick={() => remove(a)} className="btn-secondary !px-3 !py-1.5 text-xs hover:!border-red hover:!text-red">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
