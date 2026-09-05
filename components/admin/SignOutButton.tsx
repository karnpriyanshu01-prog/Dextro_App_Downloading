'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignOutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className={compact ? 'text-xs text-muted' : 'mt-2 text-xs text-muted hover:text-white'}
    >
      Sign out
    </button>
  )
}
