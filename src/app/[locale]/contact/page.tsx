import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { Mandala } from '@/components/ui/Ornaments';
export async function generateMetadata({
  params,
}: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const settings = await getSiteSettings();
  return buildMetadata({
    locale,
    settings,
    path: '/contact/',
    title: ui(locale).nav.contact,
    description: 'Contact details coming soon.',
  });
}
export default async function ContactPage({
  params,
}: PageProps<'/[locale]/contact'>) {
  const locale = await localeFrom(params);
  const kn = locale === 'kn';
  return (
    <>
      <PageHero
        locale={locale}
        title={kn ? 'ಸಂಪರ್ಕದಲ್ಲಿರಿ' : 'Let’s begin a conversation'}
        intro={
          kn
            ? 'Shri Lakshmi Venkateshwara Astro Center ಗೆ ಸ್ವಾಗತ.'
            : 'We look forward to welcoming you to Shri Lakshmi Venkateshwara Astro Center.'
        }
        crumbs={[{ label: ui(locale).nav.contact, path: '/contact/' }]}
      />
      <section className="container-site py-16 md:py-24">
        <div className="mx-auto max-w-3xl rounded-card border border-line bg-white p-8 text-center md:p-14">
          <Mandala className="mx-auto mb-7 size-20 text-saffron-deep" />
          <h2 className="text-3xl text-night">
            {kn ? 'ಸಂಪರ್ಕ ವಿವರಗಳು ಶೀಘ್ರದಲ್ಲೇ' : 'Contact details coming soon'}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            {kn
              ? 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ, ವಿಳಾಸ, ಸಮಯ ಮತ್ತು ಸಮಾಲೋಚನಾ ವಿಧಾನಗಳನ್ನು ದೃಢೀಕರಿಸಲಾಗುತ್ತಿದೆ. ವಿವರಗಳು ಸಿದ್ಧವಾದಾಗ ಈ ಪುಟದಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ.'
              : 'Our phone number, address, opening hours and consultation options are being confirmed. This page will be updated when these details are ready.'}
          </p>
          <p className="mt-7 border-t border-line pt-6 text-sm text-muted">
            {kn
              ? 'ಇದು ವೆಬ್‌ಸೈಟ್ ಮುನ್ನೋಟ. ಬುಕಿಂಗ್ ಇನ್ನೂ ಆರಂಭವಾಗಿಲ್ಲ.'
              : 'This is a website preview. Bookings are not open yet.'}
          </p>
        </div>
      </section>
    </>
  );
}
