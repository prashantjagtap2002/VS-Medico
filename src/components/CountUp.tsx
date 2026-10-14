"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * Animates a stat like "5,000+" from 0 when it scrolls into view.
 * The prerendered HTML contains the final value, so SEO and no-JS users see real numbers.
 */
export default function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : NaN;
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || Number.isNaN(target)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const [, prefix, , suffix] = match;
    const format = (n: number) => `${prefix}${n.toLocaleString('en-IN')}${suffix}`;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(format(Math.round(target * eased)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      setDisplay(format(0));
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
