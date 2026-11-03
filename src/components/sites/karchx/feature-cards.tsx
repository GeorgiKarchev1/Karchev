"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { CodeRunDemo } from "./demos/code-run-demo";
import { ApprovalDemo } from "./demos/approval-demo";
import { useInView, useScrollProgress } from "@/hooks/use-scroll";

const POINTS_STRUGGLE: Point[] = [
  {
    label: "AI training and integration",
    title: "Use AI with a clear purpose.",
    text: "I show you how to use AI for your own tasks: writing clear instructions, checking the results and choosing suitable tools. Where it makes sense, I integrate AI into the systems and processes you already use.",
    bullets: [
      "Practical training for you or your team.",
      "Reusable templates for writing, research, summaries and recurring tasks.",
      "AI assistants and integrations with clear review steps.",
    ],
    select: "I need help with AI",
    service: "AI training and integration",
  },
  {
    label: "Custom software",
    title: "Software built around the way you work.",
    text: "I build websites, web apps and automations around a specific need. From a page that explains your service to an internal tool or a connection between systems, the solution should be easy for its users to work with.",
    bullets: [
      "Business websites, product pages and landing pages.",
      "Web apps, client portals and internal tools.",
      "Automations and integrations that reduce manual data entry between systems.",
    ],
    select: "I need custom software",
    service: "Website, app or automation",
  },
];

const POINTS_WORK: Point[] = [
  {
    label: "Content and branding",
    title: "Make more content from every good idea.",
    text: "I help with messaging, filming, editing and distribution. With AI support, we turn your source material into more formats for different channels while keeping your voice and a consistent brand identity.",
    bullets: [
      "Video production, photography and editing.",
      "Messaging, visual direction and templates for a consistent presence.",
      "Short videos, posts and articles from shared source material, with a publishing plan.",
    ],
    select: "I need help with content",
    service: "Content and branding",
  },
  {
    label: "Professional SEO",
    title: "Get found when people search for what you offer.",
    text: "I work on your website\u2019s technical foundations, structure and content to better address what your customers search for. I set priorities and track which changes lead to relevant visits and enquiries.",
    bullets: [
      "SEO audits, search research and competitor analysis.",
      "Technical improvements, page optimisation and content.",
      "Local SEO and tracking of organic visits and enquiries.",
    ],
    select: "I need help with SEO",
    service: "SEO",
  },
];

type Point = { label: string; title: string; text: string; bullets: string[]; select: string; service: string };

function chooseService(service: string) {
  const el = document.querySelector<HTMLSelectElement>('select[name="service"]');
  if (el) el.value = service;
  document.getElementById("get-in-touch")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Click-to-open list: the open item turns black and shows its text, the others stay grey.
function PointsAccordion({ points }: { points: Point[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="flex flex-col gap-3 text-left">
      {points.map((pt, i) => {
        const isOpen = open === i;
        return (
          <div key={pt.title} className="relative block w-full border-l-[3px] border-[#070503]/10 py-3 pl-6 text-left">
            <span
              aria-hidden
              className={`absolute -left-[3px] top-0 w-[3px] bg-[#1d6bff] transition-all duration-300 ${
                isOpen ? "h-4 opacity-100" : "h-0 opacity-0"
              }`}
            />
            <button type="button" onClick={() => setOpen(i)} aria-expanded={isOpen} className="block w-full cursor-pointer text-left">
              <span className="mb-1 block text-[12px] font-medium uppercase tracking-[0.08em] text-[#070503]/45">{pt.label}</span>
              <span
                className={`block text-2xl font-normal leading-[1.2] tracking-tight transition-colors duration-300 sm:text-[28px] ${
                  isOpen ? "text-[#070503]" : "text-[#070503]/55 hover:text-[#070503]/80"
                }`}
              >
                {pt.title}
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden text-[15px] leading-[1.5] text-[#070503] sm:text-base">
                <p>{pt.text}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[#070503]/80">
                  {pt.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => chooseService(pt.service)}
                  className="mt-4 inline-flex items-center rounded-lg bg-[#070503] px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black"
                >
                  {pt.select}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const features = [
  {
    title: "KARCHX does your paperwork",
    description:
      "Handling enrollments, converting payments to EFTs, and posting them automatically, without delay.",
    points: POINTS_STRUGGLE,
    image: "/sites/karchx/karchx-pg-2.jpg",
    gradient: false,
    Demo: CodeRunDemo,
  },
  {
    title: "Keeps you in the loop",
    description:
      "Watch KARCHX complete your paperwork, asking for your input when needed on the most complex issues.",
    points: POINTS_WORK,
    image: "/sites/karchx/karchx-pg-2.jpg",
    Demo: ApprovalDemo,
  },
];

function FeatureRow({ f, idx }: { f: (typeof features)[number]; idx: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const active = useInView(mediaRef, { threshold: 0.45 });

  // Scroll-linked: media card scales up into place (original: 0.83 -> 1), text rises + fades in,
  // background photo drifts for depth.
  useScrollProgress(rowRef, (p) => {
    const enter = Math.min(1, p / 0.42); // 0 -> 1 while the row travels into the viewport
    const eased = 1 - Math.pow(1 - enter, 3);
    if (mediaRef.current) {
      mediaRef.current.style.transform = `scale(${0.86 + 0.14 * eased})`;
      mediaRef.current.style.opacity = String(0.4 + 0.6 * eased);
    }
    if (textRef.current) {
      textRef.current.style.transform = `translateY(${(1 - eased) * 48}px)`;
      textRef.current.style.opacity = String(eased);
    }
    if (bgRef.current) bgRef.current.style.transform = `translateY(${(p - 0.5) * -40}px) scale(1.12)`;
  });

  const Demo = f.Demo;
  return (
    <div
      ref={rowRef}
      className={`flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16 ${
        idx % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Description Column */}
      <div ref={textRef} className="w-full lg:w-5/12 text-center lg:text-left will-change-transform">
        {f.points ? (
          <PointsAccordion points={f.points} />
        ) : (
          <>
            <h3 className="font-serif-marist text-3xl sm:text-4xl md:text-5xl text-[#070503] font-normal leading-[1.15] mb-4">
              {f.title}
            </h3>
            <p className="text-base sm:text-lg text-[#070503]/70 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
              {f.description}
            </p>
          </>
        )}
      </div>

      {/* Visual Column: Card with background photo & live demo */}
      <div
        ref={mediaRef}
        className="w-full lg:w-7/12 relative aspect-[16/10] sm:aspect-[16/10] rounded-[32px] md:rounded-[44px] overflow-hidden shadow-xl border border-[#070503]/10 flex items-center justify-center p-4 sm:p-8 will-change-transform"
      >
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          {f.gradient ? (
            <div className="absolute inset-0 overflow-hidden">
              {/* White base drifting through the site palette: cream, pale blue, soft orange */}
              <div
                className="gradient-drift absolute inset-0 animate-[gradient-drift_14s_ease-in-out_infinite]"
                style={{
                  backgroundSize: "300% 300%",
                  backgroundImage:
                    "linear-gradient(120deg, #ffffff 0%, #f9f8f5 22%, #ddf3f9 45%, #ffffff 62%, #ffe3cc 82%, #ffffff 100%)",
                }}
              />
              <div className="gradient-blob absolute -left-[10%] -top-[15%] h-[70%] w-[60%] animate-[gradient-blob_16s_ease-in-out_infinite] rounded-full bg-[#ff740a]/15 blur-3xl" />
              <div className="gradient-blob absolute -bottom-[20%] -right-[10%] h-[70%] w-[60%] animate-[gradient-blob_20s_ease-in-out_infinite_reverse] rounded-full bg-[#7cc9e8]/30 blur-3xl" />
            </div>
          ) : (
          <Image
            src={f.image}
            alt={f.title}
            fill
            className="object-cover animate-[feature-pan_14s_ease-in-out_infinite_alternate]"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          )}
        </div>
        {!f.gradient && <div className="absolute inset-0 bg-black/10" />}

        {/* Centered live demo (plays while in view, restarts on re-entry) */}
        <div className="relative z-10 w-full max-w-sm">
          <Demo active={active} />
        </div>
      </div>
    </div>
  );
}

export function FeatureCards() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 md:py-24 max-w-7xl mx-auto px-4">
      <div className="space-y-20 md:space-y-32">
        {features.map((f, idx) => (
          <FeatureRow key={f.title} f={f} idx={idx} />
        ))}
      </div>
    </section>
  );
}
