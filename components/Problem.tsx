'use client'

import { motion } from 'framer-motion'
import { EyeOff, Globe, TrendingDown, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Problem() {
  const { t } = useLanguage()

  const problems = [
    { icon: EyeOff,       title: t('problem.cards.noVisibility.title'),  stat: t('problem.cards.noVisibility.stat'),  desc: t('problem.cards.noVisibility.desc') },
    { icon: Globe,        title: t('problem.cards.outdatedSite.title'),  stat: t('problem.cards.outdatedSite.stat'),  desc: t('problem.cards.outdatedSite.desc') },
    { icon: TrendingDown, title: t('problem.cards.noConversion.title'),  stat: t('problem.cards.noConversion.stat'),  desc: t('problem.cards.noConversion.desc') },
    { icon: AlertCircle,  title: t('problem.cards.agencyProblem.title'), stat: t('problem.cards.agencyProblem.stat'), desc: t('problem.cards.agencyProblem.desc') },
  ]

  return (
    <section className="py-20 md:py-32 bg-[#f1f0ea] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#534b52]/6 blur-[130px] pointer-events-none rounded-full" />

      <div className="container-wide mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              whileHover={{ y: -10, rotateX: -6, rotateY: 4, scale: 1.03 }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{ transformPerspective: 600, transformStyle: 'preserve-3d' }}
              className="p-8 rounded-2xl bg-[#e0ddcf] border border-[#2d232e] hover:border-[#534b52]/40 transition-colors duration-300 group relative overflow-hidden cursor-default"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#534b52]/0 group-hover:bg-[#534b52]/50 transition-colors duration-500" />

              <div className="w-12 h-12 rounded-xl bg-[#e0ddcf] border border-[#2d232e] flex items-center justify-center mb-8 text-[#534b52]/60 group-hover:text-[#534b52] group-hover:border-[#534b52]/30 transition-colors">
                <item.icon className="w-5 h-5" />
              </div>

              <h3 className="text-base font-bold mb-2 text-[#2d232e] leading-snug">{item.title}</h3>
              <div className="text-xs font-mono text-[#534b52] mb-4 leading-relaxed">{item.stat}</div>
              <p className="text-[#2d232e] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
