import type { MetadataRoute } from 'next';
import { getAreas, getCategories, getLegalPages, getPosts, getServices } from '@/lib/content';
import { href } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/metadata';

export const dynamic = 'force-static';

type Entry = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly'; lastModified?: string; kannada?: boolean };

/** The later of two dates (a post can be edited before its scheduled publish date). */
const latest = (...dates: (string | undefined)[]) =>
  dates.filter((d): d is string => Boolean(d)).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

/**
 * Every page in both languages, with hreflang alternates. New services,
 * posts and areas from the Studio appear here automatically on the next build.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, categories, areas, legal] = await Promise.all([getServices(), getPosts(), getCategories(), getAreas(), getLegalPages()]);

  const entries: Entry[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/about/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pujas/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/testimonials/', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/gallery/', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/faq/', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact/', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/best-astrologer-in/', priority: 0.7, changeFrequency: 'monthly' },
    ...services.map((s) => ({ path: `/services/${s.slug}/`, priority: 0.9, changeFrequency: 'monthly' as const, lastModified: s._updatedAt })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}/`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: latest(p._updatedAt, p.publishedAt), kannada: p.hasKannada })),
    ...categories.map((c) => ({ path: `/blog/category/${c.slug}/`, priority: 0.5, changeFrequency: 'weekly' as const })),
    ...areas.map((a) => ({ path: `/best-astrologer-in/${a.slug}/`, priority: 0.8, changeFrequency: 'monthly' as const, lastModified: a._updatedAt })),
    ...legal.map((l) => ({ path: `/${l.slug}/`, priority: 0.2, changeFrequency: 'yearly' as const, lastModified: l._updatedAt })),
  ];

  return entries.flatMap(({ path, kannada = true, lastModified, ...rest }) => {
    const en = absoluteUrl(href('en', path));
    const kn = absoluteUrl(href('kn', path));
    const alternates = kannada ? { languages: { 'en-IN': en, 'kn-IN': kn } } : undefined;
    const base = { ...rest, lastModified: lastModified ? new Date(lastModified) : undefined, alternates };
    // English-only posts: their Kannada URL is noindexed, so leave it out.
    return kannada ? [{ url: en, ...base }, { url: kn, ...base }] : [{ url: en, ...base }];
  });
}
