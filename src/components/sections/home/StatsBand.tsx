import type { Locale, Stat } from '@/types/content';
import { htmlLang, ts } from '@/lib/i18n';
import { StatCounter } from '@/components/ui/StatCounter';
import { StarField } from '@/components/ui/Ornaments';

export function StatsBand({ locale, stats }: { locale: Locale; stats: Stat[] }) {
  if (!stats.length) return null;
  return (
    <section className="bg-sky relative overflow-hidden py-16 text-moon">
      <StarField className="pointer-events-none absolute inset-0 size-full text-moon/60" />
      <dl className="container-site relative grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col-reverse text-center md:border-l md:border-moon/10 md:first:border-l-0">
            <dt className="mt-2 text-sm tracking-wide text-moon/65">{ts(s.label, locale)}</dt>
            <dd className="font-display text-4xl text-marigold md:text-5xl">
              <StatCounter value={s.value} suffix={s.suffix} locale={htmlLang[locale]} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
