import type { HomePage, Locale, SiteSettings } from '@/types/content';
import { ts } from '@/lib/i18n';

/** A single pull quote from Guruji, in a gold-ruled callout on a starry sand band. */
export function GuruMessage({ locale, page, settings }: { locale: Locale; page: HomePage; settings: SiteSettings }) {
  return (
    <section className="bg-sand stars relative py-16 md:py-24">
      <figure className="container-site grid gap-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-12">
        <figcaption className="text-sm text-muted md:pt-3">
          <span className="block font-display text-xl text-night">{ts(settings.astrologerName, locale)}</span>
          {ts(page.message.heading, locale)}
        </figcaption>
        <blockquote className="max-w-3xl rounded-r-card border-l-4 border-saffron bg-ivory/80 py-6 pr-6 pl-6 font-display-italic text-3xl leading-snug text-night italic md:pl-8 md:text-[2.4rem]">
          <p>“{ts(page.message.quote, locale)}”</p>
        </blockquote>
      </figure>
    </section>
  );
}
