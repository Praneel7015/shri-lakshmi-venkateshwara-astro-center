import type { Locale, Testimonial } from '@/types/content';
import { href, ui } from '@/lib/i18n';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/ButtonLink';

/** Swipeable testimonial row (CSS scroll-snap, no JavaScript). */
export function TestimonialsRail({ locale, items, title }: { locale: Locale; items: Testimonial[]; title: string }) {
  if (!items.length) return null;
  const d = ui(locale);
  return (
    <section className="bg-night py-16 md:py-24">
      <div className="container-site">
        <SectionHeading
          title={title}
          dark
          action={<ButtonLink href={href(locale, '/testimonials/')} variant="light">{d.cta.allTestimonials}</ButtonLink>}
        />
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4">
          {items.map((t, i) => (
            <li key={i} className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <TestimonialCard testimonial={t} locale={locale} dark />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
