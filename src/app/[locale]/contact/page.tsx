import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { getSiteSettings } from '@/lib/content';
import { localeFrom, ts, ui } from '@/lib/i18n';
import { telLink } from '@/lib/contact';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const settings = await getSiteSettings();
  return buildMetadata({ locale, settings, path: '/contact/', title: ui(locale).nav.contact, description: 'Contact Shri Lakshmi Venkateshwara Astro Center.' });
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await localeFrom(params);
  const kn = locale === 'kn';
  const settings = await getSiteSettings();
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
    <PageHero locale={locale} title={kn ? 'ಸಂಪರ್ಕದಲ್ಲಿರಿ' : 'Let’s begin a conversation'} intro={kn ? 'Shri Lakshmi Venkateshwara Astro Center ಗೆ ಸ್ವಾಗತ.' : 'We look forward to welcoming you to Shri Lakshmi Venkateshwara Astro Center.'} crumbs={[{ label: ui(locale).nav.contact, path: '/contact/' }]} />
    <section className="container-site py-16 md:py-24">
      <h2 className="text-3xl text-night">{kn ? 'ಸಂಪರ್ಕ ವಿವರಗಳು' : 'Contact details'}</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {details.map(({ label, value, icon: Icon, link, placeholder }) => <div key={label} className="rounded-card border border-line bg-white p-6">
          <Icon className="size-6 text-saffron-deep" aria-hidden="true" />
          <h3 className="mt-4 text-xl text-night">{label}</h3>
          <p className="mt-2 break-words text-muted">{link ? <a className="underline hover:text-night" href={link}>{value}</a> : value}</p>
          {placeholder && <p className="mt-2 text-sm text-muted">{kn ? 'ಉದಾಹರಣೆ ವಿವರ' : 'Example detail — to be confirmed'}</p>}
        </div>)}
      </div>
    </section>
  </>;
}
