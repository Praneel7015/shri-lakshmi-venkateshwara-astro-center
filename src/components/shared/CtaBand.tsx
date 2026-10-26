import { MessageCircle, Phone } from 'lucide-react';
import type { Locale, SiteSettings } from '@/types/content';
import { ts, ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Mandala, StarField } from '@/components/ui/Ornaments';

/** The closing "book a consultation" band used at the bottom of most pages. */
export function CtaBand({ locale, settings, heading, text }: { locale: Locale; settings: SiteSettings; heading?: string; text?: string }) {
  const d = ui(locale);
  return (
    <section className="container-site py-16 md:py-24">
      <div className="bg-sky relative overflow-hidden rounded-[2rem] px-7 py-14 text-center text-moon md:px-16 md:py-20">
        <StarField className="pointer-events-none absolute inset-0 size-full text-moon/60" />
        <Mandala className="animate-orbit pointer-events-none absolute -top-24 -right-24 size-80 text-marigold/10" />
        <Mandala className="animate-orbit pointer-events-none absolute -bottom-28 -left-28 size-72 text-marigold/10" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl text-moon md:text-5xl">{heading ?? d.cta.book}</h2>
          <p className="mt-5 text-lg text-moon/75">{text ?? ts(settings.hours, locale)}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink href={waLink(settings.whatsapp, d.whatsappGreeting)} size="lg" icon={<MessageCircle className="size-5" aria-hidden="true" />}>
              {d.cta.enquire}
            </ButtonLink>
            <ButtonLink href={telLink(settings.phone)} variant="light" size="lg" icon={<Phone className="size-5" aria-hidden="true" />}>
              {settings.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
