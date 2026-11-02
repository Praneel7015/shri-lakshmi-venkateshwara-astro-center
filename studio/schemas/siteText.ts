/**
 * "Page headings & text": the section headings and short intros used around
 * the site. Every field is optional. Leave one empty and the website uses its
 * built-in wording (shown in grey as the placeholder). Kannada is separate:
 * an empty Kannada box uses the built-in Kannada wording, not the English.
 */
import { defineField, defineType } from 'sanity';
import { TextIcon } from '@sanity/icons/Text';

const lang = (type: 'string' | 'text', en: string, kn: string) => [
  defineField({ name: 'en', title: 'English', type, placeholder: en, ...(type === 'text' && { rows: 2 }) }),
  defineField({ name: 'kn', title: 'ಕನ್ನಡ', type, placeholder: kn, ...(type === 'text' && { rows: 2 }) }),
];

/** A heading + optional intro, with the built-in wording as placeholders. */
const section = (name: string, title: string, d: { title: [string, string]; intro?: [string, string] }) =>
  defineField({
    name,
    title,
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
      defineField({ name: 'title', title: 'Heading', type: 'object', fields: lang('string', ...d.title) }),
      ...(d.intro ? [defineField({ name: 'intro', title: 'Intro', type: 'object', fields: lang('text', ...d.intro) })] : []),
    ],
  });

export const siteText = defineType({
  name: 'siteText',
  title: 'Page headings & text',
  type: 'document',
  icon: TextIcon,
  fields: [
    section('services', 'Services (home page + Services page)', {
      title: ['How Guruji can help', 'ಗುರೂಜಿ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲರು'],
      intro: ['Every consultation begins with your birth chart, read in person and explained in plain words.', 'ಪ್ರತಿ ಸಮಾಲೋಚನೆಯೂ ನಿಮ್ಮ ಜನ್ಮ ಕುಂಡಲಿಯಿಂದ ಆರಂಭವಾಗುತ್ತದೆ…'],
    }),
    section('why', '"Why choose us" (home page)', { title: ['Why families trust us', 'ಕುಟುಂಬಗಳು ನಮ್ಮನ್ನು ಏಕೆ ನಂಬುತ್ತವೆ'] }),
    section('pujas', 'Pujas (home page + Pujas page)', {
      title: ['Pujas & homas', 'ಪೂಜೆ ಮತ್ತು ಹೋಮಗಳು'],
      intro: ['Performed with full Vedic procedure at the centre, or on your behalf.', 'ಸಂಪೂರ್ಣ ವೈದಿಕ ವಿಧಾನದಲ್ಲಿ…'],
    }),
    defineField({
      name: 'pujasShloka',
      title: 'Shloka on the Pujas page',
      type: 'string',
      placeholder: 'ॐ सर्वे भवन्तु सुखिनः · सर्वे सन्तु निरामयाः',
    }),
    section('testimonials', 'Testimonials', { title: ['Words from those we have guided', 'ನಾವು ಮಾರ್ಗದರ್ಶನ ನೀಡಿದವರ ಮಾತುಗಳು'] }),
    section('blog', 'Blog', {
      title: ['Journal', 'ಲೇಖನಗಳು'],
      intro: ['Plain-language articles on Vedic astrology, doshas, Vastu and remedies.', 'ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ, ದೋಷಗಳು, ವಾಸ್ತು…'],
    }),
    section('faq', 'FAQ', {
      title: ['Questions people ask', 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು'],
      intro: ['Can’t find your question? Message us and Guruji’s office will reply, usually within a few hours.', 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಇಲ್ಲಿ ಇಲ್ಲವೇ?…'],
    }),
    section('contact', 'Contact page', { title: ['Visit or write to us', 'ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ ಅಥವಾ ಬರೆಯಿರಿ'], intro: ['We look forward to welcoming you.', 'ನಿಮ್ಮನ್ನು ಸ್ವಾಗತಿಸಲು ಎದುರು ನೋಡುತ್ತಿದ್ದೇವೆ.'] }),
    section('consultation', 'Home consultation section', { title: ['Request a consultation', 'ಸಮಾಲೋಚನೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ'], intro: ['Share your question and get in touch to discuss a consultation.', 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಮತ್ತು ಸಮಾಲೋಚನೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.'] }),
    section('ctaBand', 'Contact call to action', { title: ['Begin with what’s on your mind.', 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳೊಂದಿಗೆ ಆರಂಭಿಸಿ.'], intro: ['Get in touch to discuss a consultation.', 'ಸಮಾಲೋಚನೆಗಾಗಿ ಸಂಪರ್ಕಿಸಿ.'] }),
    defineField({ name: 'homeLabels', title: 'Homepage and navigation labels', type: 'object', options: { collapsible: true, collapsed: true }, fields: [
      defineField({ name: 'specialties', title: 'Specialties below hero buttons', type: 'object', fields: lang('string', 'Jyotisha · Vastu · Puja & Homa', 'ಜ್ಯೋತಿಷ್ಯ · ವಾಸ್ತು · ಪೂಜೆ ಮತ್ತು ಹೋಮ') }),
      defineField({ name: 'tradition', title: 'Hero footer: tradition', type: 'object', fields: lang('string', 'Inspired by tradition', 'ಪರಂಪರೆಯಿಂದ ಪ್ರೇರಿತ') }),
      defineField({ name: 'languages', title: 'Hero footer: languages', type: 'object', fields: lang('string', 'Explore in English & Kannada', 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಅನ್ವೇಷಿಸಿ') }),
      defineField({ name: 'nextChapter', title: 'Contact banner small heading', type: 'object', fields: lang('string', 'YOUR NEXT CHAPTER', 'ಮುಂದಿನ ಹೆಜ್ಜೆ') }),
      defineField({ name: 'appointment', title: 'Navigation appointment button', type: 'object', fields: lang('string', 'Book Appointment', 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ') }),
    ] }),
    section('areas', 'Areas we serve', {
      title: ['Areas we serve', 'ನಾವು ಸೇವೆ ನೀಡುವ ಪ್ರದೇಶಗಳು'],
      intro: ['Clients visit the centre from across Bengaluru. Consultations are also available over phone and video.', 'ಬೆಂಗಳೂರಿನಾದ್ಯಂತದಿಂದ…'],
    }),
    defineField({
      name: 'disclaimer',
      title: 'Footer disclaimer',
      type: 'object',
      fields: lang('text', 'Astrology offers guidance, not guarantees…', 'ಜ್ಯೋತಿಷ್ಯ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ, ಖಾತರಿಯಲ್ಲ…'),
    }),
  ],
  preview: { prepare: () => ({ title: 'Page headings & text' }) },
});
