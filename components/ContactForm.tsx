'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
      website: String(formData.get('website') || ''), // honeypot
    }

    if (payload.name.trim().length < 2) {
      setStatus('idle')
      setError('Please enter your name.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setStatus('idle')
      setError('Please enter a valid email.')
      return
    }
    if (payload.message.trim().length < 10) {
      setStatus('idle')
      setError('Message must be at least 10 characters.')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('sent')
    } catch {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card p-8 text-center">
        <p className="font-display text-lg font-bold text-ink">Message sent</p>
        <p className="mt-2 text-sm text-muted">Thanks for reaching out — we'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
      {/* Honeypot field — hidden from real users via CSS, bots often fill it in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={200}
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-red"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-red"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">Message</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className="w-full resize-none rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-red"
        />
      </div>

      {error && <p className="text-sm text-red">{error}</p>}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-50">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
