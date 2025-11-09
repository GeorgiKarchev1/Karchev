'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X, MessageCircle, Mail } from 'lucide-react'
import { useState } from 'react'

const PhonePopup = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const phoneNumber = '+359 89 573 9335'
  const phoneLink = 'tel:+359895739335'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Floating Phone Button
          <motion.button
            key="button"
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {/* Pulsing Ring Animation */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-500/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Main Button */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Phone size={28} className="text-white animate-pulse" />
            </div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Обади ми се!
            </motion.div>
          </motion.button>
        ) : (
          // Expanded Card
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-600 rounded-2xl shadow-2xl p-6 min-w-[280px] relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            {/* Close Button */}
            <motion.button
              onClick={() => setIsExpanded(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/20 transition-colors z-20 cursor-pointer"
            >
              <X size={20} className="text-white" />
            </motion.button>

            {/* Content */}
            <div className="relative z-10">
              {/* Phone Icon with Animation */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="mb-4 inline-block"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Phone size={24} className="text-white" />
                </div>
              </motion.div>

              {/* Text */}
              <h3 className="text-white text-lg font-bold mb-2">
                Обади ми се!
              </h3>

              {/* Phone Number */}
              <motion.a
                href={phoneLink}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full bg-white text-primary-600 font-bold text-xl py-3 px-4 rounded-xl text-center hover:bg-gray-50 transition-colors shadow-lg mb-4"
              >
                {phoneNumber}
              </motion.a>

              {/* Quick Contact Options */}
              <div className="space-y-2">
                <motion.a
                  href="viber://chat?number=%2B359895739335"
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <MessageCircle size={18} />
                  <span className="text-sm font-semibold">Пиши ми във Viber</span>
                </motion.a>

                <motion.a
                  href="mailto:georgikarchev5@gmail.com"
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors backdrop-blur-sm"
                >
                  <Mail size={18} />
                  <span className="text-sm font-semibold">Пиши имейл</span>
                </motion.a>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default PhonePopup
