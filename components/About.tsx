'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
}

const About = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="section-padding bg-[#f1f0ea] relative overflow-hidden">
      <div className="absolute inset-0 [background-size:40px_40px] opacity-[0.25] bg-[radial-gradient(#2d232e_1px,transparent_1px)] pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-black text-[#2d232e] mb-5 leading-tight"
          >
            {t('about.title')}{' '}
            <span className="text-[#534b52] uppercase">{t('about.titleHighlight')}</span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="w-20 h-[3px] bg-[#2d232e] mx-auto mb-8"
          />
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-[#2d232e]/70 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            {t('about.p1')}
          </motion.p>
        </motion.div>

        {/* Team cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >

          {/* Card — Georgi */}
          <motion.div variants={fadeUp} className="group relative">
            <div className="absolute inset-0 bg-[#2d232e] rounded-2xl translate-x-[6px] translate-y-[6px] transition-transform duration-300 group-hover:translate-x-[10px] group-hover:translate-y-[10px]" />

            <div className="relative border-2 border-[#2d232e] rounded-2xl overflow-hidden">
              {/* Photo — taller on all breakpoints */}
              <div className="relative h-[480px] sm:h-[560px] md:h-[620px] overflow-hidden">
                <Image
                  src="/img/azseriozen_optimized_1000.jpg"
                  alt="Georgi Karchev"
                  fill
                  quality={95}
                  className="object-cover object-[center_10%] transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Gradient — only bottom 45% so the face stays clean */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d232e] via-[#2d232e]/30 to-transparent [mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_65%)]" />
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <div className="inline-block px-2.5 py-1 rounded-full bg-[#534b52] text-[#f1f0ea] text-[10px] font-black uppercase tracking-widest mb-3">
                  {t('about.founder')}
                </div>
                <div className="text-2xl md:text-3xl font-black text-[#f1f0ea] leading-tight">
                  Georgi
                </div>
                <div className="text-sm text-white/50 font-medium mt-1.5">
                  {t('about.role1')}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card — Antony */}
          <motion.div variants={fadeUp} className="group relative">
            <div className="absolute inset-0 bg-[#2d232e] rounded-2xl translate-x-[6px] translate-y-[6px] transition-transform duration-300 group-hover:translate-x-[10px] group-hover:translate-y-[10px]" />

            <div className="relative border-2 border-[#2d232e] rounded-2xl overflow-hidden">
              <div className="relative h-[480px] sm:h-[560px] md:h-[620px] overflow-hidden">
                <Image
                  src="/img/antony.png"
                  alt="Antony — Co-Founder"
                  fill
                  quality={95}
                  className="object-cover object-[center_8%] transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d232e] via-[#2d232e]/30 to-transparent [mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_65%)]" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                <div className="inline-block px-2.5 py-1 rounded-full bg-[#534b52] text-[#f1f0ea] text-[10px] font-black uppercase tracking-widest mb-3">
                  {t('about.cofounder')}
                </div>
                <div className="text-2xl md:text-3xl font-black text-[#f1f0ea] leading-tight">
                  Antony
                </div>
                <div className="text-sm text-white/50 font-medium mt-1.5">
                  {t('about.role2')}
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Bottom text row */}
        <motion.div
          className="mt-10 md:mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="text-[#2d232e]/60 text-sm md:text-base leading-relaxed font-medium border-l-2 border-[#534b52]/40 pl-4">
            {t('about.p2')}
          </p>
          <p className="text-[#2d232e]/60 text-sm md:text-base leading-relaxed font-medium border-l-2 border-[#534b52]/40 pl-4">
            {t('about.p3')}
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default About
