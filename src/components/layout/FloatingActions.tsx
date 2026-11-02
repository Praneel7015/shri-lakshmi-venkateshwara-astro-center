import type { Locale, SiteSettings } from '@/types/content';
import { Phone } from 'lucide-react';
import { href, ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { BackToTop } from './BackToTop';
export function FloatingActions({
  locale,
  settings,
}: {
  locale: Locale;
  settings: SiteSettings;
}) {
  const d = ui(locale);
  const button = 'grid size-14 place-items-center rounded-full shadow-lg shadow-night/30 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marigold';
  return <>
    <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3 md:right-6 md:bottom-6">
      <a href={settings.phone ? telLink(settings.phone) : href(locale, '/contact/')} aria-label={settings.phone ? d.cta.callNow : d.nav.contact} className={`${button} bg-saffron text-night`}><Phone className="size-6" aria-hidden="true" /></a>
      <a href={settings.whatsapp ? waLink(settings.whatsapp, d.whatsappGreeting) : href(locale, '/contact/')} aria-label={settings.whatsapp ? d.cta.askOnWhatsapp : d.nav.contact} className={`${button} bg-whatsapp text-white`}><WhatsAppIcon colored={false} className="size-7" /></a>
    </div>
    <BackToTop label={d.backToTop} />
  </>;
}
