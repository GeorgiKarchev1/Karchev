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

// Squiggle underline — draws left-to-right via background-size animation.
// This approach guarantees the line matches text width exactly at all screen sizes.
const SQUIGGLE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 10'%3E%3Cpath d='M0 5 C 10 1%2C 20 9%2C 30 5 S 50 1%2C 60 5 S 80 9%2C 90 5 S 110 1%2C 120 5' fill='none' stroke='%23534b52' stroke-width='2.8' stroke-linecap='round'/%3E%3C/svg%3E")`

function Squiggle({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={{
        backgroundImage: SQUIGGLE_SVG,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: '0 100%',
        backgroundSize: '0% 0.22em',
        display: 'block',
        pointerEvents: 'none',
      }}
      initial={{ backgroundSize: '0% 0.22em' }}
      animate={{ backgroundSize: '100% 0.22em' }}
      transition={{ delay, duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
    />
  )
}

function BrowserFrame({ site }: { site: typeof sites[0] }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#2d232e] group-hover:border-[#534b52]/50 shadow-xl shadow-[#2d232e]/15 group-hover:shadow-2xl group-hover:shadow-[#534b52]/10 bg-[#e0ddcf] transition-all duration-300">
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
      <div className="relative overflow-hidden h-[150px] sm:h-[190px] md:h-[220px] lg:h-[270px]">
        <Image
          src={site.img}
          alt={site.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ objectPosition: site.imgPosition }}
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 360px, 420px"
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
    <section className="relative flex flex-col items-center bg-[#f1f0ea] overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-48 md:pb-32">

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Background — clean, professional, no decorative elements ── */}

      {/* 1. Soft vertical tone shift — top slightly lighter, bottom slightly warmer */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(to bottom, #f4f2ec 0%, #f1f0ea 45%, #ece9de 100%)',
        }}
        aria-hidden="true"
      />

      {/* 2. Two soft radial washes for depth — one warm top-right, one cool-purple bottom-left */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 85% 10%, rgba(83,75,82,0.10) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 10% 95%, rgba(45,35,46,0.08) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* 3. Fine vertical pinstripes — editorial precision, very low opacity */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, #2d232e 0px, #2d232e 1px, transparent 1px, transparent 96px)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%, black 40%, transparent 85%)',
          maskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%, black 40%, transparent 85%)',
        }}
        aria-hidden="true"
      />

      {/* 4. Paper grain — subtle, adds tactility without noise */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22] mix-blend-multiply z-[1]" aria-hidden="true">
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.176  0 0 0 0 0.137  0 0 0 0 0.180  0 0 0 0.5 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* 5. Horizon line — a single hairline rule just above the marquee, architectural */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-px z-[1] hidden md:block"
        style={{
          top: 'calc(50% + 120px)',
          background: 'linear-gradient(to right, transparent 0%, rgba(45,35,46,0.12) 20%, rgba(45,35,46,0.12) 80%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Text ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-5 mb-12 sm:mb-16 md:mb-24 mt-4 md:mt-0 w-full max-w-[1200px]">

        <h1
          className="font-heading font-black leading-[1.05] md:leading-[1.02] mb-6 sm:mb-8 relative w-full"
          style={{ perspective: '900px' }}
        >
          <span className="block text-[#2d232e] text-[2.5rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem]">
            <WordReveal text={t('hero.titleP1')} delay={0.05} />
          </span>
          <span className="block text-center mt-1 sm:mt-2">
            <span className="inline-block whitespace-nowrap text-[2.5rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] text-[#534b52]">
              <WordReveal text={t('hero.titleP2')} delay={0.28} />
              <Squiggle className="mt-1" delay={1.0} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2d232e] mb-8 sm:mb-10 md:mb-12 max-w-[90%] sm:max-w-2xl font-medium leading-relaxed"
        >
          {t('hero.subTitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82 }}
          className="flex flex-col w-full sm:w-auto sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 px-2 sm:px-0 max-w-sm sm:max-w-none mx-auto"
        >
          <Link
            href="https://cal.com/georgi-karchev-3r9puz/30min"
            target="_blank"
            className="btn-primary text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 w-full sm:w-auto justify-center"
          >
            {t('hero.bookStrategyCall')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            href="#portfolio"
            className="btn-secondary w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 text-center"
          >
            {t('hero.seePortfolio')}
          </Link>
        </motion.div>
      </div>

      {/* ── Marquee ───────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full overflow-hidden pb-6 md:pb-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="flex gap-3 md:gap-5"
          style={{
            width: 'max-content',
            animation: 'marquee 38s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {marqueeTrack.map((site, i) => (
            <a
              key={i}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="group shrink-0 w-[240px] sm:w-[300px] md:w-[360px] lg:w-[420px] block"
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
