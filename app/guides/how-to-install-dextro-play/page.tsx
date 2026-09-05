import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import AdUnit from '@/components/AdUnit'
import AdRail from '@/components/AdRail'
import GuideCard from '@/components/GuideCard'
import { guides } from '@/lib/guides'
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld'
import { siteConfig } from '@/lib/site.config'

const UPDATED = '2026-08-01'
const URL = `${siteConfig.url}/guides/how-to-install-dextro-play`

export const metadata: Metadata = {
  title: 'How to Install Dextro Play APK on Android',
  description:
    'A complete, step-by-step walkthrough for downloading and installing the Dextro Play APK safely on any Android phone.',
  alternates: { canonical: '/guides/how-to-install-dextro-play' },
}

const faqs = [
  {
    question: 'Do I need to enable anything before installing?',
    answer:
      "Yes — Android blocks installs from outside the Play Store by default. You'll allow it once, for the specific app you're installing from (your browser or file manager).",
  },
  {
    question: 'Is it safe to install an APK from outside the Play Store?',
    answer:
      'It is as safe as the source you download from. Only download Dextro Play from this official site, and verify the SHA-256 checksum shown on the download page.',
  },
  {
    question: 'The install button is greyed out — why?',
    answer:
      "That usually means your device doesn't meet the minimum Android version for the current release, or the download didn't finish. Check the requirement listed on the download page.",
  },
]

export default function InstallGuidePage() {
  const related = guides.filter((g) => g.slug !== 'how-to-install-dextro-play')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: 'How to Install Dextro Play APK on Android',
              description: metadata.description as string,
              url: URL,
              datePublished: UPDATED,
              dateModified: UPDATED,
            })
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', url: siteConfig.url },
              { name: 'Guides', url: `${siteConfig.url}/guides` },
              { name: 'Install Guide', url: URL },
            ])
          ),
        }}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Guides', href: '/guides' },
          { name: 'Install Guide', href: '/guides/how-to-install-dextro-play' },
        ]}
      />

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="min-w-0">
      <article className="max-w-3xl">
        <span className="eyebrow">Installation</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          How to Install Dextro Play APK on Android
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated {new Date(UPDATED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · 5 min read</p>

        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          Because Dextro Play is distributed as a direct APK rather than through the Play Store,
          Android needs your explicit permission before it will install the file. This guide walks
          through that permission step and the rest of the install, from download to first launch.
        </p>

        <nav className="card mt-8 p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink">On this page</h2>
          <ol className="mt-3 space-y-1.5 text-sm">
            <li><a href="#before-you-start" className="text-muted hover:text-red">Before you start</a></li>
            <li><a href="#steps" className="text-muted hover:text-red">Installation steps</a></li>
            <li><a href="#verify" className="text-muted hover:text-red">Verifying the download</a></li>
            <li><a href="#faq" className="text-muted hover:text-red">FAQ</a></li>
          </ol>
        </nav>

        <h2 id="before-you-start" className="mt-12 font-display text-2xl font-bold text-ink">Before you start</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Make sure you're downloading from <strong className="text-ink">this site only</strong>.
          Confirm your device is running the Android version listed as the minimum requirement on
          the <Link href="/download" className="text-ink underline underline-offset-2 hover:text-red">download page</Link>.
        </p>

        <h2 id="steps" className="mt-12 font-display text-2xl font-bold text-ink">Installation steps</h2>
        <ol className="mt-6 space-y-6">
          {[
            {
              title: 'Download the APK',
              body: "Open the download page and tap \"Download APK.\" The file will save to your device's Downloads folder.",
            },
            {
              title: 'Open the downloaded file',
              body: 'Open your notification shade or file manager and tap the downloaded Dextro Play APK file.',
            },
            {
              title: 'Allow installs from this source',
              body: "If this is your first time installing an app outside the Play Store, Android will show a prompt asking to allow installs from your browser or file manager. Tap Settings, enable \"Allow from this source,\" then go back.",
            },
            {
              title: 'Install the app',
              body: 'Tap Install and wait for the process to finish. This usually takes a few seconds.',
            },
            {
              title: 'Open Dextro Play',
              body: 'Tap Open from the install screen, or find Dextro Play in your app drawer.',
            },
          ].map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red/10 font-mono text-sm font-bold text-red">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="my-4">
          <AdUnit slot="8888888888" />
        </div>

        <h2 id="verify" className="mt-8 font-display text-2xl font-bold text-ink">Verifying the download</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Before installing, you can confirm the file wasn't corrupted or altered by comparing its
          SHA-256 checksum against the one listed on the download page. See our{' '}
          <span className="text-ink">APK verification guide</span> for the exact steps on Android
          and desktop.
        </p>

        <h2 id="faq" className="mt-12 font-display text-2xl font-bold text-ink">FAQ</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-display text-base font-bold text-ink">{faq.question}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-cream p-6 text-center">
          <p className="font-display text-lg font-bold text-ink">Ready to install?</p>
          <Link href="/download" className="btn-primary mt-4 inline-flex">
            Download Dextro Play APK
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
