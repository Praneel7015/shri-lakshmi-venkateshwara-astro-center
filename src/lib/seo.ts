/**
 * Structured data (JSON-LD) builders, ported from the Vishwanath Guruji
 * project. Each returns a plain object; render it with <JsonLd data={...} />.
 * All business details come from Site Settings in the Studio, so the client
 * keeps one source of truth for name, address and phone (NAP).
 */
import type { Area, Faq, Locale, Post, Service, SiteSettings, Testimonial } from '@/types/content';
import { href, htmlLang, ts } from './i18n';
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
