"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/*
 * Next only scrolls the new page segment into view (leaving it under the sticky
 * header) and keeps the old position when that segment is already visible.
 * Every fresh navigation should start at the very top instead; back/forward
 * keeps the browser's restored position, and #hash links keep their target.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const isHistoryNav = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      isHistoryNav.current = true;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isHistoryNav.current) {
      isHistoryNav.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
