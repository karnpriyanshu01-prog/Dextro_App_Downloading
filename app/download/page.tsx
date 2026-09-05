import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import DownloadCard from '@/components/DownloadCard'
import AdUnit from '@/components/AdUnit'
import AdRail from '@/components/AdRail'
import NativeAd from '@/components/NativeAd'
import { getLatestRelease } from '@/lib/releases'
import { softwareApplicationJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { siteConfig } from '@/lib/site.config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Download Dextro Play APK',
  description: 'Download the official Dextro Play APK for Android — verified file size, checksum, and release notes included.',
  alternates: { canonical: '/download' },
}

export default async function DownloadPage() {
  const release = await getLatestRelease()

  const jsonLd = softwareApplicationJsonLd({
    version: release.version,
    releaseDate: release.releaseDate,
    minAndroidVersion: release.minAndroidVersion,
  })
  const crumbsLd = breadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Download', url: `${siteConfig.url}/download` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }} />
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Download', href: '/download' }]} />

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="mx-auto min-w-0 max-w-xl">
          <span className="eyebrow">Official release</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Download Dextro Play APK
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            This is the only official source for the Dextro Play APK. Every release listed here
            is verified and published directly by the Dextro Play team.
          </p>

          <div className="mt-8">
            <DownloadCard release={release} />
          </div>

          <AdUnit slot="3333333333" className="my-10" label="Before install instructions" />

          <NativeAd className="my-10" />

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
            <h2 className="font-display text-lg font-bold text-ink">Before you install</h2>
            <p>
              Android will only install apps from outside the Play Store if you allow it for your
              browser or file manager. This is a normal Android setting, not something specific to
              Dextro Play — our{' '}
              <Link href="/guides/how-to-install-dextro-play" className="text-ink underline underline-offset-2 hover:text-red">
                installation guide
              </Link>{' '}
              shows exactly where to find it.
            </p>
            <p>
              After downloading, compare the SHA-256 checksum shown above against your downloaded
              file to confirm it hasn't been modified or corrupted in transit.
            </p>
          </div>
        </main>
      </div>
    </>
  )
}
