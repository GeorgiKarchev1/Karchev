'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

function WordReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden pb-[0.06em] ${i < words.length - 1 ? 'mr-[0.22em]' : ''}`}
        >
          <motion.span
            className="inline-block"
            initial={{ rotateX: 90, opacity: 0, y: '70%' }}
            animate={{ rotateX: 0, opacity: 1, y: '0%' }}
            transition={{ duration: 0.75, delay: delay + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '50% 0%', display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

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

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative flex min-h-[max(100svh,50rem)] flex-col items-center justify-start overflow-hidden bg-[#f6f3ed] sm:min-h-[max(100svh,54rem)] md:min-h-[100svh] md:justify-center">

      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,#fcfaf5_0%,#f8f4ed_38%,#f6f3ed_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_55%_at_85%_10%,rgba(83,75,82,0.10)_0%,transparent_60%),radial-gradient(ellipse_70%_50%_at_10%_95%,rgba(45,35,46,0.08)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <img
          src="/img/hero-background-mobile-generated.png"
          alt=""
          className="hero-illustration-mobile"
        />
        <img
          src="/img/hero-background-generated.png"
          alt=""
          className="hero-illustration-desktop"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[2] md:hidden bg-[linear-gradient(180deg,rgba(252,250,245,0.97)_0%,rgba(252,250,245,0.95)_48%,rgba(246,243,237,0.25)_70%,rgba(246,243,237,0.3)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] hidden md:block bg-[linear-gradient(180deg,rgba(252,250,245,0.54)_0%,rgba(246,243,237,0.18)_42%,rgba(246,243,237,0.44)_100%)]" />

      {/* Content */}
      <div className="container-wide relative z-10 flex w-full flex-col items-center px-4 pb-8 pt-[18vh] text-center sm:px-5 sm:pb-10 sm:pt-[22vh] md:py-36 lg:py-40">

        <h1
          className="relative mb-4 w-full font-heading font-black leading-[1.02] tracking-[-0.02em] sm:mb-5 md:mb-6"
          style={{ perspective: '900px' }}
        >
          <span className="block text-[clamp(1.6rem,5.5vw,3rem)] text-[#2d232e]">
            <WordReveal text={t('hero.titleP1')} delay={0.1} />
          </span>
          <span className="mt-1 block">
            <span className="inline-block text-[clamp(1.6rem,5.5vw,3rem)] text-[#534b52]">
              <WordReveal text={t('hero.titleP2')} delay={0.28} />
              <Squiggle className="mt-1" delay={1.0} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mb-6 w-full max-w-[min(90%,34rem)] text-[clamp(0.85rem,2.5vw,1rem)] font-medium leading-relaxed text-[#2d232e]/75 sm:mb-8 md:mb-10"
        >
          {t('hero.subTitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82 }}
          className="mx-auto flex w-full max-w-[16rem] flex-col items-stretch gap-2.5 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3"
        >
          <Link
            href="https://cal.com/georgi-karchev-3r9puz/30min"
            target="_blank"
            className="btn-primary w-full justify-center px-5 py-2.5 text-sm sm:w-auto sm:px-6 sm:py-3 md:px-8 md:py-3.5 md:text-base"
          >
            {t('hero.bookStrategyCall')}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link
            href="#portfolio"
            className="btn-secondary w-full px-5 py-2.5 text-center text-sm sm:w-auto sm:px-6 sm:py-3 md:px-8 md:py-3.5 md:text-base"
          >
            {t('hero.seePortfolio')}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
