'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroSlide, Locale } from '@/types/content';
import { ts } from '@/lib/i18n';
import { Picture } from '@/components/ui/Picture';

export function HeroCarousel({ slides, locale }: { slides: HeroSlide[]; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (slides.length < 2 || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);
  if (!slides.length) return null;
  const slide = slides[index];
  return <section aria-label={locale === 'kn' ? 'ಚಿತ್ರಗಳ ಸರಣಿ' : 'Featured images'} className="bg-sky relative py-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="container-site">
      <div className="relative aspect-[16/9] overflow-hidden rounded-card md:aspect-[2.3/1]">
        <div key={index} className="image-arrival absolute inset-0">
          <Picture image={slide.image} locale={locale} alt={ts(slide.heading, locale)} sizes="(min-width: 1280px) 1200px, 100vw" priority fit="contain-backdrop" />
        </div>
        {slides.length > 1 && <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
          <button type="button" aria-label="Previous image" onClick={() => setIndex((index + slides.length - 1) % slides.length)} className="grid size-11 place-items-center rounded-full bg-night/80 text-white"><ChevronLeft aria-hidden="true" /></button>
          <span className="rounded-full bg-night/80 px-3 py-1 text-sm text-white" aria-live="polite">{index + 1} / {slides.length}</span>
          <button type="button" aria-label="Next image" onClick={() => setIndex((index + 1) % slides.length)} className="grid size-11 place-items-center rounded-full bg-night/80 text-white"><ChevronRight aria-hidden="true" /></button>
        </div>}
      </div>
    </div>
  </section>;
}
