import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = createClient()

  const [releases, articles, faqs, screenshots, downloads] = await Promise.all([
    supabase.from('app_releases').select('id', { count: 'exact', head: true }),
    supabase.from('articles').select('id', { count: 'exact', head: true }),
    supabase.from('faqs').select('id', { count: 'exact', head: true }),
    supabase.from('app_screenshots').select('id', { count: 'exact', head: true }),
    supabase.from('download_events').select('id', { count: 'exact', head: true }),
  ])

  const { data: latest } = await supabase
    .from('app_releases')
    .select('version, is_published, release_date')
    .eq('is_latest', true)
    .maybeSingle()

  const { data: whatsappSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'whatsapp_channel_link')
    .maybeSingle()

  const { data: heroSettings } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', ['hero_phone_1_image', 'hero_phone_2_image'])

  const heroPhone1 = heroSettings?.find((r) => r.key === 'hero_phone_1_image')?.value || ''
  const heroPhone2 = heroSettings?.find((r) => r.key === 'hero_phone_2_image')?.value || ''

  const stats = [
    { label: 'APK Releases', value: releases.count ?? 0, href: '/admin/releases' },
    { label: 'Articles', value: articles.count ?? 0, href: '/admin/articles' },
    { label: 'FAQ Entries', value: faqs.count ?? 0, href: '/admin/faqs' },
    { label: 'Screenshots', value: screenshots.count ?? 0, href: '/admin/screenshots' },
    { label: 'Total Downloads', value: downloads.count ?? 0, href: '/admin/releases' },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Overview of your Dextro Play content.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-ink">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 card p-6">
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
          Current latest release
        </h2>
        {latest ? (
          <div className="mt-3 flex items-center gap-3">
            <span className="font-display text-lg font-extrabold text-ink">v{latest.version}</span>
            <span
              className={`rounded-full px-3 py-1 font-mono text-[11px] ${
                latest.is_published ? 'bg-red/10 text-red' : 'bg-cream text-muted'
              }`}
            >
              {latest.is_published ? 'Published' : 'Draft'}
            </span>
            <span className="text-sm text-muted">
              {new Date(latest.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">
            No release published yet. <Link href="/admin/releases" className="text-red">Create one →</Link>
          </p>
        )}
      </div>

      <div className="mt-6 card flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
            WhatsApp floating button
          </h2>
          <p className="mt-1 truncate text-sm text-muted">
            {whatsappSetting?.value ? whatsappSetting.value : 'Not set — button is hidden on the site.'}
          </p>
        </div>
        <Link href="/admin/settings" className="btn-primary shrink-0 !px-4 !py-2 text-sm">
          {whatsappSetting?.value ? 'Change link' : 'Set link'}
        </Link>
      </div>

      <div className="mt-6 card flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="phone-frame w-[46px] shrink-0">
              <div className="phone-screen">
                {heroPhone1 ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={heroPhone1} alt="Hero phone 1" className="h-full w-full object-cover" />
                ) : (
                  <span className="px-1 text-center font-mono text-[6px] text-white/40">Empty</span>
                )}
              </div>
            </div>
            <div className="phone-frame mt-3 w-[46px] shrink-0">
              <div className="phone-screen">
                {heroPhone2 ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={heroPhone2} alt="Hero phone 2" className="h-full w-full object-cover" />
                ) : (
                  <span className="px-1 text-center font-mono text-[6px] text-white/40">Empty</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              Homepage hero images
            </h2>
            <p className="mt-1 text-sm text-muted">
              {heroPhone1 || heroPhone2 ? 'Custom images are live on the homepage.' : 'Still showing the placeholder screens.'}
            </p>
          </div>
        </div>
        <Link href="/admin/settings" className="btn-primary shrink-0 !px-4 !py-2 text-sm">
          {heroPhone1 || heroPhone2 ? 'Change images' : 'Upload images'}
        </Link>
      </div>
    </div>
  )
}
