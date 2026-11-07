import type { HomePage, Locale, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Sparkle } from '@/components/ui/Ornaments';
import { Picture } from '@/components/ui/Picture';
export function Hero({
  locale,
  page,
  settings,
  labels,
}: {
  locale: Locale;
  page: HomePage;
  settings: SiteSettings;
  labels: { specialties: string; tradition: string; languages: string };
}) {
  const slide = page.hero[0];
  const d = ui(locale);
  const heroArtwork = page.heroArtwork ?? {
    src: '/images/astrology/vedic-zodiac-chart.jpeg',
    alt: { en: 'Vedic zodiac chart' },
  };
  const shape = page.heroArtworkShape ?? 'square';
  const aspect = shape === 'landscape' ? 'aspect-[4/3]' : shape === 'portrait' ? 'aspect-[3/4]' : 'aspect-square';
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-[1.75rem]';
  const size = page.heroArtworkSize === 'small' ? 'max-w-[19rem]' : page.heroArtworkSize === 'medium' ? 'max-w-[24rem]' : 'max-w-[29rem]';
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
            {labels.specialties}
          </p>
        </div>
        <div
          className={`celestial-art relative mx-auto w-full ${aspect} ${size}`}
        >
          <div className={`absolute inset-[8%] ${radius} bg-marigold/5 blur-3xl`} />
          <div className={`absolute inset-[7%] grid place-items-center overflow-hidden ${radius} border border-marigold/25 bg-night/25 p-[3%] shadow-[0_0_80px_#e8be5215]`}>
            <Picture
              image={heroArtwork}
              locale={locale}
              alt="Vedic zodiac chart"
              sizes="(max-width: 768px) 80vw, 40vw"
              priority
              className="opacity-95"
              fit="contain-backdrop"
              tone="dark"
              emblem="sparkle"
            />
          </div>
          <Sparkle className="absolute top-[9%] right-[8%] size-5 text-marigold" />
          <Sparkle className="absolute bottom-[12%] left-[4%] size-3 text-marigold" />
        </div>
      </div>
      <div className="border-t border-marigold/20">
        <div className="container-site flex flex-wrap justify-between gap-3 py-5 text-sm text-moon/70">
          <span>
            {labels.tradition}
          </span>
          <span>
            {labels.languages}
          </span>
        </div>
      </div>
    </section>
  );
}
