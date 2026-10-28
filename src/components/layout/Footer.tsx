import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Locale, ServiceSummary, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { BrandIcon, brandNames, WhatsAppIcon, type SocialNetwork } from '@/components/ui/BrandIcon';
import { Logo } from './Logo';
import { legalNav, mainNav, secondaryNav } from './navigation';

interface Props {
  locale: Locale;
  settings: SiteSettings;
  services: ServiceSummary[];
  /** From "Page headings & text" in the Studio. */
  disclaimer: string;
}

export function Footer({ locale, settings, services, disclaimer }: Props) {
  const d = ui(locale);
  const socials = Object.entries(settings.socials ?? {}).filter(([, url]) => url) as [SocialNetwork, string][];
  const linkClass = 'text-moon/70 hover:text-moon hover:underline';
  const heading = 'mb-4 font-sans text-sm font-semibold text-moon';
  const icon = 'mt-1 size-4 shrink-0 text-moon/45';

  return (
    <footer className="bg-night pt-14 pb-28 text-moon md:pb-10">
      <div className="container-site">
        {/* Phones: brand and contact span both columns, the two link lists sit side by side */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo locale={locale} settings={settings} />
            <p className="mt-4 max-w-xs text-moon/70">{ts(settings.tagline, locale)}</p>
            <ul className="mt-5 flex gap-2">
              <li>
                <a href={waLink(settings.whatsapp, d.whatsappGreeting)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full border border-moon/15 hover:border-moon/40">
                  <WhatsAppIcon className="size-5" />
                </a>
              </li>
              {socials.map(([network, url]) => (
                <li key={network}>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={brandNames[network]} className="grid size-11 place-items-center rounded-full border border-moon/15 text-moon/80 hover:border-moon/40 hover:text-moon">
                    <BrandIcon network={network} className="size-[1.1rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={d.footer.explore}>
            <h2 className={heading}>{d.footer.explore}</h2>
            <ul className="space-y-2">
              {[...mainNav(d), ...secondaryNav(d)].map((item) => (
                <li key={item.path}><Link href={href(locale, item.path)} className={linkClass}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label={d.footer.services}>
            <h2 className={heading}>{d.footer.services}</h2>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}><Link href={href(locale, `/services/${s.slug}/`)} className={linkClass}>{ts(s.title, locale)}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h2 className={heading}>{d.footer.reach}</h2>
            {/* NAP block: keep identical to Google Business Profile */}
            <address className="space-y-3 not-italic text-moon/75">
              <p className="flex gap-3">
                <MapPin className={icon} aria-hidden="true" />
                <span>
                  {ts(settings.address.street, locale)}, {settings.address.locality}, {settings.address.city} {settings.address.postalCode}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className={icon} aria-hidden="true" />
                <a href={telLink(settings.phone)} className="hover:text-moon hover:underline">{settings.phone}</a>
              </p>
              <p className="flex gap-3">
                <Mail className={icon} aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="break-all hover:text-moon hover:underline">{settings.email}</a>
              </p>
              <p className="flex gap-3">
                <Clock className={icon} aria-hidden="true" />
                {ts(settings.hours, locale)}
              </p>
            </address>
          </div>
        </div>

        <p className="mt-12 max-w-2xl text-sm text-moon/60">{disclaimer}</p>

        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-moon/10 pt-6 text-sm text-moon/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} {ts(settings.name, locale)}. {d.footer.rights}
            <span aria-hidden="true" className="mx-2">·</span>
            {d.footer.madeBy}{' '}
            <a href="https://praneel.sindhole.com/contact" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-moon">
              Praneel S
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav(d).map((item) => (
              <li key={item.path}><Link href={href(locale, item.path)} className="hover:text-moon hover:underline">{item.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
