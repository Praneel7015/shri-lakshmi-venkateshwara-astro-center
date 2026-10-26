import type { Metadata } from 'next';
import { getServices, getSiteSettings } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { PageHero } from '@/components/ui/PageHero';
import { ServiceCard, ServiceList } from '@/components/cards/ServiceCard';
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
      <PageHero locale={locale} title={text.services.title} intro={text.services.intro} crumbs={[{ label: d.nav.services, path: '/services/' }]} />
      <section className="py-14 md:py-20">
        <div className="container-site">
          <ServiceList>
            {services.map((s) => (
              <li key={s.slug}><ServiceCard service={s} locale={locale} as="h2" /></li>
            ))}
          </ServiceList>
        </div>
      </section>
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
