import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import DownloadCard from '@/components/DownloadCard'
import AdUnit from '@/components/AdUnit'
import AdRail from '@/components/AdRail'
import { getLatestRelease } from '@/lib/releases'

export const metadata: Metadata = {
  title: 'Dextro Play App Overview',
  description: 'What Dextro Play is, who it is for, and how the app works — an overview of the Android sports streaming app.',
  alternates: { canonical: '/app' },
}

export default async function AppPage() {
  const release = await getLatestRelease()

  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'App', href: '/app' }]} />

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="min-w-0">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <div>
              <span className="eyebrow">App overview</span>
              <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
                What is Dextro Play?
              </h1>
              <p className="mt-5 text-base leading-relaxed text-ink-soft">
                Dextro Play is an Android application for streaming sports content. It's organized
                around a simple idea: open the app, pick a channel, and start watching, with a
                player that stays out of the way.
              </p>

              <h2 className="mt-10 font-display text-xl font-bold text-ink">Who it's for</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Dextro Play is aimed at people who want quick access to sports streams on their
                phone without a cluttered interface — cricket, football, tennis, motorsport, and
                combat sports viewers who just want the app to get out of the way of the stream.
              </p>

              <h2 className="mt-10 font-display text-xl font-bold text-ink">How it works</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Install the APK, open the app, and choose a channel from the home screen. The
                built-in player supports fullscreen playback, picture-in-picture, aspect ratio
                switching, and screen lock so playback controls don't get triggered accidentally.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/features" className="btn-secondary">
                  See all features
                </Link>
                <Link href="/guides/how-to-install-dextro-play" className="btn-secondary">
                  Installation guide
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md lg:max-w-none">
              <DownloadCard release={release} />
            </div>
          </div>

          <AdUnit slot="4444444444" className="mt-14" label="After app overview" />
        </main>
      </div>
    </>
  )
}
