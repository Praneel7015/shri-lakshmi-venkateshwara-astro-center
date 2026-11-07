import type { ImageRef, Puja, ServiceSummary } from '@/types/content';

const zodiacChart: ImageRef = { src: '/images/astrology/vedic-zodiac-chart.jpeg', alt: { en: 'Zodiac wheel with astrological symbols' } };

const serviceImages: Record<string, ImageRef> = {
  'career-business': { src: '/images/services/career-business.jpg', alt: { en: 'Career and business astrology guidance' } },
  'dosha-remedies': { src: '/images/services/dosha-remedies.jpg', alt: { en: 'Traditional dosha remedies' } },
  'gemstone-guidance': { src: '/images/services/gemstone-guidance.png', alt: { en: 'Gemstone guidance' } },
  'kundli-reading': { src: '/images/services/kundli-reading.jpg', alt: { en: 'Kundli and horoscope reading' } },
  'marriage-matching': { src: '/images/services/marriage-matching.jpg', alt: { en: 'Marriage and kundli matching' } },
  'vastu-shastra': { src: '/images/services/vastu-shastra.jpg', alt: { en: 'Vastu Shastra consultation' } },
};

const pujaImages: Record<string, ImageRef> = {
  'ganapathi-homa': { src: '/images/pujas/ganapathi-homa.jpg', alt: { en: 'Ganapathi Homa' } },
  'lakshmi-kubera-puja': { src: '/images/pujas/lakshmi-kubera-puja.jpg', alt: { en: 'Lakshmi Kubera Puja' } },
  'mrityunjaya-homa': { src: '/images/pujas/maha-mrutunjaya-homa.webp', alt: { en: 'Maha Mrityunjaya Homa' } },
  'navagraha-shanti': { src: '/images/pujas/navagraha-altar.jpeg', alt: { en: 'Navagraha puja altar with a ritual arrangement' } },
  'sarpa-samskara': { src: '/images/pujas/sarpa-samskara.webp', alt: { en: 'Sarpa dosha ritual' } },
};

export function serviceImage(service: Pick<ServiceSummary, 'slug' | 'heroImage'>): ImageRef | undefined {
  return service.heroImage ?? serviceImages[service.slug];
}

export function pujaImage(puja: Pick<Puja, 'slug' | 'image'>): ImageRef | undefined {
  return puja.image ?? pujaImages[puja.slug];
}

export function postImage(post: { slug: string; category?: { slug: string }; coverImage?: ImageRef }): ImageRef | undefined {
  if (post.coverImage) return post.coverImage;
  if (post.category?.slug === 'marriage') return serviceImages['marriage-matching'];
  if (post.category?.slug === 'vastu') return serviceImages['vastu-shastra'];
  if (post.category?.slug === 'remedies' && !/puja|homa/i.test(post.slug)) return serviceImages['dosha-remedies'];
  if (post.category?.slug === 'remedies' || /puja|homa/i.test(post.slug)) {
    return { src: '/images/pujas/ganapathi-homa.jpg', alt: { en: 'A homa fire ritual in progress' } };
  }
  return zodiacChart;
}

export const localGalleryImages: ImageRef[] = [
  { src: '/images/pujas/lakshmi-kubera-puja.jpg', alt: { en: 'A decorated devotional shrine' } },
  { src: '/images/pujas/ganapathi-homa.jpg', alt: { en: 'A homa fire ritual in progress' } },
  { src: '/images/pujas/navagraha-altar.jpeg', alt: { en: 'A Navagraha puja altar' } },
];
