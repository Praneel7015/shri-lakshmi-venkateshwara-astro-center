import type { Locale, Reason } from '@/types/content';
import { ts } from '@/lib/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function WhyUs({ locale, reasons, title }: { locale: Locale; reasons: Reason[]; title: string }) {
  if (!reasons.length) return null;
  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading title={title} />
        <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <li key={i} className="bg-ivory p-6 sm:p-8">
              <Reveal delay={i * 90}>
                <span className="font-display text-4xl text-saffron/40 sm:text-5xl">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-2xl text-night">{ts(r.title, locale)}</h3>
                <p className="mt-3 text-muted">{ts(r.text, locale)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
