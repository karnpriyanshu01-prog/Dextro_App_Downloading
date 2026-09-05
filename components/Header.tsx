'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/app', label: 'App' },
  { href: '/features', label: 'Features' },
  { href: '/guides', label: 'Guides' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/faq', label: 'FAQ' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-50 border-b border-line"
      style={{
        backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f6f4f2 100%)',
        boxShadow: '0 4px 14px -10px rgba(20,20,20,0.15)',
      }}
    >
      <div className="container-page flex h-[74px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Dextro Play logo"
            width={36}
            height={36}
            className="h-9 w-9"
            style={{ filter: 'drop-shadow(0 3px 6px rgba(225,6,0,0.35))' }}
            priority
          />
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">Dextro Play</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  active ? 'text-red' : 'text-ink-soft hover:text-red'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/download" className="btn-primary !px-5 !py-2.5 text-sm">
            Download APK
          </Link>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-4 bg-ink transition-transform ${open ? 'translate-y-[6px] rotate-45' : ''}`}
            />
            <span className={`absolute left-0 top-1.5 h-0.5 w-4 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span
              className={`absolute left-0 top-3 h-0.5 w-4 bg-ink transition-transform ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-semibold text-ink hover:bg-cream"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/download" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full text-sm">
              Download APK
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
