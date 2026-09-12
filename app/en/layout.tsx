import type { ReactNode } from 'react'
import { LanguageProvider } from '@/context/LanguageContext'
import HtmlLang from '@/components/HtmlLang'

export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider initialLanguage="EN">
      <HtmlLang lang="en" />
      {children}
    </LanguageProvider>
  )
}
