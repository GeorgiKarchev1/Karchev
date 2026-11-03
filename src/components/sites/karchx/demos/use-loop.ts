"use client";

import { useEffect, useState } from "react";

/**
 * Drives a looping timeline. `steps` are durations (ms) of each stage; returns the current
 * stage index. Restarts from 0 whenever `running` flips to true; freezes when false.
 */
export function useLoop(steps: number[], running: boolean) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!running) {
      setStage(0);
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      setStage(i);
      t = setTimeout(() => {
        i = (i + 1) % steps.length;
        next();
      }, steps[i]);
    };
    next();
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);
  return stage;
}

/** Types `text` out char by char once `start` is true. */
export function useTyped(text: string, start: boolean, cps = 38) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) {
      setN(0);
      return;
    }
    setN(0);
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 1000 / cps);
    return () => clearInterval(id);
  }, [start, text, cps]);
  return text.slice(0, n);
}
