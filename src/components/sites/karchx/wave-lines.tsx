"use client";

import React, { useEffect, useRef } from "react";

/**
 * Very light vertical lines that ripple like waves in the direction the cursor moves.
 * Each line is sampled along its height; mouse movement pushes nearby samples sideways in the
 * direction of travel, the push spreads to neighbours and then eases back to rest (no shaking).
 */
export function WaveLines({ spacing = 30 }: { spacing?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, cols = 0, rows = 0;
    const STEP = 14; // vertical sample distance
    let u = new Float32Array(0); // offsets
    let tmp = new Float32Array(0); // scratch buffer
    let raf = 0;
    let visible = false;
    let last = { x: -1, y: -1 };
    let dpr = 1;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(w / spacing) + 2;
      rows = Math.ceil(h / STEP) + 1;
      u = new Float32Array(cols * rows);
      tmp = new Float32Array(cols * rows);
      draw();
    };

    const onMove = (e: MouseEvent) => {
      if (!visible || reduce) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (last.x >= 0) {
        const dx = x - last.x;
        const dy = y - last.y;
        // push in the movement direction (vertical moves still stir the lines a little)
        const push = Math.max(-60, Math.min(60, dx + dy * 0.45)) * 0.5;
        const R = 230;
        const c0 = Math.max(0, Math.floor((x - R) / spacing));
        const c1 = Math.min(cols - 1, Math.ceil((x + R) / spacing));
        const r0 = Math.max(0, Math.floor((y - R) / STEP));
        const r1 = Math.min(rows - 1, Math.ceil((y + R) / STEP));
        for (let c = c0; c <= c1; c++) {
          for (let rr = r0; rr <= r1; rr++) {
            const d = Math.hypot(c * spacing - x, rr * STEP - y);
            if (d < R) {
              const f = 1 - d / R;
              const i = rr * cols + c;
              u[i] = Math.max(-80, Math.min(80, u[i] + push * f * f));
            }
          }
        }
      }
      last = { x, y };
    };

    // No springs/velocity, so nothing oscillates: the push spreads to neighbours a little
    // (diffusion) and then eases back to rest in one smooth motion.
    const step = () => {
      const SPREAD = 0.2;
      const DECAY = 0.965;
      for (let rr = 0; rr < rows; rr++) {
        for (let c = 0; c < cols; c++) {
          const i = rr * cols + c;
          const l = c > 0 ? u[i - 1] : u[i];
          const r = c < cols - 1 ? u[i + 1] : u[i];
          const t = rr > 0 ? u[i - cols] : u[i];
          const b = rr < rows - 1 ? u[i + cols] : u[i];
          tmp[i] = (u[i] + SPREAD * (l + r + t + b - 4 * u[i])) * DECAY;
          if (Math.abs(tmp[i]) < 0.02) tmp[i] = 0;
        }
      }
      u.set(tmp);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = document.documentElement.classList.contains("dark") ? "rgba(236, 232, 225, 0.08)" : "rgba(7, 5, 3, 0.07)";
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        for (let rr = 0; rr < rows; rr++) {
          const x = c * spacing + u[rr * cols + c];
          const y = rr * STEP;
          if (rr === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    const loop = () => {
      if (visible) {
        step();
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) last = { x: -1, y: -1 };
    });
    io.observe(canvas);
    window.addEventListener("mousemove", onMove, { passive: true });
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [spacing]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />;
}
