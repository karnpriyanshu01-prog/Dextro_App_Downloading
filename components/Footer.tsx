import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/site.config'

const COLUMNS = [
  {
    title: 'Site',
    links: [
      { href: '/', label: 'Home' },
      { href: '/app', label: 'App' },
      { href: '/features', label: 'Features' },
      { href: '/guides', label: 'Guides' },
      { href: '/changelog', label: 'Changelog' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/disclaimer', label: 'Disclaimer' },
      { href: '/user-content-disclaimer', label: 'User Content Disclaimer' },
      { href: '/dmca', label: 'DMCA' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Dextro Play logo" width={30} height={30} className="h-[30px] w-[30px]" />
            <span className="font-display text-lg font-extrabold text-ink">Dextro Play</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.description}
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-red">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Dextro Play. All rights reserved.</p>
          <p>Android and the Android logo are trademarks of Google LLC. Dextro Play is not affiliated with Google.</p>
        </div>
      </div>
    </footer>
  )
}
