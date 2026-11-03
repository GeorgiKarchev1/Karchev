import React from "react";
import Link from "next/link";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#f9f8f5] text-[#070503] flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 max-w-4xl mx-auto px-4 w-full">
        <div className="mb-8">
          <Link href="/" className="text-xs text-[#f06800] hover:underline font-mono">
            ← Back to Home
          </Link>
          <h1 className="font-serif-marist text-4xl sm:text-5xl font-normal text-[#070503] mt-4 mb-2">{title}</h1>
          <p className="text-xs font-mono text-[#070503]/50">Last updated: {updated}</p>
        </div>
        <div className="prose max-w-none text-[#070503]/80 space-y-6 text-sm leading-relaxed">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif-marist text-2xl text-[#070503] font-normal pt-4">{children}</h2>;
}

export function H3({ children }: { children: React.ReactNode }) {
  return <p className="font-medium text-[#070503]">{children}</p>;
}

export function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-6">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export function Term({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="font-medium text-[#070503]">{name}</span>
      <br />
      {children}
    </p>
  );
}

export const linkCls = "text-[#f06800] underline";

export function Mail() {
  return (
    <a href="mailto:georgikarchev5@gmail.com" className={linkCls}>
      georgikarchev5@gmail.com
    </a>
  );
}
