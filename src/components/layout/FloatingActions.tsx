import { Phone } from 'lucide-react';
import type { Locale, SiteSettings } from '@/types/content';
import { ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { BackToTop } from './BackToTop';

/**
 * Floating round buttons on every screen size, in the Vishwanath Guruji
 * format: call above WhatsApp (with a pulsing ring) on the right, a label
 * sliding out on hover, and "back to top" on the left once you scroll.
 */
export function FloatingActions({ locale, settings }: { locale: Locale; settings: SiteSettings }) {
  const d = ui(locale);
  const round = 'group relative grid size-14 place-items-center rounded-full shadow-lg shadow-night/30 transition-transform duration-200 hover:scale-110';
  const tip = 'pointer-events-none absolute right-full mr-3 -translate-x-2 rounded-md border border-marigold/40 bg-night-2 px-3 py-1.5 text-xs whitespace-nowrap text-moon shadow-md opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100';
  return (
    <>
      <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
        <a href={telLink(settings.phone)} aria-label={d.cta.callNow} className={`${round} bg-saffron text-night`}>
          <Phone className="size-[1.35rem]" aria-hidden="true" />
          <span className={tip} aria-hidden="true">{d.cta.callNow}</span>
        </a>
        <a href={waLink(settings.whatsapp, d.whatsappGreeting)} target="_blank" rel="noopener noreferrer" aria-label={d.cta.askOnWhatsapp} className={`${round} bg-whatsapp text-white`}>
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-whatsapp" aria-hidden="true" />
          <WhatsAppIcon colored={false} className="relative size-7" />
          <span className={tip} aria-hidden="true">{d.cta.askOnWhatsapp}</span>
        </a>
      </div>
      <BackToTop label={d.backToTop} />
    </>
  );
}
