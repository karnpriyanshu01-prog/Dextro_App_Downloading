import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'User Content Disclaimer',
  description: 'Responsibilities of users and Dextro Play regarding user-submitted content such as comments and reviews.',
  alternates: { canonical: '/user-content-disclaimer' },
}

export default function UserContentDisclaimerPage() {
  return (
    <LegalPage
      title="User Content Disclaimer"
      updated="August 29, 2026"
      crumbName="User Content Disclaimer"
      crumbHref="/user-content-disclaimer"
    >
      <p>Welcome to Dextro Play.</p>
      <p>
        Certain areas of Dextro Play may allow users to submit comments, reviews, feedback,
        images, links, posts, or other material.
      </p>
      <p>
        This User Content Disclaimer explains the responsibilities of users and Dextro Play
        regarding user-submitted content.
      </p>

      <h2>1. Responsibility for User-Generated Content</h2>
      <p>
        Users are solely responsible for any content they submit, upload, post, or otherwise make
        available through Dextro Play.
      </p>
      <p>User-generated content may include:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Comments</li>
        <li>Reviews</li>
        <li>Images</li>
        <li>Posts</li>
        <li>Feedback</li>
        <li>Links</li>
        <li>Recommendations</li>
        <li>Other user-submitted materials</li>
      </ul>
      <p>
        Dextro Play does not necessarily endorse or agree with opinions expressed in
        user-generated content.
      </p>

      <h2>2. User Representations</h2>
      <p>By submitting content to Dextro Play, you represent and warrant that:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>You have the necessary rights and permissions to submit the content.</li>
        <li>The content does not infringe copyright, trademark, privacy, publicity, or other rights of any third party.</li>
        <li>The content is not intentionally misleading or fraudulent.</li>
        <li>The content does not contain unlawful, threatening, defamatory, obscene, or abusive material.</li>
        <li>The content does not contain malicious software, harmful code, or deceptive links.</li>
        <li>The content does not promote illegal activities.</li>
      </ul>

      <h2>3. Content Moderation</h2>
      <p>Dextro Play may, but is not obligated to, review user-generated content.</p>
      <p>We reserve the right to remove, edit, restrict, or disable access to content that we reasonably believe:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Violates these policies</li>
        <li>Violates applicable law</li>
        <li>Infringes third-party rights</li>
        <li>Contains harmful or malicious material</li>
        <li>Is spam or misleading</li>
        <li>Is abusive or inappropriate</li>
        <li>Creates security or legal risks</li>
      </ul>
      <p>We may take action without prior notice where reasonably necessary.</p>

      <h2>4. Reporting User Content</h2>
      <p>
        If you believe that content submitted by a user violates your rights, infringes copyright,
        contains unlawful material, or otherwise violates our policies, you may report it to us.
      </p>
      <p>Please provide:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>The URL or location of the content</li>
        <li>A description of the issue</li>
        <li>Relevant supporting information</li>
        <li>Your contact information</li>
      </ul>
      <p>
        Reports can be submitted to{' '}
        <a href={`mailto:${siteConfig.dmcaEmail}`}>{siteConfig.dmcaEmail}</a>.
      </p>

      <h2>5. Copyright and Third-Party Rights</h2>
      <p>Users must not submit content that they do not have permission to use.</p>
      <p>
        If we receive a valid copyright or intellectual property complaint concerning
        user-generated content, we may remove or restrict the reported content in accordance with
        applicable law and our policies.
      </p>

      <h2>6. No Endorsement</h2>
      <p>
        The publication of user-generated content does not mean that Dextro Play endorses,
        verifies, or guarantees the accuracy of that content.
      </p>
      <p>
        Users should independently evaluate opinions, recommendations, claims, links, and
        information provided by other users.
      </p>

      <h2>7. No Liability for User Content</h2>
      <p>
        To the maximum extent permitted by applicable law, Dextro Play is not responsible for
        user-generated content submitted by third parties.
      </p>
      <p>
        We are not responsible for losses, disputes, claims, or damages arising from interactions
        between users or from reliance on user-submitted content.
      </p>

      <h2>8. User Restrictions</h2>
      <p>Users must not use Dextro Play's user-content features to:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Upload copyrighted material without authorization</li>
        <li>Distribute malware</li>
        <li>Publish personal information of others without permission</li>
        <li>Harass or threaten others</li>
        <li>Publish fraudulent or misleading material</li>
        <li>Promote illegal activities</li>
        <li>Spam other users</li>
        <li>Attempt to manipulate website functionality</li>
      </ul>

      <h2>9. Suspension and Bans</h2>
      <p>
        We reserve the right to restrict, suspend, or permanently remove a user's ability to
        submit content if the user repeatedly violates our policies or applicable law.
      </p>

      <h2>10. Changes to This Disclaimer</h2>
      <p>Dextro Play may modify this User Content Disclaimer from time to time.</p>
      <p>
        Any changes will become effective when posted on this page. Continued use of user-content
        features after changes are posted constitutes acceptance of the updated policy.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        For questions, complaints, or reports concerning user-generated content, please contact{' '}
        <a href={`mailto:${siteConfig.dmcaEmail}`}>{siteConfig.dmcaEmail}</a>.
      </p>
    </LegalPage>
  )
}
