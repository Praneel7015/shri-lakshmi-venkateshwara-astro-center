import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { getAreas, getServices, getSiteSettings } from '@/lib/content';
import { href, LOCALES, localeFrom, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { faqSchema } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { CtaBand } from '@/components/shared/CtaBand';

/**
 * One landing page per locality in the Studio ("Areas"). Each has its own
 * intro written by the editor, so pages are genuinely different and don't
 * read as copy-paste "doorway pages" to Google.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const areas = await getAreas();
  return LOCALES.flatMap((locale) => areas.map((a) => ({ locale, area: a.slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/best-astrologer-in/[area]'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const { area: slug } = await params;
  const [settings, areas] = await Promise.all([getSiteSettings(), getAreas()]);
  const area = areas.find((a) => a.slug === slug);
  if (!area) return {};
  const name = ts(area.name, locale);
  return buildMetadata({
    locale, settings, path: `/best-astrologer-in/${slug}/`,
    title: `${ui(locale).areas.heading(name)}, ${settings.address.city}`,
    description: ts(area.intro, locale).slice(0, 158),
  });
}

export default async function AreaPage({ params }: PageProps<'/[locale]/best-astrologer-in/[area]'>) {
  const locale = await localeFrom(params);
  const { area: slug } = await params;
  const d = ui(locale);
  const [settings, areas, services] = await Promise.all([getSiteSettings(), getAreas(), getServices()]);
  const area = areas.find((a) => a.slug === slug);
  if (!area) notFound();
  const name = ts(area.name, locale);
  const nearby = areas.filter((a) => area.nearby.includes(a.slug));

  return (
    <>
      <PageHero
        locale={locale}
        title={d.areas.heading(name)}
        intro={ts(area.intro, locale)}
        eyebrow={settings.address.city}
        crumbs={[{ label: d.nav.areas, path: '/best-astrologer-in/' }, { label: name, path: `/best-astrologer-in/${slug}/` }]}
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="container-site">
          {area.landmarks && (
            <p className="mx-auto mb-12 flex max-w-2xl items-start gap-3 rounded-2xl border border-line bg-white/70 px-5 py-4 text-night">
              <MapPin className="mt-1 size-5 shrink-0 text-saffron-deep" aria-hidden="true" />
              {ts(area.landmarks, locale)}
            </p>
          )}
          <SectionHeading title={d.home.services} intro={d.home.servicesSub} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}><ServiceCard service={s} locale={locale} /></li>
            ))}
          </ul>
        </div>
      </section>

      {area.faqs.length > 0 && (
        <section className="bg-sand py-20">
          <div className="container-site max-w-3xl">
            <SectionHeading title={d.home.faq} />
            <Accordion items={area.faqs} locale={locale} />
          </div>
          <JsonLd data={faqSchema(area.faqs, locale)} />
        </section>
      )}

      {nearby.length > 0 && (
        <section className="container-site pt-16">
          <p className="eyebrow mb-4 text-center text-saffron-deep">{d.areas.nearby}</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {nearby.map((a) => (
              <li key={a.slug}>
                <Link href={href(locale, `/best-astrologer-in/${a.slug}/`)} className="rounded-full border border-line bg-white/70 px-4 py-2 text-sm text-night hover:border-night">
                  {ts(a.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
