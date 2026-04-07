'use client'

import { motion } from 'framer-motion'
import { CalendarCheck, FileText, Rocket, RefreshCw, Users } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    { icon: CalendarCheck, step: '01', title: t('howItWorks.steps.step1.title'), description: t('howItWorks.steps.step1.desc') },
    { icon: FileText,      step: '02', title: t('howItWorks.steps.step2.title'), description: t('howItWorks.steps.step2.desc') },
    { icon: Rocket,        step: '03', title: t('howItWorks.steps.step3.title'), description: t('howItWorks.steps.step3.desc') },
    { icon: RefreshCw,     step: '04', title: t('howItWorks.steps.step4.title'), description: t('howItWorks.steps.step4.desc') },
    { icon: Users,         step: '05', title: t('howItWorks.steps.step5.title'), description: t('howItWorks.steps.step5.desc') },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-[#f1f0ea] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        <div className="mb-20">
          <div className="max-w-2xl">
            <div className="text-sm font-mono text-[#534b52] mb-4 tracking-widest uppercase">
              {t('howItWorks.eyeBrow')}
            </div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 text-[#2d232e]"
              initial={{ opacity: 0, y: 40, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{ perspective: '700px', transformOrigin: 'top center' }}
            >
              {t('howItWorks.title')}
            </motion.h2>
            <p className="text-[#2d232e] text-lg">{t('howItWorks.subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: 22, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              whileHover={{ y: -8, rotateX: -8, scale: 1.04 }}
              transition={{ delay: index * 0.11, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{ transformPerspective: 600, transformStyle: 'preserve-3d' }}
              className="relative flex flex-col pt-8 border-t border-[#2d232e] group hover:border-[#534b52] transition-colors duration-300 cursor-default overflow-hidden"
            >
              <div className="text-xs font-mono text-[#2d232e] mb-5 tracking-wider">STEP_{item.step}</div>

              <div className="mb-5 w-11 h-11 rounded-xl bg-[#e0ddcf] border border-[#2d232e] flex items-center justify-center group-hover:border-[#534b52]/40 group-hover:bg-[#e0ddcf] transition-all duration-300">
                <item.icon className="w-5 h-5 text-[#2d232e] group-hover:text-[#534b52] transition-colors" />
              </div>

              <h3 className="text-base font-bold mb-2 text-[#2d232e] leading-snug">{item.title}</h3>
              <p className="text-[#2d232e] leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
