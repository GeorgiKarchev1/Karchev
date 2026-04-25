import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | KarchX',
  description: 'How KarchX uses cookies and how you can manage them.',
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#2d232e]">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="text-sm font-medium text-[#534b52] hover:underline">
            ← Back to home
          </Link>
          <Link href="/politiki/biskvitki" className="text-sm font-medium text-[#534b52] hover:underline">
            Български →
          </Link>
        </div>

        <h1 className="font-heading font-black text-4xl mb-2 tracking-tight">Cookie Policy</h1>
        <p className="text-sm text-[#2d232e]/60 mb-12">Last updated: April 25, 2026</p>

        <div className="space-y-10 text-[15px] leading-relaxed">

          <p>
            This policy explains what cookies are, which ones we use on{' '}
            <strong>https://www.karchx.com</strong>, and how you can manage them.
          </p>

          <Section title="1. What Are Cookies">
            <p>
              Cookies are small text files stored on your device when you visit a website. They
              allow the site to remember preferences and analyze traffic patterns.
            </p>
          </Section>

          <Section title="2. Types of Cookies We Use">
            <div className="space-y-4">
              <div className="border border-[#2d232e]/20 rounded-xl p-4 bg-white/40">
                <p className="font-semibold mb-1">Strictly Necessary</p>
                <p className="text-sm">
                  Required for the Site to function — remembering language preferences and cookie
                  consent. These cannot be disabled and do not require your consent.
                </p>
              </div>
              <div className="border border-[#2d232e]/20 rounded-xl p-4 bg-white/40">
                <p className="font-semibold mb-1">Analytics</p>
                <p className="text-sm">
                  Help us understand how visitors use the Site — which pages are popular, where
                  traffic comes from. We use Google Analytics with IP anonymization. These require
                  your consent.
                </p>
              </div>
              <div className="border border-[#2d232e]/20 rounded-xl p-4 bg-white/40">
                <p className="font-semibold mb-1">Marketing</p>
                <p className="text-sm">
                  Used to display relevant ads on social networks (Meta Pixel, Google Ads). These
                  require your explicit consent.
                </p>
              </div>
            </div>
          </Section>

          <Section title="3. Third-Party Cookies">
            <p>Some cookies are set by third parties:</p>
            <ul className="list-disc ml-6 space-y-1 mt-2">
              <li><strong>Google Analytics</strong> — traffic analysis (policy: policies.google.com);</li>
              <li><strong>Meta Pixel</strong> — remarketing and ad measurement (policy: facebook.com/policy);</li>
              <li><strong>Cal.com</strong> — consultation booking (policy: cal.com/privacy).</li>
            </ul>
            <p className="mt-3">We do not control cookies placed by these third parties.</p>
          </Section>

          <Section title="4. Managing Cookies">
            <p className="font-semibold">4.1. Via our banner:</p>
            <p className="mt-1">
              On your first visit you will see a banner where you can accept or decline optional
              cookies. You can change your choice at any time via the "Cookies" link in the site footer.
            </p>
            <p className="font-semibold mt-4">4.2. Via browser settings:</p>
            <p className="mt-1">
              Most browsers allow you to block or delete cookies. Note that blocking strictly
              necessary cookies may affect Site functionality.
            </p>
            <ul className="list-disc ml-6 space-y-1 mt-2 text-sm">
              <li>Chrome: Settings → Privacy and Security → Cookies</li>
              <li>Firefox: Settings → Privacy &amp; Security</li>
              <li>Safari: Settings → Privacy</li>
            </ul>
            <p className="font-semibold mt-4">4.3. Opt out of analytics tracking:</p>
            <p className="mt-1">
              Google Analytics:{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" className="underline" target="_blank" rel="noopener noreferrer">
                tools.google.com/dlpage/gaoptout
              </a>
            </p>
          </Section>

          <Section title="5. Retention Periods">
            <ul className="list-disc ml-6 space-y-1">
              <li>Strictly necessary cookies (consent): up to 12 months;</li>
              <li>Analytics cookies: up to 26 months;</li>
              <li>Marketing cookies: up to 90 days.</li>
            </ul>
          </Section>

          <Section title="6. Changes to This Policy">
            <p>
              We reserve the right to update this policy. The "Last updated" date reflects the
              current version.
            </p>
          </Section>

          <Section title="7. Contact">
            <p>Questions about cookies: <strong>georgikarchev5@gmail.com</strong></p>
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
