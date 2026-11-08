import type { Locale, Reason } from '@/types/content';
import { ts } from '@/lib/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Sparkle, ZodiacWatermark } from '@/components/ui/Ornaments';

/** "Why choose us" as a dark starry band, each reason a small card with a sparkle. */
export function WhyUs({ locale, reasons, title }: { locale: Locale; reasons: Reason[]; title: string }) {
  if (!reasons.length) return null;
  return (
    <section className="bg-sky relative overflow-hidden py-16 text-moon md:py-24">
      <ZodiacWatermark />
      <div className="container-site relative">
        <SectionHeading title={title} dark />
        <ul className="grid gap-5 md:grid-cols-2">
          {reasons.map((r, i) => (
            <li key={i} className="flex gap-4 rounded-card border border-line bg-ivory p-6 text-ink shadow-sm">
              <Sparkle className="mt-1.5 size-4 shrink-0 text-saffron-deep" />
              <div>
                <h3 className="text-2xl text-night">{ts(r.title, locale)}</h3>
                <p className="mt-2 text-muted">{ts(r.text, locale)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
