'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Sparkles } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/GeorgiKarchev1',
      icon: Github,
      color: 'hover:bg-gray-800 hover:text-white',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/georgi-karchev-415901244/',
      icon: Linkedin,
      color: 'hover:bg-blue-600 hover:text-white',
    },
    {
      name: 'Email',
      href: 'mailto:georgikarchev5@gmail.com',
      icon: Mail,
      color: 'hover:bg-red-600 hover:text-white',
    },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-black border-t border-gray-800/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      
      <div className="container-custom py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-12">
            {/* Brand Section */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-3xl font-black text-white">
                    <span className="text-gradient">KARCHEV</span>
                  </h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300 text-base leading-relaxed font-medium">
                    💀 The Beast from Bulgaria who builds{' '}
                    <span className="text-gradient font-bold">FASTER</span> than you scroll.
                  </p>
                  <p className="text-blue-400 text-sm font-medium">
                    Making the internet jealous, one project at a time.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                  Let's Connect
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map(({ name, href, icon: Icon, color }, index) => (
                    <motion.a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -5,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className={`p-4 bg-gray-900/50 backdrop-blur-sm text-gray-400 hover:text-white transition-all duration-300 rounded-2xl border border-gray-800/50 hover:border-gray-600/50 ${color} shadow-lg hover:shadow-xl`}
                      aria-label={name}
                    >
                      <Icon size={22} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

                    {/* Bottom Section */}
          <motion.div 
            className="border-t border-gray-800/50 pt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <motion.p 
                className="text-gray-400 text-sm font-medium"
                whileHover={{ scale: 1.02 }}
              >
                © 2025 KARCHEV. All rights reserved.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer