import type { Metadata } from 'next';
import { getSiteSettings, getTestimonials } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { reviewsSchema } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { CtaBand } from '@/components/shared/CtaBand';

const youtubeId = (url?: string) => url?.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/)?.[1];

export async function generateMetadata({ params }: PageProps<'/[locale]/testimonials'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const settings = await getSiteSettings();
  return buildMetadata({ locale, settings, path: '/testimonials/', title: d.nav.testimonials, description: d.meta.testimonials(settings.address.city) });
}

export default async function TestimonialsPage({ params }: PageProps<'/[locale]/testimonials'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, testimonials] = await Promise.all([getSiteSettings(), getTestimonials()]);
  const videos = testimonials.filter((t) => youtubeId(t.youtubeUrl));

  return (
    <>
      <PageHero locale={locale} title={d.home.testimonials} crumbs={[{ label: d.nav.testimonials, path: '/testimonials/' }]} />

      {videos.length > 0 && (
        <section className="container-site grid gap-5 pt-16 md:grid-cols-2">
          {videos.map((v, i) => (
            <div key={i} className="aspect-video overflow-hidden rounded-card">
              <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId(v.youtubeUrl)}`} title={v.name} loading="lazy" allowFullScreen className="size-full" />
            </div>
          ))}
        </section>
      )}

      <section className="bg-paper py-16 md:py-24">
        {/* Masonry-style columns */}
        <ul className="container-site columns-1 gap-5 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <li key={i} className="mb-5 break-inside-avoid">
              <TestimonialCard testimonial={t} locale={locale} />
            </li>
          ))}
        </ul>
      </section>

      <CtaBand locale={locale} settings={settings} />
      <JsonLd data={reviewsSchema(testimonials, locale)} />
    </>
  );
}
