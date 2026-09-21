'use client'

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { GlyphSpinner } from './icons'

/**
 * Shared board primitives.
 *
 * Every board previously hand-rolled its own buttons, chips and cards as long
 * Tailwind strings, so the same control drifted between pages. These are the
 * canonical versions; boards should not re-declare them.
 */

/* -------------------------------------------------------------------------- */
/* Button                                                                      */
/* -------------------------------------------------------------------------- */

type ButtonTone = 'accent' | 'solid' | 'quiet' | 'danger'

interface OSButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone
  busy?: boolean
  icon?: ReactNode
}

const TONE_CLASSES: Record<ButtonTone, string> = {
  accent: 'os-accent-fill text-white shadow-[var(--os-shadow-rest)]',
  solid: 'bg-[var(--os-ink)] text-white shadow-[var(--os-shadow-rest)]',
  quiet:
    'bg-white text-[var(--os-ink)] border border-[var(--os-line)] hover:border-[var(--os-line-strong)]',
  danger: 'bg-white text-[#c0392b] border border-[#f0d4d0] hover:bg-[#fdf5f4]',
}

export function OSButton({
  tone = 'quiet',
  busy = false,
  icon,
  children,
  className = '',
  disabled,
  ...rest
}: OSButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || busy}
      className={`inline-flex min-h-[38px] items-center justify-center gap-2 rounded-[var(--os-r-pill)] px-3.5 text-[13px] font-semibold transition-all duration-[var(--os-fast)] ease-[var(--os-ease)] hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-55 ${TONE_CLASSES[tone]} ${className}`}
    >
      {busy ? <GlyphSpinner className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Icon button — 44px hit area is kept for touch even though the art is small.  */
/* -------------------------------------------------------------------------- */

interface OSIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  danger?: boolean
}

export function OSIconButton({
  label,
  danger = false,
  children,
  className = '',
  ...rest
}: OSIconButtonProps) {
  return (
    <button
      {...rest}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--os-r-chip)] text-[var(--os-faint)] transition-colors duration-[var(--os-fast)] ${
        danger
          ? 'hover:bg-[#fdf1ef] hover:text-[#c0392b]'
          : 'hover:bg-[var(--os-surface-sunk)] hover:text-[var(--os-ink)]'
      } ${className}`}
    >
      {children}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Card                                                                        */
/* -------------------------------------------------------------------------- */

interface OSCardProps {
  children: ReactNode
  /** Adds the hover lift. Omit for static containers. */
  interactive?: boolean
  /** Per-card identity gradient, for module-coloured cards. */
  accentA?: string
  accentB?: string
  className?: string
}

export function OSCard({
  children,
  interactive = false,
  accentA,
  accentB,
  className = '',
}: OSCardProps) {
  const accent =
    accentA && accentB
      ? ({ '--os-accent-a': accentA, '--os-accent-b': accentB } as CSSProperties)
      : undefined

  return (
    <div
      style={accent}
      className={`os-pane ${interactive ? 'os-pane-interactive' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Chip                                                                        */
/* -------------------------------------------------------------------------- */

export function OSChip({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent'
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--os-r-pill)] px-2.5 py-1 text-[11px] font-semibold ${
        tone === 'accent'
          ? 'os-accent-plate'
          : 'bg-[var(--os-surface-sunk)] text-[var(--os-muted)]'
      } ${className}`}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Fields                                                                      */
/* -------------------------------------------------------------------------- */

const FIELD_BASE =
  'w-full rounded-[var(--os-r-tile)] border border-[var(--os-line)] bg-white px-3 py-2.5 text-[14px] text-[var(--os-ink)] outline-none transition-colors duration-[var(--os-fast)] placeholder:text-[var(--os-faint)] hover:border-[var(--os-line-strong)] focus:border-[var(--os-accent-a)]'

export function OSLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--os-muted)]">
      {children}
    </span>
  )
}

export function OSField({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <OSLabel>{label}</OSLabel>
      {children}
      {hint ? (
        <span className="text-[12px] leading-5 text-[var(--os-faint)]">{hint}</span>
      ) : null}
    </label>
  )
}

export const fieldClass = FIELD_BASE

/* -------------------------------------------------------------------------- */
/* Section eyebrow                                                             */
/* -------------------------------------------------------------------------- */

export function OSSectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--os-muted)]">
      {children}
    </h2>
  )
}
