import type { Locale, Stat } from '@/types/content';
import { ts } from '@/lib/i18n';

/** Displays only numbers supplied by the centre in Sanity. */
export function ImpactNumbers({ stats, locale }: { stats: Stat[]; locale: Locale }) {
  const visible = stats.filter((stat) => typeof stat.value === 'number' && ts(stat.label, locale).trim());
  if (!visible.length) return null;
  return <section className="bg-night py-10 text-moon" aria-label={locale === 'kn' ? 'ನಮ್ಮ ಸಾಧನೆ' : 'Our impact'}>
    <ul className="container-site grid grid-cols-2 gap-6 text-center md:grid-cols-4">
      {visible.map((stat, index) => <li key={index}>
        <p className="font-display text-3xl text-marigold md:text-4xl">{stat.value.toLocaleString(locale === 'kn' ? 'kn-IN' : 'en-IN')}{stat.suffix}</p>
        <p className="mt-2 text-sm text-moon/80">{ts(stat.label, locale)}</p>
      </li>)}
    </ul>
  </section>;
}
