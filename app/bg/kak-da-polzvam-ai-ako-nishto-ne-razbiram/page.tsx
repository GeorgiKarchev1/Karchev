import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowDown, ShieldCheck, Sparkles, Smile } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AiDemoChat from '@/components/funnel/AiDemoChat'
import { absoluteUrl } from '@/lib/site'

const PATH = '/bg/kak-da-polzvam-ai-ako-nishto-ne-razbiram'
const BOOKING_URL = 'https://cal.com/georgi-karchev-3r9puz/30min'

export const metadata: Metadata = {
  title: 'Как да ползвам AI, ако нищо не разбирам? Пробвай на живо',
  description:
    'Не разбираш от технологии и AI ти звучи плашещо? Пробвай тук как е да говориш с изкуствен интелект — на български, безплатно, без да инсталираш нищо. За начинаещи и скептици.',
  alternates: { canonical: absoluteUrl(PATH) },
  keywords: [
    'как да ползвам AI ако нищо не разбирам',
    'как да използвам изкуствен интелект',
    'изкуствен интелект за начинаещи',
    'AI за начинаещи',
    'как да говоря с AI',
    'ChatGPT за начинаещи',
    'AI на български',
    'как да започна с AI',
    'AI за възрастни хора',
    'безплатен AI чат на български',
  ],
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: absoluteUrl(PATH),
    title: 'Как да ползвам AI, ако нищо не разбирам? Пробвай на живо',
    description:
      'Пробвай как е да говориш с изкуствен интелект — на български, безплатно, без нищо за инсталиране. За начинаещи и скептици.',
    siteName: 'Karchev',
    images: [{ url: '/img/og-image.png', width: 1536, height: 1024, alt: 'Karchev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Как да ползвам AI, ако нищо не разбирам? Пробвай на живо',
    description: 'Пробвай как е да говориш с изкуствен интелект — на български, безплатно.',
    images: ['/img/og-image.png'],
  },
}

const FAQ = [
  {
    question: 'Трябва ли да разбирам от технологии, за да ползвам AI?',
    answer:
      'Не. Ако можеш да напишеш съобщение по телефона, можеш да ползваш AI. Пишеш му с нормални думи на български, все едно говориш с човек.',
  },
  {
    question: 'Безплатно ли е?',
    answer:
      'Да. Чатът на тази страница е безплатен и не изисква регистрация или инсталиране на нищо. Просто пиши и пробвай.',
  },
  {
    question: 'Опасно ли е да ползвам AI?',
    answer:
      'Не, ако спазваш едно просто правило: не въвеждай лични данни (ЕГН, банкови карти, пароли) и проверявай важната информация. При тези условия ползването е безопасно.',
  },
  {
    question: 'Ще замени ли AI работата на хората?',
    answer:
      'AI няма да замени самите хора толкова бързо, колкото се говори — но хората, които го ползват, изпреварват тези, които не го ползват. Затова си струва да го опознаеш.',
  },
]

const POINTS = [
  {
    icon: Smile,
    title: 'Не ти трябва да разбираш как работи',
    body: 'Караш кола, без да знаеш как работи двигателят. С AI е същото — просто му пишеш на български какво искаш.',
  },
  {
    icon: ShieldCheck,
    title: 'Безопасно е, ако пазиш данните си',
    body: 'Не въвеждаш лични данни и проверяваш важното. Толкова. Никакъв риск, никакви скрити уловки.',
  },
  {
    icon: Sparkles,
    title: 'Помага ти всеки ден',
    body: 'Писане на писма, обясняване на документи, идеи, превод, обобщения. Като търпелив помощник 24/7.',
  },
]

export default function HowToUseAiFunnelPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'WebPage',
        name: 'Как да ползвам AI, ако нищо не разбирам?',
        url: absoluteUrl(PATH),
        inLanguage: 'bg',
        description:
          'Пробвай как е да говориш с изкуствен интелект — на български, безплатно. За начинаещи и скептици.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Начало', item: absoluteUrl('/bg') },
          { '@type': 'ListItem', position: 2, name: 'Как да ползвам AI', item: absoluteUrl(PATH) },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen bg-[#f1f0ea] text-[#2d232e] selection:bg-[#534b52]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />

      {/* 1 ─ HERO: one clear promise + one primary action */}
      <section className="bg-gradient-to-b from-[#f6f3ed] to-[#f1f0ea] px-6 pb-16 pt-36 text-center md:px-8 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">AI за начинаещи</p>
          <h1 className="mx-auto mt-5 max-w-[18ch] text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Как да ползвам AI, ако нищо не разбирам?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#2d232e]/70">
            Не ти трябва да разбираш как работи. Трябва само да го пробваш веднъж — точно тук, отдолу. 👇
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#probvai"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2d232e] px-8 py-4 text-sm font-black text-[#f1f0ea] shadow-lg shadow-[#2d232e]/10 transition-colors hover:bg-[#534b52] sm:w-auto"
            >
              Пробвай бота безплатно <ArrowDown className="h-4 w-4" />
            </a>
            <Link
              href={BOOKING_URL}
              target="_blank"
              className="text-sm font-bold text-[#2d232e]/60 underline-offset-4 transition-colors hover:text-[#2d232e] hover:underline"
            >
              или запази безплатен разговор →
            </Link>
          </div>
        </div>
      </section>

      {/* 2 ─ THE DEMO: the focal point, on its own distinct band */}
      <section
        id="probvai"
        className="scroll-mt-24 border-y border-[#2d232e]/10 bg-gradient-to-b from-[#efe9dd] to-[#e9e3d5] px-6 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#534b52]">Опитай на живо</p>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-4xl">
            Говори с Карчи — нашия AI асистент
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#2d232e]/70">
            Истински AI. Пиши му на български, както би писал на приятел — и усети за 30 секунди какво е.
          </p>
        </div>
        <div className="mt-10">
          <AiDemoChat />
        </div>
        <p className="mx-auto mt-4 max-w-[640px] text-center text-xs text-[#2d232e]/45">
          Безопасно демо · не въвеждай лични данни · отговорите са примерни и за ориентация
        </p>
      </section>

      {/* 3 ─ REASSURANCE: three quick, scannable points */}
      <section className="px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 max-w-md text-2xl font-black leading-snug md:text-3xl">
            Защо няма от какво да се страхуваш
          </h2>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-3">
            {POINTS.map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e0ddcf] text-[#2d232e]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-black md:text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2d232e]/65">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 ─ BUSINESS: the conversion moment, high-contrast dark band */}
      <section className="bg-[#2d232e] px-6 py-16 text-[#f1f0ea] md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f1f0ea]/50">За твоя бизнес</p>
          <h2 className="mt-4 max-w-[20ch] text-3xl font-black leading-tight tracking-tight md:text-4xl">
            Хареса ли ти? Това може да работи за бизнеса ти.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#f1f0ea]/70">
            Същият тип асистент може да отговаря на клиентите ти, да пише публикации и да поема рутината.
            Не е нужно ти да ставаш експерт — ние вграждаме AI в инструментите, които вече ползваш.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/bg/ai-integratsiya"
              className="inline-flex items-center gap-2 rounded-full bg-[#f1f0ea] px-6 py-3.5 text-sm font-black text-[#2d232e] transition-colors hover:bg-white"
            >
              AI интеграция за бизнес <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={BOOKING_URL}
              target="_blank"
              className="inline-flex items-center rounded-full border border-[#f1f0ea]/30 px-6 py-3.5 text-sm font-black text-[#f1f0ea] transition-colors hover:bg-[#f1f0ea]/10"
            >
              Запази безплатен разговор
            </Link>
          </div>
        </div>
      </section>

      {/* 5 ─ FAQ */}
      <section className="px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-black md:text-3xl">Често задавани въпроси</h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-[#2d232e]/10 bg-white/70 px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold text-[#2d232e] md:text-lg">
                  {item.question}
                  <span className="text-[#534b52] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-[#2d232e]/72">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
