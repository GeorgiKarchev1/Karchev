'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/** Motion is progressive enhancement: all copy and diagrams are visible in HTML. */
export function useAgentMotion(language: string) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const root = scope.current
    if (!root) return
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
    return () => { active = false; media.revert() }
  }, { scope, dependencies: [language], revertOnUpdate: true })

  return scope
}
