import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'DMCA and Copyright Policy',
  description: 'How copyright owners can notify Dextro Play of material that infringes their copyright.',
  alternates: { canonical: '/dmca' },
}

export default function DmcaPage() {
  return (
    <LegalPage title="DMCA and Copyright Policy" updated="August 29, 2026" crumbName="DMCA" crumbHref="/dmca">
      <p>
        Dextro Play respects the intellectual property rights of copyright owners and expects
        users and contributors to do the same.
      </p>
      <p>
        This Copyright and DMCA Policy explains how copyright owners can notify us if they believe
        that material available through Dextro Play infringes their copyright.
      </p>

      <h2>1. Respect for Copyright</h2>
      <p>
        Dextro Play does not intend to infringe the copyrights, trademarks, or other intellectual
        property rights of third parties.
      </p>
      <p>
        Certain content published on our website may reference third-party applications, services,
        sports events, brands, websites, or other copyrighted material for informational purposes.
      </p>
      <p>All third-party intellectual property remains the property of its respective owner.</p>

      <h2>2. Copyright Infringement Notification</h2>
      <p>
        If you are a copyright owner or an authorized representative and believe that material
        available on Dextro Play infringes your copyrighted work, you may contact us with a written
        copyright complaint.
      </p>
      <p>To help us process your request, please provide:</p>
      <ol className="list-decimal space-y-1 pl-5">
        <li>Identification of the copyrighted work that you claim has been infringed.</li>
        <li>Identification of the specific material or page that you believe contains the infringing material.</li>
        <li>The URL or other information sufficient for us to locate the material.</li>
        <li>Your name and contact information, including an email address.</li>
        <li>A statement that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or applicable law.</li>
        <li>A statement that the information in your notice is accurate.</li>
        <li>A statement that you are the copyright owner or authorized to act on behalf of the copyright owner.</li>
        <li>An electronic or physical signature of the copyright owner or authorized representative.</li>
      </ol>

      <h2>3. Submit a Copyright Notice</h2>
      <p>
        Copyright complaints may be submitted to{' '}
        <a href={`mailto:${siteConfig.dmcaEmail}`}>{siteConfig.dmcaEmail}</a>.
      </p>
      <p>Please include <strong>"DMCA Notice"</strong> in the subject line of your email.</p>

      <h2>4. Review and Response</h2>
      <p>
        After receiving a sufficiently detailed copyright complaint, we may review the reported
        material and take appropriate action where warranted.
      </p>
      <p>Depending on the circumstances, actions may include:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Removing or disabling access to the reported material</li>
        <li>Removing a link or reference</li>
        <li>Contacting the relevant contributor</li>
        <li>Requesting additional information</li>
        <li>Taking other appropriate measures</li>
      </ul>
      <p>We reserve the right to request additional information when necessary to evaluate a copyright complaint.</p>

      <h2>5. Counter-Notification</h2>
      <p>
        If material has been removed or access has been restricted because of a copyright
        complaint and you believe the removal was made in error, you may contact us with
        information explaining why you believe the material should be restored.
      </p>
      <p>Any counter-notification will be reviewed in accordance with applicable law.</p>

      <h2>6. Repeat Infringers</h2>
      <p>
        Where applicable, Dextro Play may restrict or terminate access for users or contributors
        who repeatedly submit content that infringes third-party intellectual property rights.
      </p>

      <h2>7. False or Abusive Notices</h2>
      <p>Copyright complaints should only be submitted by copyright owners or authorized representatives.</p>
      <p>Submitting knowingly false, misleading, or abusive copyright claims may have legal consequences.</p>

      <h2>8. Third-Party Content</h2>
      <p>Dextro Play may contain links or references to third-party websites and services.</p>
      <p>
        We do not necessarily host or control content available on external websites. If your
        complaint concerns material hosted by a third party, you may also need to contact the
        relevant website, hosting provider, or service operator directly.
      </p>

      <h2>9. Policy Updates</h2>
      <p>
        Dextro Play may update this DMCA and Copyright Policy from time to time. Any changes will
        become effective when posted on this page.
      </p>

      <h2>10. Contact</h2>
      <p>
        For copyright-related matters, please contact{' '}
        <a href={`mailto:${siteConfig.dmcaEmail}`}>{siteConfig.dmcaEmail}</a>.
      </p>
      <p>
        We take legitimate copyright concerns seriously and will review properly submitted notices
        in accordance with applicable law.
      </p>
    </LegalPage>
  )
}
