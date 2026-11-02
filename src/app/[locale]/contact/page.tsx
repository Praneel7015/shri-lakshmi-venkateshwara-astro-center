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
  const location = [ts(settings.address?.street, locale), settings.address?.locality, settings.address?.city, settings.address?.region, settings.address?.postalCode].filter(Boolean).join(', ');
  const hours = ts(settings.hours, locale);
  const placeholderHours = !hours || hours === 'Contact details coming soon' || hours === 'ಸಂಪರ್ಕ ವಿವರಗಳು ಶೀಘ್ರದಲ್ಲೇ';
  const details = [
    { label: kn ? 'ದೂರವಾಣಿ' : 'Phone', value: settings.phone || '+91 00000 00000', icon: Phone, link: settings.phone ? telLink(settings.phone) : undefined, placeholder: !settings.phone },
    { label: 'Email', value: settings.email || 'hello@example.com', icon: Mail, link: settings.email ? `mailto:${settings.email}` : undefined, placeholder: !settings.email },
    { label: kn ? 'ವಿಳಾಸ' : 'Address', value: location || 'Example address, Bengaluru', icon: MapPin, placeholder: !location },
    { label: kn ? 'ಸಮಯ' : 'Hours', value: placeholderHours ? (kn ? 'ಸೋಮವಾರ–ಶನಿವಾರ, ಬೆಳಿಗ್ಗೆ 10–ಸಂಜೆ 6' : 'Monday–Saturday, 10 am–6 pm') : hours, icon: Clock, placeholder: placeholderHours },
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
            {details.map(({ label, value, icon: Icon, link, placeholder }) => <div key={label} className="flex gap-4">
              <Icon className="mt-1 size-5 shrink-0 text-saffron-deep" aria-hidden="true" />
              <div><p className="text-sm text-muted">{label}</p><p className="mt-1 break-words text-night">{link ? <a className="hover:text-saffron-deep" href={link}>{value}</a> : value}</p>
              {placeholder && <p className="mt-1 text-sm text-muted">{kn ? 'ಉದಾಹರಣೆ ವಿವರ' : 'Example detail — to be confirmed'}</p>}
              {label === (kn ? 'ವಿಳಾಸ' : 'Address') && settings.mapDirectionsUrl && <a href={settings.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-deep hover:underline"><Navigation className="size-4" aria-hidden="true" />{d.cta.directions}</a>}</div>
            </div>)}
          </address>
          {settings.mapEmbedUrl && <MapEmbed src={settings.mapEmbedUrl} title={d.contact.address} label={d.contact.showMap} directionsUrl={settings.mapDirectionsUrl} directionsLabel={d.cta.directions} />}
        </div>
        <ContactForm labels={{ ...d.contact, send: d.cta.send }} whatsapp={settings.whatsapp} siteName={ts(settings.name, 'en')} unavailable={kn ? 'ಸಂಪರ್ಕ ಫಾರ್ಮ್ ಇನ್ನೂ ಲಭ್ಯವಿಲ್ಲ.' : 'The enquiry form will be available once contact details are configured.'} />
      </div>
    </section>
  </>;
}
