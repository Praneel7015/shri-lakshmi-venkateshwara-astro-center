import type { HomePage, Locale, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Picture } from '@/components/ui/Picture';

export function AboutIntro({ locale, page, settings }: { locale: Locale; page: HomePage; settings: SiteSettings }) {
  const d = ui(locale);
  return (
    <section className="py-16 md:py-24">
      <div className="container-site grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Photo in an offset gold frame */}
        <div className="frame-offset mx-auto aspect-square w-full max-w-[16rem] rounded-full md:max-w-xs">
          <div className="absolute inset-0 overflow-hidden rounded-card">
            <Picture image={page.intro.image} locale={locale} alt={ts(settings.astrologerName, locale)} sizes="(min-width: 768px) 24rem, 16rem" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl text-night md:text-[2.6rem]">{ts(page.intro.heading, locale)}</h2>
          <p className="mt-5 max-w-xl text-lg text-muted">{ts(page.intro.text, locale)}</p>
          <ButtonLink href={href(locale, '/about/')} variant="outline" className="mt-7">
            {d.cta.aboutGuruji}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
