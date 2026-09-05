import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Dextro Play — an independent platform for sports, entertainment, app, and technology information.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about' }]} />
      <section className="container-page max-w-3xl py-14 sm:py-20">
        <span className="eyebrow">About</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">About Us</h1>
        <p className="mt-3 text-sm font-semibold text-ink">Welcome to Dextro Play</p>

        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          Dextro Play is an independent digital platform created to provide useful,
          easy-to-understand, and regularly updated information about sports, entertainment,
          applications, technology, and related digital content.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Our goal is simple: <strong className="text-ink">to make useful information easier to
          discover and understand.</strong>
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">What We Do</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          At Dextro Play, we publish informational content designed to help visitors find relevant
          information about applications, sports-related topics, technology, digital services, and
          other subjects of interest.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">Our content may include:</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base text-ink-soft">
          <li>Application information and guides</li>
          <li>Sports-related updates and information</li>
          <li>Technology guides and tutorials</li>
          <li>App features and general information</li>
          <li>How-to guides</li>
          <li>Informational articles</li>
          <li>General digital tips and resources</li>
        </ul>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          We aim to keep our content clear, useful, and accessible to a broad audience.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Our Mission</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Our mission is to create a reliable and user-friendly information platform where visitors
          can quickly find useful content without unnecessary complexity.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">We focus on providing content that is:</p>
        <ul className="mt-3 space-y-2 text-base text-ink-soft">
          <li><strong className="text-ink">Useful</strong> — We try to publish information that provides genuine value to visitors.</li>
          <li><strong className="text-ink">Clear</strong> — We explain topics in simple and understandable language.</li>
          <li><strong className="text-ink">Updated</strong> — We make reasonable efforts to review and update information when necessary.</li>
          <li><strong className="text-ink">Responsible</strong> — We respect intellectual property rights and applicable laws.</li>
        </ul>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Independent Platform</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Dextro Play operates independently and is not automatically affiliated with, sponsored
          by, or endorsed by third-party applications, companies, sports organizations, teams,
          leagues, broadcasters, or brands mentioned on our website unless explicitly stated.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Any third-party names, trademarks, logos, or applications mentioned on Dextro Play belong
          to their respective owners.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Our references to third-party products, services, applications, or websites are generally
          provided for informational purposes.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Our Approach to Content</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          We make reasonable efforts to provide useful and accurate information. However,
          information related to third-party applications, websites, services, schedules,
          features, availability, and other external resources can change at any time.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          For this reason, visitors should independently verify important information with the
          relevant official source before making decisions based on it.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          We do not intentionally publish misleading information or encourage users to violate
          applicable laws or the rights of others.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Third-Party Websites</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Dextro Play may contain links to external websites or services.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          These websites are operated independently from Dextro Play, and we do not control their
          content, availability, security, or privacy practices.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Users should review the policies and terms of any third-party website before using its
          services.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Copyright and Intellectual Property</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          We respect the intellectual property rights of creators, publishers, developers,
          broadcasters, and other rights holders.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          If you believe that any content published on Dextro Play infringes your copyright or
          other intellectual property rights, please contact us with the relevant information so
          that we can review your concern.
        </p>

        <h2 className="mt-10 font-display text-xl font-bold text-ink">Get in Touch</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          We value feedback from our visitors. If you have a question, suggestion, correction,
          copyright concern, or other inquiry regarding Dextro Play, please contact our team
          through our{' '}
          <a href="/contact" className="text-ink underline underline-offset-2 hover:text-red">
            Contact Us
          </a>{' '}
          page or by email at{' '}
          <a href={`mailto:${siteConfig.contactEmail}`} className="text-ink underline underline-offset-2 hover:text-red">
            {siteConfig.contactEmail}
          </a>
          .
        </p>
        <p className="mt-6 text-base font-semibold text-ink">Thank you for visiting Dextro Play.</p>
      </section>
    </>
  )
}
