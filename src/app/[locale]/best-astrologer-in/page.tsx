import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { getAreas, getSiteSettings } from '@/lib/content';
import { href, localeFrom, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { CtaBand } from '@/components/shared/CtaBand';

export async function generateMetadata({ params }: PageProps<'/[locale]/best-astrologer-in'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const d = ui(locale);
  return buildMetadata({ locale, settings: await getSiteSettings(), path: '/best-astrologer-in/', title: d.areas.title, description: d.areas.intro });
}

export default async function AreasPage({ params }: PageProps<'/[locale]/best-astrologer-in'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, areas] = await Promise.all([getSiteSettings(), getAreas()]);

  return (
    <>
      <PageHero locale={locale} title={d.areas.title} intro={d.areas.intro} crumbs={[{ label: d.nav.areas, path: '/best-astrologer-in/' }]} />
      <section className="bg-paper py-16 md:py-24">
        <ul className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link
                href={href(locale, `/best-astrologer-in/${a.slug}/`)}
                className="group flex items-center justify-between gap-4 rounded-card border border-line bg-white/70 p-6 shadow-card transition hover:-translate-y-0.5 hover:border-saffron/50"
              >
                <span className="flex items-center gap-3">
                  <MapPin className="size-5 text-saffron-deep" aria-hidden="true" />
                  <span>
                    <span className="block font-display text-xl text-night">{ts(a.name, locale)}</span>
                    <span className="text-sm text-muted">{settings.address.city}</span>
                  </span>
                </span>
                <ArrowUpRight className="size-5 text-saffron-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
