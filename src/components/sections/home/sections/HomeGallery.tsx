import type { HomeSectionProps } from './types';
import { href, ts, ui } from '@/lib/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MoreLink } from '@/components/ui/ButtonLink';
import { Picture } from '@/components/ui/Picture';

export function HomeGallery({ locale, photos }: Pick<HomeSectionProps, 'locale' | 'photos'>) {
  const d = ui(locale);
  return (<>
      {/* Gallery preview: only once the client has uploaded photos */}
      {photos.length >= 3 && (
        <section className="py-16 md:py-24">
          <div className="container-site">
            <SectionHeading title={d.nav.gallery} action={<MoreLink href={href(locale, '/gallery/')}>{d.nav.gallery}</MoreLink>} />
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {photos.map((g, i) => (
                <li key={i} className="relative aspect-square overflow-hidden rounded-card">
                  <Picture image={g.image} locale={locale} alt={ts(g.caption, locale)} sizes="(min-width: 768px) 24rem, 50vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
  </>);
}
