import Link from 'next/link';
import { ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Locale, ServiceSummary, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { telLink } from '@/lib/contact';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { mainNav, secondaryNav } from './navigation';
export function Header({
  locale,
  settings,
  services,
}: {
  locale: Locale;
  settings: SiteSettings;
  services: ServiceSummary[];
}) {
  const d = ui(locale);
  const nav = mainNav(d);
  const location = [settings.address?.locality, settings.address?.city].filter(Boolean).join(', ');
  const hours = ts(settings.hours, locale);
  const leftNav = [{ label: d.nav.home, path: '/' }, ...nav.filter((item) => ['/about/', '/services/', '/pujas/'].includes(item.path))];
  const rightNav = [...nav.filter((item) => item.path === '/blog/'), ...secondaryNav(d), { label: locale === 'kn' ? 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ' : 'Book Appointment', path: '/contact/' }];
  const navItem = (item: { label: string; path: string }) => <li key={item.path} className={item.path === '/services/' ? 'group relative' : undefined}>
    <Link className={item.path === '/contact/' ? 'inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-saffron px-4 text-sm font-semibold text-night hover:bg-marigold xl:px-5' : 'inline-flex min-h-11 items-center gap-1 whitespace-nowrap py-2 text-sm text-moon/90 hover:text-marigold'} href={href(locale, item.path)}>{item.label}{item.path === '/services/' && <ChevronDown className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden="true" />}</Link>
    {item.path === '/services/' && services.length > 0 && <div className="invisible absolute top-full left-0 w-[34rem] pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
      <ul className="grid grid-cols-2 gap-1 rounded-2xl border border-moon/10 bg-night-2 p-3 shadow-2xl">
        {services.map((service) => <li key={service.slug}><Link href={href(locale, `/services/${service.slug}/`)} className="block rounded-xl px-4 py-3 hover:bg-night-3/60"><span className="block font-display text-[1.1rem] text-moon">{ts(service.title, locale)}</span><span className="mt-0.5 line-clamp-1 block text-sm text-moon/55">{ts(service.shortDescription, locale)}</span></Link></li>)}
      </ul>
    </div>}
  </li>;
  return (
    <header className="site-header sticky top-0 z-40 border-b border-marigold/20 bg-night text-moon">
      <div className="hidden border-b border-marigold/15 bg-night-2 text-sm text-moon/80 lg:block">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-5 gap-y-1 py-2">
          {settings.phone && <a className="flex items-center gap-2 hover:text-marigold" href={telLink(settings.phone)}><Phone className="size-4 text-marigold" aria-hidden="true" />{settings.phone}</a>}
          {settings.email && <a className="flex items-center gap-2 hover:text-marigold" href={`mailto:${settings.email}`}><Mail className="size-4 text-marigold" aria-hidden="true" />{settings.email}</a>}
          {hours && <span className="flex items-center gap-2"><Clock className="size-4 text-marigold" aria-hidden="true" />{hours}</span>}
          {location && <span className="flex items-center gap-2"><MapPin className="size-4 text-marigold" aria-hidden="true" />{location}</span>}
          <div className="ml-auto"><LanguageSwitch locale={locale} /></div>
        </div>
      </div>
      <div className="container-site flex items-center justify-between gap-4 py-5 lg:grid lg:grid-cols-[1fr_220px_1fr] lg:gap-4 xl:grid-cols-[1fr_260px_1fr] xl:gap-8">
        <nav aria-label="Main" className="hidden lg:block"><ul className="flex items-center justify-start gap-3 xl:gap-6">{leftNav.map(navItem)}</ul></nav>
        <div className="lg:justify-self-center"><Logo locale={locale} settings={settings} centered /></div>
        <div className="flex shrink-0 items-center gap-3 lg:hidden">
          <LanguageSwitch locale={locale} />
          <MobileMenu
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
        <nav aria-label="More pages" className="hidden lg:block"><ul className="flex items-center justify-end gap-3 xl:gap-6">{rightNav.map(navItem)}</ul></nav>
      </div>
    </header>
  );
}
