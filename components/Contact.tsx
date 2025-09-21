'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Calendar } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
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
              className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              viewport={{ once: true }}
            >
              Ready to{' '}
              <span className="text-gradient bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
                Build Something?
              </span>
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              Stop dreaming about your idea. Let's make it real. 
              I'm taking on 2 new projects this month - will yours be one of them?
            </motion.p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.a
              href="mailto:georgikarchev5@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <Mail size={32} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Email Me
                </h3>
                <p className="text-gray-400 text-center">
                  georgikarchev5@gmail.com
                </p>
                <p className="text-sm text-gray-500 text-center">
                  I respond within 24 hours
                </p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/georgi-karchev-415901244/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-green-500/10 rounded-xl group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                  LinkedIn
                </h3>
                <p className="text-gray-400 text-center">
                  Connect & message me
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Professional networking
                </p>
              </div>
            </motion.a>

            <motion.a
              href="https://calendly.com/georgi-karchev"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                  <Calendar size={32} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  Book a Call
                </h3>
                <p className="text-gray-400 text-center">
                  30-min free consultation
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Let's discuss your project
                </p>
              </div>
            </motion.a>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              What's Your Timeline?
            </h3>
            <p className="text-gray-300 mb-6">
              Most projects take 2-8 weeks depending on complexity. 
              I can start immediately and keep you updated every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:georgikarchev5@gmail.com?subject=Project Inquiry"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="https://calendly.com/georgi-karchev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-xl font-bold hover:border-blue-400 hover:text-white hover:bg-blue-400/10 transition-all duration-300"
              >
                Free Consultation
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
