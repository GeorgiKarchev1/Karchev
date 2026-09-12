'use client'

import { useEffect, useRef } from 'react'

/**
 * Motion is progressive enhancement: all copy and diagrams are visible in HTML.
 *
 * GSAP + ScrollTrigger are therefore loaded *after* hydration rather than
 * imported at the top of the module. A static import puts them in the route's
 * initial JS graph, which made them ~48 kB gzip of the homepage's First Load
 * JS — paid before first paint, for animations that only fire once the visitor
 * scrolls to them.
 */
export function useAgentMotion(language: string) {
  const scope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = scope.current
    if (!root) return

    // Nothing to animate for visitors who asked for reduced motion, so don't
    // even fetch the library for them.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let revert: (() => void) | undefined

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled || !scope.current) return
        gsap.registerPlugin(ScrollTrigger)

        const media = gsap.matchMedia()
        media.add({ motion: '(prefers-reduced-motion: no-preference)' }, context => {
          if (!context.conditions?.motion) return
          const q = gsap.utils.selector(root)
          q('.agent-principle-drawing').forEach(node => {
            gsap.from(node.children, { y: 13, rotation: -9, duration: .7, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: node, start: 'top 88%', once: true } })
          })
          const track = q('.agent-process-track > i')[0]
          const sequence = q('.agent-process-sequence')[0]
          if (track && sequence) gsap.fromTo(track, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: sequence, start: 'top 72%', end: 'bottom 70%', scrub: .35 } })
          const photo = q('.agent-about-photo img')[0]
          if (photo) gsap.from(photo, { scale: 1.08, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: photo, start: 'top 90%', once: true } })
        }, root)

        // Late font/image layout can move the process; refresh is scoped to this mount.
        let active = true
        document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh() })
        revert = () => { active = false; media.revert() }
      })
      .catch(() => {
        // The page is fully readable without motion; a failed chunk is not worth
        // surfacing to the visitor.
      })

    return () => {
      cancelled = true
      revert?.()
    }
  }, [language])

  return scope
}
