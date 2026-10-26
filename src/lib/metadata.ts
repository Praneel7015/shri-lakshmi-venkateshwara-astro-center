/**
 * `buildMetadata()` — the one helper every page uses for its <head> tags:
 * title, description, canonical, hreflang (English ⇄ Kannada), Open Graph,
 * Twitter card and robots. Ported from the Vishwanath Guruji project and
 * extended for two languages.
 */
import type { Metadata } from 'next';
import type { ImageRef, Locale, Seo, SiteSettings } from '@/types/content';
import { href, ogLocale, t, ts } from './i18n';
import { imageUrl } from './sanity/image';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

interface BuildMetadataInput {
  locale: Locale;
  settings: SiteSettings;
  /** Language-neutral path, e.g. `/services/vastu-shastra/`. */
  path: string;
  title: string;
  description: string;
  /** Overrides from the document's SEO tab in the Studio. */
  seo?: Seo;
  image?: ImageRef;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  /**
   * False when this page has no Kannada version yet (e.g. an English-only
   * blog post). The Kannada URL is then noindexed and points to English.
   */
  hasKannada?: boolean;
  noIndex?: boolean;
}

export function buildMetadata({
  locale, settings, path, title, description, seo, image, type = 'website',
  publishedTime, modifiedTime, hasKannada = true, noIndex = false,
}: BuildMetadataInput): Metadata {
  const metaTitle = t(seo?.metaTitle, locale) || title;
  const metaDescription = t(seo?.metaDescription, locale) || description;
  const enUrl = absoluteUrl(href('en', path));
  const knUrl = absoluteUrl(href('kn', path));
  const untranslated = locale === 'kn' && !hasKannada;
  const hidden = noIndex || seo?.noIndex || untranslated;

  const ogImage =
    imageUrl(seo?.ogImage, 1200) ?? imageUrl(image, 1200) ?? imageUrl(settings.defaultSeo.ogImage, 1200) ?? absoluteUrl('/og-image.png');
  const siteName = ts(settings.name, locale);
  // Skip the "| Site name" suffix when the editor wrote a full title, or when
  // adding it would push the title past ~60 characters (Google cuts it off).
  const skipSuffix = Boolean(seo?.metaTitle) || `${metaTitle} | ${siteName}`.length > 60;

  return {
    title: skipSuffix ? { absolute: metaTitle } : metaTitle,
    description: metaDescription,
    alternates: {
      canonical: untranslated ? enUrl : locale === 'en' ? enUrl : knUrl,
      languages: hasKannada ? { 'en-IN': enUrl, 'kn-IN': knUrl, 'x-default': enUrl } : { 'en-IN': enUrl, 'x-default': enUrl },
      types: { 'application/rss+xml': absoluteUrl(href(locale, '/blog/rss.xml').replace(/\/$/, '')) },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: locale === 'en' ? enUrl : knUrl,
      siteName,
      locale: ogLocale[locale],
      alternateLocale: hasKannada ? [ogLocale[locale === 'en' ? 'kn' : 'en']] : undefined,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: metaTitle }],
      ...(type === 'article' && { publishedTime, modifiedTime, authors: [ts(settings.astrologerName, locale)] }),
    },
    twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription, images: [ogImage] },
    robots: hidden
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    keywords: settings.keywords,
  };
}
