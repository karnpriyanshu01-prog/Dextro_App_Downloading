import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import AdUnit from '@/components/AdUnit'
import AdRail from '@/components/AdRail'
import GuideCard from '@/components/GuideCard'
import { guides } from '@/lib/guides'
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { siteConfig } from '@/lib/site.config'

const UPDATED = '2026-08-01'
const URL = `${siteConfig.url}/guides/dextro-play-not-working`

export const metadata: Metadata = {
  title: 'Dextro Play Not Working? Troubleshooting Guide',
  description:
    'Fixes for the most common Dextro Play problems — crashes, buffering, black screens, and playback issues — in the order you should try them.',
  alternates: { canonical: '/guides/dextro-play-not-working' },
}

const issues = [
  {
    title: 'App crashes on launch',
    body: 'Force-stop the app from Android Settings → Apps → Dextro Play → Force stop, then reopen it. If it still crashes immediately, uninstall and reinstall using the latest APK from the download page — an outdated build is the most common cause.',
  },
  {
    title: 'Video won\'t play or shows a black screen',
    body: 'Check your internet connection first. If other apps stream fine, clear Dextro Play\'s cache (Settings → Apps → Dextro Play → Storage → Clear cache) and try again.',
  },
  {
    title: 'Stream keeps buffering',
    body: 'Buffering is almost always a network issue. Try switching between Wi-Fi and mobile data, move closer to your router, or close other apps using bandwidth in the background.',
  },
  {
    title: 'Play/pause or seek buttons don\'t respond',
    body: 'Make sure the screen isn\'t locked using the in-player lock icon. If controls still feel unresponsive, restart the app — this clears any stuck playback state.',
  },
  {
    title: 'App won\'t install or update',
    body: 'Confirm your Android version meets the minimum listed on the download page, and that you have enough free storage. See our update guide if you\'re installing over an existing copy.',
  },
]

export default function NotWorkingGuidePage() {
  const related = guides.filter((g) => g.slug !== 'dextro-play-not-working')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: 'Dextro Play Not Working? Troubleshooting Guide',
              description: metadata.description as string,
              url: URL,
              datePublished: UPDATED,
              dateModified: UPDATED,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: siteConfig.url },
              { name: 'Guides', url: `${siteConfig.url}/guides` },
              { name: 'Troubleshooting', url: URL },
            ])
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Guides', href: '/guides' },
          { name: 'Troubleshooting', href: '/guides/dextro-play-not-working' },
        ]}
      />

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="min-w-0">
      <article className="max-w-3xl">
        <span className="eyebrow">Troubleshooting</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Dextro Play Not Working? Troubleshooting Guide
        </h1>
        <p className="mt-3 text-sm text-muted">
          Last updated {new Date(UPDATED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · 6 min read
        </p>

        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          Most Dextro Play issues fall into a handful of categories. Work through the section that
          matches what you're seeing — start from the top if you're not sure, since the fixes are
          ordered from most to least common.
        </p>

        <nav className="card mt-8 p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">On this page</h2>
          <ol className="mt-3 space-y-1.5 text-sm">
            {issues.map((issue) => (
              <li key={issue.title}>
                <a href={`#${issue.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-muted hover:text-red">
                  {issue.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-10">
          {issues.map((issue, i) => (
            <div key={issue.title}>
              <h2 id={issue.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-display text-xl font-bold text-ink">
                {issue.title}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{issue.body}</p>
              {i === 1 && <AdUnit slot="9999999991" />}
            </div>
          ))}
        </div>

        <p className="mt-10 text-base leading-relaxed text-ink-soft">
          If none of the above resolves the issue, uninstall Dextro Play, restart your device, and
          install the latest APK fresh from the{' '}
          <Link href="/download" className="text-ink underline underline-offset-2 hover:text-red">
            download page
          </Link>
          . If it still doesn't work, reach out through our{' '}
          <Link href="/contact" className="text-ink underline underline-offset-2 hover:text-red">
            contact page
          </Link>
          .
        </p>
      </article>
        </main>
      </div>

      <section className="border-t border-line-soft bg-cream py-14">
        <div className="container-page">
          <h2 className="font-display text-xl font-bold text-ink">Related guides</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
