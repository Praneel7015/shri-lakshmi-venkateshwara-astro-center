import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLegalPages, getSiteSettings } from '@/lib/content';
import { formatDate, LOCALES, localeFrom, t, ts } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { plainText, RichText } from '@/components/blog/RichText';

/** Privacy policy, terms, disclaimer: any "Legal page" document in the Studio. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await getLegalPages();
  return LOCALES.flatMap((locale) => pages.map((p) => ({ locale, legal: p.slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/[legal]'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const { legal } = await params;
  const page = (await getLegalPages()).find((p) => p.slug === legal);
  if (!page) return {};
  const title = ts(page.title, locale);
  // Use the opening of the page text as the description.
  const text = (t(page.body, locale) ?? []).map(plainText).join(' ');
  const description = text.length > 158 ? `${text.slice(0, 155).replace(/\s+\S*$/, '')}…` : text;
  return buildMetadata({ locale, settings: await getSiteSettings(), path: `/${legal}/`, title, description });
}

export default async function LegalPage({ params }: PageProps<'/[locale]/[legal]'>) {
  const locale = await localeFrom(params);
  const { legal } = await params;
  const [settings, pages] = await Promise.all([getSiteSettings(), getLegalPages()]);
  const page = pages.find((p) => p.slug === legal);
  if (!page) notFound();
  const title = ts(page.title, locale);

  return (
    <>
      <PageHero locale={locale} title={title} intro={page._updatedAt ? formatDate(page._updatedAt, locale) : undefined} crumbs={[{ label: title, path: `/${legal}/` }]} />
      <section className="bg-paper py-16 md:py-24">
        <div className="container-site max-w-3xl">
          <RichText value={t(page.body, locale) ?? []} locale={locale} settings={settings} />
        </div>
      </section>
    </>
  );
}
