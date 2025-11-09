'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Brain, Coffee } from 'lucide-react'
import { useState, useEffect } from 'react'

const About = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    { number: '3+', label: 'Years Shipping Code' },
    { number: '5+', label: 'Live Projects' },
    { number: '24h', label: 'Response Time' }
  ]

  return (
    <section id="about" className="section-padding bg-black relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-black to-black" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 -right-48 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-48 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              viewport={{ once: true }}
            >
              WHY CHOOSE{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-300 via-primary-200 to-primary-50 bg-clip-text text-transparent uppercase">
                ME?
              </span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-300 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
            {/* Left Column - Professional Story */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  The Developer Who Actually Delivers
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Look, I've seen too many projects die in development hell. You know the drill - 
                  endless meetings, missed deadlines, and code that breaks when you look at it wrong. 
                  That's not how I roll.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I build stuff that works. My educational platform? Its useful and have purpose. My AI app? 
                  Users actually use it daily. My video editing service? Streamlined workflow that 
                  saves clients hours every week.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm not here to show off my GitHub commits or talk about "best practices".
                  I'm here to solve your problems and build something valuiable. 
                </p>  
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-black text-gradient bg-gradient-to-r from-primary-300 via-primary-200 to-primary-50 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Profile Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                {/* Enhanced glowing border effect with color cycling */}
                <motion.div
                  className="absolute -inset-6 bg-gradient-to-r from-primary-500 via-primary-300 to-primary-50 rounded-3xl blur-2xl opacity-30"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, -1, 0],
                    background: [
                      "linear-gradient(to right, rgb(59 130 246), rgb(147 197 253), rgb(219 234 254))",
                      "linear-gradient(to right, rgb(34 197 94), rgb(134 239 172), rgb(187 247 208))",
                      "linear-gradient(to right, rgb(59 130 246), rgb(147 197 253), rgb(219 234 254))"
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    background: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />

                {/* Floating particles around the image */}
                {mounted && [...Array(8)].map((_, i) => {
                  const randomLeft = 20 + Math.random() * 60
                  const randomTop = 20 + Math.random() * 60
                  const randomX = Math.random() * 10 - 5
                  const randomDuration = 4 + Math.random() * 2
                  const randomDelay = Math.random() * 2

                  return (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-primary-300/60 rounded-full"
                      style={{
                        left: `${randomLeft}%`,
                        top: `${randomTop}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, randomX, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: randomDuration,
                        repeat: Infinity,
                        delay: randomDelay,
                        ease: "easeInOut"
                      }}
                    />
                  )
                })}

                {/* Image container with enhanced styling */}
                <div className="relative bg-gradient-to-br from-black to-gray-950 rounded-3xl p-4 overflow-hidden border border-primary-900/30 shadow-2xl">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 5
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-2xl cursor-pointer"
                    style={{ perspective: "1000px" }}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src="/img/azseriozen_optimized_1000.jpg"
                        alt="Georgi Karchev - Full Stack Developer"
                        width={600}
                        height={700}
                        className="w-full h-[500px] md:h-[600px] rounded-2xl object-cover object-center transition-all duration-500"
                        priority
                        quality={95}
                      />

                      {/* Dynamic overlay effects */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                        animate={{
                          background: [
                            "linear-gradient(to top, rgba(0,0,0,0.2), transparent, transparent)",
                            "linear-gradient(to top, rgba(59,130,246,0.1), transparent, transparent)",
                            "linear-gradient(to top, rgba(0,0,0,0.2), transparent, transparent)"
                          ]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />

                      {/* Shimmer effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                        whileHover={{ translateX: "100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </motion.div>

                    {/* Floating geometric shapes */}
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 bg-primary-400/80 rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 w-2 h-2 bg-primary-300/60 rotate-45"
                      animate={{
                        rotate: [45, 135, 45],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

export default About
