import type { ReactNode } from 'react'
import { OSProvider } from '@/context/OSContext'
import OSShell from '@/components/os/OSShell'
import '../os.css'

export const metadata = {
  title: 'KarchX Content OS',
  description:
    'Business-aware content operating system: onboarding, pillars, weekly ideas, hooks, repurposing, weekly plan.',
  // Internal tool — never index it (see also the X-Robots-Tag header in
  // next.config.js and the robots.txt disallow).
  robots: { index: false, follow: false },
}

export default function OSLayout({ children }: { children: ReactNode }) {
  return (
    <OSProvider>
      <OSShell>{children}</OSShell>
    </OSProvider>
  )
}
