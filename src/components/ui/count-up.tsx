"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  delay?: number;
};

/** Eases a number up from zero when it scrolls into view. */
export function CountUp({ value, decimals = 0, suffix = "", duration = 1400, delay = 0 }: CountUpProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        setDisplay(value * eased);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(run, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
