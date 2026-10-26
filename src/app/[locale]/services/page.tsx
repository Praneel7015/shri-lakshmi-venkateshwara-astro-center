import type { Metadata } from 'next';
import { getServices, getSiteSettings } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { PageHero } from '@/components/ui/PageHero';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBand } from '@/components/shared/CtaBand';

export async function generateMetadata({ params }: PageProps<'/[locale]/services'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const text = await getPageText(locale);
  return buildMetadata({ locale, settings: await getSiteSettings(), path: '/services/', title: ui(locale).nav.services, description: text.services.intro });
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/services'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, services, text] = await Promise.all([getSiteSettings(), getServices(), getPageText(locale)]);

  return (
    <>
      <PageHero locale={locale} title={text.services.title} intro={text.services.intro} eyebrow={d.nav.services} crumbs={[{ label: d.nav.services, path: '/services/' }]} />
      <section className="bg-paper py-20 md:py-28">
        <ul className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <ServiceCard service={s} locale={locale} as="h2" />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
