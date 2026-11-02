import Link from 'next/link';
import type { Locale, SiteSettings } from '@/types/content';
import { href, ts } from '@/lib/i18n';
import { Mandala } from '@/components/ui/Ornaments';

/** Wordmark: mandala mark + site name. Replace the mark with the client's logo when it arrives. */
export function Logo({ locale, settings, centered = false }: { locale: Locale; settings: SiteSettings; centered?: boolean }) {
  return (
    <Link href={href(locale, '/')} className={`brand-wordmark flex min-w-0 items-center gap-3 ${centered ? 'lg:flex-col lg:gap-1 lg:text-center' : ''}`}>
      {/* shrink-0 + aspect-square keep the mark a perfect circle when the name wraps on phones */}
      <span className="grid aspect-square size-10 shrink-0 place-items-center rounded-full border border-marigold/45 text-marigold">
        <Mandala className="size-7" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className={`block font-display text-[1rem] leading-snug text-moon sm:text-lg md:text-xl ${centered ? 'lg:text-base xl:text-lg' : ''}`}>{ts(settings.name, locale)}</span>
        <span className="hidden text-xs text-moon/60 min-[380px]:block">{ts(settings.astrologerName, locale)}</span>
      </span>
    </Link>
  );
}
