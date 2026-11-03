"use client";

import React from "react";
import {
  FaBullseye,
  FaCalendarCheck,
  FaChartLine,
  FaClipboardList,
  FaClock,
  FaCogs,
  FaGlobe,
  FaMobileAlt,
  FaMousePointer,
  FaPenNib,
  FaQuestionCircle,
  FaRegCheckSquare,
  FaReply,
  FaTag,
  FaAward,
  FaUserCheck,
  FaLayerGroup,
  FaPhoneAlt,
} from "react-icons/fa";
import { WaveLines } from "./wave-lines";
import StaggeredGrid, { type BentoItem, type GridTile } from "@/components/ui/staggered-grid";

// The grid only uses the image list for its slot count; bento cards use their own `image`.
const IMAGES = Array.from({ length: 7 }, (_, i) => `/sites/karchx/karchx-pg-${(i % 3) + 1}.jpg`);

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 1,
    title: "Services",
    subtitle: "AI, software, content and SEO.",
    description: "See the four areas I work in and choose the one closest to your task.",
    topic: "What I do",
    icon: <FaLayerGroup className="w-5 h-5" />,
    image: "/sites/karchx/karchx-pg-1.jpg",
    href: "services",
  },
  {
    id: 2,
    title: "Free call",
    subtitle: "Start with a free 30-minute call.",
    description: "By phone, with no obligation to buy. We clarify your task and whether we should work together.",
    topic: "First step",
    icon: <FaPhoneAlt className="w-5 h-5" />,
    image: "/sites/karchx/karchx-pg-2.jpg",
    href: "checklist",
  },
  {
    id: 3,
    title: "Process",
    subtitle: "A clear task. Practical delivery.",
    description: "From the first conversation and a specific proposal to the finished work and handover.",
    topic: "How we work",
    icon: <FaCogs className="w-5 h-5" />,
    image: "/sites/karchx/karchx-pg-3.jpg",
    href: "process",
  },
];

// The 12 checks from the "where you lose inquiries" checklist, in order. Each tile: icon + check title.
const CHECK_TILES: GridTile[] = [
  {
    icon: FaBullseye,
    title: "The first sentence says who the service is for.",
    back: { heading: "Who it is for", text: "Visitors decide in seconds. I rewrite your first line so the right customer recognises themselves." },
  },
  {
    icon: FaTag,
    title: "Scope and price leave no basic questions.",
    steps: [
      { label: "Brief", text: "You tell me what the site must do" },
      { label: "Build", text: "Pages, text and form in 2 weeks" },
      { label: "Launch", text: "Live, tested on phone and PC" },
    ],
  },
  {
    icon: FaAward,
    title: "There is proof you can stand behind.",
    back: { heading: "Real proof", text: "Named results and real numbers, placed next to your offer, so trust is built before the first call." },
  },
  {
    icon: FaMousePointer,
    title: "The main button is in the right place.",
    snippet: {
      code: ['btn = find("main button")', "print(btn.position)"],
      output: ["above the fold", "visible on phone", "OK: right place"],
    },
  },
  {
    icon: FaClipboardList,
    title: "The form works and explains what happened.",
    back: { heading: "A form that works", text: "Short, tested on phone and PC, with a clear confirmation. Every message reaches your inbox." },
  },
  {
    icon: FaMobileAlt,
    title: "On a phone, everything reads and taps easily.",
    stepsHeading: "Infrastructure",
    stepsTone: "indigo",
    steps: [
      { label: "Domain & hosting", text: "Fast and secure" },
      { label: "Forms to inbox", text: "Every inquiry has an owner" },
      { label: "Backups", text: "Nothing gets lost" },
    ],
  },
  {
    icon: FaUserCheck,
    title: "Every new inquiry has an owner.",
    back: { heading: "No lost inquiries", text: "Each new inquiry gets a name next to it, so nothing waits for “someone”." },
  },
  {
    icon: FaClock,
    title: "You know how long the first reply takes.",
    stepsHeading: "First reply",
    stepsTone: "amber",
    steps: [
      { label: "Inquiry arrives", text: "Alert goes to the owner" },
      { label: "First reply", text: "Same day, with a next step" },
      { label: "Follow-up", text: "Date set before you close it" },
    ],
  },
  {
    icon: FaReply,
    title: "The first reply helps the client move forward.",
    back: { heading: "A reply that moves on", text: "A first answer with the next step and a date, not just “thanks for your message”." },
  },
  {
    icon: FaCalendarCheck,
    title: "Every open offer has a next-contact date.",
    back: { heading: "Always follow up", text: "Each open offer gets a next-contact date before you close the conversation." },
  },
  {
    icon: FaQuestionCircle,
    title: "You know why conversations stop.",
    stepsHeading: "Why talks stop",
    stepsTone: "rose",
    steps: [
      { label: "Log the reason", text: "Price, timing or trust" },
      { label: "Spot the pattern", text: "Review once a month" },
      { label: "Fix one thing", text: "Then measure again" },
    ],
  },
  {
    icon: FaChartLine,
    title: "You track a few numbers the same way.",
  },
  ...Array.from({ length: 6 }, () => ({ icon: FaRegCheckSquare })),
  // The grid has 18 plain tiles; the remaining 6 stay icon-only.
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="block w-full h-full">
      <path d="M5 19 19 5M8.5 5H19v10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

/** Hero: letters rise in on scroll, then the staggered grid slides up column by column (GSAP ScrollTrigger). */
export function StaggeredHero() {
  return (
    <section className="relative pt-12 md:pt-14">
      <StaggeredGrid
        images={IMAGES}
        bentoItems={BENTO_ITEMS}
        showFooter={false}
        tiles={CHECK_TILES}
        className="bg-transparent shadow-none"
        background={<WaveLines />}
        centerTextClassName="hero-headline text relative lg:top-[10.5vh] flex flex-col items-start max-sm:px-3 max-sm:text-[12.5vw] text-[clamp(2.4rem,8vw,8.5rem)] leading-[1.08] tracking-[-0.045em] font-medium text-[#141414]"
        renderCenterText={(split) => (
          <>
            <p className="mb-4 self-start max-lg:self-center max-lg:text-center max-sm:self-start max-sm:text-left text-[11px] font-medium uppercase leading-none tracking-[0.18em] text-[#141414]/60 dark:text-white/60 sm:text-xs">
              AI · Custom software · Content · SEO
            </p>
            <h1 className="sr-only">
              <span className="en-only">Put AI to work for you.</span>
              <span className="bg-only">Включете AI да работи за вас.</span>
            </h1>
            <div aria-hidden className="en-only flex items-start whitespace-nowrap max-lg:self-center max-sm:self-start">
              {split("Put AI to work")}
              <span className="char inline-block ml-[0.8em] mt-[0.16em] w-[0.5em] h-[0.5em]" style={{ willChange: "transform" }}>
                <ArrowUpRight />
              </span>
            </div>
            <div aria-hidden className="en-only ml-[2.45em] max-lg:ml-0 max-lg:self-center max-sm:self-start whitespace-nowrap">
              {split("for you.")}
            </div>
            <div aria-hidden className="bg-only-flex items-start whitespace-nowrap max-lg:self-center max-sm:self-start">
              {split("Включете AI")}
              <span className="char inline-block ml-[0.8em] mt-[0.16em] w-[0.5em] h-[0.5em]" style={{ willChange: "transform" }}>
                <ArrowUpRight />
              </span>
            </div>
            <div aria-hidden className="bg-only ml-[2.45em] max-lg:ml-0 max-lg:self-center max-sm:self-start whitespace-nowrap">
              {split("да работи за вас.")}
            </div>
            {/* zero-width wrapper: the wide paragraph is centred without changing the headline's width */}
            <div className="mt-6 flex w-0 justify-center self-center max-sm:w-full max-sm:justify-start max-sm:self-start">
              <p className="w-[1080px] max-w-[92vw] max-sm:w-full max-sm:max-w-none max-sm:pr-[3vw] shrink-0 text-balance text-center max-sm:text-left max-sm:[text-wrap:wrap] text-[13.5px] font-normal leading-relaxed tracking-normal text-[#141414]/70 dark:text-white/70 sm:text-base md:text-[17px]">
                I help people and businesses use AI confidently and make it part of their everyday work. I build custom websites, apps and automations, help with content from filming to publishing, and improve your visibility through professional SEO.
              </p>
            </div>
            <div className="mt-6 flex flex-col items-center gap-4 self-center max-sm:items-start max-sm:self-start sm:flex-row sm:gap-6">
              <button
                type="button"
                onClick={() => document.getElementById("get-in-touch")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="char inline-flex shrink-0 items-center justify-center rounded-full bg-[#070503] px-8 py-3.5 text-base font-medium leading-none tracking-normal text-white shadow-md transition-all hover:bg-[#1a1613] active:scale-95"
                style={{ willChange: "transform" }}
              >
                Request a free call
              </button>
              <div className="max-w-md text-center max-sm:max-w-full max-sm:text-left sm:text-left">
                <p className="hero-upto text-[11px] font-bold leading-snug tracking-normal text-[#141414]/70 dark:text-white/70 max-sm:whitespace-nowrap max-sm:text-left max-sm:text-[min(2.8vw,13px)] sm:text-sm">
                  Up to 30 minutes · Speak directly with me · No obligation to buy
                </p>
                <p className="mt-2 text-xs font-normal italic leading-snug tracking-normal text-[#141414]/50 dark:text-white/50 sm:text-[13px]">
                  Georgi Karchev, founder of KARCHX. A clear scope and price before paid work begins.
                </p>
              </div>
            </div>
          </>
        )}
      />
    </section>
  );
}
