'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, Zap, Code, Rocket } from 'lucide-react'
import { useEffect } from 'react'

const Hero = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const mouseXSpring = useSpring(mouseX, { stiffness: 400, damping: 40 })
  const mouseYSpring = useSpring(mouseY, { stiffness: 400, damping: 40 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 50)
      mouseY.set(e.clientY - 50)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ x: mouseXSpring, y: mouseYSpring }}
          className="absolute pointer-events-none"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
        </motion.div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/4 left-1/4 w-6 h-6 border-2 border-blue-400/30"
        />
        
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/4"
        >
          <Zap size={24} className="text-purple-400/30" />
        </motion.div>

        <motion.div
          animate={{ 
            x: [0, 50, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 left-1/5"
        >
          <Code size={20} className="text-cyan-400/40" />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Aggressive Main Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="mb-8"
          >
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 leading-none"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
            >
              I BUILD{' '}
              <motion.span 
                className="block text-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                FASTER
              </motion.span>
              <span className="text-4xl md:text-6xl lg:text-7xl">
                THAN YOU SCROLL
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              
            </motion.div>

            <motion.p 
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Whatever needs building, I build it FAST and I build it RIGHT 🚀
            </motion.p>
          </motion.div>

          {/* Energetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative flex items-center gap-2">
                  SEE MY WORK
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
              </motion.button>
              
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-gray-600 text-gray-300 rounded-xl font-bold text-lg hover:border-blue-400 hover:text-white hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300"
              >
                LEARN MORE
              </motion.a>
            </div>
          </motion.div>

          {/* Animated Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center space-x-8"
          >
            {[
              { icon: Github, href: 'https://github.com/GeorgiKarchev1', label: 'GitHub', color: 'hover:text-gray-300' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/georgi-karchev-415901244/', label: 'LinkedIn', color: 'hover:text-blue-400' },
              { icon: Mail, href: 'mailto:georgikarchev5@gmail.com', label: 'Email', color: 'hover:text-green-400' }
            ].map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 text-gray-500 ${color} transition-all duration-300 rounded-xl hover:bg-gray-800/50`}
                aria-label={label}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero