import React from "react";
import { Navbar } from "@/components/sites/karchx/navbar";
import { StaggeredHero } from "@/components/sites/karchx/staggered-hero";
import { OfficeSection } from "@/components/sites/karchx/office-section";
import { FeatureCards } from "@/components/sites/karchx/feature-cards";
import { StatsSection } from "@/components/sites/karchx/stats-section";
import { ProcessSection } from "@/components/sites/karchx/process-section";
import { ChecklistSection } from "@/components/sites/karchx/checklist-section";
import { BentoSection } from "@/components/sites/karchx/bento-section";
import { FaqSection } from "@/components/sites/karchx/faq-section";
import { FounderSection } from "@/components/sites/karchx/founder-section";
import { ContactSection } from "@/components/sites/karchx/contact-section";
import { Footer } from "@/components/sites/karchx/footer";

export default function HomePage() {
  return (
    <div id="top" className="relative min-h-screen bg-[#f9f8f5] text-[#070503] flex flex-col font-sans selection:bg-[#ff740a]/20">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#070503] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="content" className="flex-1">
        <StaggeredHero />
        <OfficeSection />
        <FeatureCards />
        <StatsSection />
        <ProcessSection />
        <ChecklistSection />
        <BentoSection />
        <FaqSection />
        <FounderSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
