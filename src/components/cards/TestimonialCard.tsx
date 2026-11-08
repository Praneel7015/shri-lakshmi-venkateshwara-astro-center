import type { Locale, Testimonial } from '@/types/content';
import { ts } from '@/lib/i18n';
import { Star } from 'lucide-react';

/** A review card with its recorded star rating and, when supplied, its source. */
export function TestimonialCard({ testimonial: r, locale, dark = false }: { testimonial: Testimonial; locale: Locale; dark?: boolean }) {
  const service = ts(r.service, locale);
  const quiet = 'text-muted';
  return (
    <figure className={`flex h-full flex-col rounded-card border border-line bg-ivory p-6 text-ink shadow-sm ${dark ? 'shadow-black/10' : ''}`}>
      {Number.isInteger(r.rating) && r.rating >= 1 && r.rating <= 5 && <div className="mb-4 flex items-center gap-1 text-marigold" role="img" aria-label={`${r.rating} / 5`}>
        {Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4" fill={i < r.rating ? 'currentColor' : 'none'} aria-hidden="true" />)}
      </div>}
      <blockquote className="flex-1 text-[1.05rem] leading-relaxed text-ink">
        <p>{ts(r.text, locale)}</p>
      </blockquote>
      <figcaption className="mt-5 text-[0.95rem]">
        <span className="block font-semibold">
          {r.name}
          {r.city && <span className={`font-normal ${quiet}`}>, {r.city}</span>}
        </span>
        {service && <span className={`block text-sm ${quiet}`}>{service}</span>}
        {r.source === 'google' && <span className={`mt-1 block text-sm ${quiet}`}>{locale === 'kn' ? 'Google ವಿಮರ್ಶೆ' : 'Google review'}</span>}
      </figcaption>
    </figure>
  );
}
