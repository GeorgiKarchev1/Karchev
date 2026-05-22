'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowLeft,
  Layers,
  Lightbulb,
  type LucideIcon,
  Megaphone,
  PenSquare,
  Recycle,
  Sparkles,
  CalendarDays,
} from 'lucide-react'
import { useOS } from '@/context/OSContext'

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  requiresContent?: boolean
}

const navItems: NavItem[] = [
  { href: '/os', label: 'Overview', icon: Sparkles },
  { href: '/os/onboarding', label: 'Onboarding', icon: PenSquare },
  { href: '/os/pillars', label: 'Pillars', icon: Layers, requiresContent: true },
  { href: '/os/ideas', label: 'Weekly Ideas', icon: Lightbulb, requiresContent: true },
  { href: '/os/hooks', label: 'Hooks', icon: Megaphone, requiresContent: true },
  { href: '/os/repurpose', label: 'Repurpose', icon: Recycle },
  { href: '/os/plan', label: 'Weekly Plan', icon: CalendarDays, requiresContent: true },
]

export default function OSSidebar() {
  const pathname = usePathname()
  const { hasContent, profile } = useOS()

  return (
    <aside className="flex h-screen flex-col border-r-2 border-[#2d232e] bg-[#ddd7c8]">
      <div className="border-b-2 border-[#2d232e] px-5 py-5">
        <Link
          href="/bg"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#534b52] hover:text-[#2d232e]"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to KarchX
        </Link>
        <div className="mt-3 inline-flex items-center rounded-2xl border-2 border-[#2d232e] bg-[#534b52] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f1f0ea] shadow-[3px_3px_0px_#2d232e]">
          KarchX Content OS
        </div>
        {profile?.businessName ? (
          <p className="mt-3 truncate text-sm font-semibold text-[#2d232e]">
            {profile.businessName}
          </p>
        ) : (
          <p className="mt-3 text-xs text-[#534b52]">No business profile yet</p>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map(({ href, label, icon: Icon, requiresContent }) => {
          const active =
            href === '/os' ? pathname === '/os' : pathname.startsWith(href)
          const locked = requiresContent && !hasContent
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between gap-3 rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? 'border-[#2d232e] bg-[#f1f0ea] text-[#2d232e] shadow-[3px_3px_0px_#2d232e]'
                  : 'border-transparent text-[#2d232e] hover:border-[#2d232e] hover:bg-[#f1f0ea]'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {label}
              </span>
              {locked ? (
                <span className="rounded-full border border-[#534b52] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#534b52]">
                  setup
                </span>
              ) : null}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto border-t-2 border-[#2d232e] bg-[#e8e3d3] px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#534b52]">
          Status
        </p>
        <p className="mt-2 text-xs leading-5 text-[#2d232e]">
          {!profile
            ? 'Step 1 — finish onboarding to unlock the system.'
            : !hasContent
              ? 'Step 2 — generate your first OS bootstrap.'
              : 'Live. Edit, regenerate, ship.'}
        </p>
      </div>
    </aside>
  )
}
