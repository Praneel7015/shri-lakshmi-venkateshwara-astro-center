import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { getAreas, getSiteSettings } from '@/lib/content';
import { href, localeFrom, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/shared/CtaBand';

export async function generateMetadata({ params }: PageProps<'/[locale]/best-astrologer-in'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const text = await getPageText(locale);
  return buildMetadata({ locale, settings: await getSiteSettings(), path: '/best-astrologer-in/', title: text.areas.title, description: text.areas.intro });
}

export default async function AreasPage({ params }: PageProps<'/[locale]/best-astrologer-in'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, areas, text] = await Promise.all([getSiteSettings(), getAreas(), getPageText(locale)]);

  return (
    <>
      <PageHero locale={locale} title={text.areas.title} intro={text.areas.intro} crumbs={[{ label: d.nav.areas, path: '/best-astrologer-in/' }]} />
      <section className="py-14 md:py-20">
        <ul className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link
                href={href(locale, `/best-astrologer-in/${a.slug}/`)}
                className="group flex items-center gap-4 rounded-card border border-line bg-white/70 p-5 hover:border-lapis/40"
              >
                <span className="flex items-center gap-3">
                  <MapPin className="size-5 shrink-0 text-lapis" aria-hidden="true" />
                  <span>
                    <span className="block font-display text-xl text-night group-hover:underline">{ts(a.name, locale)}</span>
                    <span className="text-sm text-muted">{settings.address.city}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
