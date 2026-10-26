import type { Locale, ServiceSummary } from '@/types/content';
import { ts } from '@/lib/i18n';
import { Spark } from '@/components/ui/Ornaments';

/** Saffron band with service names scrolling sideways (pure CSS). */
export function ServiceTicker({ locale, services }: { locale: Locale; services: ServiceSummary[] }) {
  const names = services.map((s) => ts(s.title, locale));
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden}>
      {names.map((name, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-xl text-night md:text-2xl">{name}</span>
          <Spark className="size-4 text-night/50" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-saffron py-4">
      <div className="flex w-max animate-ticker motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
