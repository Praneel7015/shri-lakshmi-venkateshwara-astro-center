import { ArrowRight } from 'lucide-react';
import type { HomePage, Locale, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Picture } from '@/components/ui/Picture';
import { KolamDivider, Mandala } from '@/components/ui/Ornaments';
import { Reveal } from '@/components/ui/Reveal';

export function AboutIntro({ locale, page, settings }: { locale: Locale; page: HomePage; settings: SiteSettings }) {
  const d = ui(locale);
  return (
    <section className="bg-paper pt-20 pb-6 md:pt-28 md:pb-10">
      <div className="container-site grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-xs md:max-w-md">
          <Mandala className="absolute -top-10 -left-10 size-48 text-saffron/15" />
          <div className="relative aspect-[4/5] arch-portrait overflow-hidden border-[6px] border-white shadow-lift">
            <Picture image={page.intro.image} locale={locale} alt={ts(settings.astrologerName, locale)} sizes="(min-width: 768px) 28rem, 90vw" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow mb-3 text-saffron-deep">{ts(settings.astrologerName, locale)}</p>
          <h2 className="text-3xl text-night md:text-5xl">{ts(page.intro.heading, locale)}</h2>
          <KolamDivider className="mt-5 h-5 w-40 text-saffron/70" />
          <p className="mt-6 text-lg text-muted">{ts(page.intro.text, locale)}</p>
          <ButtonLink href={href(locale, '/about/')} variant="outline" className="mt-8 flex-row-reverse" icon={<ArrowRight className="size-4" aria-hidden="true" />}>
            {d.nav.about}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
