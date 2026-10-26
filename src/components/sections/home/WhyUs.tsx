import type { Locale, Reason } from '@/types/content';
import { ts } from '@/lib/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** "Why choose us": short reasons, set as plain text in two columns. */
export function WhyUs({ locale, reasons, title }: { locale: Locale; reasons: Reason[]; title: string }) {
  if (!reasons.length) return null;
  return (
    <section className="bg-sand py-16 md:py-24">
      <div className="container-site">
        <SectionHeading title={title} />
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {reasons.map((r, i) => (
            <li key={i} className="max-w-xl">
              <h3 className="text-2xl text-night">{ts(r.title, locale)}</h3>
              <p className="mt-2 text-muted">{ts(r.text, locale)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
