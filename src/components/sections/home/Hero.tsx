import { Phone } from 'lucide-react';
import type { HomePage, Locale, SiteSettings } from '@/types/content';
import { htmlLang, ts, ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { Picture } from '@/components/ui/Picture';
import { ZodiacWheel } from '@/components/ui/Ornaments';
import { HeroSlider } from './HeroSlider';

/**
 * Home hero: the one bold moment on the site. The zodiac wheel turns slowly
 * behind an arched portrait; below the buttons, the "numbers" from the Studio
 * (Home page → Numbers band) read as a single row of facts.
 */
export function Hero({ locale, page, settings }: { locale: Locale; page: HomePage; settings: SiteSettings }) {
  const d = ui(locale);
  const slides = page.hero.map((s) => ({ eyebrow: ts(s.eyebrow, locale), heading: ts(s.heading, locale), text: ts(s.text, locale) }));
  const portrait = page.hero[0]?.image ?? page.intro.image;

  return (
    <section className="bg-sky relative overflow-hidden">
      <div className="container-site relative grid items-center gap-10 pt-10 pb-12 md:grid-cols-[1.2fr_0.8fr] md:gap-8 lg:gap-14 lg:pt-16 lg:pb-16">
        <HeroSlider
          slides={slides}
          actions={
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={waLink(settings.whatsapp, d.whatsappGreeting)} variant="whatsapp" size="lg" icon={<WhatsAppIcon colored={false} />}>
                {d.cta.book}
              </ButtonLink>
              <ButtonLink href={telLink(settings.phone)} variant="light" size="lg" icon={<Phone className="size-5" aria-hidden="true" />}>
                {settings.phone}
              </ButtonLink>
            </div>
          }
        />

        {/* Arched portrait with the zodiac wheel turning behind it */}
        <div className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[24rem] lg:max-w-[28rem]">
          <div className="animate-orbit absolute inset-0 will-change-transform">
            <ZodiacWheel className="size-full text-marigold/35" />
          </div>
          <div className="arch absolute inset-[16%] overflow-hidden border border-marigold/40">
            <Picture image={portrait} locale={locale} alt={ts(settings.astrologerName, locale)} sizes="(min-width: 1024px) 19rem, 60vw" priority tone="dark" />
          </div>
        </div>
      </div>

      {page.stats.length > 0 && (
        <div className="border-t border-moon/10">
          <dl className="container-site grid grid-cols-2 gap-x-6 gap-y-4 py-6 lg:grid-cols-4">
            {page.stats.map((s, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <dt className="sr-only">{ts(s.label, locale)}</dt>
                <dd className="font-display text-2xl text-marigold tabular-nums md:text-3xl">
                  {s.value.toLocaleString(htmlLang[locale])}
                  {s.suffix}
                </dd>
                <span aria-hidden="true" className="text-sm text-moon/70">{ts(s.label, locale)}</span>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
