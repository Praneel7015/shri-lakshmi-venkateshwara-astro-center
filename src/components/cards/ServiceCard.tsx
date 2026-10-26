import Link from 'next/link';
import type { Locale, ServiceSummary } from '@/types/content';
import { href, ts } from '@/lib/i18n';
import { ServiceIcon } from '@/components/ui/ServiceIcon';

interface Props {
  service: ServiceSummary;
  locale: Locale;
  /** `compact`: small row for sidebars. */
  variant?: 'row' | 'compact';
  /** Heading level: h2 on pages that list services directly under the page title. */
  as?: 'h2' | 'h3';
}

/**
 * A service as one line of a ruled list (icon, name, one-line description),
 * like entries in a temple almanac rather than a grid of identical boxes.
 * Wrap rows in <ServiceList>.
 */
export function ServiceCard({ service, locale, variant = 'row', as: Heading = 'h3' }: Props) {
  const link = href(locale, `/services/${service.slug}/`);

  if (variant === 'compact') {
    return (
      <Link href={link} className="group flex items-center gap-3 rounded-xl border border-line bg-white/60 p-3 hover:border-lapis/40">
        <ServiceIcon name={service.icon} className="size-5 shrink-0 text-lapis" />
        <span className="font-display text-lg leading-snug text-night group-hover:underline">{ts(service.title, locale)}</span>
      </Link>
    );
  }

  return (
    <Link href={link} className="group grid h-full grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-t border-line py-6">
      <ServiceIcon name={service.icon} className="mt-1 size-6 text-lapis" />
      <span>
        <Heading className="text-2xl text-night decoration-lapis/40 group-hover:underline">{ts(service.title, locale)}</Heading>
        <span className="mt-1.5 block text-muted">{ts(service.shortDescription, locale)}</span>
      </span>
    </Link>
  );
}

/** Two-column ruled list of services. */
export function ServiceList({ children }: { children: React.ReactNode }) {
  return <ul className="grid gap-x-12 border-b border-line md:grid-cols-2">{children}</ul>;
}
