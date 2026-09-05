'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Faq = { id: string; question: string; answer: string; sort_order: number; published: boolean }

export default function FaqsManager({ initialFaqs }: { initialFaqs: Faq[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [faqs, setFaqs] = useState(initialFaqs)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [saving, setSaving] = useState(false)

  async function refresh() {
    const { data } = await supabase.from('faqs').select('*').order('sort_order')
    if (data) setFaqs(data)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!question.trim() || !answer.trim()) return
    setSaving(true)
    await supabase.from('faqs').insert({
      question: question.trim(),
      answer: answer.trim(),
      sort_order: faqs.length,
      published: true,
    })
    setQuestion('')
    setAnswer('')
    setSaving(false)
    await refresh()
    router.refresh()
  }

  async function togglePublished(faq: Faq) {
    await supabase.from('faqs').update({ published: !faq.published }).eq('id', faq.id)
    await refresh()
    router.refresh()
  }

  async function remove(faq: Faq) {
    if (!confirm('Delete this FAQ?')) return
    await supabase.from('faqs').delete().eq('id', faq.id)
    await refresh()
    router.refresh()
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-white">FAQ</h1>
      <p className="mt-1 text-sm text-muted">Manage the questions shown on the public FAQ page.</p>

      <form onSubmit={handleAdd} className="card mt-6 space-y-3 p-6">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink"
        />
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          rows={3}
          className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink"
        />
        <button type="submit" disabled={saving} className="btn-primary !px-5 !py-2.5 text-sm disabled:opacity-50">
          {saving ? 'Adding…' : 'Add FAQ'}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display font-bold text-ink">{f.question}</p>
                <p className="mt-1 text-sm text-muted">{f.answer}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] ${f.published ? 'bg-red/10 text-red' : 'bg-cream text-muted'}`}>
                {f.published ? 'Live' : 'Hidden'}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => togglePublished(f)} className="btn-secondary !px-3 !py-1.5 text-xs">
                {f.published ? 'Hide' : 'Publish'}
              </button>
              <button onClick={() => remove(f)} className="btn-secondary !px-3 !py-1.5 text-xs hover:!border-red hover:!text-red">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
