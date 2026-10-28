import { Check, Clock } from 'lucide-react';
import type { Locale, Puja, SiteSettings } from '@/types/content';
import { ts, ui } from '@/lib/i18n';
import { waLink } from '@/lib/contact';
import { Picture } from '@/components/ui/Picture';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { buttonClasses } from '@/components/ui/ButtonLink';

/** One puja with a WhatsApp enquiry button pre-filled with the puja's name. */
export function PujaCard({ puja, locale, settings, as: Heading = 'h3' }: { puja: Puja; locale: Locale; settings: SiteSettings; as?: 'h2' | 'h3' }) {
  const d = ui(locale);
  const title = ts(puja.title, locale);
  return (
    <article id={puja.slug} className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-card border border-line bg-white shadow-sm">
      <div className="relative aspect-[16/10]">
        <Picture image={puja.image} locale={locale} alt={title} tone="dark" sizes="(min-width: 1024px) 24rem, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {puja.deity && <p className="eyebrow text-lapis">{ts(puja.deity, locale)}</p>}
        <Heading className="mt-2 text-2xl text-night">{title}</Heading>
        <p className="mt-3 text-muted">{ts(puja.description, locale)}</p>
        {puja.benefits.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {puja.benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-[0.95rem]">
                <Check className="size-4 shrink-0 text-lapis" aria-hidden="true" />
                {ts(b, locale)}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          {puja.duration && (
            <span className="flex items-center gap-1.5 text-sm whitespace-nowrap text-muted">
              <Clock className="size-4" aria-hidden="true" />
              {ts(puja.duration, locale)}
            </span>
          )}
          <a
            href={waLink(settings.whatsapp, d.whatsappAbout(title))}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('outline', 'sm', 'ml-auto')}
          >
            <WhatsAppIcon className="size-4" />
            <span className="btn-label">{d.cta.enquire}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
