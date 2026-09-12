import type { ReactNode } from 'react'
import { LanguageProvider } from '@/context/LanguageContext'

export default function PolitikiLayout({ children }: { children: ReactNode }) {
  return <LanguageProvider initialLanguage="BG">{children}</LanguageProvider>
}
