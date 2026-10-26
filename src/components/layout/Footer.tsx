import Link from 'next/link';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Locale, ServiceSummary, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { telLink } from '@/lib/contact';
import { KolamDivider, StarField } from '@/components/ui/Ornaments';
import { SocialIcon, type SocialNetwork } from '@/components/ui/SocialIcon';
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
  const linkClass = 'text-moon/65 hover:text-marigold';

  return (
    <footer className="bg-sky relative overflow-hidden pt-16 pb-28 text-moon md:pb-10">
      <StarField className="pointer-events-none absolute inset-0 size-full text-moon/50" />
      <div className="container-site relative">
        {/* Phones: brand and contact span both columns, the two link lists sit side by side */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo locale={locale} settings={settings} />
            <p className="mt-5 max-w-xs text-moon/65">{ts(settings.tagline, locale)}</p>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {socials.map(([network, url]) => (
                  <li key={network}>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={network} className="grid size-10 place-items-center rounded-full border border-moon/15 text-moon/75 hover:border-marigold hover:text-marigold">
                      <SocialIcon network={network} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="eyebrow mb-5 font-sans text-marigold">{d.footer.explore}</h2>
            <ul className="space-y-2.5">
              {[...mainNav(d), ...secondaryNav(d)].map((item) => (
                <li key={item.path}><Link href={href(locale, item.path)} className={linkClass}>{item.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-5 font-sans text-marigold">{d.footer.services}</h2>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}><Link href={href(locale, `/services/${s.slug}/`)} className={linkClass}>{ts(s.title, locale)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="eyebrow mb-5 font-sans text-marigold">{d.footer.reach}</h2>
            {/* NAP block: keep identical to Google Business Profile */}
            <address className="space-y-4 not-italic text-moon/75">
              <p className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-marigold" aria-hidden="true" />
                <span>
                  {ts(settings.address.street, locale)}, {settings.address.locality}, {settings.address.city} {settings.address.postalCode}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-1 size-4 shrink-0 text-marigold" aria-hidden="true" />
                <a href={telLink(settings.phone)} className="hover:text-marigold">{settings.phone}</a>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-1 size-4 shrink-0 text-marigold" aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="break-all hover:text-marigold">{settings.email}</a>
              </p>
              <p className="flex gap-3">
                <Clock className="mt-1 size-4 shrink-0 text-marigold" aria-hidden="true" />
                {ts(settings.hours, locale)}
              </p>
            </address>
          </div>
        </div>

        <KolamDivider className="mx-auto mt-14 h-5 w-48 text-marigold/40" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-balance text-moon/50">{disclaimer}</p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-moon/10 pt-6 text-sm text-moon/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {ts(settings.name, locale)}. {d.footer.rights}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {legalNav(d).map((item) => (
              <li key={item.path}><Link href={href(locale, item.path)} className="hover:text-marigold">{item.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
