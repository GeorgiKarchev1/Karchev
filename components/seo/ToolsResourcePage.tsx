import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Lock, Wrench, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { absoluteUrl } from '@/lib/site'

type ToolItem = {
  id: string
  name: string
  desc: string
  badge: string
  badgeColor: string
  category: string
  status: 'available' | 'coming-soon'
  link: string | null
}

type InternalLink = {
  href: string
  label: string
  description: string
}

export type ToolsResourcePageProps = {
  locale: 'bg' | 'en'
  path: string
  eyebrow: string
  title: string
  highlight: string
  intro: string
  liveNotice: string
  tools: ToolItem[]
  ctaEyebrow: string
  ctaTitle: string
  ctaLabel: string
  ctaHref: string
  internalLinksTitle: string
  internalLinks: InternalLink[]
}

export default function ToolsResourcePage(props: ToolsResourcePageProps) {
  const {
    locale,
    path,
    eyebrow,
    title,
    highlight,
    intro,
    liveNotice,
    tools,
    ctaEyebrow,
    ctaTitle,
    ctaLabel,
    ctaHref,
    internalLinksTitle,
    internalLinks,
  } = props

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `${title} ${highlight}`.trim(),
        url: absoluteUrl(path),
        description: intro,
        inLanguage: locale === 'bg' ? 'bg' : 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'bg' ? 'Начало' : 'Home',
            item: absoluteUrl(locale === 'bg' ? '/bg' : '/en'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locale === 'bg' ? 'Инструменти' : 'Tools',
            item: absoluteUrl(path),
          },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-8 max-w-[1400px] mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border-2 border-[#2d232e] bg-[#f1f0ea] text-xs font-bold uppercase tracking-widest text-[#534b52]">
            <Wrench className="w-3 h-3" />
            {eyebrow}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#2d232e] leading-[0.95] tracking-tight mb-6">
            {title}<br />
            <span className="text-[#534b52]">{highlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-[#2d232e]/70 font-medium leading-relaxed max-w-xl">
            {intro}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-[#2d232e]/50 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {liveNotice}
          </div>
        </div>
      </section>

      <div className="border-t-2 border-[#2d232e] mx-6 md:mx-8 max-w-[1400px] xl:mx-auto" />

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
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2d232e]/40 border border-[#2d232e]/20 px-2.5 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                {tool.status === 'coming-soon' ? (
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#2d232e]/40">
                    <Lock className="w-3 h-3" />
                    Soon
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    <Zap className="w-3 h-3" />
                    Live
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#2d232e] mb-3 leading-tight">{tool.name}</h2>
                <p className="text-[#2d232e]/65 text-sm leading-relaxed font-medium">{tool.desc}</p>
              </div>

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

              {tool.status === 'available' && (
                <div className="absolute inset-0 bg-[#2d232e] rounded-2xl -z-10 translate-x-[4px] translate-y-[4px]" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-8 pb-20 max-w-[1400px] mx-auto">
        <div className="rounded-[2rem] border border-[#2d232e]/10 bg-[#e0ddcf] p-8 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">{internalLinksTitle}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {internalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-[#2d232e]/10 bg-[#f7f4ec] p-5 transition-colors hover:bg-white">
                <h2 className="text-lg font-black text-[#2d232e]">{item.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#2d232e]/72">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-[#2d232e] bg-[#2d232e] py-16 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">{ctaEyebrow}</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#f1f0ea] leading-tight">
              {ctaTitle}
            </h2>
          </div>
          <Link
            href={ctaHref}
            target="_blank"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f1f0ea] text-[#2d232e] text-sm font-black border-2 border-[#f1f0ea] hover:bg-[#534b52] hover:text-[#f1f0ea] hover:border-[#534b52] transition-all duration-300 group"
          >
            {ctaLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
