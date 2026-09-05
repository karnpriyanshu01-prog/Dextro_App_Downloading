import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Minimal, privacy-conscious download analytics — records which release
// and which mirror was chosen, nothing else. Called client-side right
// before the browser navigates to the mirror's file_url.
//
// Uses the service-role client because anonymous visitors have no RLS
// insert policy on download_events by design (we don't want arbitrary
// client-side writes) — this route is the one trusted, validated path in.
export async function POST(req: NextRequest) {
  let body: { releaseId?: string; mirrorId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  if (!body.releaseId || typeof body.releaseId !== 'string') {
    return NextResponse.json({ error: 'releaseId is required' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('download_events').insert({
    release_id: body.releaseId,
    mirror_id: typeof body.mirrorId === 'string' ? body.mirrorId : null,
  })

  if (error) {
    // Don't let analytics failures look like a broken download to the user;
    // just log server-side and report ok.
    console.error('download_events insert failed:', error.message)
  }

  return NextResponse.json({ ok: true })
}
