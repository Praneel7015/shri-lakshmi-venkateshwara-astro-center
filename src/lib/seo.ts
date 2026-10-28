/**
 * Structured data (JSON-LD) builders, ported from the Vishwanath Guruji
 * project. Each returns a plain object; render it with <JsonLd data={...} />.
 * All business details come from Site Settings in the Studio, so the client
 * keeps one source of truth for name, address and phone (NAP).
 */
import type { Area, Faq, ImageRef, Locale, Post, Puja, Service, SiteSettings, Testimonial } from '@/types/content';
import { href, htmlLang, ts, ui } from './i18n';
import { absoluteUrl, SITE_URL } from './metadata';
import { imageUrl } from './sanity/image';

const sameAs = (s: SiteSettings) => Object.values(s.socials ?? {}).filter((url): url is string => Boolean(url));

const postalAddress = (s: SiteSettings, locale: Locale) => ({
  '@type': 'PostalAddress',
  streetAddress: ts(s.address.street, locale),
  addressLocality: `${s.address.locality}, ${s.address.city}`,
  addressRegion: s.address.region,
  postalCode: s.address.postalCode,
  addressCountry: s.address.country,
});

// How to reach the business, and in which languages (shown in knowledge panels).
const contactPoint = (s: SiteSettings) => ({
  '@type': 'ContactPoint',
  contactType: 'customer service',
  telephone: s.phone,
  email: s.email,
  areaServed: 'IN',
  availableLanguage: ['English', 'Kannada'],
});

export const organizationSchema = (s: SiteSettings, locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: ts(s.name, locale),
  url: SITE_URL,
  logo: imageUrl(s.logo, 512) ?? absoluteUrl('/icon.svg'),
  telephone: s.phone,
  email: s.email,
  foundingDate: s.established ? String(s.established) : undefined,
  founder: { '@id': `${SITE_URL}/#person` },
  address: postalAddress(s, locale),
  contactPoint: contactPoint(s),
  sameAs: sameAs(s),
});

export const localBusinessSchema = (s: SiteSettings, locale: Locale, areas: Area[] = []) => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: ts(s.name, locale),
  description: ts(s.defaultSeo.metaDescription, locale),
  url: SITE_URL,
  telephone: s.phone,
  email: s.email,
  priceRange: '₹₹',
  image: absoluteUrl('/og-image.png'),
  address: postalAddress(s, locale),
  ...(s.geo && { geo: { '@type': 'GeoCoordinates', latitude: s.geo.lat, longitude: s.geo.lng } }),
  hasMap: s.mapDirectionsUrl,
  openingHours: 'Mo-Su 08:00-20:00',
  areaServed: areas.map((a) => ({ '@type': 'Place', name: `${a.name.en}, ${s.address.city}` })),
  sameAs: sameAs(s),
  // Only output a rating when real review numbers have been entered.
  ...(s.rating?.count && {
    aggregateRating: { '@type': 'AggregateRating', ratingValue: s.rating.value, reviewCount: s.rating.count, bestRating: 5 },
  }),
});

export const personSchema = (s: SiteSettings, locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: ts(s.astrologerName, locale),
  jobTitle: 'Vedic Astrologer',
  worksFor: { '@id': `${SITE_URL}/#organization` },
  url: absoluteUrl(href(locale, '/about/')),
  knowsLanguage: ['kn', 'en', 'hi', 'te'],
  knowsAbout: ['Vedic Astrology', 'Jyotisha', 'Kundli Matching', 'Vastu Shastra', 'Muhurta'],
});

export const websiteSchema = (s: SiteSettings, locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: ts(s.name, locale),
  inLanguage: htmlLang[locale],
  publisher: { '@id': `${SITE_URL}/#organization` },
});

export const serviceSchema = (service: Service, locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: ts(service.title, locale),
  description: ts(service.shortDescription, locale),
  serviceType: service.title.en,
  provider: { '@id': `${SITE_URL}/#localbusiness` },
  url: absoluteUrl(href(locale, `/services/${service.slug}/`)),
  image: imageUrl(service.heroImage, 1200),
});

export const faqSchema = (faqs: Faq[], locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: ts(f.question, locale),
    acceptedAnswer: { '@type': 'Answer', text: ts(f.answer, locale) },
  })),
});

export const articleSchema = (post: Post, s: SiteSettings, locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: ts(post.title, locale),
  description: ts(post.excerpt, locale),
  image: imageUrl(post.coverImage, 1200) ? [imageUrl(post.coverImage, 1200)] : undefined,
  datePublished: post.publishedAt,
  dateModified: post._updatedAt ?? post.publishedAt,
  inLanguage: htmlLang[locale],
  articleSection: post.category ? ts(post.category.title, locale) : undefined,
  author: { '@id': `${SITE_URL}/#person` },
  publisher: { '@id': `${SITE_URL}/#organization` },
  mainEntityOfPage: absoluteUrl(href(locale, `/blog/${post.slug}/`)),
});

/** About page: tells Google the page is a profile of the astrologer (the #person node). */
export const profilePageSchema = (locale: Locale, portrait?: ImageRef) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: absoluteUrl(href(locale, '/about/')),
  inLanguage: htmlLang[locale],
  mainEntity: { '@id': `${SITE_URL}/#person`, image: imageUrl(portrait, 800) },
});

/** Contact page: points at the business node, which carries the NAP details. */
export const contactPageSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: absoluteUrl(href(locale, '/contact/')),
  inLanguage: htmlLang[locale],
  mainEntity: { '@id': `${SITE_URL}/#localbusiness` },
});

/** Area landing pages: the consultation, offered by the business, in that locality. */
export const areaServiceSchema = (area: Area, s: SiteSettings, locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `${ui(locale).areas.heading(ts(area.name, locale))}, ${s.address.city}`,
  description: ts(area.intro, locale),
  serviceType: 'Vedic astrology consultation',
  provider: { '@id': `${SITE_URL}/#localbusiness` },
  areaServed: {
    '@type': 'Place',
    name: `${area.name.en}, ${s.address.city}`,
    containedInPlace: { '@type': 'City', name: s.address.city },
  },
  url: absoluteUrl(href(locale, `/best-astrologer-in/${area.slug}/`)),
});

/** Pujas page: each puja as a service the business performs. */
export const pujaListSchema = (pujas: Puja[], locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  url: absoluteUrl(href(locale, '/pujas/')),
  itemListElement: pujas.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: ts(p.title, locale),
      description: ts(p.description, locale),
      serviceType: 'Puja',
      provider: { '@id': `${SITE_URL}/#localbusiness` },
      image: imageUrl(p.image, 1200),
    },
  })),
});

export const breadcrumbSchema = (items: { label: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.label, item: absoluteUrl(item.href) })),
});

export const reviewsSchema = (testimonials: Testimonial[], locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: testimonials.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      author: { '@type': 'Person', name: r.name },
      reviewBody: ts(r.text, locale),
      datePublished: r.date,
      itemReviewed: { '@id': `${SITE_URL}/#localbusiness` },
    },
  })),
});
