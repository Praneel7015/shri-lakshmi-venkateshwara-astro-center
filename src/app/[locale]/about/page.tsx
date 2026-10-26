import type { Metadata } from 'next';
import { getAboutPage, getSiteSettings } from '@/lib/content';
import { localeFrom, t, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Mandala, Spark } from '@/components/ui/Ornaments';
import { Reveal } from '@/components/ui/Reveal';
import { RichText } from '@/components/blog/RichText';
import { CtaBand } from '@/components/shared/CtaBand';

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

      <section className="bg-paper pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-site grid gap-14 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="md:sticky md:top-32 md:self-start">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs md:max-w-sm arch-portrait overflow-hidden border-[6px] border-white shadow-lift">
              <Picture image={page.portrait} locale={locale} alt={ts(settings.astrologerName, locale)} sizes="(min-width: 768px) 24rem, 90vw" priority />
            </div>
          </div>
          <RichText value={t(page.biography, locale) ?? []} locale={locale} settings={settings} />
        </div>
      </section>

      {page.credentials.length > 0 && (
        <section className="bg-paper pb-20 md:pb-24">
          <ul className="container-site grid gap-5 md:grid-cols-3">
            {page.credentials.map((c, i) => (
              <li key={i}>
                <Reveal delay={i * 90} className="h-full rounded-card border border-line bg-white/70 p-8 shadow-card">
                  <Spark className="size-5 text-saffron" />
                  <h2 className="mt-5 text-2xl text-night">{ts(c.title, locale)}</h2>
                  <p className="mt-2 text-muted">{ts(c.text, locale)}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-sky relative overflow-hidden py-24 text-center text-moon">
        <Mandala className="animate-orbit pointer-events-none absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 text-marigold/10" />
        <p className="container-site relative mx-auto max-w-3xl font-display text-3xl leading-snug md:text-4xl">{ts(page.mission, locale)}</p>
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
