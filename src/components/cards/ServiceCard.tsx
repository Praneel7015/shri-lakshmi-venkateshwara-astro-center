import Link from 'next/link';
import type { Locale, ServiceSummary } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { Picture } from '@/components/ui/Picture';
import { ServiceIcon } from '@/components/ui/ServiceIcon';
import { serviceImage } from '@/lib/content/matching-images';

interface Props {
  service: ServiceSummary;
  locale: Locale;
  /** `compact`: small row for sidebars. */
  variant?: 'card' | 'compact';
  /** Heading level: h2 on pages that list services directly under the page title. */
  as?: 'h2' | 'h3';
}

/**
 * A service as an image card (as on the Vishwanath Guruji site): photo on top
 * (or a patch of night sky until one is uploaded), a round icon badge
 * overlapping it, the name, a short description and "Read more".
 * Wrap cards in <ServiceList>.
 */
export function ServiceCard({ service, locale, variant = 'card', as: Heading = 'h3' }: Props) {
  const link = href(locale, `/services/${service.slug}/`);
  const title = ts(service.title, locale);

  if (variant === 'compact') {
    return (
      <Link href={link} className="group flex items-center gap-3 rounded-xl border border-line bg-white/60 p-3 hover:border-lapis/40">
        <ServiceIcon name={service.icon} className="size-5 shrink-0 text-lapis" />
        <span className="font-display text-lg leading-snug text-night group-hover:underline">{title}</span>
      </Link>
    );
  }

  return (
    <Link
      href={link}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-night/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Picture
          image={serviceImage(service)}
          locale={locale}
          alt={title}
          tone="dark"
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 text-center">
        <span className="relative mx-auto -mt-7 mb-4 grid size-14 place-items-center rounded-full bg-sand text-lapis shadow-sm ring-4 ring-white">
          <ServiceIcon name={service.icon} className="size-6" />
        </span>
        <Heading className="text-2xl text-night decoration-lapis/40 group-hover:underline">{title}</Heading>
        <p className="mt-2 line-clamp-3 text-muted">{ts(service.shortDescription, locale)}</p>
        <span className="mt-auto pt-4 text-sm font-semibold text-saffron-deep">
          {ui(locale).cta.readMore} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

/** Responsive grid of service cards. */
export function ServiceList({ children }: { children: React.ReactNode }) {
  return <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</ul>;
}
