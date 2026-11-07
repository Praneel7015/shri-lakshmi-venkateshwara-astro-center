import Link from 'next/link';
import type { Locale, SiteSettings } from '@/types/content';
import { href, ts } from '@/lib/i18n';
import { Mandala } from '@/components/ui/Ornaments';

/** Wordmark: mandala mark + site name. Replace the mark with the client's logo when it arrives. */
export function Logo({ locale, settings, centered = false, variant = 'light' }: { locale: Locale; settings: SiteSettings; centered?: boolean; variant?: 'light' | 'dark' }) {
  const colors = variant === 'dark'
    ? { mark: 'border-sage/70 text-sage', name: 'text-moon', detail: 'text-moon/70' }
    : { mark: 'border-night/30 text-night', name: 'text-night', detail: 'text-muted' };

  return (
    <Link href={href(locale, '/')} className={`brand-wordmark flex min-w-0 items-center gap-3 ${centered ? 'lg:flex-col lg:gap-1 lg:text-center' : ''}`}>
      {/* shrink-0 + aspect-square keep the mark a perfect circle when the name wraps on phones */}
      <span className={`grid aspect-square size-10 shrink-0 place-items-center rounded-full border ${colors.mark}`}>
        <Mandala className="size-7" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className={`block font-display text-[1rem] leading-snug sm:text-lg md:text-xl ${colors.name} ${centered ? 'lg:text-base' : ''}`}>{ts(settings.name, locale)}</span>
        <span className={`hidden text-xs min-[380px]:block ${colors.detail}`}>{ts(settings.astrologerName, locale)}</span>
      </span>
    </Link>
  );
}
