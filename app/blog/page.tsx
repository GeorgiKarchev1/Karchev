import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, PenLine } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Real talk on content, web, and AI — no recycled hot takes, no generic advice. Written by Georgi Karchev.',
  alternates: { canonical: 'https://gkarch.com/blog' },
}

const upcomingTopics = [
  {
    title: 'How I got 105K views in 60 days — the full breakdown',
    tags: ['Content', 'Instagram', 'Reels'],
  },
  {
    title: 'Claude Code changed how I build websites. Here\'s the exact setup.',
    tags: ['AI', 'Dev', 'Claude'],
  },
  {
    title: 'Why most agency websites repel clients before they read a word',
    tags: ['Web', 'Copywriting', 'Conversion'],
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-8 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border-2 border-[#2d232e] bg-[#f1f0ea] text-xs font-bold uppercase tracking-widest text-[#534b52]">
            <PenLine className="w-3 h-3" />
            Blog
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#2d232e] leading-[0.95] tracking-tight mb-6">
            Real talk.<br />
            <span className="text-[#534b52]">No recycled hot takes.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#2d232e]/70 font-medium leading-relaxed max-w-xl">
            Content, web, and AI — written from the trenches. What worked, what didn&apos;t, and why most advice online is useless.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t-2 border-[#2d232e] mx-6 md:mx-8 max-w-[1400px] xl:mx-auto" />

      {/* Coming soon state */}
      <section className="py-20 px-6 md:px-8 max-w-[1400px] mx-auto">

        {/* First drop teaser */}
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2d232e]/40 mb-6">First drop incoming</p>
          <div className="flex flex-col gap-4">
            {upcomingTopics.map((topic, i) => (
              <div
                key={i}
                className="group flex items-center justify-between gap-6 p-6 border-2 border-[#2d232e]/20 rounded-2xl hover:border-[#2d232e] hover:bg-[#e0ddcf] transition-all duration-200 cursor-default"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[#2d232e]/25 font-black text-lg tabular-nums pt-0.5 w-6 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-black text-[#2d232e] leading-snug mb-2">{topic.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {topic.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#534b52] border border-[#534b52]/30 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#2d232e]/25 flex-shrink-0 group-hover:text-[#534b52] transition-colors">
                  Soon
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notify strip */}
        <div className="bg-[#2d232e] rounded-2xl border-2 border-[#2d232e] shadow-[4px_4px_0px_#534b52] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Don&apos;t miss the first post</p>
            <h2 className="text-xl md:text-2xl font-black text-[#f1f0ea] leading-tight">
              Follow on Instagram for the real-time drops.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f1f0ea] text-[#2d232e] text-sm font-black border-2 border-[#f1f0ea] hover:bg-[#534b52] hover:text-[#f1f0ea] hover:border-[#534b52] transition-all duration-300 group"
            >
              Follow on Instagram
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              href="https://cal.com/georgi-karchev-3r9puz/30min"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-transparent text-[#f1f0ea] text-sm font-black border-2 border-white/20 hover:border-white/60 transition-all duration-300"
            >
              Or book a call
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
