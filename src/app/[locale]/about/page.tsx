import type { Metadata } from 'next';
import { getAboutPage, getSiteSettings } from '@/lib/content';
import { localeFrom, t, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { profilePageSchema } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { Picture } from '@/components/ui/Picture';
import { RichText } from '@/components/blog/RichText';
import { CtaBand } from '@/components/shared/CtaBand';
import { JsonLd } from '@/components/ui/JsonLd';

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const [settings, page] = await Promise.all([getSiteSettings(), getAboutPage()]);
  return buildMetadata({ locale, settings, path: '/about/', title: ts(page.heading, locale), description: ts(page.intro, locale), seo: page.seo, image: page.portrait });
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const locale = await localeFrom(params);
  const [settings, page] = await Promise.all([getSiteSettings(), getAboutPage()]);
  const d = ui(locale);

  return (
    <>
      <PageHero locale={locale} title={ts(page.heading, locale)} intro={ts(page.intro, locale)} crumbs={[{ label: d.nav.about, path: '/about/' }]} />
      <JsonLd data={profilePageSchema(locale, page.portrait)} />

      <section className="pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container-site grid gap-14 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="md:sticky md:top-32 md:self-start">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs md:max-w-sm arch-portrait overflow-hidden">
              <Picture image={page.portrait} locale={locale} alt={ts(settings.astrologerName, locale)} sizes="(min-width: 768px) 24rem, 90vw" priority />
            </div>
          </div>
          <RichText value={t(page.biography, locale) ?? []} locale={locale} settings={settings} />
        </div>
      </section>

      {page.credentials.length > 0 && (
        <section className="pb-16 md:pb-24">
          <ul className="container-site grid gap-x-12 gap-y-6 border-t border-line pt-10 md:grid-cols-3">
            {page.credentials.map((c, i) => (
              <li key={i}>
                <h2 className="text-2xl text-night">{ts(c.title, locale)}</h2>
                <p className="mt-2 text-muted">{ts(c.text, locale)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-night py-16 text-moon md:py-20">
        <p className="container-site max-w-4xl font-display text-3xl leading-snug md:text-4xl">{ts(page.mission, locale)}</p>
      </section>

      {page.gallery.length > 0 && (
        <section className="container-site py-20">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {page.gallery.map((img, i) => (
              <li key={i} className="relative aspect-square overflow-hidden rounded-card">
                <Picture image={img} locale={locale} sizes="(min-width: 768px) 18rem, 50vw" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
