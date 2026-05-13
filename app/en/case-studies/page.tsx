import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { caseStudies } from '@/lib/editorial-content'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Case Studies from Real Website and Automation Projects',
  description: 'The first crawlable Karchev case studies: how we think about offer structure, trust, automation, and conversion logic in real projects.',
  alternates: localizedAlternates('/bg/kazusi', '/en/case-studies', 'en'),
}

const enCases = [caseStudies.enYordan, caseStudies.enEditing]

export default function EnglishCaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-8 max-w-[1200px] mx-auto">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">Case Studies</p>
        <h1 className="mt-5 text-5xl md:text-7xl font-black leading-[0.94] tracking-tight">
          Real project breakdowns,
          <span className="block text-[#534b52]">not just portfolio snapshots.</span>
        </h1>
      </section>

      <section className="px-6 md:px-8 pb-24 max-w-[1200px] mx-auto grid gap-6 md:grid-cols-2">
        {enCases.map((item) => (
          <Link key={item.path} href={item.path} className="overflow-hidden rounded-[2rem] border border-[#2d232e]/10 bg-white/70 transition-colors hover:bg-white">
            <div className="relative aspect-[16/10]">
              <Image src={item.image} alt={item.title} fill className="object-cover object-top" sizes="50vw" />
            </div>
            <div className="p-7">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">{item.category}</p>
              <h2 className="mt-3 text-2xl font-black text-[#2d232e]">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#2d232e]/72">{item.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <Footer />
    </main>
  )
}
