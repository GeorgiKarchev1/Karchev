"use client";

import React from "react";
import { LogoKarchxIcon } from "./icons";
import { WaveLines } from "./wave-lines";
import { useRevealOnce } from "@/hooks/use-scroll";

export function OfficeSection() {
  const { ref, shown } = useRevealOnce<HTMLElement>(0.25);


  return (
    <div id="services" className="relative scroll-mt-24">
      <WaveLines />
      <section
        ref={ref}
        className="relative z-10 pt-16 pb-10 md:pt-24 md:pb-16 px-4 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
      <div
        className={`w-12 h-12 md:w-16 md:h-16 text-[#070503] mb-8 transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          shown ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="w-full h-full">
          <LogoKarchxIcon className="w-full h-full rounded-[22%] shadow-lg animate-[flower-breathe_4.5s_ease-in-out_infinite]" />
        </div>
      </div>
      <h2
        className={`font-serif-marist text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-[#070503] leading-[1.1] tracking-tight transition-all duration-1000 delay-200 ${
          shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        What do you need<br />
        right now?
      </h2>
      <p
        className={`mt-6 max-w-xl text-[15px] leading-7 text-[#070503]/65 transition-all duration-1000 delay-300 md:text-[17px] ${
          shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        Choose the area closest to your task. You can request a call even if you are unsure where to start.
      </p>
      </section>
    </div>
  );
}
