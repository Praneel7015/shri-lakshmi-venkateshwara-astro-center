import type { Dictionary } from '@/lib/i18n';

/** Main menu. Paths are language-neutral; wrap them in `href(locale, path)`. */
export const mainNav = (d: Dictionary) => [
  { label: d.nav.about, path: '/about/' },
  { label: d.nav.services, path: '/services/', hasServices: true },
  { label: d.nav.pujas, path: '/pujas/' },
  { label: d.nav.blog, path: '/blog/' },
  { label: d.nav.contact, path: '/contact/' },
];

/** Extra links shown in the mobile menu and footer. */
export const secondaryNav = (d: Dictionary) => [
  { label: d.nav.gallery, path: '/gallery/' },
  { label: d.nav.faq, path: '/faq/' },
];

export const legalNav = (d: Dictionary) => [
  { label: d.footer.legal.privacy, path: '/privacy-policy/' },
  { label: d.footer.legal.terms, path: '/terms/' },
  { label: d.footer.legal.disclaimer, path: '/disclaimer/' },
];
