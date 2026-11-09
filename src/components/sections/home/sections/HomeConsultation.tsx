import type { HomeSectionProps } from './types';
import { href, ts, ui } from '@/lib/i18n';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapEmbed } from '@/components/contact/MapEmbed';

export function HomeConsultation({ locale, settings, text }: Pick<HomeSectionProps, 'locale' | 'settings' | 'text'>) {
  const d = ui(locale);
  return (<>
      <section className="bg-sand stars relative py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div><h2 className="text-3xl text-night md:text-[2.6rem]">{text.consultation.title}</h2><p className="mt-5 max-w-md text-lg text-muted">{text.consultation.intro}</p><ButtonLink href={href(locale, '/contact/')} variant="outline" className="mt-7">{d.nav.contact}</ButtonLink>{settings.mapEmbedUrl && <MapEmbed src={settings.mapEmbedUrl} title={d.contact.address} label={d.contact.showMap} directionsUrl={settings.mapDirectionsUrl} directionsLabel={d.cta.directions} loadOnMount className="mt-8" />}</div>
          <ContactForm labels={{ ...d.contact, send: d.cta.send }} whatsapp={settings.whatsapp} siteName={ts(settings.name, 'en')} unavailable={locale === 'kn' ? 'ಸಂಪರ್ಕ ಫಾರ್ಮ್ ಇನ್ನೂ ಲಭ್ಯವಿಲ್ಲ.' : 'The enquiry form will be available once contact details are configured.'} />
        </div>
      </section>
  </>);
}
