import type { Metadata } from 'next';
import { getPujas, getSiteSettings } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { PageHero } from '@/components/ui/PageHero';
import { PujaCard } from '@/components/cards/PujaCard';
import { Reveal } from '@/components/ui/Reveal';
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
      <section className="py-14 text-center">
        <p className="container-site font-display text-2xl leading-relaxed text-saffron-deep md:text-3xl">
          {text.pujas.shloka}
        </p>
      </section>
      <section className="bg-paper pb-20 md:pb-28">
        <ul className="container-site grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pujas.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <PujaCard puja={p} locale={locale} settings={settings} as="h2" />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
