'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check, Workflow, Network } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export default function Solution() {
  const { t } = useLanguage()
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      // Heading split-reveal
      gsap.from('.solution-eyebrow, .solution-title, .solution-sub', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.solution-heading', start: 'top 80%' },
      })

      // Scroll-scrubbed 3D tilt — feels like cards turn toward you as you scroll
      gsap.utils.toArray<HTMLElement>('.solution-card').forEach((card, i) => {
        const dir = i === 0 ? 1 : -1
        gsap.fromTo(
          card,
          { rotateY: 14 * dir, rotateX: 6, y: 60, opacity: 0 },
          {
            rotateY: 0, rotateX: 0, y: 0, opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 45%',
              scrub: 0.8,
            },
          }
        )

        // Stagger features inside
        gsap.from(card.querySelectorAll('.feature-item'), {
          x: -24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: card, start: 'top 70%' },
        })
      })
    },
    { scope: rootRef }
  )

  const contentFeatures = [
    { title: t('solution.content.f1.title'), desc: t('solution.content.f1.desc') },
    { title: t('solution.content.f2.title'), desc: t('solution.content.f2.desc') },
    { title: t('solution.content.f3.title'), desc: t('solution.content.f3.desc') },
  ]

  const webFeatures = [
    { title: t('solution.web.f1.title'), desc: t('solution.web.f1.desc') },
    { title: t('solution.web.f2.title'), desc: t('solution.web.f2.desc') },
    { title: t('solution.web.f3.title'), desc: t('solution.web.f3.desc') },
  ]

  return (
    <section ref={rootRef} id="solutions" className="py-20 md:py-32 bg-[#f1f0ea] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#534b52]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="container-wide mx-auto relative z-10">
        <div className="solution-heading mb-20 text-center max-w-3xl mx-auto">
          <div className="solution-eyebrow text-sm font-mono text-[#534b52] mb-4 tracking-widest uppercase">{t('solution.eyeBrow')}</div>
          <h2 className="solution-title text-5xl md:text-7xl font-bold mb-6 text-[#2d232e]">
            {t('solution.titleP1')} <span className="text-[#534b52]">{t('solution.titleP2')}</span>
          </h2>
          <p className="solution-sub text-xl text-[#2d232e] font-light">{t('solution.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ perspective: '1400px' }}>
          {/* Content Production */}
          <motion.div
            whileHover={{ y: -10, scale: 1.015 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1400, transformStyle: 'preserve-3d' }}
            className="solution-card relative rounded-3xl bg-[#e0ddcf] border border-[#2d232e] overflow-hidden group hover:border-[#534b52]/40 transition-colors duration-300 cursor-default"
          >
            <div className="absolute top-0 w-full h-[1px] bg-[#534b52]/0 group-hover:bg-[#534b52]/60 transition-colors duration-500" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#534b52]/4 blur-[80px] pointer-events-none rounded-full" />
            <div className="p-10 md:p-12 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#534b52]/10 text-[#534b52] text-xs font-bold uppercase tracking-wider mb-6 border border-[#534b52]/20">
                <Workflow className="w-3.5 h-3.5" />
                {t('solution.content.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#2d232e]">{t('solution.content.title')}</h3>
              <p className="text-[#2d232e] mb-10 leading-relaxed">{t('solution.content.desc')}</p>
              <ul className="space-y-5">
                {contentFeatures.map((f, i) => (
                  <li key={i} className="feature-item flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#534b52]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#534b52]/30">
                      <Check className="w-3 h-3 text-[#534b52]" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#2d232e]">{f.title}</span>
                      <span className="text-[#2d232e]"> — {f.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Web Development */}
          <motion.div
            whileHover={{ y: -10, scale: 1.015 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1400, transformStyle: 'preserve-3d' }}
            className="solution-card relative rounded-3xl bg-[#e0ddcf] border border-[#2d232e] overflow-hidden group hover:border-[#534b52]/30 transition-colors duration-300 cursor-default"
          >
            <div className="absolute top-0 w-full h-[1px] bg-[#2d232e]/0 group-hover:bg-[#2d232e]/10 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#534b52]/3 blur-[80px] pointer-events-none rounded-full" />
            <div className="p-10 md:p-12 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2d232e]/5 text-[#2d232e] text-xs font-bold uppercase tracking-wider mb-6 border border-[#2d232e]/10">
                <Network className="w-3.5 h-3.5" />
                {t('solution.web.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#2d232e]">{t('solution.web.title')}</h3>
              <p className="text-[#2d232e] mb-10 leading-relaxed">{t('solution.web.desc')}</p>
              <ul className="space-y-5">
                {webFeatures.map((f, i) => (
                  <li key={i} className="feature-item flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#2d232e]/8 flex items-center justify-center shrink-0 mt-0.5 border border-[#2d232e]/15">
                      <Check className="w-3 h-3 text-[#2d232e]" />
                    </div>
                    <div>
                      <span className="font-semibold text-[#2d232e]">{f.title}</span>
                      <span className="text-[#2d232e]"> — {f.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
