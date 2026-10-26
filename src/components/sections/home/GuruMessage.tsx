import type { HomePage, Locale, SiteSettings } from '@/types/content';
import { ts } from '@/lib/i18n';

/** A single pull quote from Guruji. */
export function GuruMessage({ locale, page, settings }: { locale: Locale; page: HomePage; settings: SiteSettings }) {
  return (
    <section className="py-16 md:py-24">
      <figure className="container-site grid gap-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12">
        <figcaption className="text-sm text-muted md:pt-3">
          <span className="block font-display text-xl text-night">{ts(settings.astrologerName, locale)}</span>
          {ts(page.message.heading, locale)}
        </figcaption>
        <blockquote className="max-w-3xl font-display-italic text-3xl leading-snug text-night italic md:text-[2.6rem]">
          <p>“{ts(page.message.quote, locale)}”</p>
        </blockquote>
      </figure>
    </section>
  );
}
