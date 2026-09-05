import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import ContactForm from '@/components/ContactForm'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "We'd love to hear from you — questions, feedback, corrections, or copyright concerns about Dextro Play.",
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact', href: '/contact' }]} />
      <section className="container-page max-w-3xl py-14 sm:py-20">
        <span className="eyebrow">Get in touch</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-sm font-semibold text-ink">We'd Love to Hear From You</p>

        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          Thank you for visiting Dextro Play. If you have a question, suggestion, feedback,
          correction, copyright concern, technical issue related to our website, or any other
          inquiry, you can contact us using the information below.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Get in Touch</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          For general questions and website-related inquiries, please contact us at{' '}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-ink underline underline-offset-2 hover:text-red">
            {siteConfig.contactEmail}
          </a>
          . We try to review and respond to legitimate inquiries as soon as reasonably possible.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">What You Can Contact Us About</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">You can contact Dextro Play regarding:</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base text-ink-soft">
          <li>General website inquiries</li>
          <li>Content corrections or suggestions</li>
          <li>Feedback about our website</li>
          <li>Questions about published articles</li>
          <li>Reporting broken or incorrect links</li>
          <li>Copyright and intellectual property concerns</li>
          <li>User-generated content reports</li>
          <li>Privacy-related requests</li>
          <li>Business or partnership inquiries</li>
          <li>Other website-related matters</li>
        </ul>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Copyright and DMCA Requests</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          If you are a copyright owner or authorized representative and believe that material
          available through Dextro Play infringes your copyright, please provide sufficient
          information for us to identify and review the material.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          For copyright-related matters, please contact{' '}
          <a href={`mailto:${siteConfig.dmcaEmail}`} className="text-ink underline underline-offset-2 hover:text-red">
            {siteConfig.dmcaEmail}
          </a>{' '}
          and include <strong className="text-ink">"Copyright / DMCA Notice"</strong> in the
          subject line so that your request can be directed appropriately.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Privacy Requests</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          If you have questions about our Privacy Policy or wish to make a privacy-related request
          concerning information that we may have collected, please contact{' '}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-ink underline underline-offset-2 hover:text-red">
            {siteConfig.contactEmail}
          </a>
          . We will review legitimate requests and respond within a reasonable timeframe, subject
          to applicable law.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Before Contacting Us</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          For questions regarding a third-party application, website, service, or product
          mentioned on Dextro Play, please understand that we may not own or operate that
          third-party service.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Where appropriate, we recommend contacting the official developer, owner, or service
          provider directly for matters concerning their product or service.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Contact Information</h2>
        <ul className="mt-3 space-y-1.5 text-base text-ink-soft">
          <li><strong className="text-ink">Website:</strong> Dextro Play</li>
          <li>
            <strong className="text-ink">General Email:</strong>{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-ink underline underline-offset-2 hover:text-red">
              {siteConfig.contactEmail}
            </a>
          </li>
          <li>
            <strong className="text-ink">Copyright / Legal Email:</strong>{' '}
            <a href={`mailto:${siteConfig.dmcaEmail}`} className="text-ink underline underline-offset-2 hover:text-red">
              {siteConfig.dmcaEmail}
            </a>
          </li>
        </ul>
        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          We appreciate your feedback and thank you for being part of the Dextro Play community.
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>
      </section>
    </>
  )
}
