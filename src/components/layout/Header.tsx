import Link from 'next/link';
import { ChevronDown, Clock, Mail, Phone } from 'lucide-react';
import type { Locale, ServiceSummary, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { mainNav, secondaryNav } from './navigation';

interface Props {
  locale: Locale;
  settings: SiteSettings;
  services: ServiceSummary[];
}

export function Header({ locale, settings, services }: Props) {
  const d = ui(locale);
  const nav = mainNav(d);
  const bookHref = waLink(settings.whatsapp, d.whatsappGreeting);

  return (
    <header className="sticky top-0 z-40 border-b border-moon/10 bg-night/95 text-moon backdrop-blur supports-[backdrop-filter]:bg-night/85">
      {/* Top contact strip (desktop only), as on the Vishwanath Guruji site */}
      <div className="hidden border-b border-night-3 bg-night-2 text-sm text-moon/75 lg:block">
        <div className="container-site flex h-10 items-center justify-between">
          <p className="flex items-center gap-2">
            <Clock className="size-4 text-marigold" aria-hidden="true" />
            {ts(settings.hours, locale)}
          </p>
          <div className="flex items-center gap-5">
            <a href={telLink(settings.phone)} className="flex items-center gap-2 hover:text-moon">
              <Phone className="size-4 text-marigold" aria-hidden="true" />
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-moon">
              <Mail className="size-4 text-marigold" aria-hidden="true" />
              {settings.email}
            </a>
            <LanguageSwitch locale={locale} className="py-0.5" />
          </div>
        </div>
      </div>

      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem] md:gap-6">
        <Logo locale={locale} settings={settings} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              item.hasServices ? (
                <li key={item.path} className="group relative">
                  <Link href={href(locale, item.path)} className="flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 xl:px-3 text-[0.95rem] text-moon/85 hover:text-moon">
                    {item.label}
                    <ChevronDown className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden="true" />
                  </Link>
                  {/* Dropdown: opens on hover and on keyboard focus */}
                  <div className="invisible absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="grid grid-cols-2 gap-1 rounded-2xl border border-moon/10 bg-night-2 p-3 shadow-2xl">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={href(locale, `/services/${s.slug}/`)} className="block rounded-xl px-4 py-3 hover:bg-night-3/60">
                            <span className="block font-display text-[1.1rem] text-moon">{ts(s.title, locale)}</span>
                            <span className="mt-0.5 line-clamp-1 block text-sm text-moon/55">{ts(s.shortDescription, locale)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.path}>
                  <Link href={href(locale, item.path)} className="whitespace-nowrap rounded-full px-2.5 py-2 xl:px-3 text-[0.95rem] text-moon/85 hover:text-moon">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          {/* Phones use the floating WhatsApp button instead */}
          <div className="hidden md:block">
            <ButtonLink href={bookHref} variant="whatsapp" icon={<WhatsAppIcon colored={false} className="size-[1.1rem]" />}>{d.cta.book}</ButtonLink>
          </div>
          <LanguageSwitch locale={locale} className="lg:hidden" />
          <MobileMenu
            items={[{ label: d.nav.home, href: href(locale, '/') }, ...nav.map((i) => ({ label: i.label, href: href(locale, i.path) }))]}
            secondary={secondaryNav(d).map((i) => ({ label: i.label, href: href(locale, i.path) }))}
            labels={{ menu: d.menu, close: d.close }}
            footer={
              <div className="space-y-3 text-moon/70">
                <p>{ts(settings.hours, locale)}</p>
                <ButtonLink href={bookHref} variant="whatsapp" size="lg" className="w-full" icon={<WhatsAppIcon colored={false} />}>{d.cta.book}</ButtonLink>
              </div>
            }
          />
        </div>
      </div>
    </header>
  );
}
