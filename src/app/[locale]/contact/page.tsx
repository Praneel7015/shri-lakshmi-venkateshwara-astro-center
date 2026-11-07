import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { getSiteSettings } from '@/lib/content';
import { localeFrom, ts, ui } from '@/lib/i18n';
import { telLink, waLink } from '@/lib/contact';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { getPageText } from '@/lib/page-text';
import { ButtonLink, buttonClasses } from '@/components/ui/ButtonLink';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapEmbed } from '@/components/contact/MapEmbed';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const settings = await getSiteSettings();
  return buildMetadata({ locale, settings, path: '/contact/', title: ui(locale).nav.contact, description: 'Contact Shri Lakshmi Venkateshwara Astro Center.' });
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await localeFrom(params);
  const kn = locale === 'kn';
  const settings = await getSiteSettings();
  const d = ui(locale);
  const text = await getPageText(locale);
  const location = [ts(settings.address?.street, locale), settings.address?.locality, settings.address?.city, settings.address?.region, settings.address?.postalCode]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(', ');
  const rawHours = ts(settings.hours, locale).trim();
  const hours = /^contact details coming soon$/i.test(rawHours) || rawHours === '\u0cb8\u0c82\u0caa\u0cb0\u0ccd\u0c95 \u0cb5\u0cbf\u0cb5\u0cb0\u0c97\u0cb3\u0cc1 \u0cb6\u0cc0\u0c98\u0ccd\u0cb0\u0ca6\u0cb2\u0ccd\u0cb2\u0cc6' ? '' : rawHours;
  const details = [
    { label: kn ? '\u0ca6\u0cc2\u0cb0\u0cb5\u0cbe\u0ca3\u0cbf' : 'Phone', value: settings.phone?.trim() ?? '', icon: Phone, kind: 'phone', link: settings.phone?.trim() ? telLink(settings.phone) : undefined },
    { label: 'Email', value: settings.email?.trim() ?? '', icon: Mail, kind: 'email', link: settings.email?.trim() ? `mailto:${settings.email.trim()}` : undefined },
    { label: kn ? '\u0cb5\u0cbf\u0cb3\u0cbe\u0cb8' : 'Address', value: location, icon: MapPin, kind: 'address', link: undefined },
    ...(hours ? [{ label: kn ? '\u0cb8\u0cae\u0caf' : 'Hours', value: hours, icon: Clock, kind: 'hours', link: undefined }] : []),
  ];
  return <>
    <PageHero locale={locale} title={text.contact.title} intro={text.contact.intro} crumbs={[{ label: ui(locale).nav.contact, path: '/contact/' }]} />
    <section className="py-14 md:py-20">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            {settings.whatsapp ? <ButtonLink href={waLink(settings.whatsapp, d.whatsappGreeting)} variant="whatsapp" size="lg" icon={<WhatsAppIcon colored={false} />}>{d.cta.whatsapp}</ButtonLink> : <button disabled className={buttonClasses('whatsapp', 'lg', 'opacity-60')}><WhatsAppIcon colored={false} />{d.cta.whatsapp}</button>}
            {settings.phone ? <ButtonLink href={telLink(settings.phone)} variant="outline" size="lg" icon={<Phone className="size-5" aria-hidden="true" />}>{d.cta.callNow}</ButtonLink> : <button disabled className={buttonClasses('outline', 'lg', 'opacity-60')}><Phone className="size-5" aria-hidden="true" />{d.cta.callNow}</button>}
          </div>
          <address className="space-y-5 rounded-card border border-line bg-white/70 p-6 not-italic">
            {details.map(({ label, value, icon: Icon, link, kind }) => value && <div key={label} className="flex gap-4">
              <Icon className="mt-1 size-5 shrink-0 text-saffron-deep" aria-hidden="true" />
              <div><p className="text-sm text-muted">{label}</p><p className="mt-1 break-words text-night">{link ? <a className="hover:text-saffron-deep" href={link}>{value}</a> : value}</p>
              {kind === 'address' && settings.mapDirectionsUrl && <a href={settings.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-deep hover:underline"><Navigation className="size-4" aria-hidden="true" />{d.cta.directions}</a>}</div>
            </div>)}
          </address>
          {settings.mapEmbedUrl && <MapEmbed src={settings.mapEmbedUrl} title={d.contact.address} label={d.contact.showMap} directionsUrl={settings.mapDirectionsUrl} directionsLabel={d.cta.directions} loadOnMount />}
        </div>
        <ContactForm labels={{ ...d.contact, send: d.cta.send }} whatsapp={settings.whatsapp} siteName={ts(settings.name, 'en')} unavailable={kn ? 'ಸಂಪರ್ಕ ಫಾರ್ಮ್ ಇನ್ನೂ ಲಭ್ಯವಿಲ್ಲ.' : 'The enquiry form will be available once contact details are configured.'} />
      </div>
    </section>
  </>;
}
