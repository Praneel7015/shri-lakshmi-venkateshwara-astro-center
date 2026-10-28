'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Appears after the visitor has scrolled a screen down; scrolls smoothly back up. */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      className={`grid size-11 place-items-center rounded-full border border-marigold/40 bg-night text-marigold shadow-lg shadow-night/25 transition ${visible ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
