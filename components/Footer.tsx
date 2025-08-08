'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/GeorgiKarchev1',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/georgi-karchev-415901244/',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:georgikarchev5@gmail.com',
      icon: Mail,
    },
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <motion.h3 
                className="text-2xl font-black text-white mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-gradient">KARCHEV</span> 🚀
              </motion.h3>
              <p className="text-gray-300 text-sm leading-relaxed font-medium">
                💀 The Beast from Bulgaria who builds FASTER than you scroll.
                <br />
                <span className="text-blue-400">Making the internet jealous, one project at a time.</span>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">LET'S CONNECT 🔥</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ name, href, icon: Icon }) => (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gray-800 text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 rounded-xl border border-gray-700 hover:border-blue-500"
                    aria-label={name}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <motion.p 
              className="text-gray-400 text-sm mb-4 md:mb-0 font-medium"
              whileHover={{ scale: 1.05 }}
            >
              © 2024 KARCHEV. Made with 🔥 and a lot of ☕
            </motion.p>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 rounded-xl shadow-lg hover:shadow-blue-500/25"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer