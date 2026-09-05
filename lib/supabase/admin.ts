import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Service-role client — ONLY ever import this from server-only code
// (route handlers, server actions). Bypasses RLS entirely, so it must
// never be exposed to the browser and must never be given untrusted input
// without validation.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
