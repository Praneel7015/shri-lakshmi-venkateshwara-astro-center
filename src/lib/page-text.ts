/**
 * Headings and short intros used around the site, in one language.
 *
 * Each value comes from "Page headings & text" in the Studio when the editor
 * has filled it in, otherwise from the built-in wording in `ui()` (i18n.ts).
 * Kannada is handled on its own: an empty Kannada box falls back to the
 * built-in Kannada wording, never to the English the editor typed.
 */
import { cache } from 'react';
import type { Locale } from '@/types/content';
import { getSiteText } from './content';
import { ui } from './i18n';

const DEFAULT_SHLOKA = 'ॐ सर्वे भवन्तु सुखिनः · सर्वे सन्तु निरामयाः';

export const getPageText = cache(async (locale: Locale) => {
  const text = await getSiteText();
  const d = ui(locale);
  const pick = (field: { en?: string; kn?: string } | undefined, fallback: string) => field?.[locale]?.trim() || fallback;

  return {
    services: { title: pick(text.services?.title, d.home.services), intro: pick(text.services?.intro, d.home.servicesSub) },
    why: { title: pick(text.why?.title, d.home.why) },
    pujas: { title: pick(text.pujas?.title, d.home.pujas), intro: pick(text.pujas?.intro, d.home.pujasSub), shloka: text.pujasShloka?.trim() || DEFAULT_SHLOKA },
    testimonials: { title: pick(text.testimonials?.title, d.home.testimonials) },
    blog: { title: pick(text.blog?.title, d.blog.title), intro: pick(text.blog?.intro, d.blog.intro), homeTitle: pick(text.blog?.title, d.home.blog) },
    faq: { title: pick(text.faq?.title, d.home.faq), intro: pick(text.faq?.intro, d.home.faqAsk) },
    contact: { title: pick(text.contact?.title, d.contact.title), intro: pick(text.contact?.intro, locale === 'kn' ? 'ನಿಮ್ಮನ್ನು ಸ್ವಾಗತಿಸಲು ಎದುರು ನೋಡುತ್ತಿದ್ದೇವೆ.' : 'We look forward to welcoming you.') },
    consultation: { title: pick(text.consultation?.title, locale === 'kn' ? 'ಸಮಾಲೋಚನೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ' : 'Request a consultation'), intro: pick(text.consultation?.intro, locale === 'kn' ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಮತ್ತು ಸಮಾಲೋಚನೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.' : 'Share your question and get in touch to discuss a consultation.') },
    ctaBand: { title: pick(text.ctaBand?.title, locale === 'kn' ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳೊಂದಿಗೆ ಆರಂಭಿಸಿ.' : 'Begin with what’s on your mind.'), intro: pick(text.ctaBand?.intro, locale === 'kn' ? 'ಸಮಾಲೋಚನೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.' : 'Get in touch to discuss a consultation.') },
    homeLabels: {
      specialties: pick(text.homeLabels?.specialties, locale === 'kn' ? 'ಜ್ಯೋತಿಷ್ಯ · ವಾಸ್ತು · ಪೂಜೆ ಮತ್ತು ಹೋಮ' : 'Jyotisha · Vastu · Puja & Homa'),
      tradition: pick(text.homeLabels?.tradition, locale === 'kn' ? 'ಪರಂಪರೆಯಿಂದ ಪ್ರೇರಿತ' : 'Inspired by tradition'),
      languages: pick(text.homeLabels?.languages, locale === 'kn' ? 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಅನ್ವೇಷಿಸಿ' : 'Explore in English & Kannada'),
      nextChapter: pick(text.homeLabels?.nextChapter, locale === 'kn' ? 'ಮುಂದಿನ ಹೆಜ್ಜೆ' : 'YOUR NEXT CHAPTER'),
      appointment: pick(text.homeLabels?.appointment, locale === 'kn' ? 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ' : 'Book Appointment'),
    },
    areas: { title: pick(text.areas?.title, d.areas.title), intro: pick(text.areas?.intro, d.areas.intro) },
    disclaimer: pick(text.disclaimer, d.footer.disclaimer),
  };
});

export type PageText = Awaited<ReturnType<typeof getPageText>>;
