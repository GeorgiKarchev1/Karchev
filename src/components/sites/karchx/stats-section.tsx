"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useScrollProgress } from "@/hooks/use-scroll";

/**
 * Pinned scroll scene (matches the original): while the section is pinned, six photos/cards fly out
 * of the centre (scale 0 -> 1, travelling to their spots), then keep drifting at different speeds
 * (parallax) while the headline line swaps from "98% ..." to "After two weeks, we continue for free...".
 * Offsets below are centre-relative pixels measured on the live site at a 1280x800 viewport.
 */
type Item = {
  kind: "photo" | "card";
  src: string;
  alt: string;
  size: string; // responsive size classes
  hide: string; // visibility classes
  p1: [number, number]; // position once fully scaled
  end: [number, number]; // position after the drift
  z: number;
};

const base = "/sites/karchx/infographic/";
const items: Item[] = [
  {
    kind: "photo",
    src: base + "photo-flowers.jpg",
    alt: "Tall yellow wildflowers against a softly blurred, sunlit background",
    size: "w-[121px] h-[123px] md:w-[191px] md:h-[191px] lg:w-[236px] lg:h-[261px]",
    hide: "",
    p1: [-521, -112],
    end: [-398, -220],
    z: 1,
  },
  {
    kind: "card",
    src: base + "karchx-project.svg",
    alt: "KARCHX new website project, € 250: brief received on day 1, site launched on day 14",
    size: "w-[176px] h-[79px] md:w-[225px] md:h-[101px] lg:w-[340px] lg:h-[152px]",
    hide: "",
    p1: [-541, -167],
    end: [-473, -213],
    z: 3,
  },
  {
    kind: "photo",
    src: base + "karchx-desk.jpg",
    alt: "A man with glasses sketching over papers spread on a table in a modern office",
    size: "w-[121px] h-[123px] md:w-[191px] md:h-[191px] lg:w-[273px] lg:h-[277px]",
    hide: "",
    p1: [200, -343],
    end: [459, -201],
    z: 1,
  },
  {
    kind: "card",
    src: base + "karchx-weekly.svg",
    alt: "KARCHX weekly activity card: 18 new website enquiries, 24 tasks done together, 3 waiting for your review",
    size: "w-[176px] h-[101px] md:w-[261px] md:h-[140px] lg:w-[340px] lg:h-[196px]",
    hide: "",
    p1: [-196, 293],
    end: [-389, 225],
    z: 3,
  },
  {
    kind: "photo",
    src: base + "karchx-notebook.jpg",
    alt: "A hand writing in an open planner notebook on a desk beside a tablet and keyboard",
    size: "w-[121px] h-[116px] md:w-[182px] md:h-[182px] lg:w-[238px] lg:h-[228px]",
    hide: "",
    p1: [460, 147],
    end: [339, 256],
    z: 1,
  },
  {
    kind: "card",
    src: base + "karchx-working.svg",
    alt: "KARCHX status card: contact form automation in progress, step 2 of 3",
    size: "w-[176px] h-[87px] md:w-[225px] md:h-[126px] lg:w-[340px] lg:h-[170px]",
    hide: "",
    p1: [536, 38],
    end: [437, 117],
    z: 3,
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function StatsSection() {
  const trackRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineA = useRef<HTMLDivElement>(null);
  const lineB = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useScrollProgress(
    trackRef,
    (q) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const phone = vw < 768;
      const fx = phone ? clamp((vw / 1280) * 0.72, 0.2, 0.32) : clamp(vw / 1280, 0.42, 1.15) * (vw < 1024 ? 0.85 : 1);
      const fy = clamp(vh / 800, 0.7, 1.2);
      // no pop-up: every item is visible from the start and orbits the centre clockwise as you scroll
      const ang = clamp(q / 0.9) * (Math.PI * 0.45);
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);
      const rx = 640 * fx;
      const ry = 400 * fy;
      const grow = ease(clamp(q / 0.5));
      const shrink = ease(clamp((q - 0.6) / 0.4)); // shrink a little towards the end

      // phones only: fixed half-size of the text block (both headline versions, so it never changes while scrolling)
      const textHalfW = phone && textRef.current && lineA.current && lineB.current
        ? Math.max(lineA.current.offsetWidth, lineB.current.offsetWidth, 120) / 2
        : 0;
      const textHalfH = phone && textRef.current ? textRef.current.offsetHeight / 2 : 0;
      const maxAng = Math.PI * 0.45;

      items.forEach((it, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const nx = (it.p1[0] * fx * 0.88) / rx;
        const ny = (it.p1[1] * fy * 0.88) / ry;
        const sc = (0.15 + 0.85 * grow) * (1 - 0.3 * shrink) * (phone ? 0.85 : 1);
        const at = (a: number): [number, number] => {
          const c = Math.cos(a);
          const s = Math.sin(a);
          // y points down, so this rotation is clockwise on screen
          return [(nx * c - ny * s) * rx, (nx * s + ny * c) * ry];
        };
        let useAng = ang;
        if (phone && textHalfW > 0) {
          // The stopping angle is worked out once per card from fixed sizes (not from the scroll position),
          // so a card halts at one steady spot and never jitters.
          const hw = (el.offsetWidth * 0.85) / 2 + 8;
          const hh = (el.offsetHeight * 0.85) / 2 + 8;
          const hits = (a: number) => {
            const [px, py] = at(a);
            return Math.abs(px) < textHalfW + hw && Math.abs(py) < textHalfH + hh;
          };
          if (!hits(0)) {
            for (let k = 1; k <= 90; k++) {
              if (hits((maxAng * k) / 90)) {
                useAng = Math.min(ang, (maxAng * (k - 1)) / 90);
                break;
              }
            }
          }
        }
        const [x, y] = at(useAng);
        el.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${sc})`;
        el.style.opacity = "1";
      });

      // headline swap: line A fades out, line B fades in (~ q 0.72 -> 0.86)
      const swap = clamp((q - 0.72) / 0.14);
      if (lineA.current) {
        lineA.current.style.opacity = String(1 - swap);
        lineA.current.style.transform = `translateY(${-14 * swap}px)`;
        lineA.current.style.filter = `blur(${swap * 6}px)`;
      }
      if (lineB.current) {
        lineB.current.style.opacity = String(swap);
        lineB.current.style.transform = `translateY(${14 * (1 - swap)}px)`;
        lineB.current.style.filter = `blur(${(1 - swap) * 6}px)`;
      }
      // the big number gently grows as the scene opens
      if (numRef.current) numRef.current.style.transform = `scale(${0.95 + 0.05 * grow})`;
    },
    "pin",
  );

  return (
    <section ref={trackRef} className="relative w-full h-[320vh] bg-[#f9f8f5]" aria-label="€ 250 for 2 weeks of work. One-time, in advance.">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Flying photos & cards */}
        <div className="absolute inset-0 pointer-events-none">
          {items.map((it, i) => (
            <div
              key={it.src}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`absolute left-1/2 top-1/2 will-change-transform ${it.hide}`}
              style={{ zIndex: it.z, transform: "translate(-50%, -50%) scale(0.15)", opacity: 1 }}
            >
              {it.kind === "photo" ? (
                <div className={`relative overflow-hidden rounded-[12px] lg:rounded-[16px] shadow-lg ${it.size}`}>
                  <Image src={it.src} alt={it.alt} fill sizes="(max-width: 1024px) 191px, 273px" className="object-cover" />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.src} alt={it.alt} className={`max-w-none object-contain drop-shadow-xl ${it.size}`} />
              )}
            </div>
          ))}
        </div>

        {/* Center Main Stat */}
        <div ref={textRef} className="relative z-10 text-center px-4 max-w-4xl">
          <span
            ref={numRef}
            className="font-serif-marist text-5xl sm:text-7xl md:text-[96px] lg:text-[112px] font-normal text-[#070503] leading-none tracking-tight block will-change-transform"
          >
            € 250
          </span>
          <div className="grid place-items-center mt-2">
            <div ref={lineA} className="col-start-1 row-start-1 will-change-transform">
              <h3 className="font-serif-marist text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-normal text-[#070503]/90 leading-tight">
                2 weeks of work.<br />
                One-time, in advance.
              </h3>
            </div>
            <div ref={lineB} className="col-start-1 row-start-1 will-change-transform" style={{ opacity: 0 }}>
              <h3 className="font-serif-marist text-[22px] sm:text-[26px] md:text-[32px] lg:text-[40px] font-normal text-[#070503]/90 leading-tight">
                After two weeks, we continue<br className="hidden md:block" />{" "}
                for free until the agreed<br className="hidden md:block" />{" "}
                goals are achieved.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
