import React from "react";
import Link from "next/link";
import { LegalPage, H2, UL, Term, Mail, linkCls } from "@/components/sites/karchx/legal-page";

export const metadata = {
  title: "Terms of Service — KARCHX",
  description: "Terms of Service for KarchX",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="April 25, 2026">
      <p>
        These Terms of Service govern access to and use of the website{" "}
        <a href="https://www.karchx.com" className={linkCls}>https://www.karchx.com</a> (&quot;Site&quot;) and all services offered through it, provided by Georgi Karchev, an individual operating through the Site (&quot;we&quot;, &quot;us&quot;, &quot;KarchX&quot;).
      </p>
      <p>
        By using the Site, submitting an inquiry, requesting a service, or making a payment, you confirm that you have read, understood, and agree to these Terms. If you do not agree, please do not use the Site or Services.
      </p>
      <p>
        Related policies:{" "}
        <Link href="/legal/privacy" className={linkCls}>Privacy Policy</Link> ·{" "}
        <Link href="/legal/cookies" className={linkCls}>Cookie Policy</Link>
      </p>

      <H2>1. Definitions</H2>
      <Term name="Client / You">A person who uses the Site and/or requests Services.</Term>
      <Term name="Services">Web development, content production (video, photography, social media), chatbots &amp; automations, and related digital services.</Term>
      <Term name="Project">A specific service request/order with an agreed scope, price, and timeline.</Term>
      <Term name="Digital Deliverable">Files, code, design, configurations, video content, documentation, accesses and/or work performed within the scope of the Services.</Term>

      <H2>2. Site Access and Acceptable Use</H2>
      <p>You may only use the Site for lawful purposes and in a manner that does not infringe the rights of third parties.</p>
      <p>The following are prohibited:</p>
      <UL
        items={[
          "Attempting unauthorized access to systems, accounts, or data;",
          "Uploading or distributing viruses or malicious code;",
          "Automated data extraction (scraping) unless expressly permitted;",
          "Using the Site in a way that may compromise its security or disrupt its operation.",
        ]}
      />

      <H2>3. Inquiries, Quotes and Contract Formation</H2>
      <p>Information on the Site is for informational purposes only and does not constitute a binding offer unless explicitly stated otherwise.</p>
      <p>A service contract is considered concluded when:</p>
      <UL
        items={[
          "We confirm in writing (by email or other written channel) the scope, price, and timeline; and/or",
          "A payment has been made (in full or in part).",
        ]}
      />
      <p>
        To perform the Services, we may require information and access credentials (domain, hosting, CMS, social profiles, admin panels). The Client is responsible for providing accurate data and having the right to share those credentials.
      </p>

      <H2>4. Pricing and Payments</H2>
      <UL
        items={[
          "Prices are listed in EUR (euro).",
          "We reserve the right to change prices at any time; the conditions confirmed in writing apply to a specific Project.",
          "Payment is made via agreed method. We may require an upfront payment or phased payments.",
          "We do not store payment card data.",
        ]}
      />

      <H2>5. Workflow, Timelines and Acceptance</H2>
      <UL
        items={[
          "Timelines begin after receipt of payment and after the Client provides all required materials and access.",
          "If the Client delays materials, access, or feedback, timelines are extended accordingly.",
          "After delivery, the Client has 5 business days to request revisions in writing or confirm acceptance. If no response is received, the deliverable is considered accepted.",
        ]}
      />

      <H2>6. Revisions and Scope Changes</H2>
      <p>
        Revisions are performed within the agreed scope. Requests outside the scope (additional pages, features, videos, posts) are considered additional services and require separate confirmation and payment.
      </p>

      <H2>7. Client Responsibilities</H2>
      <p>The Client agrees to:</p>
      <UL
        items={[
          "Provide accurate and up-to-date contact information;",
          "Ensure rights to use any texts, images, logos, videos, and other content provided to KarchX;",
          "Provide timely feedback, materials, and access;",
          "Keep credentials and passwords confidential.",
        ]}
      />
      <p>The Client is responsible for the legality of all provided content.</p>

      <H2>8. Intellectual Property</H2>
      <UL
        items={[
          "The Site's content is owned by KarchX or used with permission.",
          "Until full payment is received, all rights to the digital deliverable remain with KarchX.",
          "After full payment, the Client receives the right to use the deliverable for their business.",
          "We may use the project as a portfolio reference unless the Client explicitly objects in writing before publication.",
        ]}
      />

      <H2>9. Third Parties and External Services</H2>
      <p>
        Services may require third-party tools (hosting, domain registrars, social platforms, payment operators, AI tools, etc.). We are not responsible for interruptions, changes, or policies of third parties. Licenses and fees for third-party tools are the Client&apos;s responsibility unless agreed otherwise in writing.
      </p>

      <H2>10. Privacy and Personal Data</H2>
      <p>
        Processing of personal data is governed by our <Link href="/legal/privacy" className={linkCls}>Privacy Policy</Link>.
      </p>

      <H2>11. Disclaimer of Warranties</H2>
      <UL
        items={[
          "Services are provided \"as is\" to the maximum extent permitted by law.",
          "We do not guarantee specific financial results, traffic, or search engine rankings — these depend on factors outside our control.",
          "We do not guarantee uninterrupted operation of third-party services.",
        ]}
      />

      <H2>12. Limitation of Liability</H2>
      <p>
        To the maximum extent permitted by law, we are not liable for indirect or consequential damages. Our total liability for a specific Project is limited to the amount actually paid by the Client for that service.
      </p>

      <H2>13. Termination</H2>
      <UL
        items={[
          "We may terminate or restrict access to the Site in case of abuse or violation of these Terms.",
          "If the Client cancels a project after work has begun, the Client owes payment for work performed to date.",
          "If we terminate the project through our fault, we will refund amounts for work not performed.",
        ]}
      />

      <H2>14. Cancellations and Refunds</H2>
      <p>As we provide digital services, refunds are only permitted when:</p>
      <UL
        items={[
          "We have explicitly confirmed a refund for a specific case; or",
          "We are unable to deliver the agreed service through our fault.",
        ]}
      />
      <p>
        Work already started (analysis, planning, design, filming, editing, development, communication) constitutes a rendered service and is non-refundable, unless required by law.
      </p>

      <H2>15. Changes to These Terms</H2>
      <p>
        We reserve the right to update these Terms by publishing a new version on the Site. Changes take effect from the date of publication.
      </p>

      <H2>16. Governing Law and Disputes</H2>
      <p>
        These Terms are governed by the laws of the Republic of Bulgaria. All disputes shall be resolved by mutual agreement; if not possible, by the competent Bulgarian court.
      </p>

      <H2>17. Contact</H2>
      <UL
        items={[
          <>Email: <Mail /></>,
          <>Website: <a href="https://www.karchx.com" className={linkCls}>https://www.karchx.com</a></>,
        ]}
      />
    </LegalPage>
  );
}
