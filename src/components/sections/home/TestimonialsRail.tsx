import type { Locale, SiteSettings, Testimonial } from '@/types/content';
import { href, ui } from '@/lib/i18n';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MoreLink } from '@/components/ui/ButtonLink';
import { ZodiacWatermark } from '@/components/ui/Ornaments';

/** Swipeable testimonial row (CSS scroll-snap, no JavaScript). */
export function TestimonialsRail({ locale, items, title, settings }: { locale: Locale; items: Testimonial[]; title: string; settings: SiteSettings }) {
  if (!items.length && !settings.rating?.sourceUrl) return null;
  const d = ui(locale);
  const googleReviews = items.length > 0 && items.every((item) => item.source === 'google');
  return (
    <section className="bg-night stars-night relative overflow-hidden py-16 md:py-24">
      <ZodiacWatermark />
      <div className="container-site relative">
        <SectionHeading
          title={googleReviews ? (locale === 'kn' ? 'Google ನಿಂದ ನೈಜ ವಿಮರ್ಶೆಗಳು' : 'Real Reviews from Google') : title}
          dark
          action={<MoreLink href={href(locale, '/testimonials/')} dark>{d.cta.allTestimonials}</MoreLink>}
        />
        {settings.rating?.sourceUrl && <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-moon">
          {typeof settings.rating.value === 'number' && settings.rating.value >= 1 && settings.rating.value <= 5 && <span className="font-semibold">★ {settings.rating.value} / 5</span>}
          {typeof settings.rating.count === 'number' && settings.rating.count > 0 && <span>{settings.rating.count.toLocaleString(locale === 'kn' ? 'kn-IN' : 'en-IN')} {locale === 'kn' ? 'Google ವಿಮರ್ಶೆಗಳು' : 'Google reviews'}</span>}
          <a href={settings.rating.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-marigold underline underline-offset-4">{locale === 'kn' ? 'Google ನಲ್ಲಿ ನೋಡಿ' : 'View on Google'}</a>
        </div>}
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-12 md:overflow-visible md:px-0 lg:grid-cols-4">
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
