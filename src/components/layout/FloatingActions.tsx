import { Phone } from 'lucide-react';
import type { Locale, SiteSettings } from '@/types/content';
import { ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { BackToTop } from './BackToTop';

/**
 * Round call and WhatsApp buttons in the bottom-right corner from tablet width
 * up, plus "back to top" (as on the Vishwanath Guruji site). Phones use the
 * MobileActionBar instead.
 */
export function FloatingActions({ locale, settings }: { locale: Locale; settings: SiteSettings }) {
  const d = ui(locale);
  const round = 'grid size-13 place-items-center rounded-full shadow-lg shadow-night/25 transition hover:-translate-y-0.5';
  return (
    <div className="fixed right-5 bottom-5 z-30 hidden flex-col items-center gap-3 md:flex">
      <BackToTop label={d.backToTop} />
      <a href={telLink(settings.phone)} aria-label={d.cta.callNow} className={`${round} bg-saffron text-night`}>
        <Phone className="size-5" aria-hidden="true" />
      </a>
      <a href={waLink(settings.whatsapp, d.whatsappGreeting)} target="_blank" rel="noopener noreferrer" aria-label={d.cta.whatsapp} className={`${round} bg-whatsapp text-night`}>
        <WhatsAppIcon colored={false} className="size-6" />
      </a>
    </div>
  );
}
