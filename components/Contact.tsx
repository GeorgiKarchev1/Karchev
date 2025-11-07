'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Calendar } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-black relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-primary-900/15 to-black" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(144,169,85,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(144,169,85,0.5)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <div className="mb-16">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Let's Work{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-300 via-primary-200 to-primary-50 bg-clip-text text-transparent">
                Together
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Have a project in mind? Let's discuss how I can help bring your ideas to life.
              Schedule a free consultation call to get started.
            </motion.p>

            <motion.a
              href="https://cal.com/georgi-karchev-3r9puz/30min"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calendar size={20} />
              Schedule a Call
            </motion.a>
          </div>

          {/* Alternative Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-16"
          >
            <p className="text-gray-500 text-center mb-8 text-sm">
              Prefer email or LinkedIn?
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="mailto:georgikarchev5@gmail.com"
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 px-6 py-3 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 group"
              >
                <Mail size={20} className="text-primary-500 group-hover:text-primary-400 transition-colors" />
                <span className="text-gray-300 font-semibold group-hover:text-white transition-colors">Email Me</span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/georgi-karchev-415901244/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 px-6 py-3 bg-gray-900/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 group"
              >
                <MessageCircle size={20} className="text-primary-500 group-hover:text-primary-400 transition-colors" />
                <span className="text-gray-300 font-semibold group-hover:text-white transition-colors">LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
