import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { bgBlogArticles } from '@/lib/editorial-content'
import { localizedAlternates } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Блог за уеб разработка, конверсия и AI',
  description: 'Практически статии за сайтове, landing pages, цени, конверсия и AI автоматизации за бизнес.',
  alternates: localizedAlternates('/bg/blog', '/en/blog', 'bg'),
}

export default function BulgarianBlogPage() {
  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-8 max-w-[1200px] mx-auto">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">Блог</p>
        <h1 className="mt-5 text-5xl md:text-7xl font-black leading-[0.94] tracking-tight">
          Полезни SEO и уеб статии,
          <span className="block text-[#534b52]">които подкрепят услугите.</span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#2d232e]/72">
          Пишем само по теми, които имат реална връзка с оферта, страница или business decision. Без filler съдържание.
        </p>
      </section>

      <section className="px-6 md:px-8 pb-24 max-w-[1200px] mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          {bgBlogArticles.map((article) => (
            <Link key={article.path} href={article.path} className="grid overflow-hidden rounded-[2rem] border border-[#2d232e]/10 bg-white/70 transition-colors hover:bg-white">
              <div className="relative aspect-[16/10] md:aspect-[16/9]">
                <Image src={article.image ?? '/blogimg.png'} alt={article.title} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-8">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">{article.category}</p>
                <h2 className="mt-4 text-2xl md:text-3xl font-black leading-tight text-[#2d232e]">{article.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-[#2d232e]/72">{article.description}</p>
                <div className="mt-6 text-sm font-bold text-[#2d232e]/55">
                  {article.date} · {article.readTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
