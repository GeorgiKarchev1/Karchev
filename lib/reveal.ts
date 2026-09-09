import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP reveal animations hide their targets with `opacity: 0` before the
 * matching ScrollTrigger fires. When a trigger never fires the content stays
 * invisible permanently — a restored scroll position, a refresh race against
 * late-loading fonts or images, or a resize during load are all enough to
 * cause it. A missed animation should cost the animation, never the content.
 *
 * This refreshes triggers once the page has settled, then force-reveals any
 * target that is already inside the viewport but still transparent. Targets
 * below the fold are left alone so their real animation can still play.
 */
export function installRevealFailsafe(selectors: string[], scope?: Element | null) {
  if (typeof window === 'undefined') return () => {};

  const root: ParentNode = scope ?? document;

  const rescue = () => {
    for (const selector of selectors) {
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        const rect = el.getBoundingClientRect();
        const shouldHaveFired = rect.top < window.innerHeight * 0.95;
        if (!shouldHaveFired) return;
        if (parseFloat(window.getComputedStyle(el).opacity) > 0.99) return;
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0 });
      });
    }
  };

  const onLoad = () => {
    ScrollTrigger.refresh();
    rescue();
  };

  window.addEventListener('load', onLoad);
  // Covers the case where `load` already fired before this ran.
  const timer = window.setTimeout(onLoad, 1500);

  return () => {
    window.removeEventListener('load', onLoad);
    window.clearTimeout(timer);
  };
}
