'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Brain, Coffee } from 'lucide-react'

const About = () => {

  const stats = [
    { number: '3+', label: 'Years Shipping Code' },
    { number: '5+', label: 'Live Projects' },
    { number: '24h', label: 'Response Time' }
  ]

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 border border-blue-400 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-purple-400 rounded-full"
        />
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
              Why Choose{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Me?
              </span>
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
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
                  I build stuff that works. My educational platform? Making real money. My AI app? 
                  Users actually use it daily. My video editing service? Streamlined workflow that 
                  saves clients hours every week.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm not here to show off my GitHub commits or talk about "best practices." 
                  I'm here to solve your problems and make you money. Period.
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
                    <div className="text-2xl md:text-3xl font-black text-gradient bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
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
                {/* Enhanced glowing border effect */}
                <motion.div
                  className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-30"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Image container with enhanced styling */}
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-4 overflow-hidden border border-gray-700/50 shadow-2xl">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-2xl"
                  >
                    <Image
                      src="/img/azseriozen_optimized_1000.jpg"
                      alt="Georgi Karchev - Full Stack Developer"
                      width={600}
                      height={700}
                      className="w-full h-[500px] md:h-[600px] rounded-2xl object-cover object-center"
                      priority
                      quality={95}
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
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
