import type { Locale, Testimonial } from '@/types/content';
import { ts } from '@/lib/i18n';

/** One review: the words, then who said it. A rule on top separates reviews (no card box). */
export function TestimonialCard({ testimonial: r, locale, dark = false }: { testimonial: Testimonial; locale: Locale; dark?: boolean }) {
  const service = ts(r.service, locale);
  const quiet = dark ? 'text-moon/60' : 'text-muted';
  return (
    <figure className={`flex h-full flex-col border-t pt-6 ${dark ? 'border-moon/20 text-moon' : 'border-night/15'}`}>
      <blockquote className={`flex-1 text-[1.05rem] leading-relaxed ${dark ? 'text-moon/90' : 'text-ink'}`}>
        <p>{ts(r.text, locale)}</p>
      </blockquote>
      <figcaption className="mt-5 text-[0.95rem]">
        <span className="block font-semibold">
          {r.name}
          {r.city && <span className={`font-normal ${quiet}`}>, {r.city}</span>}
        </span>
        {service && <span className={`block text-sm ${quiet}`}>{service}</span>}
      </figcaption>
    </figure>
  );
}
