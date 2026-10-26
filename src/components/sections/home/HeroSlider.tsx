'use client';

import { useEffect, useState, type ReactNode } from 'react';

interface Slide {
  eyebrow: string;
  heading: string;
  text: string;
}

/**
 * Cross-fading text slides for the home hero. All slides sit in the same grid
 * cell so the height never jumps. Only the first heading is the page's <h1>.
 * Auto-advances every 6s; pauses on hover/focus and for "reduce motion".
 */
export function HeroSlider({ slides, actions }: { slides: Slide[]; actions: ReactNode }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="grid">
        {slides.map((slide, i) => {
          const Heading = i === 0 ? 'h1' : 'p';
          const visible = i === active;
          return (
            <div
              key={i}
              aria-hidden={!visible}
              className={`col-start-1 row-start-1 transition-all duration-700 ease-out ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
            >
              <p className="eyebrow mb-5 text-marigold">{slide.eyebrow}</p>
              <Heading className="font-display text-[2.6rem] leading-[1.05] text-moon sm:text-5xl lg:text-[4.1rem] [html[lang=kn-IN]_&]:leading-[1.35] [html[lang=kn-IN]_&]:lg:text-[3.4rem]">{slide.heading}</Heading>
              <p className="mt-6 max-w-xl text-lg text-moon/75 md:text-xl">{slide.text}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-9">{actions}</div>

      {slides.length > 1 && (
        <div className="mt-10 flex gap-2" role="tablist" aria-label="Slides">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={slide.eyebrow}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-10 bg-marigold' : 'w-4 bg-moon/25 hover:bg-moon/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
