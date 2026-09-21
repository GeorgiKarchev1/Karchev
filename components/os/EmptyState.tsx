'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { moduleForPath } from '@/lib/os/modules'
import { GlyphArrowRight, GlyphLock } from './icons'

interface EmptyStateProps {
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
}

/**
 * Shown when a module needs setup before it has anything to display.
 *
 * Deliberately quiet — a large dashed plate rather than an alarm — because
 * reaching it is the normal first-run path, not an error.
 */
export default function EmptyState({
  title,
  description,
  ctaLabel = 'Open setup',
  ctaHref = '/os/onboarding',
}: EmptyStateProps) {
  const pathname = usePathname()
  const active = moduleForPath(pathname)

  const accent = {
    '--os-accent-a': active.accentA,
    '--os-accent-b': active.accentB,
  } as CSSProperties

  return (
    <div
      className="os-settle mx-6 flex flex-col items-center rounded-[var(--os-r-pane)] border border-dashed border-[var(--os-line-strong)] bg-white/60 px-6 py-14 text-center md:mx-10"
      style={accent}
    >
      <span className="os-accent-plate inline-flex h-12 w-12 items-center justify-center rounded-[16px]">
        <GlyphLock className="h-5 w-5" />
      </span>

      <h2 className="mt-5 font-heading text-[19px] font-semibold tracking-[-0.01em] text-[var(--os-ink)]">
        {title}
      </h2>
      <p className="mt-2 max-w-[46ch] text-[14px] leading-6 text-[var(--os-muted)]">
        {description}
      </p>

      <Link
        href={ctaHref}
        className="os-accent-fill mt-6 inline-flex items-center gap-2 rounded-[var(--os-r-pill)] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[var(--os-shadow-rest)] transition-transform duration-[var(--os-fast)] hover:-translate-y-px"
      >
        {ctaLabel}
        <GlyphArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
