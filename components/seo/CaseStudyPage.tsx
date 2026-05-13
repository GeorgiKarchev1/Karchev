import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { absoluteUrl } from '@/lib/site'

type Metric = {
  label: string
  value: string
}

export type CaseStudyPageProps = {
  locale: 'bg' | 'en'
  path: string
  title: string
  description: string
  client: string
  category: string
  challenge: string
  solution: string[]
  outcome: string[]
  metrics: Metric[]
  liveUrl: string
  image: string
}

export default function CaseStudyPage(props: CaseStudyPageProps) {
  const {
    locale,
    path,
    title,
    description,
    client,
    category,
    challenge,
    solution,
    outcome,
    metrics,
    liveUrl,
    image,
  } = props

  const pageUrl = absoluteUrl(path)
  const homeUrl = absoluteUrl(locale === 'bg' ? '/bg' : '/en')
  const caseStudiesUrl = absoluteUrl(locale === 'bg' ? '/bg/kazusi' : '/en/case-studies')

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: title,
        description,
        url: pageUrl,
        image: absoluteUrl(image),
        author: {
          '@type': 'Organization',
          name: 'Karchev',
          url: absoluteUrl('/'),
        },
        about: client,
        inLanguage: locale === 'bg' ? 'bg' : 'en',
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
            name: locale === 'bg' ? 'Казуси' : 'Case Studies',
            item: caseStudiesUrl,
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

      <section className="pt-36 pb-16 px-6 md:px-8 max-w-[1180px] mx-auto">
        <Link
          href={locale === 'bg' ? '/bg/kazusi' : '/en/case-studies'}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d232e]/60 hover:text-[#2d232e] transition-colors"
        >
          {locale === 'bg' ? 'Назад към казусите' : 'Back to case studies'}
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#534b52]">{category}</p>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.92] tracking-tight text-[#2d232e]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-[#2d232e]/72">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#2d232e] px-6 py-3.5 text-sm font-black text-[#f1f0ea] transition-colors hover:bg-[#534b52]"
              >
                {locale === 'bg' ? 'Виж live сайта' : 'View live site'}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.5rem] border border-[#2d232e]/10 bg-white/70 p-6">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#534b52]">{metric.label}</p>
                <p className="mt-3 text-3xl font-black text-[#2d232e]">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-14 max-w-[1180px] mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#2d232e]/10 bg-white/80">
          <div className="relative aspect-[16/9]">
            <Image src={image} alt={title} fill className="object-cover object-top" sizes="100vw" />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-24 max-w-[1180px] mx-auto">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-[#2d232e]/10 bg-white/70 p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">
              {locale === 'bg' ? 'Клиент' : 'Client'}
            </p>
            <h2 className="mt-3 text-2xl font-black text-[#2d232e]">{client}</h2>
          </div>
          <div className="rounded-[2rem] border border-[#2d232e]/10 bg-white/70 p-8 lg:col-span-2">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">
              {locale === 'bg' ? 'Проблемът' : 'The challenge'}
            </p>
            <p className="mt-3 text-base leading-relaxed text-[#2d232e]/75">{challenge}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#2d232e]/10 bg-[#2d232e] p-8 text-[#f1f0ea]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/55">
              {locale === 'bg' ? 'Какво изградихме' : 'What we built'}
            </p>
            <ul className="mt-5 space-y-4">
              {solution.map((item) => (
                <li key={item} className="text-base leading-relaxed text-white/82">{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-[#2d232e]/10 bg-[#e0ddcf] p-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">
              {locale === 'bg' ? 'Какъв беше ефектът' : 'What changed'}
            </p>
            <ul className="mt-5 space-y-4">
              {outcome.map((item) => (
                <li key={item} className="text-base leading-relaxed text-[#2d232e]/75">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
