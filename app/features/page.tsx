import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import FeatureGrid from '@/components/FeatureGrid'
import AdUnit from '@/components/AdUnit'
import AdRail from '@/components/AdRail'
import ResponsiveAdsterraBanner from '@/components/ResponsiveAdsterraBanner'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dextro Play Features',
  description: 'A complete breakdown of what Dextro Play actually offers — player controls, playback modes, and interface.',
  alternates: { canonical: '/features' },
}

export default function FeaturesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Features', href: '/features' }]} />

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="min-w-0">
          <ResponsiveAdsterraBanner className="mb-10" />
          <span className="eyebrow">Complete list</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Dextro Play Features
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Everything listed here exists in the current build of the app. If a feature is removed
            or changed in an update, this page is updated to match.
          </p>

          <div className="mt-12">
            <FeatureGrid />
          </div>

          <AdUnit slot="5555555555" className="my-14" label="After feature list" />

          <section className="card p-10 text-center">
            <h2 className="font-display text-2xl font-extrabold text-ink">Ready to try it?</h2>
            <p className="mt-3 text-muted">Get the current release from the download page.</p>
            <Link href="/download" className="btn-primary mt-6 inline-flex">
              Download Latest APK
            </Link>
          </section>
        </main>
      </div>
    </>
  )
}
