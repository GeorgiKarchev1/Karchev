"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoKarchxIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language";

const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Prices", href: "#prices" },
  { label: "FAQ", href: "#free-call" },
  { label: "Contact", href: "#get-in-touch" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  // On the home page the logo scrolls back to the top; on any other page it goes to the home page.
  const goHome = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) history.replaceState(null, "", "/");
    }
  };
  // Section links also work from other pages (they lead back to the home page's sections)
  const sec = (href: string) => `/${href}`;

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="relative max-w-[1440px] mx-auto flex items-center justify-center">
        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-2">
          <LanguageToggle />
          <a
            href={sec("#get-in-touch")}
            className="pointer-events-auto hidden xl:inline-flex items-center rounded-full bg-[#070503] px-4 py-2 text-[13px] font-medium leading-none text-white shadow-sm transition-colors hover:bg-[#1a1613]"
          >
            Request a free call
          </a>
        </div>
        <nav className="pointer-events-auto flex items-center bg-[#f9f8f5]/90 backdrop-blur-md border border-[#070503]/10 rounded-full px-5 py-2 shadow-sm">
          <Link href="/" onClick={goHome} className="mr-6 flex items-center gap-2 text-[#070503] hover:opacity-80 transition-opacity">
            <LogoKarchxIcon className="h-7 w-7" />
            <span className="font-sans font-semibold text-lg tracking-[-0.04em]">KARCHX</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 text-[15px] font-medium text-[#070503]/80">
            {LINKS.map((l) => (
              <a key={l.href} href={sec(l.href)} className="hover:text-[#070503] transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <ThemeToggle className="ml-4" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden ml-2 flex items-center text-sm font-medium text-[#070503]"
            aria-label="Open menu"
          >
            <span className="mr-1">Menu</span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 pointer-events-auto bg-black/40 backdrop-blur-sm flex flex-col p-4 animate-in fade-in duration-200">
          <div className="bg-[#f9f8f5] rounded-3xl p-6 shadow-xl border border-[#070503]/10 flex flex-col max-w-sm w-full mx-auto mt-2">
            <div className="flex items-center justify-between pb-6 border-b border-[#070503]/10">
              <Link href="/" onClick={(e) => { setMobileMenuOpen(false); goHome(e); }} className="flex items-center gap-2 text-[#070503]">
                <LogoKarchxIcon className="h-7 w-7" />
                <span className="font-sans font-semibold text-lg tracking-[-0.04em]">KARCHX</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="text-sm font-medium text-[#070503]/70 hover:text-[#070503]"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-col py-8 space-y-6 text-2xl font-sans tracking-[-0.02em]">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={sec(l.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#070503] hover:text-[#f06800] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <a
              href={sec("#get-in-touch")}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#070503] px-6 py-3.5 text-base font-medium text-white"
            >
              Request a free call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
