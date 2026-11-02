/**
 * SAMPLE CONTENT — placeholder copy used until Sanity is connected, and the
 * data `npm run seed` uploads into Sanity as a starting point.
 *
 * Every name, phone number and address here is a placeholder. Replace them
 * in the Studio (not here) once the client's real details are in.
 */
import type {
  AboutPage, Area, Category, Faq, GalleryItem, HomePage, LegalPage, LBlocks,
  Post, Puja, Service, SiteSettings, Testimonial,
} from '@/types/content';
import type { PortableTextBlock } from '@portabletext/react';

// ── Tiny helpers to write Portable Text by hand ────────────────────────
let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

const block = (text: string, style = 'normal'): PortableTextBlock => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
});
const p = (text: string) => block(text);
const h2 = (text: string) => block(text, 'h2');
const h3 = (text: string) => block(text, 'h3');
const callout = (text: string) => ({ _type: 'callout', _key: key(), text }) as unknown as PortableTextBlock;
const cta = (heading: string) => ({ _type: 'ctaBlock', _key: key(), heading }) as unknown as PortableTextBlock;
const bullets = (items: string[]): PortableTextBlock[] =>
  items.map((text) => ({ ...block(text), listItem: 'bullet', level: 1 }) as PortableTextBlock);
const en = (...blocks: (PortableTextBlock | PortableTextBlock[])[]): LBlocks => ({ en: blocks.flat() });

// ── Site settings ──────────────────────────────────────────────────────
const siteSettings: SiteSettings = {
  name: { en: 'Shri Lakshmi Venkateshwara Astro Center', kn: 'Shri Lakshmi Venkateshwara Astro Center' },
  astrologerName: { en: '', kn: '' },
  tagline: { en: 'Traditional wisdom. A clearer way forward.', kn: 'ಪಾರಂಪರಿಕ ಜ್ಞಾನ. ಸ್ಪಷ್ಟವಾದ ಮುಂದಿನ ಹೆಜ್ಜೆ.' },
  phone: '', whatsapp: '', email: '',
  address: { street: { en: '', kn: '' }, locality: '', city: '', region: '', postalCode: '', country: 'IN' },
  hours: { en: 'Contact details coming soon', kn: 'ಸಂಪರ್ಕ ವಿವರಗಳು ಶೀಘ್ರದಲ್ಲೇ' },
  socials: {},
  defaultSeo: {
    noIndex: true,
    metaTitle: { en: 'Shri Lakshmi Venkateshwara Astro Center', kn: 'Shri Lakshmi Venkateshwara Astro Center' },
    metaDescription: { en: 'A preview of our astrology centre. Explore traditional astrology, Vastu and puja services. Offerings await client approval.', kn: 'ನಮ್ಮ ಜ್ಯೋತಿಷ್ಯ ಕೇಂದ್ರದ ಮುನ್ನೋಟ. ಜ್ಯೋತಿಷ್ಯ, ವಾಸ್ತು ಮತ್ತು ಪೂಜಾ ಸೇವೆಗಳು ಅನುಮೋದನೆಗೆ ಒಳಪಟ್ಟಿವೆ.' },
  },
};

// ── Categories ─────────────────────────────────────────────────────────
const categories: Category[] = [
  { slug: 'vedic-astrology', title: { en: 'Vedic astrology', kn: 'ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ' } },
  { slug: 'marriage', title: { en: 'Marriage', kn: 'ವಿವಾಹ' } },
  { slug: 'vastu', title: { en: 'Vastu', kn: 'ವಾಸ್ತು' } },
  { slug: 'remedies', title: { en: 'Doshas & remedies', kn: 'ದೋಷ ಮತ್ತು ಪರಿಹಾರ' } },
];
const cat = (slug: string) => categories.find((c) => c.slug === slug)!;

// ── Services ───────────────────────────────────────────────────────────
const process = [
  { title: { en: 'Share your birth details', kn: 'ಜನ್ಮ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ' }, text: { en: 'Date, time and place of birth on WhatsApp or the enquiry form.', kn: 'ಜನ್ಮ ದಿನಾಂಕ, ಸಮಯ ಮತ್ತು ಸ್ಥಳವನ್ನು ವಾಟ್ಸಾಪ್ ಅಥವಾ ಫಾರ್ಮ್ ಮೂಲಕ ಕಳುಹಿಸಿ.' } },
  { title: { en: 'Chart preparation', kn: 'ಕುಂಡಲಿ ಸಿದ್ಧತೆ' }, text: { en: 'The practitioner prepares your Rashi, Navamsha and Dasha charts before you meet.', kn: 'ಭೇಟಿಗೂ ಮೊದಲು ಜ್ಯೋತಿಷಿಗಳು ನಿಮ್ಮ ರಾಶಿ, ನವಾಂಶ ಮತ್ತು ದಶಾ ಕುಂಡಲಿ ಸಿದ್ಧಪಡಿಸುತ್ತಾರೆ.' } },
  { title: { en: 'Consultation', kn: 'ಸಮಾಲೋಚನೆ' }, text: { en: 'An unhurried conversation in person, by phone or on video.', kn: 'ನೇರವಾಗಿ, ಫೋನ್ ಅಥವಾ ವಿಡಿಯೋ ಮೂಲಕ ನಿಧಾನವಾದ ಮಾತುಕತೆ.' } },
  { title: { en: 'Remedies & follow-up', kn: 'ಪರಿಹಾರ ಮತ್ತು ಅನುಸರಣೆ' }, text: { en: 'Simple, practical remedies and a follow-up call when you need it.', kn: 'ಸರಳ, ಪ್ರಾಯೋಗಿಕ ಪರಿಹಾರಗಳು ಮತ್ತು ಅಗತ್ಯವಿದ್ದಾಗ ಅನುಸರಣಾ ಕರೆ.' } },
];

type ServiceSeed = Omit<Service, 'relatedPosts' | 'process'> & { process?: Service['process'] };
const serviceSeeds: ServiceSeed[] = [
  {
    slug: 'kundli-reading',
    icon: 'ScrollText',
    title: { en: 'Kundli & Horoscope Reading', kn: 'ಜಾತಕ ಮತ್ತು ಕುಂಡಲಿ ವಿಶ್ಲೇಷಣೆ' },
    shortDescription: {
      en: 'A complete reading of your birth chart: strengths, timing and the road ahead.',
      kn: 'ನಿಮ್ಮ ಜನ್ಮ ಕುಂಡಲಿಯ ಸಂಪೂರ್ಣ ವಿಶ್ಲೇಷಣೆ: ಶಕ್ತಿ, ಕಾಲ ಮತ್ತು ಮುಂದಿನ ದಾರಿ.',
    },
    body: en(
      p('Your kundli is a map of the sky at the moment you were born. Read carefully, it shows the themes that run through your life: temperament, relationships, work, health and the periods when each comes into focus.'),
      h2('What the reading covers'),
      bullets(['Lagna, Moon sign and planetary strengths', 'Current and upcoming Mahadasha and Antardasha', 'Career, finances, marriage and family', 'Practical remedies where they are genuinely useful']),
      callout('Bring your exact time of birth if you have it. Even a 15-minute difference can change the Lagna.'),
    ),
    whySeek: [
      { en: 'Understanding a difficult phase', kn: 'ಕಠಿಣ ಸಮಯವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು' },
      { en: 'Planning the next five years', kn: 'ಮುಂದಿನ ಐದು ವರ್ಷಗಳ ಯೋಜನೆಗೆ' },
      { en: 'A second opinion on a chart', kn: 'ಕುಂಡಲಿಯ ಬಗ್ಗೆ ಎರಡನೇ ಅಭಿಪ್ರಾಯಕ್ಕೆ' },
      { en: "A child's first horoscope", kn: 'ಮಗುವಿನ ಮೊದಲ ಜಾತಕಕ್ಕೆ' },
    ],
    faqs: [
      { question: { en: 'What if I do not know my exact birth time?', kn: 'ನಿಖರ ಜನ್ಮ ಸಮಯ ಗೊತ್ತಿಲ್ಲದಿದ್ದರೆ?' }, answer: { en: 'The practitioner can rectify the birth time using key life events such as marriage, the birth of children or changes of job.', kn: 'ವಿವಾಹ, ಮಕ್ಕಳ ಜನನ, ಉದ್ಯೋಗ ಬದಲಾವಣೆಯಂತಹ ಘಟನೆಗಳಿಂದ ಜ್ಯೋತಿಷಿಗಳು ಜನ್ಮ ಸಮಯವನ್ನು ಸರಿಪಡಿಸಬಹುದು.' } },
      { question: { en: 'How long is a consultation?', kn: 'ಸಮಾಲೋಚನೆ ಎಷ್ಟು ಹೊತ್ತು?' }, answer: { en: 'Usually 45 to 60 minutes, with time for your questions.', kn: 'ಸಾಮಾನ್ಯವಾಗಿ ೪೫ ರಿಂದ ೬೦ ನಿಮಿಷ, ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೂ ಸಮಯವಿರುತ್ತದೆ.' } },
    ],
  },
  {
    slug: 'marriage-matching',
    icon: 'HeartHandshake',
    title: { en: 'Marriage & Kundli Matching', kn: 'ವಿವಾಹ ಮತ್ತು ಜಾತಕ ಹೊಂದಾಣಿಕೆ' },
    shortDescription: {
      en: 'Guna milan and a deeper compatibility reading for couples and families.',
      kn: 'ಗುಣ ಮಿಲನ ಮತ್ತು ದಂಪತಿಗಳಿಗೆ ಆಳವಾದ ಹೊಂದಾಣಿಕೆ ವಿಶ್ಲೇಷಣೆ.',
    },
    body: en(
      p('A guna score is only the starting point. The practitioner also looks at the 7th house, Venus and Jupiter, Mangal dosha in both charts and the dasha periods each partner is entering, so the family gets a complete picture.'),
      h2('When to consult'),
      bullets(['Before fixing an alliance', 'When marriage is being delayed', 'Choosing a muhurta for the wedding']),
    ),
    whySeek: [
      { en: 'Matching before an alliance', kn: 'ಸಂಬಂಧ ನಿಶ್ಚಯಕ್ಕೂ ಮೊದಲು ಹೊಂದಾಣಿಕೆ' },
      { en: 'Delay in marriage', kn: 'ವಿವಾಹ ವಿಳಂಬ' },
      { en: 'Mangal dosha questions', kn: 'ಮಂಗಳ ದೋಷದ ಪ್ರಶ್ನೆಗಳು' },
      { en: 'Wedding muhurta', kn: 'ವಿವಾಹ ಮುಹೂರ್ತ' },
    ],
    faqs: [
      { question: { en: 'Is 18 gunas enough?', kn: '೧೮ ಗುಣಗಳು ಸಾಕೇ?' }, answer: { en: 'It is the traditional minimum, but planetary compatibility matters as much as the score. The practitioner explains both.', kn: 'ಅದು ಸಾಂಪ್ರದಾಯಿಕ ಕನಿಷ್ಠ, ಆದರೆ ಗ್ರಹ ಹೊಂದಾಣಿಕೆಯೂ ಅಷ್ಟೇ ಮುಖ್ಯ. ಜ್ಯೋತಿಷಿಗಳು ಎರಡನ್ನೂ ವಿವರಿಸುತ್ತಾರೆ.' } },
    ],
  },
  {
    slug: 'career-business',
    icon: 'Briefcase',
    title: { en: 'Career & Business', kn: 'ಉದ್ಯೋಗ ಮತ್ತು ವ್ಯಾಪಾರ' },
    shortDescription: { en: 'Timing for job changes, promotions, partnerships and new ventures.', kn: 'ಉದ್ಯೋಗ ಬದಲಾವಣೆ, ಬಡ್ತಿ, ಪಾಲುದಾರಿಕೆ ಮತ್ತು ಹೊಸ ಉದ್ಯಮಗಳಿಗೆ ಸರಿಯಾದ ಸಮಯ.' },
    body: en(
      p('The 10th house, its lord and the running dasha show the kind of work that suits you and when change is favourable. For business owners, the practitioner also reviews partnership charts and auspicious dates for launches and agreements.'),
    ),
    whySeek: [
      { en: 'Should I change jobs?', kn: 'ಉದ್ಯೋಗ ಬದಲಾಯಿಸಬೇಕೇ?' },
      { en: 'Starting a business', kn: 'ವ್ಯಾಪಾರ ಆರಂಭ' },
      { en: 'Choosing a field of study', kn: 'ಅಧ್ಯಯನ ಕ್ಷೇತ್ರದ ಆಯ್ಕೆ' },
      { en: 'Partnership compatibility', kn: 'ಪಾಲುದಾರಿಕೆ ಹೊಂದಾಣಿಕೆ' },
    ],
    faqs: [],
  },
  {
    slug: 'vastu-shastra',
    icon: 'House',
    title: { en: 'Vastu Shastra', kn: 'ವಾಸ್ತು ಶಾಸ್ತ್ರ' },
    shortDescription: { en: 'Vastu for homes, offices and plots, without unnecessary demolition.', kn: 'ಮನೆ, ಕಚೇರಿ ಮತ್ತು ನಿವೇಶನಗಳಿಗೆ ವಾಸ್ತು, ಅನಗತ್ಯ ಕೆಡವುವಿಕೆ ಇಲ್ಲದೆ.' },
    body: en(
      p('Most Vastu imbalances can be corrected with changes to how rooms are used, where heavy furniture sits and simple placements. Site visits and remote review options are provisional and await confirmation.'),
      callout('Have a floor plan ready, with north marked, before the visit.'),
    ),
    whySeek: [
      { en: 'Buying a new home or plot', kn: 'ಹೊಸ ಮನೆ ಅಥವಾ ನಿವೇಶನ ಖರೀದಿ' },
      { en: 'Office or shop layout', kn: 'ಕಚೇರಿ ಅಥವಾ ಅಂಗಡಿ ವಿನ್ಯಾಸ' },
      { en: 'Griha pravesha', kn: 'ಗೃಹ ಪ್ರವೇಶ' },
      { en: 'Unrest at home', kn: 'ಮನೆಯಲ್ಲಿ ಅಶಾಂತಿ' },
    ],
    faqs: [
      { question: { en: 'Do you review plans online?', kn: 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ನಕ್ಷೆ ಪರಿಶೀಲಿಸುತ್ತೀರಾ?' }, answer: { en: 'Yes. Send the floor plan with north marked and the practitioner will review it on a video call.', kn: 'ಹೌದು. ಉತ್ತರ ದಿಕ್ಕು ಗುರುತಿಸಿದ ನಕ್ಷೆ ಕಳುಹಿಸಿ, ಜ್ಯೋತಿಷಿಗಳು ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.' } },
    ],
  },
  {
    slug: 'dosha-remedies',
    icon: 'Flame',
    title: { en: 'Dosha Nivarana', kn: 'ದೋಷ ನಿವಾರಣೆ' },
    shortDescription: { en: 'Mangal, Kaal Sarp, Pitru and Shani doshas, explained calmly and remedied simply.', kn: 'ಮಂಗಳ, ಕಾಳಸರ್ಪ, ಪಿತೃ ಮತ್ತು ಶನಿ ದೋಷಗಳು, ಶಾಂತವಾಗಿ ವಿವರಿಸಿ ಸರಳವಾಗಿ ಪರಿಹಾರ.' },
    body: en(
      p('Doshas are often described in frightening terms. In reality many are mild or cancelled by other factors in the chart. The practitioner first confirms whether a dosha is actually present and how strong it is, and only then suggests remedies such as japa, a specific puja or charity.'),
    ),
    whySeek: [
      { en: 'Told you have a dosha', kn: 'ದೋಷವಿದೆ ಎಂದು ಹೇಳಲಾಗಿದೆ' },
      { en: 'Sade Sati period', kn: 'ಸಾಡೇಸಾತಿ ಕಾಲ' },
      { en: 'Repeated obstacles', kn: 'ಮತ್ತೆ ಮತ್ತೆ ಅಡೆತಡೆಗಳು' },
      { en: 'Family ancestral rites', kn: 'ಪಿತೃ ಕಾರ್ಯಗಳು' },
    ],
    faqs: [],
  },
  {
    slug: 'gemstone-guidance',
    icon: 'Gem',
    title: { en: 'Gemstone Guidance', kn: 'ರತ್ನ ಮಾರ್ಗದರ್ಶನ' },
    shortDescription: { en: 'Which stone, if any, suits your chart, and how to wear it.', kn: 'ನಿಮ್ಮ ಕುಂಡಲಿಗೆ ಯಾವ ರತ್ನ ಸೂಕ್ತ ಮತ್ತು ಅದನ್ನು ಹೇಗೆ ಧರಿಸಬೇಕು.' },
    body: en(p('A gemstone strengthens a planet; it does not fix it. Wearing the wrong stone can do more harm than good, so the practitioner recommends stones only after a full chart reading, along with the right weight, metal, finger and day to begin.')),
    whySeek: [
      { en: 'Before buying a stone', kn: 'ರತ್ನ ಖರೀದಿಗೂ ಮೊದಲು' },
      { en: 'Checking a stone you wear', kn: 'ಧರಿಸಿರುವ ರತ್ನದ ಪರಿಶೀಲನೆ' },
    ],
    faqs: [],
  },
];

// ── Blog posts ─────────────────────────────────────────────────────────
const author = {
  name: { en: 'Preview editorial', kn: 'ಮುನ್ನೋಟ ಲೇಖನ' },
  role: { en: 'Sample article for client review', kn: 'ಪರಿಶೀಲನೆಗಾಗಿ ಮಾದರಿ ಲೇಖನ' },
  bio: { en: 'This article is sample educational content awaiting review and approval by the centre.', kn: 'ಈ ಮಾದರಿ ಶೈಕ್ಷಣಿಕ ಲೇಖನವು ಕೇಂದ್ರದ ಪರಿಶೀಲನೆ ಮತ್ತು ಅನುಮೋದನೆಗೆ ಒಳಪಟ್ಟಿದೆ.' },
};

const summaryOf = (slug: string) => {
  const s = serviceSeeds.find((x) => x.slug === slug)!;
  return { slug: s.slug, title: s.title, shortDescription: s.shortDescription, icon: s.icon };
};

const posts: Post[] = [
  {
    slug: 'vedic-astrology-beginners-guide',
    title: { en: 'A beginner’s guide to Vedic astrology' },
    excerpt: { en: 'A gentle introduction to birth charts, planetary periods and preparing for a consultation.' },
    category: cat('vedic-astrology'),
    publishedAt: '2026-10-01T09:00:00Z',
    author,
    body: en(
      p('Vedic astrology, or Jyotisha, is a tradition of interpreting the positions of celestial bodies in relation to a person’s birth. A consultation can be a chance to reflect on questions about work, relationships or personal goals.'),
      h2('Start with the birth chart'),
      p('A birth chart, also called a kundli, is prepared from the date, time and place of birth. Practitioners consider signs, houses and planetary placements together rather than relying on one feature alone.'),
      h2('What are planetary periods?'),
      p('Dasha systems divide life into periods associated with different planets. An astrologer may discuss these periods alongside the birth chart when considering a question.'),
      h2('Preparing for a reading'),
      p('Bring the most accurate birth details available and a few questions you would like to explore. Ask for explanations in plain language and take time to consider any suggestions.'),
      cta('Have a question about your birth chart?'),
    ),
    faqs: [],
    relatedServices: [summaryOf('kundli-reading')],
  },
  {
    slug: 'choosing-a-gemstone-questions-to-ask',
    title: { en: 'Gemstone guidance: questions to ask first' },
    excerpt: { en: 'A practical guide to discussing gemstones, costs and alternatives before making a decision.' },
    category: cat('remedies'),
    publishedAt: '2026-09-25T09:00:00Z',
    author,
    body: en(
      p('In some Jyotisha traditions, gemstones are associated with planets and may be discussed as a personal practice. Recommendations vary, so it helps to understand the reasoning before making a purchase.'),
      h2('Ask how the recommendation was made'),
      p('A practitioner may consider the whole birth chart and your question. Ask which tradition they use and why a particular stone is being suggested.'),
      h2('Consider your budget'),
      p('Ask about the full cost, the seller’s return policy and any independent certification. You can take time to compare options and decline a purchase.'),
      h2('Discuss alternatives'),
      p('If a stone does not feel right for you, ask whether there are other traditional practices to consider. A consultation should leave room for your own preferences.'),
      cta('Ask about gemstone guidance'),
    ),
    faqs: [],
    relatedServices: [summaryOf('gemstone-guidance')],
  },
  {
    slug: 'understanding-the-12-houses-in-your-kundli',
    title: { en: 'Understanding the 12 houses in your kundli', kn: 'ನಿಮ್ಮ ಕುಂಡಲಿಯ ೧೨ ಭಾವಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ' },
    excerpt: {
      en: 'Each house in a birth chart speaks to one area of life. Here is a plain-language guide to what each one means.',
      kn: 'ಜನ್ಮ ಕುಂಡಲಿಯ ಪ್ರತಿಯೊಂದು ಭಾವವೂ ಜೀವನದ ಒಂದು ಕ್ಷೇತ್ರವನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಪ್ರತಿಯೊಂದರ ಅರ್ಥಕ್ಕೆ ಸರಳ ಮಾರ್ಗದರ್ಶಿ.',
    },
    category: cat('vedic-astrology'),
    publishedAt: '2026-09-18T09:00:00Z',
    author,
    body: {
      en: [
        p('A kundli is divided into twelve houses, or bhavas. Each one governs a different part of life, and the planets sitting in them, along with the signs they fall in, colour how that part of life unfolds.'),
        h2('The houses of self: 1st, 5th and 9th'),
        p('The 1st house (Lagna) is you: body, temperament and how you meet the world. The 5th covers children, creativity and intelligence, and the 9th covers dharma, teachers and fortune.'),
        h2('The houses of wealth: 2nd, 6th and 10th'),
        p('The 2nd house shows family and accumulated wealth, the 6th daily work, health and competition, and the 10th career and public standing.'),
        callout('No single house tells the whole story. A good reading always looks at the house, its lord, and the planets aspecting it together.'),
        h2('The houses of relationships: 3rd, 7th and 11th'),
        p('The 3rd governs siblings and courage, the 7th marriage and partnerships, and the 11th friends, networks and gains.'),
        h2('The houses of liberation: 4th, 8th and 12th'),
        p('The 4th is home and mother, the 8th transformation and longevity, and the 12th expenses, foreign lands and spiritual release.'),
        cta('Want to know what your houses say?'),
      ],
      kn: [
        p('ಕುಂಡಲಿಯನ್ನು ಹನ್ನೆರಡು ಭಾವಗಳಾಗಿ ವಿಂಗಡಿಸಲಾಗಿದೆ. ಪ್ರತಿಯೊಂದು ಭಾವವೂ ಜೀವನದ ಒಂದು ಭಾಗವನ್ನು ಆಳುತ್ತದೆ, ಮತ್ತು ಅದರಲ್ಲಿರುವ ಗ್ರಹಗಳು ಆ ಭಾಗ ಹೇಗೆ ತೆರೆದುಕೊಳ್ಳುತ್ತದೆ ಎಂಬುದನ್ನು ನಿರ್ಧರಿಸುತ್ತವೆ.'),
        h2('ಸ್ವಭಾವದ ಭಾವಗಳು: ೧, ೫ ಮತ್ತು ೯'),
        p('ಮೊದಲ ಭಾವ (ಲಗ್ನ) ನೀವೇ: ದೇಹ, ಸ್ವಭಾವ ಮತ್ತು ಜಗತ್ತನ್ನು ಎದುರಿಸುವ ರೀತಿ. ಐದನೇ ಭಾವ ಮಕ್ಕಳು ಮತ್ತು ಬುದ್ಧಿ, ಒಂಬತ್ತನೇ ಭಾವ ಧರ್ಮ, ಗುರು ಮತ್ತು ಭಾಗ್ಯ.'),
        h2('ಸಂಪತ್ತಿನ ಭಾವಗಳು: ೨, ೬ ಮತ್ತು ೧೦'),
        p('ಎರಡನೇ ಭಾವ ಕುಟುಂಬ ಮತ್ತು ಧನ, ಆರನೇ ಭಾವ ದೈನಂದಿನ ಕೆಲಸ ಮತ್ತು ಆರೋಗ್ಯ, ಹತ್ತನೇ ಭಾವ ವೃತ್ತಿ ಮತ್ತು ಸ್ಥಾನಮಾನ.'),
        callout('ಯಾವುದೇ ಒಂದು ಭಾವ ಸಂಪೂರ್ಣ ಕಥೆ ಹೇಳುವುದಿಲ್ಲ. ಭಾವ, ಅದರ ಅಧಿಪತಿ ಮತ್ತು ದೃಷ್ಟಿ ಬೀರುವ ಗ್ರಹಗಳನ್ನು ಒಟ್ಟಿಗೆ ನೋಡಬೇಕು.'),
        cta('ನಿಮ್ಮ ಭಾವಗಳು ಏನು ಹೇಳುತ್ತವೆ ಎಂದು ತಿಳಿಯಬೇಕೇ?'),
      ],
    },
    faqs: [
      { question: { en: 'Which house shows marriage?', kn: 'ಯಾವ ಭಾವ ವಿವಾಹವನ್ನು ಸೂಚಿಸುತ್ತದೆ?' }, answer: { en: 'Primarily the 7th house, read together with Venus and, for women, Jupiter.', kn: 'ಮುಖ್ಯವಾಗಿ ಏಳನೇ ಭಾವ, ಶುಕ್ರ ಮತ್ತು ಗುರುವಿನೊಂದಿಗೆ ಸೇರಿಸಿ ನೋಡಲಾಗುತ್ತದೆ.' } },
    ],
    relatedServices: [summaryOf('kundli-reading')],
  },
  {
    slug: 'mangal-dosha-before-marriage',
    title: { en: 'Mangal dosha before marriage: what it really means' },
    excerpt: { en: 'Mangal dosha is one of the most feared terms in matchmaking, and one of the most misunderstood. A calm look at the facts.' },
    category: cat('marriage'),
    publishedAt: '2026-08-30T09:00:00Z',
    author,
    body: en(
      p('Mangal dosha (also called Kuja dosha) is said to be present when Mars occupies the 1st, 2nd, 4th, 7th, 8th or 12th house. By that definition, nearly half of all charts would have it, which is a sign that the rule is not meant to be applied mechanically.'),
      h2('When the dosha is cancelled'),
      bullets(['Mars in its own sign or exalted', 'Both partners having comparable Mangal dosha', 'Strong Jupiter aspecting Mars or the 7th house']),
      callout('Never cancel an alliance on the word "Mangal dosha" alone. Ask for the full chart comparison.'),
      cta('Get both charts read together'),
    ),
    faqs: [],
    relatedServices: [summaryOf('marriage-matching'), summaryOf('dosha-remedies')],
  },
  {
    slug: 'vastu-tips-for-a-peaceful-home',
    title: { en: 'Seven Vastu tips for a peaceful home', kn: 'ಶಾಂತಿಯುತ ಮನೆಗೆ ಏಳು ವಾಸ್ತು ಸಲಹೆಗಳು' },
    excerpt: { en: 'Small changes to light, layout and clutter that make a real difference, no renovation needed.' },
    category: cat('vastu'),
    publishedAt: '2026-08-02T09:00:00Z',
    author,
    body: en(
      p('Vastu is ultimately about light, air and the flow of daily life. These simple adjustments are worth trying before anything structural.'),
      h3('1. Keep the north-east open and clean'),
      p('This is the most sacred corner of the home. Avoid heavy storage, toilets or clutter here.'),
      h3('2. Sleep with your head to the south'),
      p('Traditional texts recommend south or east. Avoid north.'),
      h3('3. Let morning light into the east'),
      p('Open east-facing windows in the morning and keep them uncovered by heavy curtains.'),
      cta('Planning a new home? Get the plan reviewed'),
    ),
    faqs: [],
    relatedServices: [summaryOf('vastu-shastra')],
  },
  {
    slug: 'what-is-sade-sati',
    title: { en: 'What is Sade Sati, and should you worry?' },
    excerpt: { en: "Saturn's seven-and-a-half-year transit has a fearsome reputation. Here is what it actually does, and how to move through it well." },
    category: cat('remedies'),
    publishedAt: '2026-07-12T09:00:00Z',
    author,
    body: en(
      p('Sade Sati is the period when Saturn transits the sign before your Moon sign, your Moon sign itself, and the sign after it. Each phase lasts about two and a half years.'),
      p('Saturn is a teacher. Sade Sati often brings responsibility, hard work and a clearing-out of what is not working. For many people it is also a time of real, lasting achievement.'),
      cta('Find out where you are in your Sade Sati'),
    ),
    faqs: [],
    relatedServices: [summaryOf('dosha-remedies'), summaryOf('kundli-reading')],
  },
];

// ── Pujas ──────────────────────────────────────────────────────────────
const pujas: Puja[] = [
  { slug: 'navagraha-shanti', title: { en: 'Navagraha Shanti', kn: 'ನವಗ್ರಹ ಶಾಂತಿ' }, deity: { en: 'The nine planets', kn: 'ನವಗ್ರಹಗಳು' }, description: { en: 'Pacifies all nine planets. Often recommended at the start of a difficult dasha.', kn: 'ಒಂಬತ್ತೂ ಗ್ರಹಗಳ ಶಾಂತಿ. ಕಠಿಣ ದಶೆಯ ಆರಂಭದಲ್ಲಿ ಶಿಫಾರಸು.' }, benefits: [{ en: 'Planetary balance', kn: 'ಗ್ರಹ ಸಮತೋಲನ' }, { en: 'Peace of mind', kn: 'ಮನಶ್ಶಾಂತಿ' }], duration: { en: '3 hours', kn: '೩ ಗಂಟೆ' } },
  { slug: 'ganapathi-homa', title: { en: 'Ganapathi Homa', kn: 'ಗಣಪತಿ ಹೋಮ' }, deity: { en: 'Lord Ganesha', kn: 'ಶ್ರೀ ಗಣೇಶ' }, description: { en: 'Removes obstacles before a new beginning: a home, business or marriage.', kn: 'ಹೊಸ ಆರಂಭದ ಮೊದಲು ವಿಘ್ನ ನಿವಾರಣೆ: ಮನೆ, ವ್ಯಾಪಾರ ಅಥವಾ ವಿವಾಹ.' }, benefits: [{ en: 'Smooth beginnings', kn: 'ಸುಗಮ ಆರಂಭ' }], duration: { en: '2 hours', kn: '೨ ಗಂಟೆ' } },
  { slug: 'mrityunjaya-homa', title: { en: 'Maha Mrityunjaya Homa', kn: 'ಮಹಾ ಮೃತ್ಯುಂಜಯ ಹೋಮ' }, deity: { en: 'Lord Shiva', kn: 'ಶ್ರೀ ಶಿವ' }, description: { en: 'Performed for health, recovery and protection of family members.', kn: 'ಆರೋಗ್ಯ, ಚೇತರಿಕೆ ಮತ್ತು ಕುಟುಂಬದ ರಕ್ಷಣೆಗಾಗಿ.' }, benefits: [{ en: 'Health & recovery', kn: 'ಆರೋಗ್ಯ ಮತ್ತು ಚೇತರಿಕೆ' }], duration: { en: '4 hours', kn: '೪ ಗಂಟೆ' } },
  { slug: 'sarpa-samskara', title: { en: 'Sarpa Samskara', kn: 'ಸರ್ಪ ಸಂಸ್ಕಾರ' }, deity: { en: 'Naga devata', kn: 'ನಾಗ ದೇವತೆ' }, description: { en: 'Traditional rite for Sarpa dosha and Kaal Sarp yoga.', kn: 'ಸರ್ಪ ದೋಷ ಮತ್ತು ಕಾಳಸರ್ಪ ಯೋಗಕ್ಕೆ ಸಾಂಪ್ರದಾಯಿಕ ವಿಧಿ.' }, benefits: [{ en: 'Relief from Sarpa dosha', kn: 'ಸರ್ಪ ದೋಷ ನಿವಾರಣೆ' }], duration: { en: '2 days', kn: '೨ ದಿನ' } },
  { slug: 'lakshmi-kubera-puja', title: { en: 'Lakshmi Kubera Puja', kn: 'ಲಕ್ಷ್ಮೀ ಕುಬೇರ ಪೂಜೆ' }, deity: { en: 'Goddess Lakshmi', kn: 'ಶ್ರೀ ಲಕ್ಷ್ಮೀ' }, description: { en: 'For prosperity in the home and business, often on Fridays or Diwali.', kn: 'ಮನೆ ಮತ್ತು ವ್ಯಾಪಾರದಲ್ಲಿ ಸಮೃದ್ಧಿಗಾಗಿ, ಶುಕ್ರವಾರ ಅಥವಾ ದೀಪಾವಳಿಯಂದು.' }, benefits: [{ en: 'Prosperity', kn: 'ಸಮೃದ್ಧಿ' }], duration: { en: '2 hours', kn: '೨ ಗಂಟೆ' } },
];

// ── Testimonials (placeholders; replace with real, consented reviews) ──
const testimonials: Testimonial[] = [];
const areas: Area[] = [];

// ── FAQs (site-wide) ───────────────────────────────────────────────────
const faqs: Faq[] = [
  { question: { en: 'How can I arrange a consultation?', kn: 'ಸಮಾಲೋಚನೆಯನ್ನು ಹೇಗೆ ನಿಗದಿಪಡಿಸಬಹುದು?' }, answer: { en: 'Booking and contact details are being confirmed. Please visit the Contact page for availability updates.', kn: 'ಬುಕಿಂಗ್ ಮತ್ತು ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ದೃಢೀಕರಿಸಲಾಗುತ್ತಿದೆ. ಮಾಹಿತಿಗಾಗಿ ಸಂಪರ್ಕ ಪುಟವನ್ನು ನೋಡಿ.' } },
  { question: { en: 'Which services will be available?', kn: 'ಯಾವ ಸೇವೆಗಳು ಲಭ್ಯವಿರುತ್ತವೆ?' }, answer: { en: 'The services and pujas shown here are provisional. The centre will confirm its offerings, fees and consultation formats before launch.', kn: 'ಇಲ್ಲಿರುವ ಸೇವೆಗಳು ಮತ್ತು ಪೂಜೆಗಳು ತಾತ್ಕಾಲಿಕ ಪಟ್ಟಿಯಾಗಿವೆ. ಕೇಂದ್ರವು ಸೇವೆಗಳು, ಶುಲ್ಕ ಮತ್ತು ಸಮಾಲೋಚನಾ ವಿಧಾನಗಳನ್ನು ದೃಢೀಕರಿಸಲಿದೆ.' } },
  { question: { en: 'What information is usually needed?', kn: 'ಸಾಮಾನ್ಯವಾಗಿ ಯಾವ ಮಾಹಿತಿ ಬೇಕಾಗುತ್ತದೆ?' }, answer: { en: 'Birth chart readings typically use the date, time and place of birth. Please wait for confirmed booking instructions before sharing personal details.', kn: 'ಜನ್ಮ ಕುಂಡಲಿಗೆ ಸಾಮಾನ್ಯವಾಗಿ ಜನ್ಮ ದಿನಾಂಕ, ಸಮಯ ಮತ್ತು ಸ್ಥಳ ಬೇಕಾಗುತ್ತದೆ. ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಮೊದಲು ದೃಢೀಕೃತ ಸೂಚನೆಗಳಿಗಾಗಿ ನಿರೀಕ್ಷಿಸಿ.' } },
];

const homePage: HomePage = {
  hero: [{ eyebrow: { en: 'A space for reflection', kn: 'ಚಿಂತನೆಗೆ ಒಂದು ನೆಲೆ' }, heading: { en: 'Traditional wisdom. A clearer way forward.', kn: 'ಪಾರಂಪರಿಕ ಜ್ಞಾನ. ಸ್ಪಷ್ಟವಾದ ಮುಂದಿನ ಹೆಜ್ಜೆ.' }, text: { en: 'Explore the traditions of Jyotisha, Vastu and sacred rituals — a thoughtful place to begin with the questions that matter to you.', kn: 'ಜ್ಯೋತಿಷ್ಯ, ವಾಸ್ತು ಮತ್ತು ಪವಿತ್ರ ಆಚರಣೆಗಳ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ — ನಿಮ್ಮ ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳೊಂದಿಗೆ ಆರಂಭಿಸಲು ಒಂದು ನೆಲೆ.' } }],
  intro: { heading: { en: 'Rooted in tradition. Open to your questions.', kn: 'ಪರಂಪರೆಯ ನೆಲೆ. ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸ್ವಾಗತ.' }, text: { en: 'Welcome to Shri Lakshmi Venkateshwara Astro Center. This preview introduces a considered space for traditional astrology and spiritual practices. Details about the practitioner and the centre will be shared once confirmed.', kn: 'Shri Lakshmi Venkateshwara Astro Center ಗೆ ಸ್ವಾಗತ. ಈ ಮುನ್ನೋಟವು ಪಾರಂಪರಿಕ ಜ್ಯೋತಿಷ್ಯ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಆಚರಣೆಗಳನ್ನು ಪರಿಚಯಿಸುತ್ತದೆ. ಜ್ಯೋತಿಷಿಗಳು ಮತ್ತು ಕೇಂದ್ರದ ವಿವರಗಳನ್ನು ದೃಢೀಕರಣದ ನಂತರ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.' } },
  stats: [], reasons: [],
  message: { heading: { en: '' }, quote: { en: '' } },
  featuredServices: serviceSeeds.map((s) => summaryOf(s.slug)),
  featuredTestimonials: [], faqs,
};

const aboutPage: AboutPage = {
  heading: { en: 'Tradition, with a thoughtful perspective', kn: 'ಚಿಂತನಶೀಲ ದೃಷ್ಟಿಕೋನದೊಂದಿಗೆ ಪರಂಪರೆ' },
  intro: { en: 'Introducing Shri Lakshmi Venkateshwara Astro Center.', kn: 'Shri Lakshmi Venkateshwara Astro Center ಪರಿಚಯ.' },
  biography: { en: [p('A place to explore the traditions of Jyotisha, Vastu and sacred rituals, and reflect on the questions that matter to you.'), h2('Meet the practitioner'), p('Practitioner information, qualifications and photographs are awaiting confirmation. This branded preview contains no verified practitioner biography.')], kn: [p('ಜ್ಯೋತಿಷ್ಯ, ವಾಸ್ತು ಮತ್ತು ಪವಿತ್ರ ಆಚರಣೆಗಳ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಲು ಒಂದು ನೆಲೆ.'), h2('ಜ್ಯೋತಿಷಿಗಳ ಪರಿಚಯ'), p('ಜ್ಯೋತಿಷಿಗಳ ಮಾಹಿತಿ, ಅರ್ಹತೆಗಳು ಮತ್ತು ಛಾಯಾಚಿತ್ರಗಳ ದೃಢೀಕರಣಕ್ಕಾಗಿ ನಿರೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ.')] },
  credentials: [], gallery: [],
  mission: { en: 'Traditional wisdom. A clearer way forward.', kn: 'ಪಾರಂಪರಿಕ ಜ್ಞಾನ. ಸ್ಪಷ್ಟವಾದ ಮುಂದಿನ ಹೆಜ್ಜೆ.' },
};

const gallery: GalleryItem[] = Array.from({ length: 8 }, (_, i) => ({
  caption: { en: `Photo ${i + 1}`, kn: `ಚಿತ್ರ ${i + 1}` },
}));

const legal = (slug: string, title: string, kn: string, text: string): LegalPage => ({
  slug, title: { en: title, kn }, body: en(p(text)),
});
const legalPages: LegalPage[] = [
  legal('privacy-policy', 'Privacy policy', 'ಗೌಪ್ಯತಾ ನೀತಿ', 'We collect only the details you choose to share with us (name, phone number, email and birth details) and use them solely to respond to your enquiry and prepare your consultation. We never sell or share your information. To have your details deleted, write to us at the email address on our contact page.'),
  legal('terms', 'Terms of use', 'ಬಳಕೆಯ ನಿಯಮಗಳು', 'Consultations and articles on this website are offered for guidance based on traditional Vedic astrology. By booking a consultation you agree that decisions you make remain your own responsibility.'),
  legal('disclaimer', 'Disclaimer', 'ಹಕ್ಕುತ್ಯಾಗ', 'Astrology is a traditional system of guidance and does not guarantee any particular outcome. It is not a substitute for medical, legal, financial or psychological advice. Please continue to consult qualified professionals for such matters.'),
];

const services: Service[] = serviceSeeds.map((s) => ({ ...s, process: s.process ?? process, relatedPosts: [] }));

export const sample = {
  siteSettings, homePage, aboutPage, services, pujas, posts, categories,
  testimonials, gallery, areas, faqs, legalPages,
};
