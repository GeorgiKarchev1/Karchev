import type { ReactNode } from 'react'
import { OSProvider } from '@/context/OSContext'
import OSSidebar from '@/components/os/OSSidebar'
import OSMobileNav from '@/components/os/OSMobileNav'

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
      <div className="min-h-dvh w-full bg-[#f1f0ea] text-[#2d232e]">
        <div className="fixed left-0 top-0 z-30 hidden h-dvh w-[260px] lg:block">
          <OSSidebar />
        </div>
        <div className="flex min-h-dvh flex-col lg:pl-[260px]">
          <div className="border-b-2 border-[#2d232e] bg-[#ddd7c8] px-5 py-4 lg:hidden">
            <OSMobileNav />
          </div>
          <main className="flex-1 bg-[#f7f4ea]">{children}</main>
        </div>
      </div>
    </OSProvider>
  )
}
