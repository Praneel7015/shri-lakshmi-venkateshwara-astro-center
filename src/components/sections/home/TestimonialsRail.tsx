import { ArrowRight } from 'lucide-react';
import type { Locale, Testimonial } from '@/types/content';
import { href, ui } from '@/lib/i18n';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StarField } from '@/components/ui/Ornaments';
import { ButtonLink } from '@/components/ui/ButtonLink';

/** Swipeable testimonial row (CSS scroll-snap, no JavaScript). */
export function TestimonialsRail({ locale, items }: { locale: Locale; items: Testimonial[] }) {
  if (!items.length) return null;
  const d = ui(locale);
  return (
    <section className="bg-sky relative overflow-hidden py-20 md:py-28">
      <StarField className="pointer-events-none absolute inset-0 size-full text-moon/60" />
      <div className="container-site relative">
        <SectionHeading title={d.home.testimonials} dark />
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {items.map((t, i) => (
            <li key={i} className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto">
              <TestimonialCard testimonial={t} locale={locale} dark />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink href={href(locale, '/testimonials/')} variant="light" className="flex-row-reverse" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
            {d.cta.viewAll}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
