import type { ReactNode } from 'react'
import { LanguageProvider } from '@/context/LanguageContext'

// The URL decides the language, so this subtree renders Bulgarian on the
// server. Keeping it out of the root layout is what lets these pages be
// statically prerendered.
export default function BgLayout({ children }: { children: ReactNode }) {
  return <LanguageProvider initialLanguage="BG">{children}</LanguageProvider>
}
