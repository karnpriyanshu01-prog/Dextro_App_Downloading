import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Legal disclaimer for the Dextro Play website — general information, third-party services, and liability.',
  alternates: { canonical: '/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="August 29, 2026" crumbName="Disclaimer" crumbHref="/disclaimer">
      <p>
        Welcome to Dextro Play. The information provided on this website is published for general
        informational, educational, and entertainment purposes. By accessing and using Dextro
        Play, you acknowledge and agree to the terms of this Disclaimer.
      </p>

      <h2>1. General Information</h2>
      <p>
        Dextro Play provides information, guides, articles, updates, and other website content
        related to sports, entertainment, applications, technology, and other topics.
      </p>
      <p>
        While we make reasonable efforts to keep the information on our website accurate and up to
        date, we do not guarantee that all information is complete, accurate, current, or
        error-free.
      </p>
      <p>
        Information published on Dextro Play should not be considered professional, legal,
        financial, technical, or other specialized advice.
      </p>

      <h2>2. Independent Platform</h2>
      <p>
        Dextro Play is an independent website and is not necessarily affiliated with, sponsored
        by, endorsed by, or officially connected with any sports league, sports organization,
        broadcaster, application developer, software company, team, player, or other third-party
        entity mentioned on this website unless explicitly stated otherwise.
      </p>
      <p>
        References to third-party brands, applications, services, organizations, or products are
        provided for identification, informational, or educational purposes.
      </p>
      <p>All trademarks and brand names remain the property of their respective owners.</p>

      <h2>3. Third-Party Applications and Services</h2>
      <p>
        Dextro Play may provide information about third-party applications, websites, services, or
        software.
      </p>
      <p>We do not control third-party services and cannot guarantee their:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Availability</li>
        <li>Accuracy</li>
        <li>Security</li>
        <li>Reliability</li>
        <li>Legality</li>
        <li>Functionality</li>
        <li>Privacy practices</li>
      </ul>
      <p>
        Users should conduct their own research and review the terms, privacy policies, and
        applicable licenses of third-party services before using them.
      </p>

      <h2>4. Third-Party Links</h2>
      <p>Our website may contain links to external websites and services.</p>
      <p>
        These links are provided for convenience and informational purposes. Dextro Play does not
        necessarily endorse or guarantee any external website, service, product, or content.
      </p>
      <p>
        Once you leave our website, you are subject to the policies and terms of the external
        website you visit.
      </p>

      <h2>5. Copyright and Intellectual Property</h2>
      <p>Dextro Play respects the intellectual property rights of others.</p>
      <p>
        We do not intentionally claim ownership of third-party trademarks, logos, images, videos,
        or other copyrighted materials belonging to their respective owners.
      </p>
      <p>
        If you believe that material appearing on our website infringes your copyright or other
        intellectual property rights, please contact us with sufficient information so that we can
        review the matter.
      </p>

      <h2>6. User Responsibility</h2>
      <p>
        Users are responsible for how they use information, links, applications, and services
        referenced on Dextro Play.
      </p>
      <p>
        Users should ensure that their activities comply with all applicable laws and regulations
        in their jurisdiction.
      </p>
      <p>
        Dextro Play does not encourage copyright infringement, unlawful streaming, unauthorized
        distribution, fraud, abuse, or any other illegal activity.
      </p>

      <h2>7. No Guarantee</h2>
      <p>We make no guarantees regarding:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>The availability of the website</li>
        <li>The accuracy of information</li>
        <li>The availability of third-party services</li>
        <li>The security of external websites</li>
        <li>The performance of third-party applications</li>
        <li>The continued availability of any external link or resource</li>
      </ul>
      <p>Website content and external resources may change without notice.</p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Dextro Play and its owners, operators,
        contributors, and affiliates shall not be responsible for any direct, indirect, incidental,
        consequential, or other damages resulting from the use of our website or reliance on
        information provided through it.
      </p>
      <p>
        This limitation does not apply to liabilities that cannot legally be excluded or limited
        under applicable law.
      </p>

      <h2>9. Changes to This Disclaimer</h2>
      <p>Dextro Play reserves the right to modify, update, or amend this Disclaimer at any time.</p>
      <p>
        Changes become effective when posted on this page. Users are encouraged to review this page
        periodically.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have questions regarding this Disclaimer or any content published on Dextro Play,
        please contact{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
      <p>
        By using Dextro Play, you acknowledge that you have read and agreed to this Disclaimer.
      </p>
    </LegalPage>
  )
}
