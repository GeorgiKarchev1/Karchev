'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()
    const [isHovered, setIsHovered] = useState(false)

    const toggleLang = () => {
        setLanguage(language === 'EN' ? 'BG' : 'EN')
    }

    return (
        <button
            onClick={toggleLang}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-[#534b52]/10 transition-colors group overflow-hidden"
            aria-label="Switch Language"
        >
            <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "backOut" }}
            >
                <Globe className="w-5 h-5 text-[#2d232e] group-hover:text-[#534b52] transition-colors" />
            </motion.div>

            <div className="relative h-5 w-6 overflow-hidden flex flex-col justify-center items-center perspective-[100px]">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={language}
                        initial={{ y: -20, opacity: 0, rotateX: 90 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        exit={{ y: 20, opacity: 0, rotateX: -90 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`font-mono text-sm font-bold absolute text-[#2d232e] group-hover:text-[#534b52] transition-colors`}
                    >
                        {language}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Funny "Processing" Glitch Text on Hover */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="overflow-hidden whitespace-nowrap"
                    >
                        <span className="text-[10px] text-gray-500 font-mono ml-1">
                            {language === 'EN' ? '/translate' : '/преведи'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}
