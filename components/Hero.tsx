'use client'

import { motion, useTransform, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])

  useEffect(() => {
    setMounted(true)

    // Throttle mouse move for better performance
    let lastTime = 0
    const throttleDelay = 50 // 50ms throttle

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime >= throttleDelay) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        })
        lastTime = now
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) return null

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 pb-24 overflow-visible">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-primary-800/30 to-primary-700/50"
          style={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
        />

        {/* Animated gradient orbs with mouse tracking */}
        <motion.div
          className="absolute top-0 -left-40 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          style={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-primary-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          style={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * 1.5,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
            scale: [1, 1.4, 1],
          }}
          style={{
            x: mousePosition.x * -1,
            y: mousePosition.y * -1,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid overlay with parallax */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(79,119,45,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,119,45,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]"
          style={{ y: y1 }}
        />

        {/* Floating particles - reduced for performance */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        className="container-custom relative z-10"
        style={{
          x: mousePosition.x * 0.3,
          y: mousePosition.y * 0.3,
          overflow: 'visible',
        }}
      >
        <div className="max-w-6xl mx-auto text-center" style={{ overflow: 'visible' }}>
          {/* Enhanced main content */}
          <div className="mb-12" style={{ overflow: 'visible' }}>
            {/* Main heading with staggered word reveal */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-relaxed pb-4 font-heading"
              style={{ overflow: 'visible' }}
            >
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                style={{ overflow: 'visible' }}
              >
                {/* Glow effect behind text */}
                <motion.div
                  className="absolute -inset-8 bg-gradient-to-r from-primary-500/20 via-primary-300/20 to-primary-50/20 blur-3xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <span className="relative block font-display text-gradient bg-gradient-to-r from-primary-300 via-primary-200 to-primary-50 bg-clip-text text-transparent">
                  Building Real Solutions
                </span>
              </motion.div>
            </motion.h1>

            {/* Description with fade and blur - optimized for performance */}
            <motion.p
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-16 font-body"
              initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ delay: 1, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
            >
              Transforming ideas into functional web applications. 3+ years of delivering quality projects.
            </motion.p>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.a
                href="https://cal.com/georgi-karchev-3r9puz/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-lg font-semibold rounded-xl shadow-lg overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">Schedule a Call</span>
              </motion.a>

              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 text-lg font-semibold rounded-xl hover:border-primary-500 hover:text-white hover:bg-primary-500/10 transition-all duration-300"
              >
                View Projects
              </motion.button>
            </motion.div>

          </div>
        </div>
      </motion.div>

    </section>
  )
}

export default Hero
