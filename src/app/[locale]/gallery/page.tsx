import type { Metadata } from 'next';
import { getGallery, getSiteSettings } from '@/lib/content';
import { localeFrom, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { Picture } from '@/components/ui/Picture';
import { imageUrl } from '@/lib/sanity/image';
import { CtaBand } from '@/components/shared/CtaBand';

const youtubeId = (url?: string) => url?.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/)?.[1];

export async function generateMetadata({ params }: PageProps<'/[locale]/gallery'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const settings = await getSiteSettings();
  return buildMetadata({ locale, settings, path: '/gallery/', title: ui(locale).nav.gallery, description: ui(locale).meta.gallery(`${settings.address.locality}, ${settings.address.city}`) });
}

export default async function GalleryPage({ params }: PageProps<'/[locale]/gallery'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, items] = await Promise.all([getSiteSettings(), getGallery()]);

  return (
    <>
      <PageHero locale={locale} title={d.nav.gallery} crumbs={[{ label: d.nav.gallery, path: '/gallery/' }]} />
      <section className="py-14 md:py-20">
        <ul className="container-site grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 md:auto-rows-[18rem] md:grid-cols-4">
          {items.map((item, i) => {
            const id = youtubeId(item.youtubeUrl);
            // Every 5th tile is large, for a lively grid.
            const big = i % 5 === 0 ? 'col-span-2 row-span-2' : '';
            return (
              <li key={i} className={`group relative overflow-hidden rounded-card ${big}`}>
                {id ? (
                  <iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title={ts(item.caption, locale) || 'Video'} loading="lazy" allowFullScreen className="size-full" />
                ) : (
                  // Tapping a photo opens the full-size original in a new tab.
                  <a href={imageUrl(item.image, 2400)} target="_blank" rel="noopener noreferrer" className="block size-full">
                    <Picture image={item.image} locale={locale} alt={ts(item.caption, locale)} sizes="(min-width: 768px) 25vw, 50vw"  />
                    {item.caption && (
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent p-4 text-sm text-moon opacity-0 transition-opacity group-hover:opacity-100">
                        {ts(item.caption, locale)}
                      </span>
                    )}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
