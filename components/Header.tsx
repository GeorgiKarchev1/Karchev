'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    // { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Animated background with glow effect */}
      <motion.div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-700/50' 
            : 'bg-transparent'
        }`}
        animate={isScrolled ? {
          boxShadow: "0 4px 32px rgba(59, 130, 246, 0.15)"
        } : {
          boxShadow: "0 0 0px rgba(59, 130, 246, 0)"
        }}
      />
      
      {/* Animated gradient border */}
      {isScrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        />
      )}

      <nav className="container-custom relative">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <motion.button
            onClick={() => scrollToSection('#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <span className="text-xl font-black bg-gradient-to-r from-white via-blue-200 to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
              KARCHEV
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
            />
          </motion.button>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-4 py-2 font-bold text-gray-300 hover:text-white transition-all duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full group-hover:left-0 transition-all duration-300"
                />
                
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-blue-400/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>
            ))}
            

          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            className="md:hidden relative p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
            
            {/* Mobile button glow effect */}
            <motion.div
              className="absolute inset-0 bg-blue-400/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.2 }}
            />
          </motion.button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden relative"
            >
              {/* Mobile menu background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-950/98 to-black/95 backdrop-blur-xl border-t border-gray-700/50" />
              
              {/* Mobile menu glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
              
              <div className="relative py-6 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="group relative block w-full text-left px-6 py-4 text-gray-300 hover:text-white transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100"
                        whileHover={{ scaleY: 1.2 }}
                      />
                      <span className="font-bold text-lg">{item.name}</span>
                    </div>
                    
                    {/* Mobile item background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    />
                    
                    {/* Mobile item glow */}
                    <motion.div
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.button>
                ))}
                

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header