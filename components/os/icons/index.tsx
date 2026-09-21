'use client'

/**
 * The OS glyph set.
 *
 * Hand-drawn replacements for the stock lucide icons, so /os has its own
 * handwriting instead of borrowing everyone else's.
 *
 * The grammar, which every new glyph must follow:
 *   - 24x24 grid, artwork kept inside the 20x20 optical box (x/y 2 -> 22).
 *   - No fills. 1.6 stroke, round caps, round joins, currentColor.
 *   - Built from circles, rounded rectangles, arcs and straight segments.
 *     Two to four elements per glyph: confident, never fussy.
 *   - One element per glyph MAY be solid (fill="currentColor" stroke="none"),
 *     usually a dot of r=1.4. That is the set's accent note -- use it rarely.
 *   - Everything must survive being rendered at 18px.
 *
 * Glyphs are decorative: the svg is aria-hidden and the label lives in the
 * calling markup.
 */

import type { ReactNode } from 'react'
import type { ModuleKey } from '@/lib/os/modules'

export interface OSIconProps { className?: string }
export type OSIconComponent = (props: OSIconProps) => JSX.Element

/** Holds the shared svg attributes so each glyph below is only its paths. */
function Svg({
  className = 'h-[18px] w-[18px]',
  children,
}: OSIconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Module glyphs                                                       */
/* ------------------------------------------------------------------ */

/** Overview: concentric pulse rings around a solid node -- a system heartbeat. */
export function GlyphOverview({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="4.6" />
      <path d="M16.6 6.2A7.4 7.4 0 0 1 16.6 17.8" />
      <path d="M7.4 6.2A7.4 7.4 0 0 0 7.4 17.8" />
    </Svg>
  )
}

/** Setup: a sprout rising from a vessel -- setting up as planting. */
export function GlyphSetup({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M6.6 14.4h10.8l-1.1 4.7a2 2 0 0 1-1.9 1.5H9.6a2 2 0 0 1-1.9-1.5z" />
      <path d="M12 14.2V8.8" />
      <path d="M12 11.2c0-2.4 1.8-4.4 4.2-4.6.2 2.5-1.8 4.6-4.2 4.6Z" />
      <path d="M12 13c-2 0-3.6-1.6-3.7-3.6 2 0 3.7 1.6 3.7 3.6Z" />
    </Svg>
  )
}

/** Pillars: three rounded columns of differing height on a shared baseline. */
export function GlyphPillars({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M4.7 20.5V11.1A1.9 1.9 0 0 1 8.5 11.1V20.5" />
      <path d="M10.1 20.5V7.3A1.9 1.9 0 0 1 13.9 7.3V20.5" />
      <path d="M15.5 20.5V9.5A1.9 1.9 0 0 1 19.3 9.5V20.5" />
      <path d="M3.4 20.5h17.2" />
    </Svg>
  )
}

/** Ideas: an off-axis spark cluster -- one four-point star and two smaller. */
export function GlyphIdeas({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M10.4 4.6Q11.75 9.45 16.6 10.8Q11.75 12.15 10.4 17Q9.05 12.15 4.2 10.8Q9.05 9.45 10.4 4.6Z" />
      <path d="M18.4 3Q19 5 21 5.6Q19 6.2 18.4 8.2Q17.8 6.2 15.8 5.6Q17.8 5 18.4 3Z" />
      <path d="M17.8 15.2Q18.3 16.9 20 17.4Q18.3 17.9 17.8 19.6Q17.3 17.9 15.6 17.4Q17.3 16.9 17.8 15.2Z" />
    </Svg>
  )
}

/** Hooks: a descending hook with a barb, hung from a solid tension point. */
export function GlyphHooks({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <circle cx="14.2" cy="4" r="1.4" fill="currentColor" stroke="none" />
      <path d="M14.2 5.8v6.7a4.3 4.3 0 0 1-8.6 0v-1.8" />
      <path d="M5.6 10.7 3.6 12.7" />
    </Svg>
  )
}

/** Repurpose: two arcs chasing each other around a rounded square. */
export function GlyphRepurpose({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <circle cx="5" cy="12" r="1.7" fill="currentColor" stroke="none" />
      <path d="M6.7 12h3.1" />
      <path d="M9.8 12c2.1 0 2.1-5.3 4.2-5.3h4.6" />
      <path d="M9.8 12h8.8" />
      <path d="M9.8 12c2.1 0 2.1 5.3 4.2 5.3h4.6" />
    </Svg>
  )
}

/** Plan: the week as five ticks on a baseline, today solid. */
export function GlyphPlan({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <rect x="3.2" y="7.4" width="17.6" height="9.2" rx="2.4" />
      <path d="M7.6 7.4v9.2M12 7.4v9.2M16.4 7.4v9.2" />
      <rect
        x="7.6"
        y="7.4"
        width="4.4"
        height="9.2"
        fill="currentColor"
        stroke="none"
      />
    </Svg>
  )
}

/* ------------------------------------------------------------------ */
/* UI glyphs                                                           */
/* ------------------------------------------------------------------ */

export function GlyphSearch({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="M15.4 15.4 20 20" />
    </Svg>
  )
}

export function GlyphCommand({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M14.8 6.4v11.2a2.8 2.8 0 1 0 2.8-2.8H6.4a2.8 2.8 0 1 0 2.8 2.8V6.4a2.8 2.8 0 1 0-2.8 2.8h11.2a2.8 2.8 0 1 0-2.8-2.8" />
    </Svg>
  )
}

export function GlyphPlus({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  )
}

export function GlyphRefresh({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M17.6 3.1v3.2h-3.2" />
    </Svg>
  )
}

export function GlyphTrash({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M4.6 6.6h14.8" />
      <path d="M9.6 6.6V5a1.4 1.4 0 0 1 1.4-1.4h2A1.4 1.4 0 0 1 14.4 5v1.6" />
      <path d="M6.4 6.6l.9 12.2a1.9 1.9 0 0 0 1.9 1.8h5.6a1.9 1.9 0 0 0 1.9-1.8l.9-12.2" />
    </Svg>
  )
}

export function GlyphCopy({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <rect x="4.4" y="8.4" width="11.2" height="11.2" rx="2.6" />
      <path d="M8.6 8.4V7a2.6 2.6 0 0 1 2.6-2.6h6.2A2.6 2.6 0 0 1 20 7v6.2a2.6 2.6 0 0 1-2.6 2.6h-1.8" />
    </Svg>
  )
}

export function GlyphCheck({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M4.8 12.8 9.6 17.6 19.2 6.8" />
    </Svg>
  )
}

export function GlyphCheckRing({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M8.2 12.2 11 15 15.8 9.2" />
    </Svg>
  )
}

export function GlyphArrowRight({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M4 12h15.4" />
      <path d="M13.8 6.4 19.4 12l-5.6 5.6" />
    </Svg>
  )
}

export function GlyphArrowLeft({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M20 12H4.6" />
      <path d="M10.2 6.4 4.6 12l5.6 5.6" />
    </Svg>
  )
}

export function GlyphChevronRight({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M9.4 5.2 16.2 12l-6.8 6.8" />
    </Svg>
  )
}

export function GlyphClose({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8" />
    </Svg>
  )
}

export function GlyphLock({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <rect x="4.6" y="10.4" width="14.8" height="9.6" rx="2.6" />
      <path d="M8.4 10.4V7.6a3.6 3.6 0 0 1 7.2 0v2.8" />
      <circle cx="12" cy="15.2" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function GlyphClock({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.2V12l3.4 2.2" />
    </Svg>
  )
}

export function GlyphDot({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function GlyphSpark({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M12 4.6Q13.5 10.1 19 11.6Q13.5 13.1 12 18.6Q10.5 13.1 5 11.6Q10.5 10.1 12 4.6Z" />
    </Svg>
  )
}

export function GlyphEnter({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <path d="M19.6 5.6v6.4a2.6 2.6 0 0 1-2.6 2.6H5.4" />
      <path d="M9.4 10.6 5.4 14.6l4 4" />
    </Svg>
  )
}

/**
 * The one glyph built to move: a faint ring with a bright quarter arc on it.
 * The caller supplies the rotation, e.g. className="h-4 w-4 animate-spin".
 */
export function GlyphSpinner({ className }: OSIconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.4" opacity={0.25} />
      <path d="M20.4 12a8.4 8.4 0 0 0-8.4-8.4" />
    </Svg>
  )
}

/* ------------------------------------------------------------------ */

export const MODULE_GLYPHS: Record<ModuleKey, OSIconComponent> = {
  overview: GlyphOverview,
  setup: GlyphSetup,
  pillars: GlyphPillars,
  ideas: GlyphIdeas,
  hooks: GlyphHooks,
  repurpose: GlyphRepurpose,
  plan: GlyphPlan,
}
