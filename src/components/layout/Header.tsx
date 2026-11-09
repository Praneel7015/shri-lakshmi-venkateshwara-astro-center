import Link from 'next/link';
import { ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Locale, ServiceSummary, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { telLink } from '@/lib/contact';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ActiveNavLink } from './ActiveNavLink';
import { mainNav, secondaryNav } from './navigation';
export function Header({
  locale,
  settings,
  services,
  appointmentLabel,
}: {
  locale: Locale;
  settings: SiteSettings;
  services: ServiceSummary[];
  appointmentLabel: string;
}) {
  const d = ui(locale);
  const nav = mainNav(d);
  const location = [settings.address?.locality, settings.address?.city].map((value) => value?.trim()).filter(Boolean).join(', ');
  const storedHours = ts(settings.hours, locale).trim();
  const hours = /^contact details coming soon$/i.test(storedHours) || storedHours === 'ಸಂಪರ್ಕ ವಿವರಗಳು ಶೀಘ್ರದಲ್ಲೇ' ? '' : storedHours;
  const leftNav = [{ label: d.nav.home, path: '/' }, ...nav.filter((item) => ['/about/', '/services/', '/pujas/'].includes(item.path))];
  const rightNav = [...nav.filter((item) => item.path === '/blog/'), ...secondaryNav(d), { label: appointmentLabel, path: '/contact/' }];
  const navItem = (item: { label: string; path: string }) => <li key={item.path} className={item.path === '/services/' ? 'group relative' : undefined}>
    <ActiveNavLink className={item.path === '/contact/' ? 'inline-flex min-h-[34px] items-center whitespace-nowrap rounded-full bg-saffron px-4 text-xs font-semibold text-night hover:bg-marigold xl:px-5 xl:text-sm' : 'inline-flex min-h-11 items-center gap-1 whitespace-nowrap py-2 text-sm text-night/75 hover:text-night xl:text-base'} activeClassName={item.path === '/contact/' ? '' : 'font-semibold text-night underline decoration-2 underline-offset-8'} routePath={item.path} href={href(locale, item.path)}><span className={item.path === '/contact/' ? 'btn-label' : undefined}>{item.label}</span>{item.path === '/services/' && <ChevronDown className="size-3 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden="true" />}</ActiveNavLink>
    {item.path === '/services/' && services.length > 0 && <div className="invisible absolute top-full left-0 w-[34rem] pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
      <ul className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-ivory p-3 shadow-xl">
        {services.map((service) => <li key={service.slug}><Link href={href(locale, `/services/${service.slug}/`)} className="block rounded-xl px-4 py-3 hover:bg-sand"><span className="block font-display text-[1.1rem] text-ink">{ts(service.title, locale)}</span><span className="mt-0.5 line-clamp-1 block text-sm text-muted">{ts(service.shortDescription, locale)}</span></Link></li>)}
      </ul>
    </div>}
  </li>;
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line bg-ivory text-ink">
      <div className="hidden border-b border-night-3 bg-night text-[11px] text-moon/85 lg:block">
        <div className="container-site flex min-h-[34px] flex-wrap items-center justify-between gap-x-5 gap-y-1 py-1">
          {settings.phone?.trim() && <a className="flex items-center gap-2 hover:text-sage" href={telLink(settings.phone)}><Phone className="size-4 text-saffron" aria-hidden="true" />{settings.phone}</a>}
          {settings.email?.trim() && <a className="flex items-center gap-2 hover:text-sage" href={`mailto:${settings.email}`}><Mail className="size-4 text-saffron" aria-hidden="true" />{settings.email}</a>}
          {hours && <span className="flex items-center gap-2"><Clock className="size-4 text-saffron" aria-hidden="true" />{hours}</span>}
          {location && <span className="flex items-center gap-2"><MapPin className="size-4 text-saffron" aria-hidden="true" />{location}</span>}
          <div className="ml-auto"><LanguageSwitch locale={locale} tone="dark" className="py-0 text-[11px]" /></div>
        </div>
      </div>
      <div className="container-site flex min-w-0 items-center justify-between gap-3 py-4 lg:grid lg:min-h-[106px] lg:grid-cols-[1fr_220px_1fr] lg:gap-4 lg:py-2 xl:grid-cols-[1fr_260px_1fr] xl:gap-8">
        <nav aria-label="Main" className="hidden lg:block"><ul className="flex items-center justify-start gap-[1.125rem] xl:gap-4">{leftNav.map(navItem)}</ul></nav>
        <div className="min-w-0 flex-1 lg:flex-none lg:justify-self-center"><Logo locale={locale} settings={settings} centered compact /></div>
        <div className="flex shrink-0 items-center lg:hidden">
          <MobileMenu
            locale={locale}
            items={[
              { label: d.nav.home, href: href(locale, '/') },
              ...nav.map((i) => ({
                label: i.label,
                href: href(locale, i.path),
              })),
            ]}
            secondary={secondaryNav(d).map((i) => ({
              label: i.label,
              href: href(locale, i.path),
            }))}
            labels={{ menu: d.menu, close: d.close }}
            footer={
              <ButtonLink href={href(locale, '/contact/')}>
                {d.cta.book}
              </ButtonLink>
            }
          />
        </div>
        <nav aria-label="More pages" className="hidden lg:block"><ul className="flex items-center justify-end gap-[1.125rem] xl:gap-4">{rightNav.map(navItem)}</ul></nav>
      </div>
    </header>
  );
}
