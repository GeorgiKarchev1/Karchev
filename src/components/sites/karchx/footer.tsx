import React from "react";
import { LogoKarchxIcon } from "./icons";

const COLS = [
  {
    title: "Explore",
    links: [
      ["How it works", "#how-it-works"],
      ["Prices", "#prices"],
      ["Free call", "#free-call"],
      ["Contact", "#get-in-touch"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["12 checks", "#checklist"],
      ["Download PDF", "/karchx-12-proverki.pdf"],
      ["Questions", "#free-call"],
    ],
  },
  {
    title: "Get in touch",
    links: [
      ["+359 895 739 335", "tel:+359895739335"],
      ["georgikarchev5@gmail.com", "mailto:georgikarchev5@gmail.com"],
      ["LinkedIn", "https://www.linkedin.com/in/georgi-karchev-415901244/"],
    ],
    note: "Plovdiv, Bulgaria · Remote work · On-site shoots by arrangement",
  },
] as const;

export function Footer() {
  return (
    <footer className="w-full bg-white font-sans text-[#141414]">
      <div className="relative w-full overflow-hidden px-6 pt-14 md:px-16 md:pt-20">
        {/* Footer card */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="max-w-[280px]">
              <div className="flex items-center gap-2">
                <LogoKarchxIcon className="h-7 w-7" />
                <span className="text-[15px] font-semibold tracking-tight">KARCHX</span>
              </div>
              <p className="mt-4 text-[13px] leading-5 text-black/55">
                Practical AI support, custom software, content and SEO. From idea to delivery.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-[13px] sm:grid-cols-3 sm:gap-14">
              {COLS.map((c) => (
                <div key={c.title} className="flex flex-col gap-3">
                  <span className="font-semibold">{c.title}</span>
                  {c.links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-black/50 transition-colors hover:text-black"
                    >
                      {label}
                    </a>
                  ))}
                  {"note" in c && <span className="max-w-[210px] text-black/50">{c.note}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-2 border-t border-black/10 pt-5 text-[12px] text-black/50 sm:flex-row">
            <span>&copy; {new Date().getFullYear()} KARCHX. All rights reserved.</span>
            <span className="flex flex-wrap items-center gap-x-2">
              <a href="/legal/privacy" className="transition-colors hover:text-black">Privacy Policy</a>
              <span aria-hidden>&middot;</span>
              <a href="/legal/terms-of-service" className="transition-colors hover:text-black">Terms of Service</a>
              <span aria-hidden>&middot;</span>
              <a href="/legal/cookies" className="transition-colors hover:text-black">Cookies</a>
              <span aria-hidden>&middot;</span>
              <a href="#top" className="transition-colors hover:text-black">Back to top</a>
            </span>
          </div>
        </div>

        {/* Subtle agency wordmark */}
        <div
          aria-hidden
          className="pointer-events-none -mb-[0.12em] mt-10 select-none text-center font-sans font-semibold leading-[0.8] tracking-[-0.05em] "
          style={{
            fontSize: "clamp(80px, 23vw, 420px)",
            backgroundImage: "linear-gradient(to bottom, #c4c4c4 0%, #dedede 50%, #f1f1f1 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          KARCHX
        </div>
      </div>
    </footer>
  );
}
