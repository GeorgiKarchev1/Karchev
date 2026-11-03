import React from "react";
import { LegalPage, H2, H3, UL, Term, Mail, linkCls } from "@/components/sites/karchx/legal-page";

export const metadata = {
  title: "Cookie Policy — KARCHX",
  description: "Which cookies KarchX uses and how you can manage them.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" updated="April 25, 2026">
      <p>
        This policy explains what cookies are, which ones we use on{" "}
        <a href="https://www.karchx.com" className={linkCls}>https://www.karchx.com</a>, and how you can manage them.
      </p>

      <H2>1. What Are Cookies</H2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They allow the site to remember preferences and analyze traffic patterns.
      </p>

      <H2>2. Types of Cookies We Use</H2>
      <Term name="Strictly Necessary">
        Required for the Site to function — remembering language preferences and cookie consent. These cannot be disabled and do not require your consent.
      </Term>
      <Term name="Analytics">
        Help us understand how visitors use the Site — which pages are popular, where traffic comes from. We use Google Analytics with IP anonymization. These require your consent.
      </Term>
      <Term name="Marketing">
        Used to display relevant ads on social networks (Meta Pixel, Google Ads). These require your explicit consent.
      </Term>

      <H2>3. Third-Party Cookies</H2>
      <p>Some cookies are set by third parties:</p>
      <UL
        items={[
          <>Google Analytics — traffic analysis (policy: <a href="https://policies.google.com" target="_blank" rel="noopener noreferrer" className={linkCls}>policies.google.com</a>);</>,
          "Microsoft Clarity — site usage analysis after accepting analytics cookies.",
        ]}
      />
      <p>We do not control cookies placed by these third parties.</p>

      <H2>4. Managing Cookies</H2>
      <H3>4.1. Via our banner:</H3>
      <p>
        On your first visit you will see a banner where you can accept or decline optional cookies. To choose again, clear this site’s stored data in your browser settings and reload the page.
      </p>
      <H3>4.2. Via browser settings:</H3>
      <p>
        Most browsers allow you to block or delete cookies. Note that blocking strictly necessary cookies may affect Site functionality.
      </p>
      <UL
        items={[
          "Chrome: Settings → Privacy and Security → Cookies",
          "Firefox: Settings → Privacy & Security",
          "Safari: Settings → Privacy",
        ]}
      />
      <H3>4.3. Opt out of analytics tracking:</H3>
      <p>
        Google Analytics:{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className={linkCls}>
          tools.google.com/dlpage/gaoptout
        </a>
      </p>

      <H2>5. Retention Periods</H2>
      <UL
        items={[
          "Strictly necessary cookies (consent): up to 12 months;",
          "Analytics cookies: up to 26 months;",
          "Marketing cookies: up to 90 days.",
        ]}
      />

      <H2>6. Changes to This Policy</H2>
      <p>We reserve the right to update this policy. The &quot;Last updated&quot; date reflects the current version.</p>

      <H2>7. Contact</H2>
      <p>
        Questions about cookies: <Mail />
      </p>
    </LegalPage>
  );
}
