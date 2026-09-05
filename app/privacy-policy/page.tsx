import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Dextro Play collects, uses, and protects information when you visit this site.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 1, 2026" crumbName="Privacy Policy" crumbHref="/privacy-policy">
      <p>
        This Privacy Policy explains what information this website (dextroplay.com) collects, how
        it's used, and the choices available to you. It covers the website only — for information
        about data collected by the Dextro Play Android app itself, refer to the app's own privacy
        disclosures.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect limited information automatically when you visit: pages viewed, approximate
        device/browser type, referral source, and download button interactions. We do not require
        account creation to browse or download from this site.
      </p>
      <p>
        If you use the contact form, we collect the name, email address, and message you provide,
        solely to respond to your inquiry.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>
        This site may use cookies for analytics and advertising, including cookies set by Google
        Analytics and Google AdSense. See our <a href="/cookie-policy">Cookie Policy</a> for details
        and how to manage your preferences.
      </p>

      <h2>Advertising</h2>
      <p>
        We may display advertisements served by Google AdSense. Google and its partners may use
        cookies to serve ads based on your prior visits to this or other websites. You can opt out
        of personalized advertising through{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google's Ads Settings
        </a>
        .
      </p>

      <h2>Analytics</h2>
      <p>
        We use analytics tools to understand how visitors use this site (pages viewed, session
        length, popular guides). This data is aggregated and not used to identify individuals.
      </p>

      <h2>How we use information</h2>
      <p>
        We use the information collected to operate and improve this site, respond to inquiries,
        measure which content is useful, and support legitimate advertising.
      </p>

      <h2>Data sharing</h2>
      <p>
        We do not sell personal information. We share limited data with service providers
        (analytics, advertising, hosting, email delivery) strictly to operate this site.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, or delete personal
        information we hold about you, and to opt out of certain data uses. Contact us using the
        details below to exercise these rights.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or use our{' '}
        <a href="/contact">contact page</a>.
      </p>
    </LegalPage>
  )
}
