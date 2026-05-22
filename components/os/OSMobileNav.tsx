'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/os', label: 'Overview' },
  { href: '/os/onboarding', label: 'Onboarding' },
  { href: '/os/pillars', label: 'Pillars' },
  { href: '/os/ideas', label: 'Ideas' },
  { href: '/os/hooks', label: 'Hooks' },
  { href: '/os/repurpose', label: 'Repurpose' },
  { href: '/os/plan', label: 'Plan' },
]

export default function OSMobileNav() {
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Link href="/bg" className="text-xs font-semibold text-[#534b52]">
          ← KarchX
        </Link>
        <span className="rounded-2xl border-2 border-[#2d232e] bg-[#534b52] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f1f0ea] shadow-[3px_3px_0px_#2d232e]">
          Content OS
        </span>
      </div>
      <div className="-mx-5 overflow-x-auto px-5">
        <div className="flex gap-2 pb-1">
          {items.map((item) => {
            const active =
              item.href === '/os'
                ? pathname === '/os'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? 'border-[#2d232e] bg-[#534b52] text-[#f1f0ea] shadow-[2px_2px_0px_#2d232e]'
                    : 'border-[#2d232e] bg-[#f1f0ea] text-[#2d232e]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
