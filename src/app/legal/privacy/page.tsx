import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/sites/karchx/navbar";
import { Footer } from "@/components/sites/karchx/footer";

export const metadata = {
  title: "Privacy Policy — KARCHX",
  description: "How KarchX collects, uses, stores and protects your personal data.",
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif-marist text-2xl text-[#070503] font-normal pt-4">{children}</h2>;
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-6">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

function Mail() {
  return (
    <a href="mailto:georgikarchev5@gmail.com" className="text-[#f06800] underline">
      georgikarchev5@gmail.com
    </a>
  );
}

function CookieLink() {
  return (
    <a href="https://www.karchx.com/policies/cookies" className="text-[#f06800] underline">
      Cookie Policy
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#f9f8f5] text-[#070503] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-4xl mx-auto px-4 w-full">
        <div className="mb-8">
          <Link href="/" className="text-xs text-[#f06800] hover:underline font-mono">
            ← Back to Home
          </Link>
          <h1 className="font-serif-marist text-4xl sm:text-5xl font-normal text-[#070503] mt-4 mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-[#070503]/50">Last updated: September 21, 2026</p>
        </div>

        <div className="prose max-w-none text-[#070503]/80 space-y-6 text-sm leading-relaxed">
          <p>
            This Privacy Policy describes how KarchX (Georgi Karchev, <a href="https://www.karchx.com" className="text-[#f06800] underline">https://www.karchx.com</a>) collects, uses, stores, and protects your personal data. We comply with Regulation (EU) 2016/679 (GDPR) and applicable Bulgarian law.
          </p>

          <H2>1. Data Controller</H2>
          <UL
            items={[
              "Controller: Georgi Karchev",
              "Trading name: KarchX",
              <>Website: <a href="https://www.karchx.com" className="text-[#f06800] underline">https://www.karchx.com</a></>,
              <>Contact email: <Mail /></>,
            ]}
          />

          <H2>2. Data We Collect</H2>
          <p className="font-medium text-[#070503]">2.1. Data you provide directly:</p>
          <UL
            items={[
              "First and last name;",
              "Email address;",
              "Phone number and preferred call time (optional);",
              "Information about your project/business shared via inquiry or consultation;",
              "Access credentials (domain, hosting, social profiles) — only when necessary for service delivery.",
            ]}
          />
          <p className="font-medium text-[#070503]">2.2. Data collected automatically:</p>
          <UL
            items={[
              "IP address and browser type;",
              "Pages visited and time spent;",
              "Device information (mobile/desktop, OS);",
              <>Cookies and similar technologies (see <CookieLink />).</>,
            ]}
          />

          <H2>3. How We Use Your Data</H2>
          <UL
            items={[
              "To respond to inquiries and send quotes;",
              "To deliver agreed services (web development, content, automations);",
              "To send important information related to your project;",
              "To improve our Site and Services;",
              "To comply with legal obligations;",
              "For marketing only with your explicit consent.",
            ]}
          />

          <H2>4. Legal Basis for Processing</H2>
          <UL
            items={[
              "Contract performance — processing necessary to deliver the service;",
              "Legitimate interest — site analytics and improvement, fraud prevention;",
              "Consent — marketing communications and optional cookies;",
              "Legal obligation — when required by law.",
            ]}
          />

          <H2>5. Sharing Data with Third Parties</H2>
          <p>We do not sell your personal data. We may share data only with:</p>
          <UL
            items={[
              "Hosting and infrastructure providers — for Site operation;",
              "Analytics tools (e.g. Google Analytics) — with anonymized traffic data;",
              "Payment operators — when processing payments; they have their own privacy policies;",
              "Competent authorities — when required by law.",
            ]}
          />

          <H2>6. International Data Transfers</H2>
          <p>
            Some tools (Google, Meta, etc.) may process data outside the EU. In such cases we rely on Standard Contractual Clauses approved by the European Commission or adequacy decisions.
          </p>

          <H2>7. How Long We Retain Data</H2>
          <UL
            items={[
              "Inquiry data without a concluded contract: up to 12 months;",
              "Data related to a completed contract: up to 5 years (accounting obligations);",
              "Data with marketing consent: until consent is withdrawn;",
              "Analytics/cookie data: as per the Cookie Policy.",
            ]}
          />

          <H2>8. Your Rights</H2>
          <p>You have the right to:</p>
          <UL
            items={[
              "Access — obtain a copy of the data we process about you;",
              "Rectification — request correction of inaccurate data;",
              "Erasure — the \"right to be forgotten\" where grounds exist;",
              "Restriction — restrict processing during a dispute;",
              "Portability — receive data in a machine-readable format;",
              "Withdraw consent — at any time, without affecting previous lawful processing;",
              <>Lodge a complaint — with the Commission for Personal Data Protection (<a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="text-[#f06800] underline">www.cpdp.bg</a>).</>,
            ]}
          />
          <p>
            To exercise your rights, contact us at <Mail />. We will respond within 30 days.
          </p>

          <H2>9. Cookies</H2>
          <p>
            We use cookies and similar technologies. See our <CookieLink /> for details.
          </p>

          <H2>10. Security</H2>
          <p>
            We apply technical and organizational measures to protect your data (HTTPS encryption, restricted access, secure storage). In the event of a data breach, we will notify you in accordance with applicable law.
          </p>

          <H2>11. Changes to This Policy</H2>
          <p>
            We reserve the right to update this policy. For significant changes, we will post a visible notice on the Site. The &quot;Last updated&quot; date reflects the current version.
          </p>

          <H2>12. Contact</H2>
          <UL
            items={[
              <>Email: <Mail /></>,
              <>Website: <a href="https://www.karchx.com" className="text-[#f06800] underline">https://www.karchx.com</a></>,
            ]}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
