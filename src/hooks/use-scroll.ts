"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** True once the element has been in view; `active` toggles as it enters/leaves. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options: IntersectionObserverInit = { threshold: 0.35 },
) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
  return active;
}

/**
 * Calls `onProgress(p)` on every scroll frame, where p runs 0 -> 1 as the element
 * travels from "top edge at viewport bottom" (start) to "bottom edge at viewport top" (end).
 * Pass `mode="pin"` for tall tracks: p = scrolled distance / (height - viewport).
 * Writes happen outside React state so scroll stays at 60fps.
 */
export function useScrollProgress<T extends Element>(
  ref: RefObject<T | null>,
  onProgress: (p: number, rect: DOMRect) => void,
  mode: "travel" | "pin" = "travel",
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === "pin") p = -r.top / Math.max(1, r.height - vh);
      else p = (vh - r.top) / (vh + r.height);
      cb.current(Math.min(1, Math.max(0, p)), r);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, mode]);
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const h = () => setReduced(m.matches);
    m.addEventListener("change", h);
    return () => m.removeEventListener("change", h);
  }, []);
  return reduced;
}

/** Fade/slide-in wrapper driven by IntersectionObserver (one-shot). */
export function useRevealOnce<T extends Element>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}
