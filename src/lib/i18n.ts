/**
 * Everything to do with the two site languages.
 *
 * - `t(field, locale)` picks the right language out of a content field and
 *   falls back to English when Kannada hasn't been written yet.
 * - `href(locale, path)` builds an internal link (English has no prefix).
 * - `ui` holds the fixed interface strings (buttons, labels) for both languages.
 */
import type { Locale, Localized } from '@/types/content';

export const LOCALES: Locale[] = ['en', 'kn'];
export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
  (LOCALES as string[]).includes(value);

export function t<T>(field: Localized<T> | undefined, locale: Locale): T | undefined {
  if (!field) return undefined;
  const value = field[locale];
  const empty = value === undefined || value === null || (Array.isArray(value) && value.length === 0) || value === '';
  return empty ? field.en : value;
}

/** Same as `t` but always returns a string (never undefined). */
export const ts = (field: Localized<string> | undefined, locale: Locale) => t(field, locale) ?? '';

/** `href('kn', '/about/')` → `/kn/about/`; English paths are left as-is. */
export function href(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return locale === 'en' ? withSlash : `/kn${withSlash === '/' ? '/' : withSlash}`;
}

/** Turns any current pathname into the same page in the other language. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const withoutPrefix = pathname.replace(/^\/(kn|en)(?=\/|$)/, '') || '/';
  return href(target, withoutPrefix);
}

export const htmlLang: Record<Locale, string> = { en: 'en-IN', kn: 'kn-IN' };
export const ogLocale: Record<Locale, string> = { en: 'en_IN', kn: 'kn_IN' };

export function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(htmlLang[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const dictionary = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      pujas: 'Pujas',
      blog: 'Blog',
      gallery: 'Gallery',
      testimonials: 'Testimonials',
      contact: 'Contact',
      faq: 'FAQ',
      areas: 'Areas we serve',
    },
    cta: {
      book: 'Book a consultation',
      bookShort: 'Book',
      whatsapp: 'WhatsApp',
      call: 'Call',
      callNow: 'Call now',
      readMore: 'Read more',
      viewAll: 'View all',
      allServices: 'All services',
      allPosts: 'All articles',
      allPujas: 'All pujas',
      allQuestions: 'All questions',
      allTestimonials: 'Read all reviews',
      aboutGuruji: 'About the centre',
      askOnWhatsapp: 'Ask on WhatsApp',
      enquire: 'Enquire on WhatsApp',
      directions: 'Get directions',
      mapPreview: 'Preview map',
      send: 'Send enquiry',
    },
    whatsappGreeting: 'Namaskara, I would like to book a consultation.',
    whatsappAbout: (topic: string) => `Namaskara, I would like to know more about ${topic}.`,
    home: {
      services: 'Guidance for life’s questions',
      servicesSub: 'Explore traditional approaches to the questions of life. Service offerings await client approval.',
      why: 'Why families trust us',
      pujas: 'Pujas & homas',
      pujasSub: 'An introduction to sacred rituals. Availability and arrangements are awaiting confirmation.',
      testimonials: 'Words from those we have guided',
      blog: 'From the journal',
      faq: 'Questions people ask',
      faqAsk: 'A few things to know before planning your consultation.',
    },
    service: {
      process: 'How the consultation works',
      whySeek: 'People usually come to us for',
      faq: 'Frequently asked questions',
      related: 'Further reading',
      sidebarTitle: 'Explore a consultation',
      sidebarText: 'Consultation formats and booking details are being confirmed. Visit Contact for updates.',
    },
    blog: {
      title: 'Journal',
      intro: 'Plain-language articles on Vedic astrology, doshas, Vastu and remedies.',
      featured: 'Featured',
      all: 'All',
      minRead: 'min read',
      by: 'By',
      onThisPage: 'On this page',
      related: 'Related services',
      englishOnly: 'This article is currently available in English only.',
      empty: 'No articles yet.',
      newer: 'Newer',
      older: 'Older',
    },
    contact: {
      title: 'Visit or write to us',
      formTitle: 'Send an enquiry',
      name: 'Your name',
      phone: 'Phone / WhatsApp',
      email: 'Email (optional)',
      dob: 'Date of birth',
      tob: 'Time of birth',
      pob: 'Place of birth',
      message: 'What would you like to discuss?',
      sent: 'Thank you. We will call you back shortly.',
      error: 'Something went wrong. Please WhatsApp us instead.',
      hours: 'Consultation hours',
      address: 'Address',
      showMap: 'Show map',
      birthNote: 'Booking instructions will be available once confirmed.',
    },
    footer: {
      explore: 'Explore',
      services: 'Services',
      reach: 'Reach us',
      disclaimer: 'Astrology offers guidance, not guarantees. Please continue any medical, legal or financial advice you are receiving.',
      rights: 'All rights reserved.',
      madeBy: 'Made by',
      nearYou: 'Astrologer near you',
      legal: { privacy: 'Privacy policy', terms: 'Terms of use', disclaimer: 'Disclaimer' },
    },
    areas: {
      title: 'Areas we serve',
      intro: 'Service locations and consultation formats are awaiting confirmation.',
      heading: (area: string) => `Astrologer in ${area}`,
      nearby: 'Also serving nearby',
    },
    notFound: { title: 'This page has drifted out of orbit', text: 'The page you are looking for does not exist or has moved.', back: 'Back to home' },
    /** Page descriptions for Google (aim for 120–160 characters). */
    meta: {
      blog: 'Plain-language articles on Vedic astrology, doshas, Vastu and remedies, provided as sample editorial content to help you understand your chart and decide calmly.',
      faq: 'Answers to common questions about consultations with the centre: appointments, phone and video readings, languages, and which birth details to bring.',
      testimonials: (place: string) => `What families from ${place} and beyond say about their kundli readings, marriage matching, Vastu visits and pujas with the centre.`,
      gallery: (place: string) => `Photos and videos from the centre in ${place}: pujas, homas, consultations and festivals performed with the centre.`,
      consult: (place: string) => `Consultations in ${place}, in person, by phone or on video.`,
      pujas: 'Navagraha Shanti, Ganapathi Homa, Mrityunjaya Homa and more, performed with full Vedic procedure at the centre or on your behalf. Enquire on WhatsApp.',
    },
    language: 'ಕನ್ನಡ',
    menu: 'Menu',
    close: 'Close',
    breadcrumbHome: 'Home',
    skipToContent: 'Skip to content',
    backToTop: 'Back to top',
    yearsSuffix: 'years of practice',
  },
  kn: {
    nav: {
      home: 'ಮುಖಪುಟ',
      about: 'ನಮ್ಮ ಬಗ್ಗೆ',
      services: 'ಸೇವೆಗಳು',
      pujas: 'ಪೂಜೆಗಳು',
      blog: 'ಲೇಖನಗಳು',
      gallery: 'ಗ್ಯಾಲರಿ',
      testimonials: 'ಅನುಭವಗಳು',
      contact: 'ಸಂಪರ್ಕ',
      faq: 'ಪ್ರಶ್ನೋತ್ತರ',
      areas: 'ನಾವು ಸೇವೆ ನೀಡುವ ಪ್ರದೇಶಗಳು',
    },
    cta: {
      book: 'ಸಮಾಲೋಚನೆ ಬುಕ್ ಮಾಡಿ',
      bookShort: 'ಬುಕ್ ಮಾಡಿ',
      whatsapp: 'ವಾಟ್ಸಾಪ್',
      call: 'ಕರೆ',
      callNow: 'ಈಗಲೇ ಕರೆ ಮಾಡಿ',
      readMore: 'ಮುಂದೆ ಓದಿ',
      viewAll: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
      allServices: 'ಎಲ್ಲಾ ಸೇವೆಗಳು',
      allPosts: 'ಎಲ್ಲಾ ಲೇಖನಗಳು',
      allPujas: 'ಎಲ್ಲಾ ಪೂಜೆಗಳು',
      allQuestions: 'ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳು',
      allTestimonials: 'ಎಲ್ಲಾ ಅನುಭವಗಳನ್ನು ಓದಿ',
      aboutGuruji: 'ಕೇಂದ್ರದ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು',
      askOnWhatsapp: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕೇಳಿ',
      enquire: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ವಿಚಾರಿಸಿ',
      directions: 'ದಾರಿ ತೋರಿಸಿ',
      mapPreview: '\u0ca8\u0c95\u0ccd\u0cb7\u0cc6 \u0cae\u0cc1\u0ca8\u0ccd\u0ca8\u0ccb\u0c9f',
      send: 'ವಿಚಾರಣೆ ಕಳುಹಿಸಿ',
    },
    whatsappGreeting: 'ನಮಸ್ಕಾರ, ನಾನು ಸಮಾಲೋಚನೆ ಬುಕ್ ಮಾಡಲು ಬಯಸುತ್ತೇನೆ.',
    whatsappAbout: (topic: string) => `ನಮಸ್ಕಾರ, ${topic} ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಬೇಕು.`,
    home: {
      services: 'ಜೀವನದ ಪ್ರಶ್ನೆಗಳಿಗೆ ಮಾರ್ಗದರ್ಶನ',
      servicesSub: 'ಜೀವನದ ಪ್ರಶ್ನೆಗಳಿಗೆ ಪಾರಂಪರಿಕ ವಿಧಾನಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ಸೇವೆಗಳು ಅನುಮೋದನೆಗೆ ಒಳಪಟ್ಟಿವೆ.',
      why: 'ಕುಟುಂಬಗಳು ನಮ್ಮನ್ನು ಏಕೆ ನಂಬುತ್ತವೆ',
      pujas: 'ಪೂಜೆ ಮತ್ತು ಹೋಮಗಳು',
      pujasSub: 'ಪವಿತ್ರ ಆಚರಣೆಗಳ ಪರಿಚಯ. ಲಭ್ಯತೆ ಮತ್ತು ವ್ಯವಸ್ಥೆಗಳ ದೃಢೀಕರಣಕ್ಕಾಗಿ ನಿರೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ.',
      testimonials: 'ನಾವು ಮಾರ್ಗದರ್ಶನ ನೀಡಿದವರ ಮಾತುಗಳು',
      blog: 'ಲೇಖನಗಳಿಂದ',
      faq: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು',
      faqAsk: 'ಸಮಾಲೋಚನೆಯನ್ನು ಯೋಜಿಸುವ ಮೊದಲು ತಿಳಿಯಬೇಕಾದ ಕೆಲವು ವಿಷಯಗಳು.',
    },
    service: {
      process: 'ಸಮಾಲೋಚನೆ ಹೇಗೆ ನಡೆಯುತ್ತದೆ',
      whySeek: 'ಜನರು ಸಾಮಾನ್ಯವಾಗಿ ಈ ಕಾರಣಗಳಿಗೆ ಬರುತ್ತಾರೆ',
      faq: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು',
      related: 'ಹೆಚ್ಚಿನ ಓದು',
      sidebarTitle: 'ಸಮಾಲೋಚನೆಯ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ',
      sidebarText: 'ಸಮಾಲೋಚನಾ ವಿಧಾನಗಳು ಮತ್ತು ಬುಕಿಂಗ್ ವಿವರಗಳನ್ನು ದೃಢೀಕರಿಸಲಾಗುತ್ತಿದೆ. ಮಾಹಿತಿಗಾಗಿ ಸಂಪರ್ಕ ಪುಟವನ್ನು ನೋಡಿ.',
    },
    blog: {
      title: 'ಲೇಖನಗಳು',
      intro: 'ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ, ದೋಷಗಳು, ವಾಸ್ತು ಮತ್ತು ಪರಿಹಾರಗಳ ಕುರಿತು ಸರಳ ಲೇಖನಗಳು.',
      featured: 'ವಿಶೇಷ ಲೇಖನ',
      all: 'ಎಲ್ಲಾ',
      minRead: 'ನಿಮಿಷ ಓದು',
      by: 'ಲೇಖಕರು',
      onThisPage: 'ಈ ಪುಟದಲ್ಲಿ',
      related: 'ಸಂಬಂಧಿತ ಸೇವೆಗಳು',
      englishOnly: 'ಈ ಲೇಖನ ಸದ್ಯಕ್ಕೆ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತ್ರ ಲಭ್ಯವಿದೆ.',
      empty: 'ಇನ್ನೂ ಯಾವುದೇ ಲೇಖನಗಳಿಲ್ಲ.',
      newer: 'ಹೊಸದು',
      older: 'ಹಳೆಯದು',
    },
    contact: {
      title: 'ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ ಅಥವಾ ಬರೆಯಿರಿ',
      formTitle: 'ವಿಚಾರಣೆ ಕಳುಹಿಸಿ',
      name: 'ನಿಮ್ಮ ಹೆಸರು',
      phone: 'ಫೋನ್ / ವಾಟ್ಸಾಪ್',
      email: 'ಇಮೇಲ್ (ಐಚ್ಛಿಕ)',
      dob: 'ಜನ್ಮ ದಿನಾಂಕ',
      tob: 'ಜನ್ಮ ಸಮಯ',
      pob: 'ಜನ್ಮ ಸ್ಥಳ',
      message: 'ಗುರೂಜಿ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
      sent: 'ಧನ್ಯವಾದಗಳು. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಕರೆ ಮಾಡುತ್ತೇವೆ.',
      error: 'ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ವಾಟ್ಸಾಪ್ ಮಾಡಿ.',
      hours: 'ಸಮಾಲೋಚನೆ ಸಮಯ',
      address: 'ವಿಳಾಸ',
      showMap: 'ನಕ್ಷೆ ತೋರಿಸಿ',
      birthNote: 'ಜನ್ಮ ವಿವರಗಳು ಕರೆಗೂ ಮೊದಲು ಕುಂಡಲಿ ಸಿದ್ಧಪಡಿಸಲು ಸಹಾಯಕ.',
    },
    footer: {
      explore: 'ಅನ್ವೇಷಿಸಿ',
      services: 'ಸೇವೆಗಳು',
      reach: 'ಸಂಪರ್ಕಿಸಿ',
      disclaimer: 'ಜ್ಯೋತಿಷ್ಯ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ, ಖಾತರಿಯಲ್ಲ. ವೈದ್ಯಕೀಯ, ಕಾನೂನು ಅಥವಾ ಆರ್ಥಿಕ ಸಲಹೆಯನ್ನು ಮುಂದುವರಿಸಿ.',
      rights: 'ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
      madeBy: 'ನಿರ್ಮಿಸಿದವರು:',
      nearYou: 'ನಿಮ್ಮ ಸಮೀಪದ ಜ್ಯೋತಿಷಿ',
      legal: { privacy: 'ಗೌಪ್ಯತಾ ನೀತಿ', terms: 'ಬಳಕೆಯ ನಿಯಮಗಳು', disclaimer: 'ಹಕ್ಕುತ್ಯಾಗ' },
    },
    areas: {
      title: 'ನಾವು ಸೇವೆ ನೀಡುವ ಪ್ರದೇಶಗಳು',
      intro: 'ಬೆಂಗಳೂರಿನಾದ್ಯಂತದಿಂದ ಜನರು ಕೇಂದ್ರಕ್ಕೆ ಬರುತ್ತಾರೆ. ಫೋನ್ ಮತ್ತು ವಿಡಿಯೋ ಮೂಲಕವೂ ಸಮಾಲೋಚನೆ ಲಭ್ಯ.',
      heading: (area: string) => `${area} ಜ್ಯೋತಿಷಿ`,
      nearby: 'ಹತ್ತಿರದ ಪ್ರದೇಶಗಳು',
    },
    notFound: { title: 'ಈ ಪುಟ ಕಕ್ಷೆಯಿಂದ ಹೊರಹೋಗಿದೆ', text: 'ನೀವು ಹುಡುಕುತ್ತಿರುವ ಪುಟ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ ಅಥವಾ ಸ್ಥಳಾಂತರಗೊಂಡಿದೆ.', back: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' },
    meta: {
      blog: 'ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ, ದೋಷಗಳು, ವಾಸ್ತು ಮತ್ತು ಪರಿಹಾರಗಳ ಕುರಿತು ಗುರೂಜಿಯವರ ಸರಳ ಲೇಖನಗಳು: ನಿಮ್ಮ ಕುಂಡಲಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡು ಶಾಂತವಾಗಿ ನಿರ್ಧರಿಸಲು.',
      faq: 'ಗುರೂಜಿಯವರ ಸಮಾಲೋಚನೆಯ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರ: ಸಮಯ ನಿಗದಿ, ಫೋನ್ ಮತ್ತು ವಿಡಿಯೋ ಸಮಾಲೋಚನೆ, ಭಾಷೆಗಳು ಮತ್ತು ಬೇಕಾದ ಜನ್ಮ ವಿವರಗಳು.',
      testimonials: (place: string) => `${place} ಮತ್ತು ಇತರೆಡೆಯ ಕುಟುಂಬಗಳು ಜಾತಕ ವಿಶ್ಲೇಷಣೆ, ವಿವಾಹ ಹೊಂದಾಣಿಕೆ, ವಾಸ್ತು ಮತ್ತು ಪೂಜೆಗಳ ಬಗ್ಗೆ ಹೇಳಿದ ಮಾತುಗಳು.`,
      gallery: (place: string) => `${place}ನ ಕೇಂದ್ರದ ಚಿತ್ರಗಳು ಮತ್ತು ವಿಡಿಯೋಗಳು: ಪೂಜೆ, ಹೋಮ, ಸಮಾಲೋಚನೆ ಮತ್ತು ಹಬ್ಬಗಳು.`,
      consult: (place: string) => `${place}ನಲ್ಲಿ ನೇರವಾಗಿ, ಫೋನ್ ಅಥವಾ ವಿಡಿಯೋ ಮೂಲಕ ಸಮಾಲೋಚನೆ.`,
      pujas: 'ನವಗ್ರಹ ಶಾಂತಿ, ಗಣಪತಿ ಹೋಮ, ಮೃತ್ಯುಂಜಯ ಹೋಮ ಮತ್ತು ಇನ್ನಷ್ಟು: ಸಂಪೂರ್ಣ ವೈದಿಕ ವಿಧಾನದಲ್ಲಿ ಕೇಂದ್ರದಲ್ಲಿ ಅಥವಾ ನಿಮ್ಮ ಪರವಾಗಿ. ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ವಿಚಾರಿಸಿ.',
    },
    language: 'English',
    menu: 'ಮೆನು',
    close: 'ಮುಚ್ಚಿ',
    breadcrumbHome: 'ಮುಖಪುಟ',
    skipToContent: 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
    backToTop: 'ಮೇಲಕ್ಕೆ ಹೋಗಿ',
    yearsSuffix: 'ವರ್ಷಗಳ ಅನುಭವ',
  },
} as const;

export type Dictionary = (typeof dictionary)['en'];
export const ui = (locale: Locale): Dictionary => dictionary[locale] as unknown as Dictionary;

/** Reads the locale out of a page's `params` (every page lives under `[locale]`). */
export const localeFrom = async (params: Promise<{ locale: string }>): Promise<Locale> => {
  const { locale } = await params;
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
};
