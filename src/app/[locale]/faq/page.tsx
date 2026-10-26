import type { Metadata } from 'next';
import { getFaqs, getSiteSettings } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { faqSchema } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { CtaBand } from '@/components/shared/CtaBand';

export async function generateMetadata({ params }: PageProps<'/[locale]/faq'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const d = ui(locale);
  return buildMetadata({ locale, settings: await getSiteSettings(), path: '/faq/', title: d.home.faq, description: d.meta.faq });
}

export default async function FaqPage({ params }: PageProps<'/[locale]/faq'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, faqs] = await Promise.all([getSiteSettings(), getFaqs()]);

  return (
    <>
      <PageHero locale={locale} title={d.home.faq} crumbs={[{ label: d.nav.faq, path: '/faq/' }]} />
      <section className="bg-paper py-16 md:py-24">
        <div className="container-site max-w-3xl">
          <Accordion items={faqs} locale={locale} />
        </div>
      </section>
      <CtaBand locale={locale} settings={settings} />
      <JsonLd data={faqSchema(faqs, locale)} />
    </>
  );
}
