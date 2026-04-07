'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

const sites = [
  { name: 'GBGamingHub',       url: 'gbgaminghub.com',    img: '/img/gbgaminghub.png',  href: 'https://www.gbgaminghub.com/',  imgPosition: 'top' },
  { name: 'The Agency Course',  url: 'theagencycourse.bg', img: '/img/theagency.png',    href: 'https://theagencycourse.bg/',   imgPosition: 'top' },
  { name: 'Готов за час',       url: 'gotovzachas.com',    img: '/img/gotovzachas.png',  href: 'https://gotovzachas.com/',      imgPosition: 'top' },
  { name: 'AI Marketing',       url: 'aimarketing.bg',     img: '/img/aimarketing.png',  href: 'https://aimarketing.bg/',       imgPosition: 'top' },
  { name: 'InPlayGear',         url: 'inplaygear.com',     img: '/img/inplaygear.png',   href: 'https://inplaygear.com/',       imgPosition: '50% 15%' },
  { name: 'Editing.bg',         url: 'editing.bg',         img: '/img/editingbg.png',    href: 'https://editing.bg/',           imgPosition: 'center' },
]

// Duplicate for seamless infinite loop
const marqueeTrack = [...sites, ...sites]

function WordReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
          <motion.span
            className="inline-block"
            initial={{ rotateX: 90, opacity: 0, y: '70%' }}
            animate={{ rotateX: 0, opacity: 1, y: '0%' }}
            transition={{ duration: 0.75, delay: delay + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '50% 0%', display: 'inline-block' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  )
}

function BrowserFrame({ site }: { site: typeof sites[0] }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#2d232e] group-hover:border-[#534b52]/50 shadow-xl shadow-[#2d232e]/15 group-hover:shadow-2xl group-hover:shadow-[#534b52]/10 bg-[#e0ddcf] transition-all duration-300">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#e0ddcf] border-b border-[#2d232e]">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="flex-1 mx-2 bg-[#e0ddcf] rounded-md px-3 py-1 text-[10px] text-[#2d232e] font-mono truncate">
          {site.url}
        </div>
      </div>
      {/* Screenshot */}
      <div className="relative overflow-hidden h-[220px] lg:h-[270px]">
        <Image
          src={site.img}
          alt={site.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ objectPosition: site.imgPosition }}
          sizes="(max-width: 1024px) 360px, 420px"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f1f0ea]/30 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const [paused, setPaused] = useState(false)

  return (
    <section className="relative flex flex-col items-center bg-[#f1f0ea] overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32">

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* Background glow removed for cleaner styling */}
      <div className="absolute inset-0 bg-grid opacity-12 pointer-events-none" />

      {/* ── Text ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 mb-16 md:mb-24 mt-8 md:mt-0">

        <h1
          className="font-heading font-black leading-[1.02] mb-8"
          style={{ perspective: '900px' }}
        >
          <span className="block text-[#2d232e] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem]">
            <WordReveal text={t('hero.titleP1')} delay={0.05} />
          </span>
          <span
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] text-[#534b52] mt-2"
          >
            <WordReveal text={t('hero.titleP2')} delay={0.28} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-lg sm:text-xl md:text-2xl text-[#2d232e] mb-12 max-w-2xl font-medium leading-relaxed"
        >
          {t('hero.subTitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82 }}
          className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 px-4 sm:px-0"
        >
          <Link
            href="https://cal.com/georgi-karchev-3r9puz/30min"
            target="_blank"
            className="btn-primary text-base md:text-lg px-8 md:px-10 py-4 md:py-5 w-full sm:w-auto"
          >
            {t('hero.bookStrategyCall')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            href="#portfolio"
            className="btn-secondary w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-4 md:py-5 text-center"
          >
            {t('hero.seePortfolio')}
          </Link>
        </motion.div>
      </div>

      {/* ── Marquee — Desktop only ─────────────────────────────────── */}
      <motion.div
        className="hidden md:block relative z-10 w-full overflow-hidden pb-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Fade edges removed to fix the grid blocking 'lights' */}

        <div
          className="flex gap-5"
          style={{
            width: 'max-content',
            animation: 'marquee 38s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {marqueeTrack.map((site, i) => (
            // group on <a> so hover hitbox is stable — inner elements scale via group-hover:
            <a
              key={i}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="group shrink-0 w-[360px] lg:w-[420px] block"
            >
              <div className="transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                <BrowserFrame site={site} />
              </div>
            </a>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
