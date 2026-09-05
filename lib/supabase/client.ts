'use client'

import { createBrowserClient } from '@supabase/ssr'

// Browser client — uses the public anon key only. Every table it can touch
// is protected by Row Level Security (see supabase/schema.sql), so this key
// being visible in client-side JS is expected and safe.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
