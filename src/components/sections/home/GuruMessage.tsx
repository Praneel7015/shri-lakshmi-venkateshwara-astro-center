import type { HomePage, Locale, SiteSettings } from '@/types/content';
import { ts } from '@/lib/i18n';
import { Mandala } from '@/components/ui/Ornaments';
import { Reveal } from '@/components/ui/Reveal';

export function GuruMessage({ locale, page, settings }: { locale: Locale; page: HomePage; settings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden bg-sand py-24 md:py-32">
      <Mandala className="animate-orbit pointer-events-none absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 text-saffron/10" />
      <Reveal className="container-site relative mx-auto max-w-4xl text-center">
        <p className="eyebrow mb-6 text-saffron-deep">{ts(page.message.heading, locale)}</p>
        <blockquote className="font-display text-3xl leading-snug text-night italic md:text-[2.75rem]">
          “{ts(page.message.quote, locale)}”
        </blockquote>
        <p className="mt-8 font-display text-xl text-saffron-deep">{ts(settings.astrologerName, locale)}</p>
      </Reveal>
    </section>
  );
}
