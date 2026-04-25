import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | KarchX',
  description: 'How KarchX collects, uses, and protects your personal data.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#2d232e]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-sm font-medium text-[#534b52] hover:underline">
            ← Back to home
          </Link>
          <Link href="/politiki/poveritelnost" className="text-sm font-medium text-[#534b52] hover:underline">
            Български →
          </Link>
        </div>

        <h1 className="font-heading font-black text-4xl mb-2 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-[#2d232e]/60 mb-12">Last updated: April 25, 2026</p>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <p>
            This Privacy Policy describes how <strong>KarchX</strong> (Georgi Karchev,{' '}
            <strong>https://karchev.bg</strong>) collects, uses, stores, and protects your personal
            data. We comply with Regulation (EU) 2016/679 (GDPR) and applicable Bulgarian law.
          </p>

          <Section title="1. Data Controller">
            <ul className="space-y-1">
              <li><strong>Controller:</strong> Georgi Karchev</li>
              <li><strong>Trading name:</strong> KarchX</li>
              <li><strong>Website:</strong> https://karchev.bg</li>
              <li><strong>Contact email:</strong> georgikarchev5@gmail.com</li>
            </ul>
          </Section>

          <Section title="2. Data We Collect">
            <p className="font-semibold">2.1. Data you provide directly:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>First and last name;</li>
              <li>Email address;</li>
              <li>Phone number (optional);</li>
              <li>Information about your project/business shared via inquiry or consultation;</li>
              <li>Access credentials (domain, hosting, social profiles) — only when necessary for service delivery.</li>
            </ul>
            <p className="font-semibold mt-4">2.2. Data collected automatically:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li>IP address and browser type;</li>
              <li>Pages visited and time spent;</li>
              <li>Device information (mobile/desktop, OS);</li>
              <li>Cookies and similar technologies (see{' '}
                <Link href="/policies/cookies" className="underline">Cookie Policy</Link>).
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <ul className="list-disc ml-6 space-y-1">
              <li>To respond to inquiries and send quotes;</li>
              <li>To deliver agreed services (web development, content, automations);</li>
              <li>To send important information related to your project;</li>
              <li>To improve our Site and Services;</li>
              <li>To comply with legal obligations;</li>
              <li>For marketing only with your explicit consent.</li>
            </ul>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Contract performance</strong> — processing necessary to deliver the service;</li>
              <li><strong>Legitimate interest</strong> — site analytics and improvement, fraud prevention;</li>
              <li><strong>Consent</strong> — marketing communications and optional cookies;</li>
              <li><strong>Legal obligation</strong> — when required by law.</li>
            </ul>
          </Section>

          <Section title="5. Sharing Data with Third Parties">
            <p>We do not sell your personal data. We may share data only with:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li><strong>Hosting and infrastructure providers</strong> — for Site operation;</li>
              <li><strong>Analytics tools</strong> (e.g. Google Analytics) — with anonymized traffic data;</li>
              <li><strong>Payment operators</strong> — when processing payments; they have their own privacy policies;</li>
              <li><strong>Competent authorities</strong> — when required by law.</li>
            </ul>
          </Section>

          <Section title="6. International Data Transfers">
            <p>
              Some tools (Google, Meta, etc.) may process data outside the EU. In such cases we
              rely on Standard Contractual Clauses approved by the European Commission or adequacy
              decisions.
            </p>
          </Section>

          <Section title="7. How Long We Retain Data">
            <ul className="list-disc ml-6 space-y-1">
              <li>Inquiry data without a concluded contract: up to 12 months;</li>
              <li>Data related to a completed contract: up to 5 years (accounting obligations);</li>
              <li>Data with marketing consent: until consent is withdrawn;</li>
              <li>Analytics/cookie data: as per the Cookie Policy.</li>
            </ul>
          </Section>

          <Section title="8. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li><strong>Access</strong> — obtain a copy of the data we process about you;</li>
              <li><strong>Rectification</strong> — request correction of inaccurate data;</li>
              <li><strong>Erasure</strong> — the "right to be forgotten" where grounds exist;</li>
              <li><strong>Restriction</strong> — restrict processing during a dispute;</li>
              <li><strong>Portability</strong> — receive data in a machine-readable format;</li>
              <li><strong>Withdraw consent</strong> — at any time, without affecting previous lawful processing;</li>
              <li><strong>Lodge a complaint</strong> — with the Commission for Personal Data Protection (www.cpdp.bg).</li>
            </ul>
            <p className="mt-3">
              To exercise your rights, contact us at <strong>georgikarchev5@gmail.com</strong>. We
              will respond within 30 days.
            </p>
          </Section>

          <Section title="9. Cookies">
            <p>
              We use cookies and similar technologies. See our{' '}
              <Link href="/policies/cookies" className="underline font-medium">Cookie Policy</Link>{' '}
              for details.
            </p>
          </Section>

          <Section title="10. Security">
            <p>
              We apply technical and organizational measures to protect your data (HTTPS encryption,
              restricted access, secure storage). In the event of a data breach, we will notify you
              in accordance with applicable law.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We reserve the right to update this policy. For significant changes, we will post a
              visible notice on the Site. The "Last updated" date reflects the current version.
            </p>
          </Section>

          <Section title="12. Contact">
            <ul className="space-y-1">
              <li><strong>Email:</strong> georgikarchev5@gmail.com</li>
              <li><strong>Website:</strong> https://karchev.bg</li>
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
