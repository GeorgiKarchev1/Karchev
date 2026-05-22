'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { EyeOff, Globe, TrendingDown, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export default function Problem() {
  const { t } = useLanguage()
  const rootRef = useRef<HTMLElement>(null)

  const problems = [
    { icon: EyeOff,       title: t('problem.cards.noVisibility.title'),  stat: t('problem.cards.noVisibility.stat'),  desc: t('problem.cards.noVisibility.desc') },
    { icon: Globe,        title: t('problem.cards.outdatedSite.title'),  stat: t('problem.cards.outdatedSite.stat'),  desc: t('problem.cards.outdatedSite.desc') },
    { icon: TrendingDown, title: t('problem.cards.noConversion.title'),  stat: t('problem.cards.noConversion.stat'),  desc: t('problem.cards.noConversion.desc') },
    { icon: AlertCircle,  title: t('problem.cards.agencyProblem.title'), stat: t('problem.cards.agencyProblem.stat'), desc: t('problem.cards.agencyProblem.desc') },
  ]

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return

      // Heading reveal
      gsap.from('.problem-heading > *', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.problem-heading', start: 'top 80%' },
      })

      // 3D card stagger reveal
      const cards = gsap.utils.toArray<HTMLElement>('.problem-card')
      gsap.set(cards, {
        opacity: 0,
        y: 80,
        rotateX: 30,
        rotateY: -8,
        scale: 0.9,
        transformPerspective: 900,
        transformOrigin: '50% 100%',
      })

      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.14,
            overwrite: true,
          }),
      })

      // 3D mouse-tilt on each card
      cards.forEach((card) => {
        const rotX = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' })
        const rotY = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' })
        const lift = gsap.quickTo(card, 'y', { duration: 0.4, ease: 'power3.out' })
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          rotY(px * 12)
          rotX(-py * 10)
        }
        const onEnter = () => lift(-8)
        const onLeave = () => { rotX(0); rotY(0); lift(0) }
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)
      })
    },
    { scope: rootRef }
  )

  return (
    <section ref={rootRef} className="py-20 md:py-32 bg-[#f1f0ea] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#534b52]/6 blur-[130px] pointer-events-none rounded-full" />

      <div className="container-wide mx-auto relative z-10">
        <div className="problem-heading grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <div className="text-sm font-mono text-[#534b52] mb-4 tracking-widest uppercase">
              {t('problem.eyeBrow')}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-[#2d232e]">
              {t('problem.titlePart1')} <br />
              <span className="text-[#534b52]">{t('problem.titlePart2')}</span>
            </h2>
            <div className="h-px w-20 bg-[#534b52]/50 mt-6" />
          </div>
          <p className="text-xl text-[#2d232e] font-light max-w-md leading-relaxed">
            {t('problem.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1200px' }}>
          {problems.map((item, index) => (
            <div
              key={index}
              className="problem-card p-8 rounded-2xl bg-[#e0ddcf] border border-[#2d232e] transition-colors duration-300 group relative overflow-hidden cursor-default will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#534b52]/0 group-hover:bg-[#534b52]/50 transition-colors duration-500" />

              <div
                className="w-12 h-12 rounded-xl bg-[#e0ddcf] border border-[#2d232e] flex items-center justify-center mb-8 text-[#534b52]/80 transition-colors"
                style={{ transform: 'translateZ(40px)' }}
              >
                <item.icon className="w-5 h-5" />
              </div>

              <h3 className="text-base font-bold mb-2 text-[#2d232e] leading-snug" style={{ transform: 'translateZ(20px)' }}>{item.title}</h3>
              <div className="text-xs font-mono text-[#534b52] mb-4 leading-relaxed">{item.stat}</div>
              <p className="text-[#2d232e] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
