import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Dextro Play uses cookies and similar technologies when you visit or use our website.',
  alternates: { canonical: '/cookie-policy' },
}

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="August 30, 2026" crumbName="Cookie Policy" crumbHref="/cookie-policy">
      <p>Welcome to Dextro Play.</p>
      <p>
        This Cookie Policy explains how Dextro Play uses cookies and similar technologies when you
        visit or use our website. By continuing to use our website, you acknowledge that cookies
        and similar technologies may be used as described in this policy.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files that are stored on your device when you visit a website. They
        allow websites to remember certain information about your visit and help provide a better,
        more efficient, and secure browsing experience.
      </p>
      <p>
        Cookies may be temporary or remain on your device for a certain period of time, depending
        on their purpose.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>Dextro Play may use cookies and similar technologies for several purposes, including:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Operating and maintaining our website</li>
        <li>Improving website functionality and performance</li>
        <li>Understanding how visitors use our website</li>
        <li>Measuring website traffic and engagement</li>
        <li>Remembering certain preferences</li>
        <li>Improving user experience</li>
        <li>Maintaining website security</li>
        <li>Supporting advertising and measuring advertising performance</li>
      </ul>

      <h2>3. Types of Cookies We May Use</h2>

      <h2 className="!mt-4 !text-base">3.1 Essential Cookies</h2>
      <p>
        Essential cookies may be necessary for certain basic website functions, security features,
        and technical operations.
      </p>
      <p>
        These cookies help the website function properly and may not be disabled through certain
        website controls.
      </p>

      <h2 className="!mt-4 !text-base">3.2 Analytics and Performance Cookies</h2>
      <p>We may use analytics technologies to understand how visitors interact with Dextro Play.</p>
      <p>These technologies may collect information such as:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Pages visited</li>
        <li>Time spent on the website</li>
        <li>Browser and device information</li>
        <li>Referring websites</li>
        <li>General geographic information</li>
        <li>Website interactions</li>
      </ul>
      <p>
        This information helps us understand website performance and improve our content and
        services.
      </p>

      <h2 className="!mt-4 !text-base">3.3 Advertising Cookies</h2>
      <p>
        Dextro Play may display advertisements through third-party advertising providers,
        including <strong className="text-ink">Google AdSense</strong>.
      </p>
      <p>Advertising providers may use cookies and similar technologies to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Display advertisements</li>
        <li>Measure advertising performance</li>
        <li>Limit repeated advertisements</li>
        <li>Provide advertisements that may be more relevant to users</li>
      </ul>
      <p>
        Third-party advertising providers may collect information about your visits to this and
        other websites in accordance with their own policies.
      </p>

      <h2>4. Google Advertising Cookies</h2>
      <p>
        If Google AdSense is used on Dextro Play, Google and its advertising partners may use
        cookies or similar technologies to serve and measure advertisements.
      </p>
      <p>
        The use of advertising cookies may allow advertisements to be displayed based on a user's
        previous visits to websites or other online activity.
      </p>
      <p>
        Users may be able to manage personalized advertising preferences through{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google's advertising settings
        </a>{' '}
        and other available privacy controls.
      </p>

      <h2>5. Third-Party Cookies</h2>
      <p>Some cookies may be placed by third-party services that operate on or through our website.</p>
      <p>These may include services used for:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Advertising</li>
        <li>Analytics</li>
        <li>Security</li>
        <li>Website performance</li>
        <li>Embedded content</li>
        <li>Other website functionality</li>
      </ul>
      <p>
        Dextro Play does not control the cookies placed by third-party services. Their use of
        cookies and related technologies is governed by their respective privacy policies.
      </p>

      <h2>6. Managing Cookies</h2>
      <p>Most modern web browsers allow you to control, block, or delete cookies through their settings.</p>
      <p>You can generally:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>View stored cookies</li>
        <li>Delete existing cookies</li>
        <li>Block cookies</li>
        <li>Allow cookies only from certain websites</li>
        <li>Receive notifications before cookies are stored</li>
      </ul>
      <p>
        Please note that disabling certain cookies may affect the functionality, performance, or
        availability of some features of Dextro Play.
      </p>

      <h2>7. Browser Cookie Controls</h2>
      <p>You can manage cookies through the settings of your browser.</p>
      <p>
        The exact process differs depending on the browser and device you use. You may consult
        your browser's official help documentation for instructions on managing or deleting
        cookies.
      </p>

      <h2>8. Consent and Cookie Preferences</h2>
      <p>
        Where required by applicable law, Dextro Play may request your consent before using
        certain types of cookies or similar technologies.
      </p>
      <p>
        Where a cookie consent mechanism is available, you may be able to select or modify your
        preferences according to the options provided.
      </p>
      <p>
        Essential technologies necessary for the operation and security of the website may
        continue to function where permitted by applicable law.
      </p>

      <h2>9. Changes to This Cookie Policy</h2>
      <p>
        Dextro Play may update this Cookie Policy from time to time to reflect changes in our
        website, services, technologies, or applicable legal requirements.
      </p>
      <p>When we make changes, we will update the Effective Date at the beginning of this page.</p>
      <p>We encourage visitors to review this Cookie Policy periodically.</p>

      <h2>10. Contact Us</h2>
      <p>
        If you have any questions about this Cookie Policy or how cookies are used on Dextro Play,
        please contact us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
      <p>We will make reasonable efforts to respond to legitimate privacy and cookie-related inquiries.</p>

      <h2>11. Related Policies</h2>
      <p>For more information about how Dextro Play handles information, please review our:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li><a href="/privacy-policy">Privacy Policy</a></li>
        <li><a href="/disclaimer">Disclaimer</a></li>
        <li><a href="/terms">Terms and Conditions</a></li>
        <li><a href="/dmca">DMCA Policy</a></li>
        <li><a href="/user-content-disclaimer">User Content Disclaimer</a></li>
      </ul>
      <p>
        By continuing to use Dextro Play, you acknowledge the use of cookies and similar
        technologies as described in this Cookie Policy, subject to any applicable consent
        requirements.
      </p>
    </LegalPage>
  )
}
