'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/** Small round button, bottom-left, once the visitor has scrolled down; scrolls smoothly back up. */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
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
      aria-hidden={!visible}
      className={`fixed bottom-5 left-5 z-40 grid size-11 place-items-center rounded-full border border-marigold/50 bg-night text-marigold shadow-lg shadow-night/30 transition hover:bg-night-2 md:bottom-6 md:left-6 ${visible ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
    >
      <ChevronUp className="size-5" aria-hidden="true" />
    </button>
  );
}
