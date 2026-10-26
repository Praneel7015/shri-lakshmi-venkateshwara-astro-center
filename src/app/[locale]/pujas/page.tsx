import type { Metadata } from 'next';
import { getPujas, getSiteSettings } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { PageHero } from '@/components/ui/PageHero';
import { PujaCard } from '@/components/cards/PujaCard';
import { CtaBand } from '@/components/shared/CtaBand';

export async function generateMetadata({ params }: PageProps<'/[locale]/pujas'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const text = await getPageText(locale);
  return buildMetadata({ locale, settings: await getSiteSettings(), path: '/pujas/', title: text.pujas.title, description: ui(locale).meta.pujas });
}

export default async function PujasPage({ params }: PageProps<'/[locale]/pujas'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, pujas, text] = await Promise.all([getSiteSettings(), getPujas(), getPageText(locale)]);

  return (
    <>
      <PageHero locale={locale} title={text.pujas.title} intro={text.pujas.intro} crumbs={[{ label: d.nav.pujas, path: '/pujas/' }]} />
      <section className="py-12">
        <p lang="sa" className="container-site font-display text-2xl leading-relaxed text-lapis md:text-3xl">
          {text.pujas.shloka}
        </p>
      </section>
      <section className="pb-16 md:pb-24">
        <ul className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pujas.map((p) => (
            <li key={p.slug}>
              <PujaCard puja={p} locale={locale} settings={settings} as="h2" />
            </li>
          ))}
        </ul>
      </section>
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
