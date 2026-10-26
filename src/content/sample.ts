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
  name: { en: 'Nakshatra Jyotishalaya', kn: 'ನಕ್ಷತ್ರ ಜ್ಯೋತಿಷಾಲಯ' },
  astrologerName: { en: 'Acharya Guruji', kn: 'ಆಚಾರ್ಯ ಗುರೂಜಿ' },
  tagline: {
    en: 'Vedic guidance for the decisions that shape your life',
    kn: 'ನಿಮ್ಮ ಜೀವನವನ್ನು ರೂಪಿಸುವ ನಿರ್ಧಾರಗಳಿಗೆ ವೈದಿಕ ಮಾರ್ಗದರ್ಶನ',
  },
  phone: '+91 90000 00000',
  whatsapp: '919000000000',
  email: 'hello@example.com',
  address: {
    street: { en: '12, Temple Street, Near Bull Temple', kn: '೧೨, ಟೆಂಪಲ್ ಸ್ಟ್ರೀಟ್, ದೊಡ್ಡ ಬಸವನ ಗುಡಿ ಹತ್ತಿರ' },
    locality: 'Basavanagudi',
    city: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560004',
    country: 'IN',
  },
  geo: { lat: 12.9416, lng: 77.5681 },
  hours: { en: 'Open every day, 8 am to 8 pm', kn: 'ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ ೮ರಿಂದ ರಾತ್ರಿ ೮ರವರೆಗೆ' },
  mapEmbedUrl: 'https://www.google.com/maps?q=Bull+Temple+Basavanagudi+Bengaluru&output=embed',
  mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Bull+Temple+Basavanagudi+Bengaluru',
  established: 1998,
  socials: { instagram: '', facebook: '', youtube: '' },
  defaultSeo: {
    metaTitle: {
      en: 'Vedic Astrologer in Bengaluru | Nakshatra Jyotishalaya',
      kn: 'ಬೆಂಗಳೂರಿನ ವೈದಿಕ ಜ್ಯೋತಿಷಿ | ನಕ್ಷತ್ರ ಜ್ಯೋತಿಷಾಲಯ',
    },
    metaDescription: {
      en: 'Kundli reading, marriage matching, Vastu and dosha remedies with Acharya Guruji in Basavanagudi, Bengaluru. In person, phone or video consultations.',
      kn: 'ಬಸವನಗುಡಿಯಲ್ಲಿ ಆಚಾರ್ಯ ಗುರೂಜಿಯವರಿಂದ ಜಾತಕ ವಿಶ್ಲೇಷಣೆ, ವಿವಾಹ ಹೊಂದಾಣಿಕೆ, ವಾಸ್ತು ಮತ್ತು ದೋಷ ಪರಿಹಾರ. ನೇರ, ಫೋನ್ ಅಥವಾ ವಿಡಿಯೋ ಸಮಾಲೋಚನೆ.',
    },
  },
  keywords: [
    'astrologer in Bengaluru', 'vedic astrologer Bangalore', 'kundli reading Bangalore',
    'marriage matching astrologer', 'vastu consultant Bengaluru', 'astrologer in Basavanagudi',
    'ಜ್ಯೋತಿಷಿ ಬೆಂಗಳೂರು',
  ],
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
  { title: { en: 'Chart preparation', kn: 'ಕುಂಡಲಿ ಸಿದ್ಧತೆ' }, text: { en: 'Guruji prepares your Rashi, Navamsha and Dasha charts before you meet.', kn: 'ಭೇಟಿಗೂ ಮೊದಲು ಗುರೂಜಿ ನಿಮ್ಮ ರಾಶಿ, ನವಾಂಶ ಮತ್ತು ದಶಾ ಕುಂಡಲಿ ಸಿದ್ಧಪಡಿಸುತ್ತಾರೆ.' } },
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
      { question: { en: 'What if I do not know my exact birth time?', kn: 'ನಿಖರ ಜನ್ಮ ಸಮಯ ಗೊತ್ತಿಲ್ಲದಿದ್ದರೆ?' }, answer: { en: 'Guruji can rectify the birth time using key life events such as marriage, the birth of children or changes of job.', kn: 'ವಿವಾಹ, ಮಕ್ಕಳ ಜನನ, ಉದ್ಯೋಗ ಬದಲಾವಣೆಯಂತಹ ಘಟನೆಗಳಿಂದ ಗುರೂಜಿ ಜನ್ಮ ಸಮಯವನ್ನು ಸರಿಪಡಿಸಬಹುದು.' } },
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
      p('A guna score is only the starting point. Guruji also looks at the 7th house, Venus and Jupiter, Mangal dosha in both charts and the dasha periods each partner is entering, so the family gets a complete picture.'),
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
      { question: { en: 'Is 18 gunas enough?', kn: '೧೮ ಗುಣಗಳು ಸಾಕೇ?' }, answer: { en: 'It is the traditional minimum, but planetary compatibility matters as much as the score. Guruji explains both.', kn: 'ಅದು ಸಾಂಪ್ರದಾಯಿಕ ಕನಿಷ್ಠ, ಆದರೆ ಗ್ರಹ ಹೊಂದಾಣಿಕೆಯೂ ಅಷ್ಟೇ ಮುಖ್ಯ. ಗುರೂಜಿ ಎರಡನ್ನೂ ವಿವರಿಸುತ್ತಾರೆ.' } },
    ],
  },
  {
    slug: 'career-business',
    icon: 'Briefcase',
    title: { en: 'Career & Business', kn: 'ಉದ್ಯೋಗ ಮತ್ತು ವ್ಯಾಪಾರ' },
    shortDescription: { en: 'Timing for job changes, promotions, partnerships and new ventures.', kn: 'ಉದ್ಯೋಗ ಬದಲಾವಣೆ, ಬಡ್ತಿ, ಪಾಲುದಾರಿಕೆ ಮತ್ತು ಹೊಸ ಉದ್ಯಮಗಳಿಗೆ ಸರಿಯಾದ ಸಮಯ.' },
    body: en(
      p('The 10th house, its lord and the running dasha show the kind of work that suits you and when change is favourable. For business owners, Guruji also reviews partnership charts and auspicious dates for launches and agreements.'),
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
      p('Most Vastu imbalances can be corrected with changes to how rooms are used, where heavy furniture sits and simple placements. Guruji visits sites across Bengaluru or reviews floor plans remotely.'),
      callout('Have a floor plan ready, with north marked, before the visit.'),
    ),
    whySeek: [
      { en: 'Buying a new home or plot', kn: 'ಹೊಸ ಮನೆ ಅಥವಾ ನಿವೇಶನ ಖರೀದಿ' },
      { en: 'Office or shop layout', kn: 'ಕಚೇರಿ ಅಥವಾ ಅಂಗಡಿ ವಿನ್ಯಾಸ' },
      { en: 'Griha pravesha', kn: 'ಗೃಹ ಪ್ರವೇಶ' },
      { en: 'Unrest at home', kn: 'ಮನೆಯಲ್ಲಿ ಅಶಾಂತಿ' },
    ],
    faqs: [
      { question: { en: 'Do you review plans online?', kn: 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ನಕ್ಷೆ ಪರಿಶೀಲಿಸುತ್ತೀರಾ?' }, answer: { en: 'Yes. Send the floor plan with north marked and Guruji will review it on a video call.', kn: 'ಹೌದು. ಉತ್ತರ ದಿಕ್ಕು ಗುರುತಿಸಿದ ನಕ್ಷೆ ಕಳುಹಿಸಿ, ಗುರೂಜಿ ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ಪರಿಶೀಲಿಸುತ್ತಾರೆ.' } },
    ],
  },
  {
    slug: 'dosha-remedies',
    icon: 'Flame',
    title: { en: 'Dosha Nivarana', kn: 'ದೋಷ ನಿವಾರಣೆ' },
    shortDescription: { en: 'Mangal, Kaal Sarp, Pitru and Shani doshas, explained calmly and remedied simply.', kn: 'ಮಂಗಳ, ಕಾಳಸರ್ಪ, ಪಿತೃ ಮತ್ತು ಶನಿ ದೋಷಗಳು, ಶಾಂತವಾಗಿ ವಿವರಿಸಿ ಸರಳವಾಗಿ ಪರಿಹಾರ.' },
    body: en(
      p('Doshas are often described in frightening terms. In reality many are mild or cancelled by other factors in the chart. Guruji first confirms whether a dosha is actually present and how strong it is, and only then suggests remedies such as japa, a specific puja or charity.'),
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
    body: en(p('A gemstone strengthens a planet; it does not fix it. Wearing the wrong stone can do more harm than good, so Guruji recommends stones only after a full chart reading, along with the right weight, metal, finger and day to begin.')),
    whySeek: [
      { en: 'Before buying a stone', kn: 'ರತ್ನ ಖರೀದಿಗೂ ಮೊದಲು' },
      { en: 'Checking a stone you wear', kn: 'ಧರಿಸಿರುವ ರತ್ನದ ಪರಿಶೀಲನೆ' },
    ],
    faqs: [],
  },
];

// ── Blog posts ─────────────────────────────────────────────────────────
const author = {
  name: siteSettings.astrologerName,
  role: { en: 'Vedic astrologer, practising since 1998', kn: '೧೯೯೮ರಿಂದ ವೈದಿಕ ಜ್ಯೋತಿಷಿ' },
  bio: {
    en: 'Acharya Guruji has practised Vedic astrology in Bengaluru since 1998, guiding families on marriage, career, Vastu and remedies.',
    kn: 'ಆಚಾರ್ಯ ಗುರೂಜಿ ೧೯೯೮ರಿಂದ ಬೆಂಗಳೂರಿನಲ್ಲಿ ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ ಅಭ್ಯಾಸ ಮಾಡುತ್ತಿದ್ದು, ವಿವಾಹ, ಉದ್ಯೋಗ, ವಾಸ್ತು ಮತ್ತು ಪರಿಹಾರಗಳ ಕುರಿತು ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಿದ್ದಾರೆ.',
  },
};

const summaryOf = (slug: string) => {
  const s = serviceSeeds.find((x) => x.slug === slug)!;
  return { slug: s.slug, title: s.title, shortDescription: s.shortDescription, icon: s.icon };
};

const posts: Post[] = [
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
const testimonials: Testimonial[] = [
  { name: 'Priya R.', city: 'Jayanagar', rating: 5, service: { en: 'Marriage matching', kn: 'ವಿವಾಹ ಹೊಂದಾಣಿಕೆ' }, text: { en: 'Guruji took the time to explain both charts to our families instead of just giving a score. We felt confident going ahead.', kn: 'ಗುರೂಜಿ ಕೇವಲ ಅಂಕ ನೀಡದೆ ಎರಡೂ ಕುಂಡಲಿಗಳನ್ನು ನಮ್ಮ ಕುಟುಂಬಗಳಿಗೆ ವಿವರಿಸಿದರು. ಮುಂದುವರಿಯಲು ಧೈರ್ಯ ಬಂತು.' }, date: '2026-09-02' },
  { name: 'Suresh K.', city: 'Rajajinagar', rating: 5, service: { en: 'Career', kn: 'ಉದ್ಯೋಗ' }, text: { en: 'Clear, practical advice on timing a job change. No fear, no expensive remedies pushed on me.', kn: 'ಉದ್ಯೋಗ ಬದಲಾವಣೆಯ ಸಮಯದ ಬಗ್ಗೆ ಸ್ಪಷ್ಟ, ಪ್ರಾಯೋಗಿಕ ಸಲಹೆ. ಭಯ ಹುಟ್ಟಿಸಲಿಲ್ಲ.' }, date: '2026-08-14' },
  { name: 'Anitha M.', city: 'Banashankari', rating: 5, service: { en: 'Vastu', kn: 'ವಾಸ್ತು' }, text: { en: 'He reviewed our new flat plan on a video call and suggested simple changes. Very patient with all our questions.', kn: 'ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ನಮ್ಮ ಹೊಸ ಮನೆಯ ನಕ್ಷೆ ನೋಡಿ ಸರಳ ಬದಲಾವಣೆ ಸೂಚಿಸಿದರು.' }, date: '2026-07-21' },
  { name: 'Rahul & Deepa', city: 'Whitefield', rating: 5, service: { en: 'Kundli reading', kn: 'ಜಾತಕ ವಿಶ್ಲೇಷಣೆ' }, text: { en: "We came during a stressful period. Guruji's reading helped us understand it and plan calmly.", kn: 'ಒತ್ತಡದ ಸಮಯದಲ್ಲಿ ಬಂದೆವು. ಗುರೂಜಿಯವರ ವಿಶ್ಲೇಷಣೆ ಶಾಂತವಾಗಿ ಯೋಜಿಸಲು ಸಹಾಯ ಮಾಡಿತು.' }, date: '2026-06-30' },
  { name: 'Lakshmi N.', city: 'Mysuru', rating: 5, service: { en: 'Puja', kn: 'ಪೂಜೆ' }, text: { en: 'Navagraha Shanti was performed with great care and every step was explained to us.', kn: 'ನವಗ್ರಹ ಶಾಂತಿಯನ್ನು ಬಹಳ ಶ್ರದ್ಧೆಯಿಂದ ನೆರವೇರಿಸಿ ಪ್ರತಿ ಹಂತವನ್ನೂ ವಿವರಿಸಿದರು.' }, date: '2026-05-11' },
  { name: 'Vikram S.', city: 'JP Nagar', rating: 5, service: { en: 'Gemstone', kn: 'ರತ್ನ' }, text: { en: 'He told me honestly that I did not need the stone I was about to buy. That honesty earned my trust.', kn: 'ನಾನು ಖರೀದಿಸಲು ಹೊರಟಿದ್ದ ರತ್ನ ಬೇಕಿಲ್ಲ ಎಂದು ಪ್ರಾಮಾಣಿಕವಾಗಿ ಹೇಳಿದರು.' }, date: '2026-04-03' },
];

// ── Areas (only list localities the client really serves) ─────────────
const area = (slug: string, enName: string, knName: string, intro: string, nearby: string[]): Area => ({
  slug, name: { en: enName, kn: knName }, intro: { en: intro }, nearby, faqs: [],
});
const areas: Area[] = [
  area('basavanagudi', 'Basavanagudi', 'ಬಸವನಗುಡಿ', 'The centre is in Basavanagudi, a short walk from the Bull Temple, so families from the area can drop in for consultations without an appointment on most mornings.', ['jayanagar', 'banashankari']),
  area('jayanagar', 'Jayanagar', 'ಜಯನಗರ', 'Jayanagar is about ten minutes from the centre via South End Circle. Many of our longest-standing families live here and visit for annual chart reviews.', ['basavanagudi', 'jp-nagar', 'banashankari']),
  area('jp-nagar', 'JP Nagar', 'ಜೆ.ಪಿ. ನಗರ', 'From JP Nagar the centre is reached via Kanakapura Road. Vastu site visits across all JP Nagar phases can be scheduled on weekdays.', ['jayanagar', 'banashankari']),
  area('banashankari', 'Banashankari', 'ಬನಶಂಕರಿ', 'Banashankari residents can reach the centre in fifteen minutes. Guruji also performs pujas at homes in the area by appointment.', ['basavanagudi', 'jayanagar', 'jp-nagar']),
  area('rajajinagar', 'Rajajinagar', 'ರಾಜಾಜಿನಗರ', 'For families in Rajajinagar and the west of the city, phone and video consultations are popular, with in-person visits for matching and Vastu.', ['basavanagudi']),
];

// ── FAQs (site-wide) ───────────────────────────────────────────────────
const faqs: Faq[] = [
  { question: { en: 'Do I need an appointment?', kn: 'ಮುಂಚಿತವಾಗಿ ಸಮಯ ನಿಗದಿ ಬೇಕೇ?' }, answer: { en: 'Appointments are recommended so Guruji can prepare your chart in advance. Message us on WhatsApp to book.', kn: 'ಗುರೂಜಿ ಮುಂಚಿತವಾಗಿ ಕುಂಡಲಿ ಸಿದ್ಧಪಡಿಸಲು ಸಮಯ ನಿಗದಿ ಉತ್ತಮ. ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಬುಕ್ ಮಾಡಿ.' } },
  { question: { en: 'Can I consult over the phone or video?', kn: 'ಫೋನ್ ಅಥವಾ ವಿಡಿಯೋ ಮೂಲಕ ಸಮಾಲೋಚಿಸಬಹುದೇ?' }, answer: { en: 'Yes. Phone and video consultations are available for clients anywhere in India and abroad.', kn: 'ಹೌದು. ಭಾರತ ಮತ್ತು ವಿದೇಶದ ಎಲ್ಲಿಂದಲಾದರೂ ಫೋನ್ ಮತ್ತು ವಿಡಿಯೋ ಸಮಾಲೋಚನೆ ಲಭ್ಯ.' } },
  { question: { en: 'Which languages does Guruji speak?', kn: 'ಗುರೂಜಿ ಯಾವ ಭಾಷೆಗಳನ್ನು ಮಾತನಾಡುತ್ತಾರೆ?' }, answer: { en: 'Kannada, English, Hindi and Telugu.', kn: 'ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಮತ್ತು ತೆಲುಗು.' } },
  { question: { en: 'What details should I bring?', kn: 'ಯಾವ ವಿವರಗಳನ್ನು ತರಬೇಕು?' }, answer: { en: 'Your date, exact time and place of birth. For matching, the same for both partners.', kn: 'ಜನ್ಮ ದಿನಾಂಕ, ನಿಖರ ಸಮಯ ಮತ್ತು ಸ್ಥಳ. ಹೊಂದಾಣಿಕೆಗೆ ಇಬ್ಬರದ್ದೂ.' } },
  { question: { en: 'Are remedies expensive?', kn: 'ಪರಿಹಾರಗಳು ದುಬಾರಿಯೇ?' }, answer: { en: 'Most remedies Guruji suggests are simple: mantras, fasting, charity or temple visits. Pujas are recommended only when they are genuinely indicated.', kn: 'ಹೆಚ್ಚಿನ ಪರಿಹಾರಗಳು ಸರಳ: ಮಂತ್ರ, ಉಪವಾಸ, ದಾನ ಅಥವಾ ದೇವಾಲಯ ಭೇಟಿ. ಪೂಜೆಗಳನ್ನು ಅಗತ್ಯವಿದ್ದಾಗ ಮಾತ್ರ ಸೂಚಿಸಲಾಗುತ್ತದೆ.' } },
];

// ── Home & About ───────────────────────────────────────────────────────
const homePage: HomePage = {
  hero: [
    { eyebrow: { en: 'Vedic astrology in Basavanagudi', kn: 'ಬಸವನಗುಡಿಯಲ್ಲಿ ವೈದಿಕ ಜ್ಯೋತಿಷ್ಯ' }, heading: { en: 'Clarity for the questions that keep you up at night', kn: 'ನಿಮ್ಮ ನಿದ್ದೆಗೆಡಿಸುವ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸ್ಪಷ್ಟತೆ' }, text: { en: 'Marriage, career, home and health, read from your birth chart by Acharya Guruji in Basavanagudi, Bengaluru.', kn: 'ವಿವಾಹ, ಉದ್ಯೋಗ, ಮನೆ ಮತ್ತು ಆರೋಗ್ಯ: ಬಸವನಗುಡಿಯಲ್ಲಿ ಆಚಾರ್ಯ ಗುರೂಜಿಯವರಿಂದ ನಿಮ್ಮ ಜನ್ಮ ಕುಂಡಲಿಯ ವಿಶ್ಲೇಷಣೆ.' } },
    { eyebrow: { en: 'Marriage & matching', kn: 'ವಿವಾಹ ಮತ್ತು ಹೊಂದಾಣಿಕೆ' }, heading: { en: 'Two charts, one honest answer', kn: 'ಎರಡು ಕುಂಡಲಿ, ಒಂದು ಪ್ರಾಮಾಣಿಕ ಉತ್ತರ' }, text: { en: 'Kundli matching that goes beyond the guna score, explained clearly to both families.', kn: 'ಗುಣ ಅಂಕಗಳನ್ನು ಮೀರಿದ ಜಾತಕ ಹೊಂದಾಣಿಕೆ, ಎರಡೂ ಕುಟುಂಬಗಳಿಗೆ ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸಲಾಗುತ್ತದೆ.' } },
    { eyebrow: { en: 'Vastu shastra', kn: 'ವಾಸ್ತು ಶಾಸ್ತ್ರ' }, heading: { en: 'A home in harmony with its directions', kn: 'ದಿಕ್ಕುಗಳೊಂದಿಗೆ ಸಾಮರಸ್ಯದ ಮನೆ' }, text: { en: 'Practical Vastu for homes, offices and plots, with no unnecessary demolition.', kn: 'ಮನೆ, ಕಚೇರಿ ಮತ್ತು ನಿವೇಶನಗಳಿಗೆ ಪ್ರಾಯೋಗಿಕ ವಾಸ್ತು, ಅನಗತ್ಯ ಕೆಡವುವಿಕೆ ಇಲ್ಲದೆ.' } },
  ],
  intro: {
    heading: { en: 'A lifetime spent reading the sky', kn: 'ಆಕಾಶವನ್ನು ಓದುವಲ್ಲಿ ಕಳೆದ ಜೀವನ' },
    text: {
      en: 'Acharya Guruji learned Jyotisha in the traditional guru-shishya way and has guided thousands of families across Karnataka for more than 25 years. His approach is calm and practical: understand the chart, explain it plainly, and suggest only the remedies that are genuinely needed.',
      kn: 'ಆಚಾರ್ಯ ಗುರೂಜಿ ಸಾಂಪ್ರದಾಯಿಕ ಗುರು-ಶಿಷ್ಯ ಪರಂಪರೆಯಲ್ಲಿ ಜ್ಯೋತಿಷ್ಯ ಕಲಿತು, ೨೫ಕ್ಕೂ ಹೆಚ್ಚು ವರ್ಷಗಳಿಂದ ಕರ್ನಾಟಕದಾದ್ಯಂತ ಸಾವಿರಾರು ಕುಟುಂಬಗಳಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಿದ್ದಾರೆ. ಅವರ ವಿಧಾನ ಶಾಂತ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ.',
    },
  },
  stats: [
    { value: 25, suffix: '+', label: { en: 'Years of practice', kn: 'ವರ್ಷಗಳ ಅನುಭವ' } },
    { value: 12000, suffix: '+', label: { en: 'Charts read', kn: 'ಕುಂಡಲಿಗಳ ವಿಶ್ಲೇಷಣೆ' } },
    { value: 4, label: { en: 'Languages', kn: 'ಭಾಷೆಗಳು' } },
    { value: 7, label: { en: 'Days a week', kn: 'ವಾರದ ದಿನಗಳು' } },
  ],
  reasons: [
    { title: { en: 'Explained, not prescribed', kn: 'ಆದೇಶವಲ್ಲ, ವಿವರಣೆ' }, text: { en: 'You leave understanding your chart, not just holding a list of remedies.', kn: 'ಕೇವಲ ಪರಿಹಾರಗಳ ಪಟ್ಟಿಯಲ್ಲ, ನಿಮ್ಮ ಕುಂಡಲಿಯ ಅರ್ಥದೊಂದಿಗೆ ಹೊರಡುತ್ತೀರಿ.' } },
    { title: { en: 'No fear, no pressure', kn: 'ಭಯವಿಲ್ಲ, ಒತ್ತಡವಿಲ್ಲ' }, text: { en: 'Doshas are explained calmly. Pujas are suggested only when truly indicated.', kn: 'ದೋಷಗಳನ್ನು ಶಾಂತವಾಗಿ ವಿವರಿಸಲಾಗುತ್ತದೆ. ಅಗತ್ಯವಿದ್ದಾಗ ಮಾತ್ರ ಪೂಜೆ.' } },
    { title: { en: 'Traditional training', kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಶಿಕ್ಷಣ' }, text: { en: 'Parashari and Jaimini systems, learned in the guru-shishya parampara.', kn: 'ಗುರು-ಶಿಷ್ಯ ಪರಂಪರೆಯಲ್ಲಿ ಕಲಿತ ಪರಾಶರ ಮತ್ತು ಜೈಮಿನಿ ಪದ್ಧತಿಗಳು.' } },
    { title: { en: 'Your details stay private', kn: 'ನಿಮ್ಮ ವಿವರಗಳು ಗೌಪ್ಯ' }, text: { en: 'Birth details and consultations are never shared with anyone.', kn: 'ಜನ್ಮ ವಿವರಗಳು ಮತ್ತು ಸಮಾಲೋಚನೆಗಳನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ.' } },
  ],
  message: {
    heading: { en: 'A word from Guruji', kn: 'ಗುರೂಜಿಯವರ ಮಾತು' },
    quote: {
      en: 'The planets do not decide your life. They show you the season you are in, so you can sow and harvest at the right time.',
      kn: 'ಗ್ರಹಗಳು ನಿಮ್ಮ ಜೀವನವನ್ನು ನಿರ್ಧರಿಸುವುದಿಲ್ಲ. ನೀವು ಯಾವ ಋತುವಿನಲ್ಲಿದ್ದೀರಿ ಎಂದು ತೋರಿಸುತ್ತವೆ, ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಬಿತ್ತಿ ಬೆಳೆಯಲು.',
    },
  },
  featuredServices: serviceSeeds.map((s) => summaryOf(s.slug)),
  featuredTestimonials: testimonials.slice(0, 4),
  faqs: faqs.slice(0, 4),
};

const aboutPage: AboutPage = {
  heading: { en: 'About Acharya Guruji', kn: 'ಆಚಾರ್ಯ ಗುರೂಜಿಯವರ ಬಗ್ಗೆ' },
  intro: { en: 'Vedic astrologer, Vastu consultant and teacher, practising in Basavanagudi, Bengaluru since 1998.', kn: '೧೯೯೮ರಿಂದ ಬೆಂಗಳೂರಿನ ಬಸವನಗುಡಿಯಲ್ಲಿ ವೈದಿಕ ಜ್ಯೋತಿಷಿ, ವಾಸ್ತು ಸಲಹೆಗಾರ ಮತ್ತು ಶಿಕ್ಷಕ.' },
  biography: en(
    p('Born into a family of temple priests in coastal Karnataka, Guruji began studying Sanskrit and the Jyotisha shastras as a boy under his grandfather, and later under a renowned scholar of the Parashari tradition.'),
    p('After more than a decade of study he began consulting in Bengaluru in 1998. Today families who first came to him for their own marriage return for their children\'s horoscopes.'),
    p('Guruji believes astrology should bring clarity and calm, never fear. Consultations are unhurried, remedies are simple, and every client is treated with discretion.'),
  ),
  credentials: [
    { title: { en: 'Jyotisha Visharada', kn: 'ಜ್ಯೋತಿಷ ವಿಶಾರದ' }, text: { en: 'Traditional title conferred after 12 years of study.', kn: '೧೨ ವರ್ಷಗಳ ಅಧ್ಯಯನದ ನಂತರ ನೀಡಲಾದ ಸಾಂಪ್ರದಾಯಿಕ ಪದವಿ.' } },
    { title: { en: 'Vastu Acharya', kn: 'ವಾಸ್ತು ಆಚಾರ್ಯ' }, text: { en: 'Trained in classical Vastu texts including Mayamata.', kn: 'ಮಯಮತ ಸೇರಿದಂತೆ ಶಾಸ್ತ್ರೀಯ ವಾಸ್ತು ಗ್ರಂಥಗಳಲ್ಲಿ ತರಬೇತಿ.' } },
    { title: { en: 'Teacher', kn: 'ಶಿಕ್ಷಕ' }, text: { en: 'Has taught Jyotisha to over 200 students.', kn: '೨೦೦ಕ್ಕೂ ಹೆಚ್ಚು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಜ್ಯೋತಿಷ್ಯ ಬೋಧನೆ.' } },
  ],
  mission: { en: 'To help every family that walks in leave with clarity, calm and a practical plan.', kn: 'ಬರುವ ಪ್ರತಿಯೊಂದು ಕುಟುಂಬವೂ ಸ್ಪಷ್ಟತೆ, ಶಾಂತಿ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಯೋಜನೆಯೊಂದಿಗೆ ಹೊರಡುವಂತೆ ಮಾಡುವುದು.' },
  gallery: [],
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
