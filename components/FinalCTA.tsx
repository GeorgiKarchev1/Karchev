'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

function CharReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ')

  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {words.map((word, wordIdx) => {
        const offset = words.slice(0, wordIdx).join('').length + wordIdx
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIdx) => {
              const currentDelay = delay + (offset + charIdx) * 0.03
              return (
                <motion.span
                  key={charIdx}
                  className="inline-block"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: currentDelay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: '50% 0%' }}
                >
                  {char}
                </motion.span>
              )
            })}
            {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        )
      })}
    </span>
  )
}

export default function FinalCTA() {
  const { t } = useLanguage()

  return (
    <section className="py-24 md:py-40 relative overflow-hidden bg-[#e0ddcf] flex items-center justify-center border-t-2 border-b-2 border-[#2d232e]">
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/img/final-cta-background-desktop-generated.png" />
          <img
            src="/img/final-cta-background-small-generated-v3.png"
            alt=""
            className="final-cta-illustration-media"
          />
        </picture>
      </div>
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(244,239,230,0.9)_0%,rgba(244,239,230,0.8)_24%,rgba(244,239,230,0.68)_55%,rgba(244,239,230,0.86)_100%)] pointer-events-none lg:hidden" />
      <div className="absolute inset-0 z-[2] hidden bg-[linear-gradient(180deg,rgba(244,239,230,0.78)_0%,rgba(244,239,230,0.62)_24%,rgba(244,239,230,0.48)_52%,rgba(244,239,230,0.72)_100%)] pointer-events-none lg:block" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,_rgba(69,48,32,0.028)_0%,_transparent_62%)] pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-grid opacity-[0.06] pointer-events-none" />

      {/* Decorative line top */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 z-[4] h-px bg-[#2d232e]/20 origin-left"
      />

      <div className="container-wide mx-auto relative z-10 max-w-5xl px-4 md:px-6" style={{ perspective: '900px' }}>
        <div className="mx-auto max-w-4xl px-1 py-2 text-center sm:px-4 md:px-0 md:py-0">
          <h2
            className="mb-6 font-black leading-none tracking-tighter text-[#2d232e] text-balance sm:mb-7 md:mb-8"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 9rem)' }}
          >
            <CharReveal text={t('finalCTA.title')} delay={0} />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-[34rem] text-[clamp(1rem,3.8vw,1.25rem)] font-medium leading-relaxed text-[#2d232e] sm:mb-12 md:mb-14"
          >
            {t('finalCTA.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotateX: -4, y: -4 }}
            style={{ transformPerspective: 600, display: 'inline-block' }}
          >
            <Link
              href="https://cal.com/georgi-karchev-3r9puz/30min"
              target="_blank"
              className="btn-secondary inline-flex items-center justify-center bg-[#f1f0ea] px-6 py-4 text-base font-bold shadow-[4px_4px_0px_#2d232e] sm:px-10 sm:text-lg md:px-14 md:py-5 md:text-xl"
            >
              {t('finalCTA.button')}
              <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
