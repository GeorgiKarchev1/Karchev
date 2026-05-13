import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { absoluteUrl } from '@/lib/site'

type FaqItem = {
  question: string
  answer: string
}

type LinkItem = {
  href: string
  label: string
  description: string
}

export type ServiceLandingPageProps = {
  locale: 'bg' | 'en'
  path: string
  title: string
  intro: string
  primaryKeyword: string
  eyebrow: string
  ctaLabel: string
  ctaHref: string
  proof: string[]
  offerTitle: string
  offerPoints: string[]
  outcomesTitle: string
  outcomes: string[]
  faqTitle: string
  faqs: FaqItem[]
  relatedTitle: string
  relatedLinks: LinkItem[]
  serviceName: string
  serviceDescription: string
}

export default function ServiceLandingPage({
  locale,
  path,
  title,
  intro,
  primaryKeyword,
  eyebrow,
  ctaLabel,
  ctaHref,
  proof,
  offerTitle,
  offerPoints,
  outcomesTitle,
  outcomes,
  faqTitle,
  faqs,
  relatedTitle,
  relatedLinks,
  serviceName,
  serviceDescription,
}: ServiceLandingPageProps) {
  const pageUrl = absoluteUrl(path)
  const homeUrl = absoluteUrl(locale === 'bg' ? '/bg' : '/en')
  const pageLanguage = locale === 'bg' ? 'bg' : 'en'

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: serviceName,
        description: serviceDescription,
        provider: {
          '@type': 'Organization',
          name: 'Karchev',
          url: absoluteUrl('/'),
        },
        url: pageUrl,
        serviceType: serviceName,
        areaServed: locale === 'bg' ? 'Bulgaria' : 'United States',
        inLanguage: pageLanguage,
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
            name: title,
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      <section className="pt-36 pb-16 px-6 md:px-8 max-w-[1200px] mx-auto">
        <div className="inline-flex items-center rounded-full border border-[#2d232e]/15 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">
          {eyebrow}
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#2d232e]/45">
              {primaryKeyword}
            </p>
            <h1 className="max-w-4xl text-5xl md:text-7xl font-black leading-[0.92] tracking-tight text-[#2d232e]">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg md:text-xl leading-relaxed text-[#2d232e]/72">
              {intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={ctaHref}
                target={ctaHref.startsWith('http') ? '_blank' : undefined}
                className="inline-flex items-center rounded-full bg-[#2d232e] px-6 py-3.5 text-sm font-black text-[#f1f0ea] transition-colors hover:bg-[#534b52]"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#2d232e]/10 bg-white/70 p-7 shadow-[0_20px_60px_rgba(45,35,46,0.08)]">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">
              {locale === 'bg' ? 'Подходящо за' : 'Best fit for'}
            </p>
            <ul className="space-y-3">
              {proof.map((item) => (
                <li key={item} className="rounded-2xl border border-[#2d232e]/8 bg-[#faf9f5] px-4 py-3 text-sm font-medium text-[#2d232e]/75">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-14 max-w-[1200px] mx-auto">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#2d232e]/10 bg-white/70 p-8">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">
              {offerTitle}
            </p>
            <ul className="space-y-4">
              {offerPoints.map((point) => (
                <li key={point} className="text-base leading-relaxed text-[#2d232e]/78">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-[#2d232e]/10 bg-[#2d232e] p-8 text-[#f1f0ea]">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-white/55">
              {outcomesTitle}
            </p>
            <ul className="space-y-4">
              {outcomes.map((item) => (
                <li key={item} className="text-base leading-relaxed text-white/82">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-14 max-w-[1200px] mx-auto">
        <div className="rounded-[2rem] border border-[#2d232e]/10 bg-white/70 p-8 md:p-10">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">
            {faqTitle}
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-[#2d232e]/8 bg-[#faf9f5] p-5">
                <h2 className="text-lg font-black text-[#2d232e]">{faq.question}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#2d232e]/72">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-24 max-w-[1200px] mx-auto">
        <div className="rounded-[2rem] border border-[#2d232e]/10 bg-[#e0ddcf] p-8 md:p-10">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">
            {relatedTitle}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl border border-[#2d232e]/10 bg-[#f7f4ec] p-5 transition-colors hover:bg-white">
                <h2 className="text-lg font-black text-[#2d232e]">{link.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#2d232e]/72">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
