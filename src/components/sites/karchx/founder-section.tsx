"use client";

import React from "react";
import { useRevealOnce } from "@/hooks/use-scroll";

/**
 * "Know who you will work with": founder card. Text on the left, portrait on the right.
 * Portrait: /public/sites/karchx/founder.avif
 */
export function FounderSection() {
  const { ref, shown } = useRevealOnce<HTMLElement>(0.2);

  return (
    <section ref={ref} id="contact" className="scroll-mt-24 px-4 py-16 md:py-24">
      <div
        className={`mx-auto w-full max-w-[1100px] transition-all duration-1000 ease-out ${
          shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="grid overflow-hidden rounded-[28px] bg-[#fcfcfc] font-sans text-[#0b0b0b] md:grid-cols-[1fr_1.05fr] md:rounded-[40px]">
          {/* Text */}
          <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 md:p-12">
            <div>
              <h2 className="font-serif-marist text-[38px] font-normal leading-[1.1] tracking-tight sm:text-[48px] md:text-[52px] lg:text-[60px]">
                Know who you will work with.
              </h2>
              <div className="mt-6 space-y-4 text-[14px] leading-6 tracking-[-0.01em] text-[#0b0b0b]/65 dark:text-white/70 sm:text-[15px] sm:leading-[1.65] md:max-w-[440px]">
                <p>
                  I&apos;m Georgi Karchev, founder of KARCHX. I help people and businesses turn specific needs into solutions they can use every day.
                </p>
                <p>
                  You speak with me on the first call. Before paid work begins, you receive a description of the tasks, the price and how we will check the work. We review progress during the project, and you receive the agreed materials and instructions at handover.
                </p>
              </div>
            </div>
            <p className="text-[12px] tracking-[-0.01em] text-[#0b0b0b]/55 sm:text-[13px]">
              Georgi Karchev · Founder of KARCHX · Plovdiv, Bulgaria
            </p>
          </div>

          {/* Portrait */}
          <div className="relative min-h-[360px] bg-[#d9d9d9] md:min-h-[560px] md:m-5 md:ml-0 md:rounded-[24px] md:overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sites/karchx/founder.avif"
              alt="Georgi Karchev, founder of KARCHX."
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
