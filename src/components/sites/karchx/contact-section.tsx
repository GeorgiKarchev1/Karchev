"use client";

import React, { useState } from "react";
import { useRevealOnce } from "@/hooks/use-scroll";

// The form opens the visitor's mail app addressed to it.
const CONTACT_EMAIL = "georgikarchev5@gmail.com";

const labelCls = "block text-[10px] uppercase tracking-[0.18em] text-white/70";
const lineCls =
  "mt-1 w-full border-0 border-b border-white/30 bg-transparent pb-2 text-[15px] text-white outline-none transition-colors focus:border-white placeholder:text-white/35";
const errCls = "mt-2 block text-xs text-[#ffb4a8]";

const SERVICES = [
  "AI training and integration",
  "Website, app or automation",
  "Content and branding",
  "SEO",
  "Several connected services",
  "I need help choosing where to start",
];

type Errors = { name?: string; email?: string; form?: string };

export function ContactSection() {
  const { ref, shown } = useRevealOnce<HTMLElement>(0.2);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [more, setMore] = useState(false);
  const [mailNote, setMailNote] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const d = new FormData(e.currentTarget);
    const val = (k: string) => String(d.get(k) ?? "").trim();
    const next: Errors = {};
    if (!val("name")) next.name = "Please enter your name.";
    if (!val("email")) next.email = "Please enter an email address so I can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("email"))) next.email = "Please check that your email address is written correctly.";
    setErrors(next);
    setMailNote(false);
    if (next.name || next.email) return;

    const payload = { name: val("name"), email: val("email"), message: val("message"), service: val("service"), phone: val("phone"), calltime: val("calltime") };
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        setStatus("sent");
      } else if (res.status === 503) {
        // Email sending is not set up on the server yet: fall back to the visitor's mail app.
        const body = `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || "-"}\nPreferred time: ${payload.calltime || "-"}\nService: ${payload.service || "-"}\n\n${payload.message}`;
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("KARCHX free call request from " + payload.name)}&body=${encodeURIComponent(body)}`;
        setStatus("idle");
        setMailNote(true);
      } else if (res.status === 429) {
        setStatus("idle");
        setErrors({ form: "Too many requests have been sent in a short time. Please try again later or contact me directly." });
      } else {
        throw new Error("send");
      }
    } catch {
      setStatus("idle");
      setErrors({ form: `Your enquiry could not be sent. Please try again or email me at ${CONTACT_EMAIL}.` });
    }
  };

  return (
    <section ref={ref} id="get-in-touch" className="scroll-mt-24 px-3 md:px-5 pb-3 md:pb-5">
      <div
        className={`contact-panel relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] md:rounded-[56px] bg-[#0a0a0a] px-6 pb-12 pt-20 md:px-16 md:pb-20 md:pt-24 text-white transition-all duration-1000 ease-out ${
          shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[260px]" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(243,240,233,0.95) 0%, rgba(243,240,233,0.35) 45%, rgba(10,10,10,0) 100%)" }} />
        <div className="relative grid gap-12 md:grid-cols-2 md:gap-10 items-center">
          {/* Big headline with the decorative shapes */}
          <div className="relative font-serif-marist uppercase leading-[0.92] tracking-[-0.01em] text-[46px] sm:text-[68px] md:text-[80px] lg:text-[98px]">
            <div>Tell me</div>
            <div className="whitespace-nowrap pl-[22%]">a little</div>
            <div>about it</div>
            <span aria-hidden className="absolute rounded-full bg-[#f3f0e9]" style={{ left: "77%", top: "1%", width: "9%", aspectRatio: "1" }} />
            <svg aria-hidden viewBox="0 0 100 100" className="absolute" style={{ left: "74%", top: "6%", width: "28%", transform: "rotate(28deg)" }} fill="none" stroke="rgba(255,255,255,.4)" strokeWidth=".5">
              <path d="M2 50 A48 48 0 0 1 98 50 Z" />
            </svg>
          </div>

          {/* Form */}
          <div>
            {status === "sent" ? (
              <div aria-live="polite" className="space-y-4">
                <h3 className="font-serif-marist text-3xl leading-tight">Your request has been sent.</h3>
                <p className="text-[14px] leading-6 text-white/80">
                  I will reply personally by the end of the next business day to arrange the call. If you suggested a time, I will confirm it with you. You do not need to send your request again.
                </p>
                <p className="text-[14px] leading-6 text-white/65">
                  Think of one task you would like to improve. If useful, have your website link or a short example of how you work ready.
                </p>
              </div>
            ) : (
              <>
                <p className="mb-8 text-[14px] leading-6 text-white/75">
                  Leave your name and email. You can add a sentence about the task. I will reply personally by the end of the next business day to arrange the call.
                </p>
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  <label className="relative block">
                    <span className={labelCls}>Name</span>
                    <span className="absolute right-0 top-0 text-xs text-white/70">*</span>
                    <input name="name" type="text" autoComplete="name" placeholder="What should I call you?" aria-invalid={!!errors.name} className={lineCls} />
                    {errors.name && <span role="alert" className={errCls}>{errors.name}</span>}
                  </label>
                  <label className="relative block">
                    <span className={labelCls}>Email</span>
                    <span className="absolute right-0 top-0 text-xs text-white/70">*</span>
                    <input name="email" type="email" autoComplete="email" placeholder="name@example.com" aria-invalid={!!errors.email} className={lineCls} />
                    {errors.email && <span role="alert" className={errCls}>{errors.email}</span>}
                  </label>
                  <label className="relative block">
                    <span className={labelCls}>What would you like to improve? &mdash; optional</span>
                    <textarea name="message" rows={2} placeholder="For example: manual tasks take too long; I need a new website; I struggle to publish regularly." className={`${lineCls} resize-none`} />
                  </label>
                  <label className="relative block">
                    <span className={labelCls}>Service &mdash; optional</span>
                    <select name="service" defaultValue="" className={`${lineCls} [color-scheme:dark]`}>
                      <option value="" className="bg-[#1a1a1a] text-white">Select a service</option>
                      {SERVICES.map((o) => (
                        <option key={o} value={o} className="bg-[#1a1a1a] text-white">{o}</option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={() => setMore((v) => !v)}
                    aria-expanded={more}
                    className="text-[12px] uppercase tracking-[0.12em] text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {more ? "\u2212" : "+"} Add a phone number or preferred time
                  </button>
                  {more && (
                    <div className="space-y-6">
                      <label className="relative block">
                        <span className={labelCls}>Phone &mdash; optional</span>
                        <input name="phone" type="tel" autoComplete="tel" placeholder="Include your country code" className={lineCls} />
                      </label>
                      <label className="relative block">
                        <span className={labelCls}>Preferred time for a call &mdash; optional</span>
                        <input name="calltime" type="text" placeholder="For example: Tuesday after 14:00, Bulgaria time" className={lineCls} />
                        <span className="mt-2 block text-xs leading-5 text-white/60">
                          I will confirm your suggested time personally. This form does not book an appointment automatically.
                        </span>
                      </label>
                    </div>
                  )}

                  {errors.form && <p role="alert" className="text-[13px] leading-5 text-[#ffb4a8]">{errors.form}</p>}

                  <div className="flex items-center justify-between gap-4 max-sm:flex-col-reverse max-sm:justify-center">
                    <span className="text-xs text-white/60 max-sm:text-center max-sm:empty:hidden" aria-live="polite">
                      {mailNote ? "Your mail app should open with the message ready to send." : ""}
                    </span>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-60"
                    >
                      <span>{status === "sending" ? "Sending\u2026" : "Request a free call"}</span>
                      <svg className="transition-transform group-hover:translate-x-1" width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12h34M26 3l10 9-10 9" />
                      </svg>
                    </button>
                  </div>
                  <noscript>
                    <p className="text-[13px] leading-5 text-white/80">This form requires JavaScript. You can call +359 895 739 335 or email {CONTACT_EMAIL}.</p>
                  </noscript>
                  <p className="text-xs leading-5 text-white/55">
                    Fields marked * are required. I will use your details to respond to your enquiry.{" "}
                    <a href="/legal/privacy" className="underline underline-offset-2 hover:text-white">Privacy Policy</a>.
                  </p>
                </form>
              </>
            )}

            <div className="mt-8 grid grid-cols-2 gap-6 text-[11px] uppercase leading-5 tracking-[0.08em] text-white/85">
              <div>
                <div className="mb-5">Plovdiv</div>
                <div>Georgi Karchev</div>
                <div>Plovdiv, Bulgaria</div>
              </div>
              <div className="text-right">
                <div className="mb-5">Online</div>
                <div>For businesses</div>
                <div>across Bulgaria</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-white/20 pt-6 text-[11px] uppercase leading-5 tracking-[0.08em] text-white/85">
              <a href="tel:+359895739335" className="transition-colors hover:text-white">0895 739 335</a>
              <a href="mailto:georgikarchev5@gmail.com" className="normal-case tracking-normal transition-colors hover:text-white">georgikarchev5@gmail.com</a>
              <a href="https://www.linkedin.com/in/georgi-karchev-415901244/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
