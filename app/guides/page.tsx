import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import GuideCard from '@/components/GuideCard'
import AdUnit from '@/components/AdUnit'
import AdRail from '@/components/AdRail'
import ResponsiveAdsterraBanner from '@/components/ResponsiveAdsterraBanner'
import { guides } from '@/lib/guides'

export const metadata: Metadata = {
  title: 'Dextro Play Guides',
  description: 'Installation, update, and troubleshooting guides for Dextro Play.',
  alternates: { canonical: '/guides' },
}

export default function GuidesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Guides', href: '/guides' }]} />

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="min-w-0">
          <ResponsiveAdsterraBanner className="mb-10" />
          <span className="eyebrow">Help center</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Dextro Play Guides
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Step-by-step help for installing, updating, and troubleshooting Dextro Play.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          <AdUnit slot="7777777777" className="mt-14" label="End of guides list" />
        </main>
      </div>
    </>
  )
}
