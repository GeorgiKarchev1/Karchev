import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | KarchX',
  description: 'Terms and conditions for using KarchX services — web development, content production and automations.',
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#2d232e]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-sm font-medium text-[#534b52] hover:underline">
            ← Back to home
          </Link>
          <Link href="/politiki/obshti-uslovia" className="text-sm font-medium text-[#534b52] hover:underline">
            Български →
          </Link>
        </div>

        <h1 className="font-heading font-black text-4xl mb-2 tracking-tight">Terms of Service</h1>
        <p className="text-sm text-[#2d232e]/60 mb-12">Last updated: April 25, 2026</p>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <p>
            These Terms of Service govern access to and use of the website{' '}
            <strong>https://www.karchx.com</strong> ("Site") and all services offered through it,
            provided by <strong>Georgi Karchev</strong>, an individual operating through the Site
            ("we", "us", "KarchX").
          </p>
          <p>
            By using the Site, submitting an inquiry, requesting a service, or making a payment,
            you confirm that you have read, understood, and agree to these Terms. If you do not
            agree, please do not use the Site or Services.
          </p>
          <p className="text-sm text-[#2d232e]/60">
            Related policies:{' '}
            <Link href="/policies/privacy-policy" className="underline">Privacy Policy</Link>
            {' · '}
            <Link href="/policies/cookies" className="underline">Cookie Policy</Link>
          </p>

          <Section title="1. Definitions">
            <dl className="space-y-2">
              <dt className="font-semibold">Client / You</dt>
              <dd className="ml-4">A person who uses the Site and/or requests Services.</dd>
              <dt className="font-semibold">Services</dt>
              <dd className="ml-4">Web development, content production (video, photography, social media), chatbots &amp; automations, and related digital services.</dd>
              <dt className="font-semibold">Project</dt>
              <dd className="ml-4">A specific service request/order with an agreed scope, price, and timeline.</dd>
              <dt className="font-semibold">Digital Deliverable</dt>
              <dd className="ml-4">Files, code, design, configurations, video content, documentation, accesses and/or work performed within the scope of the Services.</dd>
            </dl>
          </Section>

          <Section title="2. Site Access and Acceptable Use">
            <p>You may only use the Site for lawful purposes and in a manner that does not infringe the rights of third parties.</p>
            <p className="font-semibold mt-3">The following are prohibited:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Attempting unauthorized access to systems, accounts, or data;</li>
              <li>Uploading or distributing viruses or malicious code;</li>
              <li>Automated data extraction (scraping) unless expressly permitted;</li>
              <li>Using the Site in a way that may compromise its security or disrupt its operation.</li>
            </ul>
          </Section>

          <Section title="3. Inquiries, Quotes and Contract Formation">
            <p>Information on the Site is for informational purposes only and does not constitute a binding offer unless explicitly stated otherwise.</p>
            <p className="mt-3">A service contract is considered concluded when:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>We confirm in writing (by email or other written channel) the scope, price, and timeline; and/or</li>
              <li>A payment has been made (in full or in part).</li>
            </ul>
            <p className="mt-3">
              To perform the Services, we may require information and access credentials (domain,
              hosting, CMS, social profiles, admin panels). The Client is responsible for providing
              accurate data and having the right to share those credentials.
            </p>
          </Section>

          <Section title="4. Pricing and Payments">
            <ul className="list-disc ml-6 space-y-1">
              <li>Prices are listed in BGN (Bulgarian lev) and/or EUR (euro).</li>
              <li>We reserve the right to change prices at any time; the conditions confirmed in writing apply to a specific Project.</li>
              <li>Payment is made via agreed method. We may require an upfront payment or phased payments.</li>
              <li>We do not store payment card data.</li>
            </ul>
          </Section>

          <Section title="5. Workflow, Timelines and Acceptance">
            <ul className="list-disc ml-6 space-y-1">
              <li>Timelines begin after receipt of payment and after the Client provides all required materials and access.</li>
              <li>If the Client delays materials, access, or feedback, timelines are extended accordingly.</li>
              <li>
                After delivery, the Client has <strong>5 business days</strong> to request revisions
                in writing or confirm acceptance. If no response is received, the deliverable is
                considered accepted.
              </li>
            </ul>
          </Section>

          <Section title="6. Revisions and Scope Changes">
            <p>Revisions are performed within the agreed scope. Requests outside the scope (additional pages, features, videos, posts) are considered additional services and require separate confirmation and payment.</p>
          </Section>

          <Section title="7. Client Responsibilities">
            <p>The Client agrees to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Provide accurate and up-to-date contact information;</li>
              <li>Ensure rights to use any texts, images, logos, videos, and other content provided to KarchX;</li>
              <li>Provide timely feedback, materials, and access;</li>
              <li>Keep credentials and passwords confidential.</li>
            </ul>
            <p className="mt-3">The Client is responsible for the legality of all provided content.</p>
          </Section>

          <Section title="8. Intellectual Property">
            <ul className="list-disc ml-6 space-y-1">
              <li>The Site's content is owned by KarchX or used with permission.</li>
              <li>Until full payment is received, all rights to the digital deliverable remain with KarchX.</li>
              <li>After full payment, the Client receives the right to use the deliverable for their business.</li>
              <li>We may use the project as a portfolio reference unless the Client explicitly objects in writing before publication.</li>
            </ul>
          </Section>

          <Section title="9. Third Parties and External Services">
            <p>
              Services may require third-party tools (hosting, domain registrars, social platforms,
              payment operators, AI tools, etc.). We are not responsible for interruptions, changes,
              or policies of third parties. Licenses and fees for third-party tools are the Client's
              responsibility unless agreed otherwise in writing.
            </p>
          </Section>

          <Section title="10. Privacy and Personal Data">
            <p>
              Processing of personal data is governed by our{' '}
              <Link href="/policies/privacy-policy" className="underline font-medium">Privacy Policy</Link>.
            </p>
          </Section>

          <Section title="11. Disclaimer of Warranties">
            <ul className="list-disc ml-6 space-y-1">
              <li>Services are provided "as is" to the maximum extent permitted by law.</li>
              <li>We do not guarantee specific financial results, traffic, or search engine rankings — these depend on factors outside our control.</li>
              <li>We do not guarantee uninterrupted operation of third-party services.</li>
            </ul>
          </Section>

          <Section title="12. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, we are not liable for indirect or consequential
              damages. Our total liability for a specific Project is limited to the amount actually
              paid by the Client for that service.
            </p>
          </Section>

          <Section title="13. Termination">
            <ul className="list-disc ml-6 space-y-1">
              <li>We may terminate or restrict access to the Site in case of abuse or violation of these Terms.</li>
              <li>If the Client cancels a project after work has begun, the Client owes payment for work performed to date.</li>
              <li>If we terminate the project through our fault, we will refund amounts for work not performed.</li>
            </ul>
          </Section>

          <Section title="14. Cancellations and Refunds">
            <p>As we provide digital services, refunds are only permitted when:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>We have explicitly confirmed a refund for a specific case; or</li>
              <li>We are unable to deliver the agreed service through our fault.</li>
            </ul>
            <p className="mt-3">
              Work already started (analysis, planning, design, filming, editing, development,
              communication) constitutes a rendered service and is non-refundable, unless required
              by law.
            </p>
          </Section>

          <Section title="15. Changes to These Terms">
            <p>We reserve the right to update these Terms by publishing a new version on the Site. Changes take effect from the date of publication.</p>
          </Section>

          <Section title="16. Governing Law and Disputes">
            <p>
              These Terms are governed by the laws of the Republic of Bulgaria. All disputes shall
              be resolved by mutual agreement; if not possible, by the competent Bulgarian court.
            </p>
          </Section>

          <Section title="17. Contact">
            <ul className="space-y-1">
              <li><strong>Email:</strong> georgikarchev5@gmail.com</li>
              <li><strong>Website:</strong> https://www.karchx.com</li>
            </ul>
          </Section>

        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-heading font-bold text-xl mb-4 text-[#2d232e]">{title}</h2>
      <div className="text-[#2d232e]/80 space-y-3">{children}</div>
    </section>
  )
}
