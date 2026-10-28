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
 * Home hero. The zodiac wheel turns slowly around a round portrait, like the
 * sun at the centre of a chart; below the buttons, the "numbers" from the
 * Studio (Home page → Numbers band) read as a single row of facts.
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

        {/* Round portrait at the centre of the turning zodiac wheel. It sits just
            inside the ring of signs (radius 62% of the wheel), so 20% inset. */}
        <div className="relative mx-auto aspect-square w-full max-w-[18rem] sm:max-w-[24rem] lg:max-w-[28rem]">
          <div className="animate-orbit absolute inset-0 will-change-transform">
            <ZodiacWheel className="size-full text-marigold/40" />
          </div>
          <div className="absolute inset-[20%] overflow-hidden rounded-full border-2 border-marigold/60 shadow-2xl shadow-marigold/20 ring-8 ring-night/60">
            <Picture image={portrait} locale={locale} alt={ts(settings.astrologerName, locale)} sizes="(min-width: 1024px) 19rem, 60vw" priority tone="dark" emblem="sparkle" />
          </div>
        </div>
      </div>

      {page.stats.length > 0 && (
        <div className="border-t border-moon/10">
          <dl className="container-site flex flex-wrap gap-x-10 gap-y-2 py-5 text-[0.95rem]">
            {page.stats.map((s, i) => (
              <div key={i} className="flex items-baseline gap-1.5">
                <dt className="sr-only">{ts(s.label, locale)}</dt>
                <dd className="font-semibold text-marigold tabular-nums">
                  {s.value.toLocaleString(htmlLang[locale])}
                  {s.suffix}
                </dd>
                <span aria-hidden="true" className="text-moon/75">{ts(s.label, locale)}</span>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
