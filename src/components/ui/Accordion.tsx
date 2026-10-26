import { ChevronDown } from 'lucide-react';
import type { Faq, Locale } from '@/types/content';
import { ts } from '@/lib/i18n';

/** FAQ list built on native <details>, so it works with no JavaScript. */
export function Accordion({ items, locale }: { items: Faq[]; locale: Locale }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white/60">
      {items.map((item, i) => (
        <details key={i} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-display text-lg text-night md:text-xl [&::-webkit-details-marker]:hidden">
            {ts(item.question, locale)}
            <ChevronDown className="size-5 shrink-0 text-saffron-deep transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="px-6 pb-6 text-muted">{ts(item.answer, locale)}</p>
        </details>
      ))}
    </div>
  );
}
