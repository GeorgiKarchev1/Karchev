'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BgFunnelWizard from '@/components/funnel/BgFunnelWizard'
import { useLanguage } from '@/context/LanguageContext'
import EnFunnelWizard from '@/components/funnel/EnFunnelWizard'

interface Props {
  open: boolean
  onClose: () => void
}

export default function FunnelModal({ open, onClose }: Props) {
  const { language } = useLanguage()
  const isBG = language === 'BG'

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#2d232e]/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] z-[101] mx-auto max-w-lg rounded-[1.5rem] bg-[#f1f0ea] shadow-2xl overflow-hidden flex flex-col"
            style={{ boxShadow: '0 32px 80px rgba(45,35,46,0.3), 0 0 0 1px rgba(45,35,46,0.08)' }}
          >
            {isBG
              ? <BgFunnelWizard onClose={onClose} />
              : <EnFunnelWizard onClose={onClose} />
            }
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
