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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(69,48,32,0.06)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      {/* Decorative line top */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 right-0 h-px bg-[#2d232e]/20 origin-left"
      />

      <div className="container-wide mx-auto relative z-10 text-center max-w-5xl px-4 md:px-6" style={{ perspective: '900px' }}>

        <h2
          className="font-black tracking-tighter mb-8 text-[#2d232e] leading-none text-balance"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          <CharReveal text={t('finalCTA.title')} delay={0} />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          viewport={{ once: true }}
          className="text-xl text-[#2d232e] mb-14 max-w-xl mx-auto font-medium leading-relaxed"
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
            className="btn-secondary bg-[#f1f0ea] text-xl px-14 py-5 shadow-[4px_4px_0px_#2d232e] inline-flex items-center justify-center font-bold"
          >
            {t('finalCTA.button')}
            <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
