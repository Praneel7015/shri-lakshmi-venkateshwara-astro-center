import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, ServiceSummary } from '@/types/content';
import { href, ts } from '@/lib/i18n';
import { ServiceIcon } from '@/components/ui/ServiceIcon';

interface Props {
  service: ServiceSummary;
  locale: Locale;
  /** `compact`: small row for sidebars. */
  variant?: 'card' | 'compact';
  /** Heading level: h2 on pages that list services directly under the page title. */
  as?: 'h2' | 'h3';
}

export function ServiceCard({ service, locale, variant = 'card', as: Heading = 'h3' }: Props) {
  const link = href(locale, `/services/${service.slug}/`);

  if (variant === 'compact') {
    return (
      <Link href={link} className="group flex items-center gap-4 rounded-2xl border border-line bg-white/70 p-4 transition hover:border-saffron/50">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-saffron-deep group-hover:bg-night group-hover:text-marigold">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
        <span className="font-display text-lg leading-snug text-night">{ts(service.title, locale)}</span>
      </Link>
    );
  }

  return (
    // On phones the card is a compact row (icon beside text); from `sm` up it stacks.
    <Link
      href={link}
      className="group relative flex h-full gap-5 rounded-card border border-line bg-white/70 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-saffron/50 hover:shadow-lift sm:flex-col sm:gap-0 sm:p-7"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-saffron-deep transition-colors duration-300 group-hover:bg-night group-hover:text-marigold sm:mb-6 sm:size-14">
        <ServiceIcon name={service.icon} className="size-6" />
      </span>
      <span className="flex flex-1 flex-col">
        <Heading className="text-xl text-night sm:text-2xl">{ts(service.title, locale)}</Heading>
        <span className="mt-2 flex-1 text-[0.95rem] text-muted sm:mt-3 sm:text-base">{ts(service.shortDescription, locale)}</span>
        <ArrowUpRight className="mt-4 size-5 text-saffron-deep transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:mt-6" aria-hidden="true" />
      </span>
    </Link>
  );
}
