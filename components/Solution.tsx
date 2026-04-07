'use client'

import { motion } from 'framer-motion'
import { Check, Clapperboard, Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Solution() {
  const { t } = useLanguage()

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
    <section id="solutions" className="py-20 md:py-32 bg-[#f1f0ea] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#534b52]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="container-wide mx-auto relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="text-sm font-mono text-[#534b52] mb-4 tracking-widest uppercase">{t('solution.eyeBrow')}</div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-[#2d232e]">
            {t('solution.titleP1')} <span className="text-[#534b52]">{t('solution.titleP2')}</span>
          </h2>
          <p className="text-xl text-[#2d232e] font-light">{t('solution.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Production */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            whileHover={{ y: -10, rotateY: 5, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{ transformPerspective: 900, transformStyle: 'preserve-3d' }}
            className="relative rounded-3xl bg-[#e0ddcf] border border-[#2d232e] overflow-hidden group hover:border-[#534b52]/40 transition-colors duration-300 cursor-default"
          >
            <div className="absolute top-0 w-full h-[1px] bg-[#534b52]/0 group-hover:bg-[#534b52]/60 transition-colors duration-500" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#534b52]/4 blur-[80px] pointer-events-none rounded-full" />
            <div className="p-10 md:p-12 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#534b52]/10 text-[#534b52] text-xs font-bold uppercase tracking-wider mb-6 border border-[#534b52]/20">
                <Clapperboard className="w-3.5 h-3.5" />
                {t('solution.content.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#2d232e]">{t('solution.content.title')}</h3>
              <p className="text-[#2d232e] mb-10 leading-relaxed">{t('solution.content.desc')}</p>
              <ul className="space-y-5">
                {contentFeatures.map((f, i) => (
                  <li key={i} className="flex gap-4">
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
            initial={{ opacity: 0, x: 60, rotateY: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            whileHover={{ y: -10, rotateY: -5, scale: 1.02 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            style={{ transformPerspective: 900, transformStyle: 'preserve-3d' }}
            className="relative rounded-3xl bg-[#e0ddcf] border border-[#2d232e] overflow-hidden group hover:border-[#534b52]/30 transition-colors duration-300 cursor-default"
          >
            <div className="absolute top-0 w-full h-[1px] bg-[#2d232e]/0 group-hover:bg-[#2d232e]/10 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#534b52]/3 blur-[80px] pointer-events-none rounded-full" />
            <div className="p-10 md:p-12 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2d232e]/5 text-[#2d232e] text-xs font-bold uppercase tracking-wider mb-6 border border-[#2d232e]/10">
                <Globe className="w-3.5 h-3.5" />
                {t('solution.web.badge')}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#2d232e]">{t('solution.web.title')}</h3>
              <p className="text-[#2d232e] mb-10 leading-relaxed">{t('solution.web.desc')}</p>
              <ul className="space-y-5">
                {webFeatures.map((f, i) => (
                  <li key={i} className="flex gap-4">
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
