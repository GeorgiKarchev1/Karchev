'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

const Projects = () => {
  const { t } = useLanguage()

  const projects = [
    {
      key: 'theAgency',
      image: '/img/theagency.png',
      live: 'https://theagencycourse.bg/',
    },
    {
      key: 'algoChat',
      image: '/img/algoimg.png',
      live: 'https://www.algochad.com/',
    },
    {
      key: 'editingBg',
      image: '/img/editingbg.png',
      live: 'https://editing.bg/',
    },
    {
      key: 'yordanKolev',
      image: '/img/yordankolev.png',
      live: 'https://yordankolev.com/',
    },
  ]

  return (
    <section id="projects" className="section-padding bg-[#2d232e] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="container-wide mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-[#e0ddcf] mb-6 leading-tight"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('portfolio.titleP1')}{' '}
            <span className="text-[#534b52]">{t('portfolio.titleHighlight')}</span>
          </motion.h2>
          <div className="w-24 h-px bg-[#534b52] mx-auto mb-8" />
          <motion.p
            className="text-xl text-[#2d232e] max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t('portfolio.subtitle')}
          </motion.p>
        </div>

        {/* Projects */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.key}
              initial={{ opacity: 0, y: 30, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ y: -6, rotateX: -2, scale: 1.005 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ transformPerspective: 900 }}
              className="group grid lg:grid-cols-2 gap-12 items-center p-8 rounded-3xl bg-[#2d232e] border border-[#2d232e] hover:border-[#534b52]/30 transition-all duration-500 cursor-default"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative rounded-2xl overflow-hidden border border-[#2d232e]">
                  <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }}>
                    <Image
                      src={project.image}
                      alt={t(`portfolio.projects.${project.key}.title`)}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </motion.div>
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-[#e0ddcf] group-hover:text-[#534b52] transition-colors duration-300">
                    {t(`portfolio.projects.${project.key}.title`)}
                  </h3>
                  <p className="text-lg text-[#2d232e] leading-relaxed">
                    {t(`portfolio.projects.${project.key}.description`)}
                  </p>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-8 py-4 bg-[#534b52] text-[#e0ddcf] rounded-full font-bold hover:bg-[#2d232e] transition-colors"
                  >
                    {t(`portfolio.projects.${project.key}.cta`)}
                    <ExternalLink size={18} className="ml-2" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
