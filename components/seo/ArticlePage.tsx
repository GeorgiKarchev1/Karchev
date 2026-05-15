import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { absoluteUrl } from '@/lib/site'

type ArticleSection = {
  heading: string
  body?: string
  list?: string[]
  subsections?: Array<{
    title: string
    body: string
  }>
}

export type ArticlePageProps = {
  locale: 'bg' | 'en'
  path: string
  title: string
  description: string
  image?: string
  category: string
  readTime: string
  date: string
  intro: string
  sections: ArticleSection[]
  ctaLabel: string
  ctaHref: string
  backHref: string
  backLabel: string
  relatedServiceHref: string
  relatedServiceLabel: string
}

export default function ArticlePage(props: ArticlePageProps) {
  const {
    locale,
    path,
    title,
    description,
    image,
    category,
    readTime,
    date,
    intro,
    sections,
    ctaLabel,
    ctaHref,
    backHref,
    backLabel,
    relatedServiceHref,
    relatedServiceLabel,
  } = props

  const pageUrl = absoluteUrl(path)
  const homeUrl = absoluteUrl(locale === 'bg' ? '/bg' : '/en')
  const heroImage = image ?? '/blogimg.png'

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: title,
        description,
        image: absoluteUrl(heroImage),
        datePublished: '2026-04-25T00:00:00.000Z',
        dateModified: '2026-04-25T00:00:00.000Z',
        author: {
          '@type': 'Person',
          name: 'Georgi Karchev',
          url: absoluteUrl('/'),
        },
        publisher: {
          '@type': 'Organization',
          name: 'Karchev',
          url: absoluteUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/img/newfav.png'),
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
        inLanguage: locale === 'bg' ? 'bg' : 'en',
        articleSection: category,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'bg' ? 'Начало' : 'Home',
            item: homeUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: locale === 'bg' ? 'Блог' : 'Blog',
            item: absoluteUrl(locale === 'bg' ? '/bg/blog' : '/en/blog'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      <article className="pt-36 pb-24 px-6 md:px-8 max-w-[760px] mx-auto">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d232e]/60 hover:text-[#2d232e] transition-colors"
        >
          {backLabel}
        </Link>

        <div className="mt-10 flex items-center gap-3 mb-6 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-widest text-[#534b52] border border-[#534b52]/30 px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-xs text-[#2d232e]/40 font-medium">{date}</span>
          <span className="text-xs text-[#2d232e]/40 font-medium">·</span>
          <span className="text-xs text-[#2d232e]/40 font-medium">{readTime}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-[#2d232e] leading-tight tracking-tight mb-8">
          {title}
        </h1>
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[2rem] border border-[#2d232e]/10 bg-white/60">
          <Image src={heroImage} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 760px" priority />
        </div>
        <div className="w-16 h-1 bg-[#534b52] rounded-full mb-10" />
        <p className="text-lg md:text-xl leading-relaxed text-[#2d232e]/80 mb-12 font-medium">
          {intro}
        </p>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-black text-[#2d232e] mb-4 leading-snug">
                {section.heading}
              </h2>
              {section.body && (
                <p className="text-base md:text-lg leading-relaxed text-[#2d232e]/75">
                  {section.body}
                </p>
              )}
              {section.subsections && (
                <div className="space-y-6 mt-2">
                  {section.subsections.map((sub) => (
                    <div key={sub.title} className="pl-5 border-l-4 border-[#534b52]/30">
                      <h3 className="text-base md:text-lg font-bold text-[#2d232e] mb-2">
                        {sub.title}
                      </h3>
                      <p className="text-base leading-relaxed text-[#2d232e]/70">
                        {sub.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {section.list && (
                <ul className="mt-4 space-y-3">
                  {section.list.map((item) => (
                    <li key={item} className="rounded-2xl border border-[#2d232e]/8 bg-white/70 px-4 py-3 text-base leading-relaxed text-[#2d232e]/72">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-[#2d232e]/10 bg-[#e0ddcf] p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">
            {locale === 'bg' ? 'Следващ логичен ход' : 'Logical next step'}
          </p>
          <h2 className="mt-3 text-2xl font-black text-[#2d232e]">{relatedServiceLabel}</h2>
          <p className="mt-3 text-base leading-relaxed text-[#2d232e]/75">
            {locale === 'bg'
              ? 'Ако темата ти е релевантна, следващата стъпка е да я превърнем в реална оферта или страница, която продава.'
              : 'If this topic is relevant to your business, the next step is turning it into a stronger offer or a page that actually converts.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={relatedServiceHref} className="inline-flex items-center rounded-full bg-[#2d232e] px-6 py-3.5 text-sm font-black text-[#f1f0ea] transition-colors hover:bg-[#534b52]">
              {relatedServiceLabel}
            </Link>
            <Link href={ctaHref} target="_blank" className="inline-flex items-center rounded-full border border-[#2d232e] px-6 py-3.5 text-sm font-black text-[#2d232e] transition-colors hover:bg-white">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
