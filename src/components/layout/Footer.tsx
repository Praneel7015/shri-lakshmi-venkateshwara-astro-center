import Link from 'next/link';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import type { Area, Locale, ServiceSummary, SiteSettings } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { BrandIcon, brandNames, WhatsAppIcon, type SocialNetwork } from '@/components/ui/BrandIcon';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ZodiacWatermark } from '@/components/ui/Ornaments';
import { Logo } from './Logo';
import { legalNav, mainNav, secondaryNav } from './navigation';

interface Props {
  locale: Locale;
  settings: SiteSettings;
  services: ServiceSummary[];
  /** Area landing pages, listed as "Astrologer near you" links. */
  areas: Area[];
  /** From "Page headings & text" in the Studio. */
  disclaimer: string;
}

/**
 * Footer in the Vishwanath Guruji layout, in this site's night palette: a
 * starry band with a faint zodiac wheel, brand / explore / services / reach-us
 * columns, a row of area links for local search, then © and legal links on the
 * left and the developer credit on the right.
 */
export function Footer({ locale, settings, services, areas, disclaimer }: Props) {
  const d = ui(locale);
  const socials = Object.entries(settings.socials ?? {}).filter(([, url]) => url) as [SocialNetwork, string][];
  const linkClass = 'text-moon/70 hover:text-moon hover:underline';
  // Small gold caps headings; Kannada has no capitals and dislikes wide tracking.
  const heading = 'mb-4 font-sans text-xs font-semibold tracking-[0.18em] text-marigold uppercase [html[lang=kn-IN]_&]:text-sm [html[lang=kn-IN]_&]:tracking-normal';
  const icon = 'mt-1 size-4 shrink-0 text-marigold/80';
  const address = [ts(settings.address.street, locale), settings.address.locality, settings.address.city, settings.address.postalCode]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(', ');
  const hours = ts(settings.hours, locale).trim();
  const isPlaceholderHours = /^contact details coming soon$/i.test(hours) || hours === 'ಸಂಪರ್ಕ ವಿವರಗಳು ಶೀಘ್ರದಲ್ಲೇ';
  const hasContactDetails = Boolean(settings.phone?.trim() || settings.whatsapp?.trim() || settings.email?.trim() || address || settings.mapDirectionsUrl?.trim() || settings.mapEmbedUrl?.trim());
  const mapPreviewUrl = settings.mapEmbedUrl || settings.mapDirectionsUrl;

  return (
    <footer className="bg-night stars-night relative overflow-hidden pt-14 pb-16 text-moon md:pb-20">
      <ZodiacWatermark />

      <div className="container-site relative">
        {/* Phones: brand and contact span both columns, the two link lists sit side by side */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo locale={locale} settings={settings} />
            <p className="mt-4 max-w-xs text-moon/70">{ts(settings.tagline, locale)}</p>
            {hours && !isPlaceholderHours && <p className="mt-5 flex gap-3 text-moon/75">
              <Clock className={icon} aria-hidden="true" />
              {hours}
            </p>}
            <ul className="mt-5 flex gap-2">
              {settings.whatsapp && <li>
                <a href={waLink(settings.whatsapp, d.whatsappGreeting)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full border border-marigold/30 bg-night-2 hover:border-marigold">
                  <WhatsAppIcon className="size-5" />
                </a>
              </li>}
              {socials.map(([network, url]) => (
                <li key={network}>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={brandNames[network]} className="grid size-11 place-items-center rounded-full border border-marigold/30 bg-night-2 text-marigold hover:border-marigold hover:text-moon">
                    <BrandIcon network={network} className="size-[1.1rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={d.footer.explore}>
            <h2 className={heading}>{d.footer.explore}</h2>
            <ul className="space-y-2">
              {[...mainNav(d), ...secondaryNav(d), { label: d.nav.testimonials, path: '/testimonials/' }].map((item) => (
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
            {!hasContactDetails && <p className="text-moon/75">{locale === 'kn' ? 'ಸಂಪರ್ಕ ವಿವರಗಳು ಶೀಘ್ರದಲ್ಲೇ' : 'Contact details coming soon'}</p>}
            <address className="space-y-3 not-italic text-moon/75">
              {address && <p className="flex gap-3">
                <MapPin className={icon} aria-hidden="true" />
                <span>
                  {address}
                </span>
              </p>}
              {settings.phone && <p className="flex gap-3">
                <Phone className={icon} aria-hidden="true" />
                <a href={telLink(settings.phone)} className="hover:text-moon hover:underline">{settings.phone}</a>
              </p>}
              {settings.email && <p className="flex gap-3">
                <Mail className={icon} aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="break-all hover:text-moon hover:underline">{settings.email}</a>
              </p>}
            </address>
            {settings.mapDirectionsUrl && (
              <ButtonLink
                href={settings.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="gold"
                size="sm"
                className="mt-5"
                icon={<Navigation className="size-4" aria-hidden="true" />}
              >
                {d.cta.directions}
              </ButtonLink>
            )}
            {mapPreviewUrl && (
              <a href={mapPreviewUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-marigold hover:text-moon hover:underline">
                <MapPin className="size-4" aria-hidden="true" />{d.cta.mapPreview}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Local search: every area page, as on the Vishwanath Guruji footer */}
      {areas.length > 0 && (
        <nav aria-label={d.footer.nearYou} className="relative mt-12 border-t border-moon/10">
          <div className="container-site py-6">
            <h2 className={heading}>{d.footer.nearYou}</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={href(locale, `/best-astrologer-in/${a.slug}/`)} className={linkClass}>
                    {d.areas.heading(ts(a.name, locale))}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      <div className="container-site relative">
        <p className="mt-6 max-w-2xl text-sm text-moon/60">{disclaimer}</p>

        {/* Bottom padding (footer) and right padding (here) keep the floating buttons clear of this row */}
        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-moon/10 pt-6 text-sm text-moon/60 md:flex-row md:items-center md:pr-24">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <p>
              © {new Date().getFullYear()} {ts(settings.name, locale)}. {d.footer.rights}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalNav(d).map((item) => (
                <li key={item.path}><Link href={href(locale, item.path)} className="hover:text-moon hover:underline">{item.label}</Link></li>
              ))}
            </ul>
          </div>
          <p>
            Made by{' '}
            <a href="https://praneel.sindhole.com/contact" target="_blank" rel="noopener noreferrer" className="text-marigold underline underline-offset-2 hover:text-moon">
              Praneel S
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
