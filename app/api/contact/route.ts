import { NextRequest, NextResponse } from 'next/server'

const hits = new Map<string, number[]>()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_REQUESTS
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, message, website } = body as Record<string, string>

  // Honeypot — real users never fill this hidden field in.
  if (typeof website === 'string' && website.trim() !== '') {
    return NextResponse.json({ ok: true }) // silently accept, don't tip off bots
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  }
  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 })
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: 'One or more fields is too long.' }, { status: 400 })
  }
  // Reject header-injection attempts (newlines in fields used for email headers).
  if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) {
    return NextResponse.json({ error: 'Invalid characters in submission.' }, { status: 400 })
  }

  const safe = {
    name: escapeHtml(name.trim()),
    email: escapeHtml(email.trim()),
    message: escapeHtml(message.trim()),
  }

  // TODO: send `safe` via your email provider (Resend, Postmark, etc.) or
  // insert into a Supabase `contact_messages` table. Never interpolate
  // raw user input into HTML/SQL — `safe` above is already escaped.

  return NextResponse.json({ ok: true })
}
