import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import FaqAccordion from '@/components/FaqAccordion'
import AdUnit from '@/components/AdUnit'
import AdRail from '@/components/AdRail'
import ResponsiveAdsterraBanner from '@/components/ResponsiveAdsterraBanner'
import { getFaqs } from '@/lib/faqs'
import { faqJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers to common questions about downloading, installing, updating, and troubleshooting Dextro Play.',
  alternates: { canonical: '/faq' },
}

export default async function FaqPage() {
  const faqs = await getFaqs()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'FAQ', href: '/faq' }]} />

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="min-w-0 max-w-3xl">
          <ResponsiveAdsterraBanner className="mb-10" />
          <span className="eyebrow">Support</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Can't find your answer here? Visit our{' '}
            <a href="/guides" className="text-ink underline underline-offset-2 hover:text-red">
              guides
            </a>{' '}
            or reach out on the{' '}
            <a href="/contact" className="text-ink underline underline-offset-2 hover:text-red">
              contact page
            </a>
            .
          </p>

          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>

          <AdUnit slot="1010101010" className="mt-14" label="End of FAQ" />
        </main>
      </div>
    </>
  )
}
