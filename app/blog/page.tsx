import type { Metadata } from 'next'
import Link from 'next/link'
import { PenLine, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Блог — Уеб разработка, контент и AI | Karchev',
  description: 'Честни статии за уеб разработка, съдържание и AI. Без recycled hot takes — само реален опит от изграждането на дигитални продукти.',
  keywords: [
    'уеб разработка блог',
    'дигитален маркетинг българия',
    'web development blog bulgaria',
    'AI marketing blog',
    'content creation tips',
    'karchev blog',
  ],
  alternates: {
    canonical: 'https://www.karchx.com/blog',
    languages: {
      'bg': 'https://www.karchx.com/blog',
      'en': 'https://www.karchx.com/blog',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    alternateLocale: ['en_US'],
    url: 'https://www.karchx.com/blog',
    title: 'Блог — Уеб разработка, контент и AI | Karchev',
    description: 'Честни статии за уеб разработка, съдържание и AI от Georgi Karchev.',
    siteName: 'Karchev',
  },
}

const publishedPosts = [
  {
    slug: 'kolko-struva-sait-za-malak-biznes',
    titleBG: 'Колко струва сайт за малък бизнес в България — честен отговор',
    excerptBG: 'Ще видиш оферти от 150€ до 5000€. Ето честен разбор на трите варианта, скритите разходи и как да избереш правилното решение.',
    tags: ['Уеб Разработка', 'Цени'],
    date: '25 Апр 2026',
    readTime: '5 мин',
    image: '/blogimg.png',
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
            Честни статии.<br />
            <span className="text-[#534b52]">Без recycled hot takes.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#2d232e]/70 font-medium leading-relaxed max-w-xl">
            Уеб, контент и AI — от практиката. Какво работи, какво не и защо повечето съвети онлайн са безполезни.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t-2 border-[#2d232e] mx-6 md:mx-8 max-w-[1400px] xl:mx-auto" />

      {/* Posts */}
      <section className="py-20 px-6 md:px-8 max-w-[1400px] mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-[#2d232e]/40 mb-8">Публикувано</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {publishedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border-2 border-[#2d232e]/15 hover:border-[#2d232e] bg-white/50 hover:bg-[#e0ddcf] overflow-hidden transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#e0ddcf]">
                <Image
                  src={post.image}
                  alt={post.titleBG}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#534b52] border border-[#534b52]/30 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-base md:text-lg font-black text-[#2d232e] leading-snug mb-2 group-hover:text-[#534b52] transition-colors flex-1">
                  {post.titleBG}
                </h2>
                <p className="text-sm text-[#2d232e]/55 leading-relaxed mb-5">
                  {post.excerptBG}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#2d232e]/10">
                  <div className="flex items-center gap-2 text-xs text-[#2d232e]/40 font-medium">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} четене</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#2d232e]/25 group-hover:text-[#534b52] transition-colors" />
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
