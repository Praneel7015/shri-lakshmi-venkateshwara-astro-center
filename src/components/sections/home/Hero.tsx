import { ArrowRight, MessageCircle } from 'lucide-react';
import type { HomePage, Locale, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { waLink } from '@/lib/contact';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Picture } from '@/components/ui/Picture';
import { StarField, ZodiacWheel } from '@/components/ui/Ornaments';
import { HeroSlider } from './HeroSlider';

export function Hero({ locale, page, settings }: { locale: Locale; page: HomePage; settings: SiteSettings }) {
  const d = ui(locale);
  const years = settings.established ? new Date().getFullYear() - settings.established : undefined;
  const slides = page.hero.map((s) => ({ eyebrow: ts(s.eyebrow, locale), heading: ts(s.heading, locale), text: ts(s.text, locale) }));
  const portrait = page.hero[0]?.image ?? page.intro.image;

  return (
    <section className="bg-sky relative overflow-hidden">
      <StarField className="pointer-events-none absolute inset-0 size-full text-moon/70" />
      <div className="container-site relative grid items-center gap-10 pt-12 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-20 lg:pb-28">
        <HeroSlider
          slides={slides}
          actions={
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={waLink(settings.whatsapp, d.whatsappGreeting)} size="lg" icon={<MessageCircle className="size-5" aria-hidden="true" />}>
                {d.cta.book}
              </ButtonLink>
              <ButtonLink href={href(locale, '/services/')} variant="light" size="lg" icon={<ArrowRight className="size-5" aria-hidden="true" />} className="flex-row-reverse">
                {d.cta.allServices}
              </ButtonLink>
            </div>
          }
        />

        {/* Arched portrait with the zodiac wheel turning behind it */}
        <div className="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[26rem] lg:max-w-[30rem]">
          <ZodiacWheel className="animate-orbit absolute inset-0 size-full text-marigold/35" />
          <div className="arch absolute inset-[16%] overflow-hidden border border-marigold/50 shadow-[0_30px_80px_-20px_rgb(232_137_43/0.45)]">
            <Picture image={portrait} locale={locale} alt={ts(settings.astrologerName, locale)} sizes="(min-width: 1024px) 24rem, 70vw" priority tone="dark" />
          </div>
          {years && (
            <div className="absolute right-0 bottom-[6%] rounded-2xl border border-moon/10 bg-night-2/90 px-4 py-2.5 text-moon shadow-xl backdrop-blur sm:right-[4%] sm:px-5 sm:py-3">
              <p className="font-display text-2xl text-marigold sm:text-3xl">{years}+</p>
              <p className="text-xs text-moon/70">{d.yearsSuffix}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
