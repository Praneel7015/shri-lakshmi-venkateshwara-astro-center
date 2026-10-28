import { Phone } from 'lucide-react';
import type { Locale, SiteSettings } from '@/types/content';
import { ts, ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { ZodiacWatermark } from '@/components/ui/Ornaments';

/** The closing "book a consultation" band used at the bottom of most pages. */
export function CtaBand({ locale, settings, heading, text }: { locale: Locale; settings: SiteSettings; heading?: string; text?: string }) {
  const d = ui(locale);
  return (
    <section className="container-site py-16 md:py-20">
      <div className="bg-sky relative flex flex-col gap-8 overflow-hidden rounded-card px-6 py-10 text-moon md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
        <ZodiacWatermark place="top-1/2 left-[88%] size-[34rem]" />
        <div className="relative max-w-xl">
          <h2 className="text-3xl text-moon md:text-4xl">{heading ?? d.cta.book}</h2>
          <p className="mt-3 text-moon/75">{text ?? ts(settings.hours, locale)}</p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <ButtonLink href={waLink(settings.whatsapp, d.whatsappGreeting)} variant="whatsapp" size="lg" icon={<WhatsAppIcon colored={false} />}>
            {d.cta.whatsapp}
          </ButtonLink>
          <ButtonLink href={telLink(settings.phone)} variant="light" size="lg" icon={<Phone className="size-5" aria-hidden="true" />}>
            {settings.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
