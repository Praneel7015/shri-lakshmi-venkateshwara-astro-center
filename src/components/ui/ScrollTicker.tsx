import type { Locale, ServiceSummary } from '@/types/content';
import { ts } from '@/lib/i18n';
import { Sparkle } from './Ornaments';

/**
 * A slow, endless band of service names between sparkles (the Vishwanath
 * Guruji ticker, with stars instead of ॐ). The list is drawn twice and the
 * track moves by half its width, so it loops without a jump. Hover pauses it;
 * "reduce motion" stops it (see globals.css). The second copy is hidden from
 * screen readers.
 */
export function ScrollTicker({ services, locale }: { services: ServiceSummary[]; locale: Locale }) {
  if (services.length === 0) return null;
  const copy = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-6 px-3" aria-hidden={hidden || undefined}>
      {services.map((s) => (
        <li key={s.slug} className="flex items-center gap-6 whitespace-nowrap">
          <span className="text-sm font-medium tracking-[0.14em] text-moon/90 uppercase">{ts(s.title, locale)}</span>
          <Sparkle className="size-3 text-marigold" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-night-3 bg-night-2 py-3.5">
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
