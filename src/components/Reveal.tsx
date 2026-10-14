"use client";

import React, { ElementType, ReactNode, useEffect, useRef } from 'react';

/*
 * Scroll-reveal animation. One shared IntersectionObserver for the whole page,
 * CSS-only transitions, and no work at all for users who prefer reduced motion.
 * Content is only hidden when the `js` class is on <html> (set by an inline
 * script in the layout), so it stays visible if JavaScript fails.
 */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer || typeof window === 'undefined' || !('IntersectionObserver' in window)) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  return observer;
}

interface RevealProps {
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  /** Animation variant. */
  variant?: 'up' | 'fade' | 'scale';
  children: ReactNode;
}

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, variant = 'up', children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    if (!io || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
