import { Star } from 'lucide-react';
import type { Locale, Testimonial } from '@/types/content';
import { ts } from '@/lib/i18n';

export function TestimonialCard({ testimonial: r, locale, dark = false }: { testimonial: Testimonial; locale: Locale; dark?: boolean }) {
  const service = ts(r.service, locale);
  return (
    <figure className={`flex h-full flex-col rounded-card p-6 ${dark ? 'bg-night-2 text-moon' : 'border border-line bg-white/70'}`}>
      <span className="flex gap-0.5 text-marigold" role="img" aria-label={`${r.rating} / 5`}>
        {Array.from({ length: r.rating }, (_, i) => (
          <Star key={i} className="size-4 fill-current" strokeWidth={0} aria-hidden="true" />
        ))}
      </span>
      <blockquote className={`mt-4 flex-1 text-[1.05rem] leading-relaxed ${dark ? 'text-moon/90' : 'text-ink'}`}>
        <p>{ts(r.text, locale)}</p>
      </blockquote>
      <figcaption className="mt-5">
        <span className="block font-semibold">
          {r.name}
          {r.city && <span className={`font-normal ${dark ? 'text-moon/60' : 'text-muted'}`}>, {r.city}</span>}
        </span>
        {service && <span className={`block text-sm ${dark ? 'text-moon/60' : 'text-muted'}`}>{service}</span>}
      </figcaption>
    </figure>
  );
}
