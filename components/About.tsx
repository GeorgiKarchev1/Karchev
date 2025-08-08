'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Zap, Target, Rocket, Code } from 'lucide-react'

const About = () => {
  const traits = [
    { icon: Zap, label: 'LIGHTNING FAST', color: 'text-yellow-400' },
    { icon: Target, label: 'LASER FOCUSED', color: 'text-red-400' },
    { icon: Rocket, label: 'ALWAYS SHIPPING', color: 'text-blue-400' },
    { icon: Code, label: 'CODE MONSTER', color: 'text-green-400' }
  ]

  return (
    <section id="about" className="section-padding bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-blue-400 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-purple-400 rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Aggressive Header */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-none"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              viewport={{ once: true }}
            >
              WHO THE F*CK IS{' '}
              <span className="text-gradient bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                KARCHEV?
              </span>
            </motion.h2>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Aggressive Text */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-white font-bold leading-relaxed">
                  I'm Georgi Karchev from Plovdiv, programming since before AI was a thing!
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Solid foundation in data structures & algorithms, contributing to both 
                  backend and frontend projects.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Always eager to learn and grow - passionate about expanding skills 
                  and connecting with professionals for collaboration. 
                </p>
              </div>

              {/* Traits
              <div className="grid grid-cols-2 gap-4">
                {traits.map(({ icon: Icon, label, color }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <Icon className={`${color} text-xl`} size={24} />
                    <span className="text-white font-bold text-sm">{label}</span>
                  </motion.div>
                ))}
              </div> */}
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
                {/* Glowing border effect */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-75"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Image container */}
                <div className="relative bg-gray-800 rounded-2xl p-2 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/img/azseriozen_optimized_1000.jpg"
                      alt="Georgi Karchev - Software Developer"
                      width={450}
                      height={550}
                      className="w-full h-[400px] md:h-[480px] rounded-xl object-cover object-center"
                      priority
                    />
                  </motion.div>
                  
                  {/* Overlay text */}
                  {/* <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-white font-bold text-lg">
                        📍 Plovdiv, Bulgaria
                      </p>
                      <p className="text-cyan-400 font-medium">
                        Building the future, one line at a time 🚀
                      </p>
                    </div>
                  </div> */}
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