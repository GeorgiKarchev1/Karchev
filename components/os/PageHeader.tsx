'use client'

import type { CSSProperties, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { moduleForPath } from '@/lib/os/modules'
import { MODULE_GLYPHS } from './icons'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  /** Toolbar slot, right-aligned on wide screens. */
  actions?: ReactNode
}

/**
 * The band at the top of every board.
 *
 * It derives its glyph and accent from the route rather than taking them as
 * props, so a board can never label itself with the wrong module identity.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  const pathname = usePathname()
  const active = moduleForPath(pathname)
  const Glyph = MODULE_GLYPHS[active.key]

  const accent = {
    '--os-accent-a': active.accentA,
    '--os-accent-b': active.accentB,
  } as CSSProperties

  return (
    <header
      className="os-settle flex flex-col gap-5 px-6 pb-6 pt-7 md:flex-row md:items-end md:justify-between md:px-10 md:pt-9"
      style={accent}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <span className="os-accent-plate inline-flex h-7 w-7 items-center justify-center rounded-[9px]">
            <Glyph className="h-[15px] w-[15px]" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--os-muted)]">
            {eyebrow ?? active.label}
          </span>
        </div>

        <h1 className="mt-3 font-heading text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--os-ink)] md:text-[34px]">
          {title}
        </h1>

        {description ? (
          <p className="mt-2 max-w-[62ch] text-[14px] leading-6 text-[var(--os-muted)]">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  )
}
