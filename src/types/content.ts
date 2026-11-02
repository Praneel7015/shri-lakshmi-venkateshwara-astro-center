/**
 * Shapes of the content that comes out of Sanity (or the sample content in
 * `src/content/sample.ts`). These mirror the schemas in `studio/schemas/`,
 * field for field. If you add a field in the Studio, add it here too.
 */
import type { PortableTextBlock } from '@portabletext/react';

export type Locale = 'en' | 'kn';

/** A field translated into both site languages. Kannada is optional. */
export type Localized<T> = { en: T; kn?: T };

export type LString = Localized<string>;
export type LText = Localized<string>;
export type LBlocks = Localized<PortableTextBlock[]>;

/** A Sanity image (asset reference) or, for sample content, a plain URL. */
export interface ImageRef {
  asset?: { _ref: string };
  /** Only used by sample content / local images in /public. */
  src?: string;
  alt?: LString;
  hotspot?: { x: number; y: number };
}

export interface Seo {
  metaTitle?: LString;
  metaDescription?: LText;
  ogImage?: ImageRef;
  noIndex?: boolean;
}

export interface Faq {
  question: LString;
  answer: LText;
}

export interface SiteSettings {
  name: LString;
  astrologerName: LString;
  tagline: LString;
  phone: string;
  /** Digits only with country code, e.g. 919000000000 */
  whatsapp: string;
  email: string;
  address: {
    street: LString;
    locality: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo?: { lat: number; lng: number };
  hours: LString;
  mapEmbedUrl?: string;
  mapDirectionsUrl?: string;
  established?: number;
  socials: { instagram?: string; facebook?: string; youtube?: string; x?: string };
  logo?: ImageRef;
  defaultSeo: Seo;
  /** Only fill with real numbers from Google reviews. */
  rating?: { value: number; count: number; sourceUrl?: string };
  verification?: { google?: string; bing?: string };
  /** Marketing tags, set by the client's marketing team in Site settings → Tracking & ads. */
  tracking?: { gtmId?: string; googleTagIds?: string[] };
  keywords?: string[];
}

/** "Page headings & text" in the Studio. Every field is optional. */
type Opt = { en?: string; kn?: string };
type Section = { title?: Opt; intro?: Opt };
export interface SiteText {
  services?: Section;
  why?: Section;
  pujas?: Section;
  pujasShloka?: string;
  testimonials?: Section;
  blog?: Section;
  faq?: Section;
  contact?: Section;
  consultation?: Section;
  ctaBand?: Section;
  areas?: Section;
  disclaimer?: Opt;
}

export interface HeroSlide {
  eyebrow: LString;
  heading: LString;
  text: LText;
  image?: ImageRef;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: LString;
}

export interface Reason {
  title: LString;
  text: LText;
}

export interface HomePage {
  hero: HeroSlide[];
  intro: { heading: LString; text: LText; image?: ImageRef };
  stats: Stat[];
  reasons: Reason[];
  message: { heading: LString; quote: LText; image?: ImageRef };
  featuredServices: ServiceSummary[];
  featuredTestimonials: Testimonial[];
  faqs: Faq[];
  seo?: Seo;
}

export interface AboutPage {
  heading: LString;
  intro: LText;
  portrait?: ImageRef;
  biography: LBlocks;
  credentials: { title: LString; text: LText }[];
  mission: LText;
  gallery: ImageRef[];
  seo?: Seo;
}

export interface ServiceSummary {
  slug: string;
  title: LString;
  shortDescription: LText;
  icon?: string;
  heroImage?: ImageRef;
  /** Last edit in the Studio; feeds the sitemap's lastmod. */
  _updatedAt?: string;
}

export interface Service extends ServiceSummary {
  body: LBlocks;
  process: { title: LString; text: LText }[];
  whySeek: LString[];
  faqs: Faq[];
  relatedPosts: PostSummary[];
  seo?: Seo;
}

export interface Puja {
  slug: string;
  title: LString;
  deity?: LString;
  description: LText;
  benefits: LString[];
  duration?: LString;
  image?: ImageRef;
}

export interface Category {
  slug: string;
  title: LString;
}

export interface Author {
  name: LString;
  role: LString;
  bio: LText;
  image?: ImageRef;
}

export interface PostSummary {
  slug: string;
  title: LString;
  excerpt: LText;
  coverImage?: ImageRef;
  category?: Category;
  publishedAt: string;
  /** True when a Kannada body has been written. */
  hasKannada?: boolean;
  _updatedAt?: string;
}

export interface Post extends PostSummary {
  body: LBlocks;
  author?: Author;
  faqs: Faq[];
  relatedServices: ServiceSummary[];
  seo?: Seo;
}

export interface Testimonial {
  name: string;
  city?: string;
  text: LText;
  rating: number;
  service?: LString;
  youtubeUrl?: string;
  date?: string;
}

export interface GalleryItem {
  image?: ImageRef;
  caption?: LString;
  youtubeUrl?: string;
}

export interface Area {
  slug: string;
  name: LString;
  intro: LText;
  landmarks?: LString;
  nearby: string[];
  faqs: Faq[];
  _updatedAt?: string;
}

export interface LegalPage {
  slug: string;
  title: LString;
  body: LBlocks;
  _updatedAt?: string;
}
