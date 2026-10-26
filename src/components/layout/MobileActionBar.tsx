import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import type { Locale, SiteSettings } from '@/types/content';
import { href, ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import Link from 'next/link';

/**
 * Sticky Call · WhatsApp · Book bar on phones, where most visitors arrive
 * from Google or a shared WhatsApp link. Hidden from tablet width up.
 */
export function MobileActionBar({ locale, settings }: { locale: Locale; settings: SiteSettings }) {
  const d = ui(locale);
  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold';
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-moon/10 bg-night/95 pb-[env(safe-area-inset-bottom)] text-moon backdrop-blur md:hidden">
      <div className="flex">
        <a href={telLink(settings.phone)} className={item}>
          <Phone className="size-5 text-marigold" aria-hidden="true" />
          {d.cta.call}
        </a>
        <a href={waLink(settings.whatsapp, d.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={`${item} bg-[#1f8a4c] text-white`}>
          <MessageCircle className="size-5" aria-hidden="true" />
          {d.cta.whatsapp}
        </a>
        <Link href={href(locale, '/contact/')} className={item}>
          <CalendarDays className="size-5 text-marigold" aria-hidden="true" />
          {d.cta.bookShort}
        </Link>
      </div>
    </div>
  );
}
