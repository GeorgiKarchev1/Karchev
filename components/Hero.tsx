'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Sparkles, Code2, Rocket, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const Hero = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [mounted, setMounted] = useState(false)
  const [showNotification, setShowNotification] = useState(true)
  const [showFirstNotification, setShowFirstNotification] = useState(true)
  const [showSecondNotification, setShowSecondNotification] = useState(true)
  
  const mouseXSpring = useSpring(mouseX, { stiffness: 400, damping: 40 })
  const mouseYSpring = useSpring(mouseY, { stiffness: 400, damping: 40 })

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 50)
      mouseY.set(e.clientY - 50)
    }

    const handleScroll = () => {
      const projectsHeader = document.querySelector('#projects h2')
      if (projectsHeader) {
        const rect = projectsHeader.getBoundingClientRect()
        // Hide notification when "STUFF I ACTUALLY BUILT" headline is in view
        if (rect.top < window.innerHeight * 0.3) {
          setShowNotification(false)
        } else {
          setShowNotification(true)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mouseX, mouseY])

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) return null

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Glass morphism notification - positioned in top-right corner */}
      {showNotification && showFirstNotification && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="fixed top-20 right-6 z-50 hidden md:block"
        >
          <motion.div
            className="bg-gray-800/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-600/30 p-5 w-80 relative"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowFirstNotification(false)}
              className="absolute -top-2 -left-2 w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X size={14} className="text-gray-300" />
            </button>
            <div className="flex items-start gap-4">
              {/* Profile Image */}
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
                <Image
                  src="/img/hormozi.jpg"
                  alt="Alex Hormozi"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-white text-base">Alex Hormozi</h4>
                  <span className="text-sm text-gray-300 font-medium">now</span>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Only 2 spots left this month.
                </p>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Don't miss out.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Second notification with Nakov */}
      {showNotification && showSecondNotification && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{
            duration: 0.6,
            delay: 0.7,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="fixed top-56 right-6 z-50 hidden md:block"
        >
          <motion.div
            className="bg-gray-800/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-600/30 p-5 w-80 relative"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowSecondNotification(false)}
              className="absolute -top-2 -left-2 w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X size={14} className="text-gray-300" />
            </button>
            <div className="flex items-start gap-4">
              {/* Profile Image */}
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
                <Image
                  src="/img/nakov.jpg"
                  alt="Nakov"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-white text-base">Svetlin Nakov</h4>
                  <span className="text-sm text-gray-300 font-medium">2m ago</span>
                </div>
                <p className="text-gray-200 text-sm leading-relaxed">
                  This guy can code
                </p>
                <p className="text-gray-200 text-sm leading-relaxed">
                  Hire him !!!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient orbs */}
        <motion.div
          style={{ x: mouseXSpring, y: mouseYSpring }}
          className="absolute pointer-events-none"
        >
          <div className="w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl" />
        </motion.div>
        
        {/* Additional floating elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-blue-400/20 rounded-lg"
        />
        
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/4"
        >
          <Sparkles size={28} className="text-purple-400/30" />
        </motion.div>

        <motion.div
          animate={{ 
            x: [0, 60, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 90, 180]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 left-1/5"
        >
          <Code2 size={24} className="text-cyan-400/30" />
        </motion.div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Enhanced main content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="mb-12"
          >

            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
            >
              I Build Apps That{' '}
              <motion.span 
                className="block text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Actually Work
              </motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-300 mb-4">
                Full Stack Developer Who Actually Ships
              </h2>
            </motion.div>

            <motion.p 
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Most developers build pretty demos that break when you look at them wrong. I build apps that solve real problems, 
              handle real users, and don't crash. I've been shipping production code for years - not some junior who needs hand-holding.
            </motion.p>
          </motion.div>


          {/* Enhanced social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: 'https://github.com/GeorgiKarchev1', label: 'GitHub', color: 'hover:text-gray-300 hover:bg-gray-800/50' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/georgi-karchev-415901244/', label: 'LinkedIn', color: 'hover:text-blue-400 hover:bg-blue-400/10' },
              { icon: Mail, href: 'mailto:georgikarchev5@gmail.com', label: 'Email', color: 'hover:text-green-400 hover:bg-green-400/10' }
            ].map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 text-gray-500 ${color} transition-all duration-300 rounded-2xl border border-gray-800/50 hover:border-gray-600/50 backdrop-blur-sm`}
                aria-label={label}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
