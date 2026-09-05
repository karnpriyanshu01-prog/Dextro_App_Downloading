import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions governing access to and use of the Dextro Play website.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" updated="August 29, 2026" crumbName="Terms" crumbHref="/terms">
      <p>Welcome to Dextro Play.</p>
      <p>These Terms and Conditions govern your access to and use of the Dextro Play website and its content.</p>
      <p>
        By accessing or using our website, you agree to be bound by these Terms and Conditions. If
        you do not agree with any part of these terms, please discontinue use of the website.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing Dextro Play, you confirm that you have read, understood, and agreed to these
        Terms and Conditions, along with our Privacy Policy, Disclaimer, DMCA Policy, and other
        applicable policies.
      </p>

      <h2>2. Use of the Website</h2>
      <p>You agree to use Dextro Play only for lawful purposes.</p>
      <p>You must not use the website to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Violate any applicable law or regulation</li>
        <li>Infringe intellectual property rights</li>
        <li>Distribute malicious software</li>
        <li>Attempt unauthorized access to our systems</li>
        <li>Interfere with website operation</li>
        <li>Conduct fraudulent activities</li>
        <li>Abuse or harass other users</li>
        <li>Upload unlawful or harmful content</li>
        <li>Use the website for unauthorized commercial purposes</li>
      </ul>

      <h2>3. Website Content</h2>
      <p>
        Dextro Play may publish articles, guides, images, graphics, application information,
        sports-related information, links, and other content.
      </p>
      <p>
        We make reasonable efforts to maintain accurate information but do not guarantee that all
        content will always be complete, accurate, or current.
      </p>
      <p>Content may be changed, updated, or removed without prior notice.</p>

      <h2>4. Intellectual Property</h2>
      <p>
        Unless otherwise stated, original content created and published by Dextro Play, including
        text, graphics, design elements, and website materials, is protected by applicable
        intellectual property laws.
      </p>
      <p>You may access the content for personal, non-commercial purposes.</p>
      <p>You must not, without prior written permission:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Republish substantial portions of our content</li>
        <li>Copy or reproduce our original materials</li>
        <li>Sell or redistribute our content</li>
        <li>Create derivative versions of our website content</li>
        <li>Remove copyright or ownership notices</li>
      </ul>
      <p>Third-party trademarks and copyrighted materials remain the property of their respective owners.</p>

      <h2>5. Third-Party Websites and Services</h2>
      <p>Dextro Play may contain links to websites or services operated by third parties.</p>
      <p>
        We do not control these websites and are not responsible for their content, availability,
        security, privacy policies, or practices.
      </p>
      <p>
        Your use of third-party websites is subject to the terms and policies established by those
        third parties.
      </p>

      <h2>6. User-Generated Content</h2>
      <p>
        Certain sections of Dextro Play may allow users to submit comments, reviews, feedback,
        images, or other content.
      </p>
      <p>By submitting content, you confirm that:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>You have the necessary rights to submit the content.</li>
        <li>Your content does not infringe another person's intellectual property rights.</li>
        <li>Your content does not contain unlawful, abusive, defamatory, or harmful material.</li>
        <li>Your content does not contain malicious code or harmful links.</li>
      </ul>
      <p>
        We reserve the right to remove or restrict any user-generated content that violates these
        Terms or applicable law.
      </p>

      <h2>7. Prohibited Activities</h2>
      <p>Users must not attempt to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Gain unauthorized access to the website</li>
        <li>Circumvent security measures</li>
        <li>Introduce viruses or malicious code</li>
        <li>Scrape or harvest information in an abusive manner</li>
        <li>Disrupt website servers or infrastructure</li>
        <li>Impersonate another person or organization</li>
        <li>Use the website for unlawful purposes</li>
      </ul>
      <p>Violation of these rules may result in restriction or termination of access.</p>

      <h2>8. Disclaimer of Warranties</h2>
      <p>
        Dextro Play is provided on an "as is" and "as available" basis to the maximum extent
        permitted by law.
      </p>
      <p>
        We do not guarantee that the website will always be available, uninterrupted, secure, or
        free from errors.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Dextro Play shall not be liable for
        losses or damages arising from:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Use or inability to use the website</li>
        <li>Reliance on website content</li>
        <li>Third-party websites or services</li>
        <li>Third-party applications</li>
        <li>External links</li>
        <li>Technical interruptions</li>
        <li>Unauthorized access or security incidents beyond our reasonable control</li>
      </ul>
      <p>Nothing in these Terms excludes liability that cannot legally be excluded under applicable law.</p>

      <h2>10. Indemnification</h2>
      <p>
        To the extent permitted by applicable law, you agree to defend, indemnify, and hold
        harmless Dextro Play, its owners, operators, contributors, and affiliates from claims,
        damages, liabilities, costs, and expenses arising from your misuse of the website or
        violation of these Terms.
      </p>

      <h2>11. Changes to These Terms</h2>
      <p>We may modify these Terms and Conditions at any time.</p>
      <p>
        Updated terms will be posted on this page with a revised Effective Date. Your continued use
        of Dextro Play after changes are posted constitutes acceptance of the updated terms.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        For questions regarding these Terms and Conditions, contact us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
      <p>If you do not agree with these Terms and Conditions, please stop using Dextro Play.</p>
    </LegalPage>
  )
}
