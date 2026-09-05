import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/admin/SignOutButton'

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/releases', label: 'APK Releases' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/faqs', label: 'FAQ' },
  { href: '/admin/screenshots', label: 'Screenshots' },
  { href: '/admin/settings', label: 'Settings' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Belt-and-suspenders: middleware already redirects unauthenticated
  // requests, but every server-rendered admin page checks again.
  if (!user) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-black">
      <aside className="hidden w-60 shrink-0 border-r border-white/5 bg-deep-black md:flex md:flex-col">
        <div className="flex items-center gap-2.5 px-6 py-6">
          <Image src="/logo.png" alt="Dextro Play" width={28} height={28} />
          <span className="font-display text-base font-extrabold">Admin</span>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/5 p-4">
          <p className="truncate text-xs text-muted">{user.email}</p>
          <SignOutButton />
        </div>
      </aside>

      <div className="flex-1">
        <div className="border-b border-white/5 bg-deep-black px-5 py-4 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-base font-extrabold">Dextro Play Admin</span>
            <SignOutButton compact />
          </div>
          <nav className="mt-3 flex gap-4 overflow-x-auto text-sm">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="whitespace-nowrap text-white/70">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <main className="p-6 sm:p-8">{children}</main>
      </div>
    </div>
  )
}
