import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { getSiteSettings } from '@/lib/content';
import { localeFrom, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { telLink, waLink } from '@/lib/contact';
import { PageHero } from '@/components/ui/PageHero';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapEmbed } from '@/components/contact/MapEmbed';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const settings = await getSiteSettings();
  const d = ui(locale);
  return buildMetadata({
    locale, settings, path: '/contact/', title: d.nav.contact,
    description: `${d.contact.title}: ${ts(settings.address.street, locale)}, ${settings.address.locality}, ${settings.address.city}. ${settings.phone}`,
  });
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await localeFrom(params);
  const [settings, text] = await Promise.all([getSiteSettings(), getPageText(locale)]);
  const d = ui(locale);
  const row = 'flex gap-4';
  const icon = 'mt-1 size-5 shrink-0 text-saffron-deep';

  return (
    <>
      <PageHero locale={locale} title={text.contact.title} intro={ts(settings.hours, locale)} crumbs={[{ label: d.nav.contact, path: '/contact/' }]} />

      <section className="py-14 md:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={waLink(settings.whatsapp, d.whatsappGreeting)} variant="whatsapp" size="lg" icon={<WhatsAppIcon colored={false} />}>
                {d.cta.whatsapp}
              </ButtonLink>
              <ButtonLink href={telLink(settings.phone)} variant="outline" size="lg" icon={<Phone className="size-5" aria-hidden="true" />}>
                {d.cta.callNow}
              </ButtonLink>
            </div>

            <address className="space-y-5 rounded-card border border-line bg-white/70 p-6 not-italic">
              <div className={row}>
                <MapPin className={icon} aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted">{d.contact.address}</p>
                  <p className="mt-1 text-night">
                    {ts(settings.address.street, locale)}, {settings.address.locality}, {settings.address.city}, {settings.address.region} {settings.address.postalCode}
                  </p>
                  {settings.mapDirectionsUrl && (
                    <a href={settings.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-deep hover:underline">
                      <Navigation className="size-4" aria-hidden="true" />
                      {d.cta.directions}
                    </a>
                  )}
                </div>
              </div>
              <div className={row}>
                <Clock className={icon} aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted">{d.contact.hours}</p>
                  <p className="mt-1 text-night">{ts(settings.hours, locale)}</p>
                </div>
              </div>
              <div className={row}>
                <Phone className={icon} aria-hidden="true" />
                <a href={telLink(settings.phone)} className="text-night hover:text-saffron-deep">{settings.phone}</a>
              </div>
              <div className={row}>
                <Mail className={icon} aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="break-all text-night hover:text-saffron-deep">{settings.email}</a>
              </div>
            </address>

            {settings.mapEmbedUrl && (
              <MapEmbed src={settings.mapEmbedUrl} title={d.contact.address} label={d.contact.showMap} directionsUrl={settings.mapDirectionsUrl} directionsLabel={d.cta.directions} />
            )}
          </div>

          <ContactForm labels={{ ...d.contact, send: d.cta.send }} whatsapp={settings.whatsapp} siteName={ts(settings.name, 'en')} />
        </div>
      </section>
    </>
  );
}
