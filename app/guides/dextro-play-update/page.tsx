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
const URL = `${siteConfig.url}/guides/dextro-play-update`

export const metadata: Metadata = {
  title: 'How to Update Dextro Play',
  description: 'How to check your current Dextro Play version, download the newest release, and update without losing your settings.',
  alternates: { canonical: '/guides/dextro-play-update' },
}

export default function UpdateGuidePage() {
  const related = guides.filter((g) => g.slug !== 'dextro-play-update')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: 'How to Update Dextro Play',
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
              { name: 'Update Guide', url: URL },
            ])
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Guides', href: '/guides' },
          { name: 'Update Guide', href: '/guides/dextro-play-update' },
        ]}
      />

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="min-w-0">
      <article className="max-w-3xl">
        <span className="eyebrow">Updates</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          How to Update Dextro Play
        </h1>
        <p className="mt-3 text-sm text-muted">
          Last updated {new Date(UPDATED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · 4 min read
        </p>

        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          Because Dextro Play isn't distributed through the Play Store, it doesn't update
          automatically. Updating means downloading the newest APK and installing it over your
          current copy — your app data and settings stay in place.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">1. Check your current version</h2>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Open Dextro Play and check the app's settings or about screen for the installed version
          number.
        </p>

        <h2 className="mt-8 font-display text-xl font-bold text-ink">2. Compare it to the latest release</h2>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Visit the{' '}
          <Link href="/changelog" className="text-ink underline underline-offset-2 hover:text-red">
            changelog
          </Link>{' '}
          to see the current version and what changed since your installed build.
        </p>

        <div className="my-10">
          <AdUnit slot="9999999992" />
        </div>

        <h2 className="mt-2 font-display text-xl font-bold text-ink">3. Download and install the new APK</h2>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Download the latest APK from the{' '}
          <Link href="/download" className="text-ink underline underline-offset-2 hover:text-red">
            download page
          </Link>{' '}
          and open it. Android will detect it as an update to your existing app rather than a new
          install — tap Update, and your settings will carry over.
        </p>

        <h2 className="mt-8 font-display text-xl font-bold text-ink">If the update fails</h2>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          A failed update is usually caused by insufficient storage or an interrupted download. Free
          up space, redownload the APK, and try again. If it still fails, see our{' '}
          <Link href="/guides/dextro-play-not-working" className="text-ink underline underline-offset-2 hover:text-red">
            troubleshooting guide
          </Link>
          .
        </p>

        <div className="mt-14 rounded-2xl border border-line bg-cream p-6 text-center">
          <p className="font-display text-lg font-bold text-ink">Get the latest version</p>
          <Link href="/download" className="btn-primary mt-4 inline-flex">
            Download Latest APK
          </Link>
        </div>
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
