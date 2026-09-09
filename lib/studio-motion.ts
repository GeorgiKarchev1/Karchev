'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { installRevealFailsafe } from '@/lib/reveal';

/**
 * The scroll-triggered reveals. `installRevealFailsafe` rescues anything still
 * transparent once the page has settled, so a trigger that never fires costs
 * the animation and never the content. The hero tweens run on mount rather than
 * on scroll, so they need no rescue.
 */
const REVEAL_SELECTORS = ['[data-reveal]'];

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Counts a proof numeral up from zero, preserving whatever suffix the
 * translation carries ("20+", "3+"). Non-numeric labels are left alone.
 */
function countUp(el: HTMLElement) {
  // The tween rewrites textContent, so the real target is cached on the element
  // the first time round. Without this, a second run (React StrictMode, or any
  // teardown/replay) reads back the "0" this function just wrote and the
  // numeral sticks at zero.
  const raw = el.dataset.countFrom ?? el.textContent?.trim() ?? '';
  el.dataset.countFrom = raw;

  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return;

  const target = Number(match[1]);
  const suffix = match[2];
  const counter = { value: 0 };

  gsap.to(counter, {
    value: target,
    duration: 1.6,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = Math.round(counter.value) + suffix;
    },
    // Guarantees the exact target even if the tween is interrupted.
    onComplete: () => {
      el.textContent = target + suffix;
    },
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  });
}

/**
 * The homepage motion layer. Everything here is progressive enhancement: the
 * markup renders complete and visible, and this only opts into animation after
 * mount, on pointer devices that have not asked for reduced motion.
 */
export function useStudioMotion() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.registerPlugin(ScrollTrigger);
      const root = scope.current;
      if (!root) return;

      const q = gsap.utils.selector(root);
      const reveal = { opacity: 0, y: 42 } as const;

      // Hero display type rises out of its mask, line by line.
      gsap.from(q('.studio-hero-line > span'), {
        yPercent: 108,
        duration: 1.05,
        ease: 'power3.out',
        stagger: 0.09,
        delay: 0.08,
      });

      gsap.from(q('.studio-hero-bottom > *'), {
        opacity: 0,
        y: 26,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.42,
      });

      // Generic scroll reveals. Elements sharing a data-reveal group stagger
      // together; ungrouped ones animate on their own trigger.
      const groups = new Map<string, HTMLElement[]>();
      q('[data-reveal]').forEach((node) => {
        const el = node as HTMLElement;
        const key = el.dataset.reveal || '';
        if (!key) {
          gsap.from(el, {
            ...reveal,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
          return;
        }
        groups.set(key, [...(groups.get(key) ?? []), el]);
      });

      groups.forEach((els) => {
        gsap.from(els, {
          ...reveal,
          duration: 0.85,
          ease: 'power2.out',
          stagger: 0.09,
          scrollTrigger: { trigger: els[0], start: 'top 88%', once: true },
        });
      });

      q('.studio-proof-number').forEach((el) => countUp(el as HTMLElement));

      // The process spine fills as the reader moves down the steps.
      const track = q('.studio-steps-track > i')[0];
      const stepsWrap = q('.studio-steps-wrap')[0];
      if (track && stepsWrap) {
        gsap.fromTo(
          track,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: stepsWrap,
              start: 'top 78%',
              end: 'bottom 62%',
              scrub: 0.6,
            },
          }
        );
      }

      const stopFailsafe = installRevealFailsafe(REVEAL_SELECTORS, root);

      return () => {
        stopFailsafe();
        // If this layer is torn down mid-count, leave the real figures on screen.
        q('.studio-proof-number').forEach((node) => {
          const el = node as HTMLElement;
          if (el.dataset.countFrom) el.textContent = el.dataset.countFrom;
        });
      };
    },
    { scope }
  );

  return scope;
}
