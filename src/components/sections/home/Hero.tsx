import type { HomePage, Locale, SiteSettings } from '@/types/content';
import Image from 'next/image';
import { href, ts, ui } from '@/lib/i18n';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Sparkle } from '@/components/ui/Ornaments';
export function Hero({
  locale,
  page,
  settings,
}: {
  locale: Locale;
  page: HomePage;
  settings: SiteSettings;
}) {
  const slide = page.hero[0];
  const d = ui(locale);
  void settings;
  return (
    <section className="hero-sky relative overflow-hidden text-ivory">
      <div className="container-site grid items-center gap-8 py-16 md:grid-cols-[1.15fr_1fr] md:py-24 lg:py-28">
        <div className="relative z-10">
          <p className="hero-eyebrow mb-6 flex items-center gap-3 text-sm text-marigold">
            <span className="h-px w-9 bg-marigold/60" />
            {ts(slide?.eyebrow, locale)}
          </p>
          <h1 className="max-w-2xl text-[2.8rem] leading-[1.12] md:text-[3.3rem] lg:text-[4.5rem]">
            {ts(slide?.heading, locale)}
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-moon/80">
            {ts(slide?.text, locale)}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={href(locale, '/contact/')} size="lg">
              {d.cta.book}
            </ButtonLink>
            <ButtonLink
              href={href(locale, '/services/')}
              variant="light"
              size="lg"
            >
              {d.nav.services}
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-moon/65">
            {locale === 'kn'
              ? 'ಜ್ಯೋತಿಷ್ಯ · ವಾಸ್ತು · ಪೂಜೆ ಮತ್ತು ಹೋಮ'
              : 'Jyotisha · Vastu · Puja & Homa'}
          </p>
        </div>
        <div
          className="celestial-art relative mx-auto aspect-square w-full max-w-[29rem]"
          aria-hidden="true"
        >
          <div className="absolute inset-[8%] rounded-full bg-marigold/5 blur-3xl" />
          <div className="absolute inset-[7%] grid place-items-center rounded-full border border-marigold/25 bg-night/25 p-[3%] shadow-[0_0_80px_#e8be5215]">
            <Image
              src="/ornaments/zodiac-wheel.svg"
              width={550}
              height={550}
              unoptimized
              alt=""
              className="h-full w-full rounded-full object-contain opacity-70"
            />
          </div>
          <Sparkle className="absolute top-[9%] right-[8%] size-5 text-marigold" />
          <Sparkle className="absolute bottom-[12%] left-[4%] size-3 text-marigold" />
        </div>
      </div>
      <div className="border-t border-marigold/20">
        <div className="container-site flex flex-wrap justify-between gap-3 py-5 text-sm text-moon/70">
          <span>
            {locale === 'kn' ? 'ಪರಂಪರೆಯಿಂದ ಪ್ರೇರಿತ' : 'Inspired by tradition'}
          </span>
          <span>
            {locale === 'kn'
              ? 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಅನ್ವೇಷಿಸಿ'
              : 'Explore in English & Kannada'}
          </span>
        </div>
      </div>
    </section>
  );
}
