import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Wrench, Zap, Lock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Free Tools & Resources',
  description: 'Free MCP servers, Claude Code setups, and AI automation tools — built and tested by Georgi Karchev. No fluff, no paywalls on the free tier.',
  alternates: { canonical: 'https://gkarch.com/tools' },
}

const tools = [
  {
    id: 'rtk',
    name: 'RTK — Rust Token Killer',
    desc: 'A CLI proxy that cuts Claude Code token usage by 60–90% on everyday dev operations. Transparent drop-in: your commands stay the same.',
    badge: 'Free',
    badgeColor: 'bg-emerald-400 text-[#2d232e]',
    category: 'Claude Code',
    status: 'available',
    link: 'https://github.com/GeorgiKarchev1',
  },
  {
    id: 'mcp-pack',
    name: 'Claude MCP Server Pack',
    desc: 'A curated set of MCP servers that turn Claude into a real dev companion — filesystem, browser control, search, and more. Pre-configured, one-command install.',
    badge: 'Free',
    badgeColor: 'bg-emerald-400 text-[#2d232e]',
    category: 'MCP',
    status: 'coming-soon',
    link: null,
  },
  {
    id: 'content-ai',
    name: 'AI Content Workflow',
    desc: 'The exact Claude prompts + automation setup I use to script, plan, and repurpose content at scale. From one idea to 10 posts in 20 minutes.',
    badge: 'Free',
    badgeColor: 'bg-emerald-400 text-[#2d232e]',
    category: 'Content',
    status: 'coming-soon',
    link: null,
  },
  {
    id: 'claude-hooks',
    name: 'Claude Code Hooks Library',
    desc: 'Drop-in hooks for Claude Code: auto-lint on edit, smart git commit messages, test-before-commit guard, and more. Copy → paste → done.',
    badge: 'Free',
    badgeColor: 'bg-emerald-400 text-[#2d232e]',
    category: 'Claude Code',
    status: 'coming-soon',
    link: null,
  },
]

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-8 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border-2 border-[#2d232e] bg-[#f1f0ea] text-xs font-bold uppercase tracking-widest text-[#534b52]">
            <Wrench className="w-3 h-3" />
            Free Tools & Resources
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#2d232e] leading-[0.95] tracking-tight mb-6">
            Tools that work<br />
            <span className="text-[#534b52]">as hard as you do.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#2d232e]/70 font-medium leading-relaxed max-w-xl">
            Free MCP servers, Claude Code setups, and automation templates — built from real workflows, not tutorials.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-[#2d232e]/50 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            More tools dropping regularly — follow along
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t-2 border-[#2d232e] mx-6 md:mx-8 max-w-[1400px] xl:mx-auto" />

      {/* Tools Grid */}
      <section className="py-20 px-6 md:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`relative bg-[#f1f0ea] border-2 border-[#2d232e] rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 ${
                tool.status === 'available'
                  ? 'shadow-[4px_4px_0px_#2d232e] hover:shadow-[6px_6px_0px_#2d232e] hover:-translate-y-0.5 hover:-translate-x-0.5 cursor-pointer'
                  : 'opacity-75'
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2d232e]/40 border border-[#2d232e]/20 px-2.5 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                {tool.status === 'coming-soon' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#2d232e]/40">
                    <Lock className="w-3 h-3" />
                    Soon
                  </div>
                )}
                {tool.status === 'available' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    <Zap className="w-3 h-3" />
                    Live
                  </div>
                )}
              </div>

              {/* Name + desc */}
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#2d232e] mb-3 leading-tight">{tool.name}</h2>
                <p className="text-[#2d232e]/65 text-sm leading-relaxed font-medium">{tool.desc}</p>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                {tool.status === 'available' && tool.link ? (
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#2d232e] hover:text-[#534b52] transition-colors group"
                  >
                    Get it free
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="text-sm font-bold text-[#2d232e]/30 cursor-not-allowed">
                    Dropping soon
                  </span>
                )}
              </div>

              {/* Decorative shadow block for available tools */}
              {tool.status === 'available' && (
                <div className="absolute inset-0 bg-[#2d232e] rounded-2xl -z-10 translate-x-[4px] translate-y-[4px]" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t-2 border-[#2d232e] bg-[#2d232e] py-16 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Want custom AI tooling?</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#f1f0ea] leading-tight">
              I also build bespoke Claude setups<br className="hidden md:block" /> and automations for clients.
            </h2>
          </div>
          <Link
            href="https://cal.com/georgi-karchev-3r9puz/30min"
            target="_blank"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f1f0ea] text-[#2d232e] text-sm font-black border-2 border-[#f1f0ea] hover:bg-[#534b52] hover:text-[#f1f0ea] hover:border-[#534b52] transition-all duration-300 group"
          >
            Book a free call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
