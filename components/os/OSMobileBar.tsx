'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { OS_MODULES, isModuleActive } from '@/lib/os/modules'
import { MODULE_GLYPHS } from './icons'

/**
 * The small-screen counterpart to the command bar.
 *
 * Same floating-pill language rather than a full-width tab strip pinned to the
 * edge, so the canvas still reads as continuous underneath it. Seven modules
 * will not fit at phone widths, so the row scrolls horizontally and the active
 * module is scrolled into view on navigation.
 */
export default function OSMobileBar() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Modules"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="os-scroll mx-auto flex max-w-full gap-1 overflow-x-auto rounded-[var(--os-r-pill)] border border-black/5 bg-white/85 p-1.5 shadow-[var(--os-shadow-float)] backdrop-blur-xl">
        {OS_MODULES.map((module) => {
          const active = isModuleActive(module, pathname)
          const Glyph = MODULE_GLYPHS[module.key]
          const accent = {
            '--os-accent-a': module.accentA,
            '--os-accent-b': module.accentB,
          } as CSSProperties

          return (
            <Link
              key={module.key}
              href={module.href}
              aria-current={active ? 'page' : undefined}
              style={accent}
              ref={(node) => {
                // Keep the current module visible when the row overflows.
                if (active && node) {
                  node.scrollIntoView({ block: 'nearest', inline: 'center' })
                }
              }}
              className={`flex min-w-[64px] shrink-0 flex-col items-center gap-1 rounded-[var(--os-r-pill)] px-3 py-2 transition-colors duration-[var(--os-fast)] ${
                active ? 'os-accent-fill text-white' : 'text-[var(--os-muted)]'
              }`}
            >
              <Glyph className="h-[18px] w-[18px]" />
              <span className="text-[10px] font-medium leading-none">
                {module.shortLabel}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
