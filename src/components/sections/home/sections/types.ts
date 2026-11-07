import type { Locale } from '@/types/content';
import type { getHomePage, getPujas, getPosts, getGallery, getSiteSettings } from '@/lib/content';
import type { getPageText } from '@/lib/page-text';

export type HomeSectionProps = {
  locale: Locale;
  page: Awaited<ReturnType<typeof getHomePage>>;
  settings: Awaited<ReturnType<typeof getSiteSettings>>;
  pujas: Awaited<ReturnType<typeof getPujas>>;
  posts: Awaited<ReturnType<typeof getPosts>>;
  photos: Awaited<ReturnType<typeof getGallery>>;
  text: Awaited<ReturnType<typeof getPageText>>;
};
