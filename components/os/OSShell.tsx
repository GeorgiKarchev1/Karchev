'use client'

import type { CSSProperties, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { moduleForPath } from '@/lib/os/modules'
import OSRail from './OSRail'
import OSTopBar from './OSTopBar'
import OSCommandBar from './OSCommandBar'
import OSMobileBar from './OSMobileBar'

/**
 * The frame.
 *
 * Desktop operating systems put chrome *around every window* and float those
 * windows over a wallpaper. This does the inverse: one dark graphite frame runs
 * edge to edge, and the workspace is a single large-radius panel inset inside
 * it — detached on every side, so it reads as a surface floating in the frame
 * rather than a window sitting on a desktop.
 *
 * The active module's identity gradient is published here as CSS custom
 * properties. Everything downstream (canvas wash, focus rings, accent plates)
 * reads `--os-accent-a/b`, so the whole workspace re-tints on navigation from
 * this one assignment.
 */
export default function OSShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const active = moduleForPath(pathname)

  const accent = {
    '--os-accent-a': active.accentA,
    '--os-accent-b': active.accentB,
  } as CSSProperties

  return (
    <div
      className="os-root flex h-dvh flex-col overflow-hidden bg-[var(--os-frame)]"
      style={accent}
    >
      <div className="shrink-0">
        <OSTopBar />
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="hidden shrink-0 md:block">
          <OSRail />
        </div>

        {/*
          The workspace. Inset on three sides so the dark frame stays visible
          around it; that gap is what makes the panel read as floating.
        */}
        <div className="relative min-w-0 flex-1 pb-2 pr-2 md:pl-0">
          <main
            className="os-canvas-ground os-canvas-weave os-scroll relative h-full overflow-y-auto rounded-[var(--os-r-canvas)] ring-1 ring-black/5"
            id="os-workspace"
          >
            {/*
              Bottom padding clears the floating command bar so the last card in
              a long board is never trapped underneath it.
            */}
            <div className="relative z-10 pb-28 md:pb-32">{children}</div>
          </main>
        </div>
      </div>

      <OSCommandBar />
      <OSMobileBar />
    </div>
  )
}
