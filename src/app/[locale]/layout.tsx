import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { fontVariables } from '../fonts';
import { getAreas, getServices, getSiteSettings } from '@/lib/content';
import { htmlLang, isLocale, LOCALES, ts } from '@/lib/i18n';
import { SITE_URL } from '@/lib/metadata';
import { localBusinessSchema, organizationSchema, personSchema, websiteSchema } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { JsonLd } from '@/components/ui/JsonLd';

// Build one copy of the whole site per language; any other prefix is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export const viewport: Viewport = { themeColor: '#15142e' };

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const settings = await getSiteSettings();
  const name = ts(settings.name, locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: ts(settings.defaultSeo.metaTitle, locale) || name, template: `%s | ${name}` },
    description: ts(settings.defaultSeo.metaDescription, locale),
    applicationName: name,
    icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
    manifest: '/site.webmanifest',
    verification: { google: settings.verification?.google || undefined, other: settings.verification?.bing ? { 'msvalidate.01': settings.verification.bing } : undefined },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [settings, services, areas] = await Promise.all([getSiteSettings(), getServices(), getAreas()]);

  return (
    <html lang={htmlLang[locale]} className={fontVariables}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-saffron focus:px-4 focus:py-2 focus:text-night">
          Skip to content
        </a>
        <Header locale={locale} settings={settings} services={services} />
        <main id="main">{children}</main>
        <Footer locale={locale} settings={settings} services={services} />
        <MobileActionBar locale={locale} settings={settings} />
        <JsonLd
          data={[
            organizationSchema(settings, locale),
            localBusinessSchema(settings, locale, areas),
            personSchema(settings, locale),
            websiteSchema(settings, locale),
          ]}
        />
      </body>
    </html>
  );
}
