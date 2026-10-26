import { Quote, Star } from 'lucide-react';
import type { Locale, Testimonial } from '@/types/content';
import { ts } from '@/lib/i18n';

export function TestimonialCard({ testimonial: r, locale, dark = false }: { testimonial: Testimonial; locale: Locale; dark?: boolean }) {
  return (
    <figure className={`flex h-full flex-col rounded-card p-7 ${dark ? 'border border-moon/10 bg-night-2/80 text-moon' : 'border border-line bg-white/80 shadow-card'}`}>
      <div className="flex items-center justify-between">
        <Quote className={`size-8 ${dark ? 'text-marigold/60' : 'text-saffron/50'}`} aria-hidden="true" />
        <span className="flex gap-0.5 text-marigold" role="img" aria-label={`${r.rating} / 5`}>
          {Array.from({ length: r.rating }, (_, i) => (
            <Star key={i} className="size-4 fill-current" aria-hidden="true" />
          ))}
        </span>
      </div>
      <blockquote className={`mt-4 flex-1 font-display text-lg leading-relaxed ${dark ? 'text-moon/90' : 'text-night'}`}>
        “{ts(r.text, locale)}”
      </blockquote>
      <figcaption className={`mt-6 border-t pt-4 ${dark ? 'border-moon/10' : 'border-line'}`}>
        <span className="block font-semibold">{r.name}</span>
        <span className={`block text-sm ${dark ? 'text-moon/55' : 'text-muted'}`}>
          {[r.city, ts(r.service, locale)].filter(Boolean).join(' · ')}
        </span>
      </figcaption>
    </figure>
  );
}
