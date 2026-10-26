import type { Metadata } from 'next';
import { getFaqs, getSiteSettings } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { faqSchema } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { CtaBand } from '@/components/shared/CtaBand';

export async function generateMetadata({ params }: PageProps<'/[locale]/faq'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const text = await getPageText(locale);
  return buildMetadata({ locale, settings: await getSiteSettings(), path: '/faq/', title: text.faq.title, description: ui(locale).meta.faq });
}

export default async function FaqPage({ params }: PageProps<'/[locale]/faq'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, faqs, text] = await Promise.all([getSiteSettings(), getFaqs(), getPageText(locale)]);

  return (
    <>
      <PageHero locale={locale} title={text.faq.title} intro={text.faq.intro} crumbs={[{ label: d.nav.faq, path: '/faq/' }]} />
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
