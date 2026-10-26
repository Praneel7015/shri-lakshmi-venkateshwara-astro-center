import Link from 'next/link';
import type { Locale, SiteSettings } from '@/types/content';
import { href, ts } from '@/lib/i18n';
import { Mandala } from '@/components/ui/Ornaments';

/** Wordmark: mandala mark + site name. Replace the mark with the client's logo when it arrives. */
export function Logo({ locale, settings }: { locale: Locale; settings: SiteSettings }) {
  return (
    <Link href={href(locale, '/')} className="group flex items-center gap-3" aria-label={ts(settings.name, locale)}>
      <span className="grid size-10 place-items-center rounded-full border border-marigold/40 text-marigold transition-transform duration-700 group-hover:rotate-45">
        <Mandala className="size-7" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base text-moon sm:text-lg md:text-xl">{ts(settings.name, locale)}</span>
        <span className="block text-[0.7rem] tracking-[0.16em] text-moon/55 uppercase">{ts(settings.astrologerName, locale)}</span>
      </span>
    </Link>
  );
}
