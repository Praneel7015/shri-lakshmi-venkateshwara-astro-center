/**
 * The only file pages use to get content. Three possible sources, in order:
 *
 * 1. Sanity, when NEXT_PUBLIC_SANITY_PROJECT_ID is set (normal operation).
 * 2. `content/content.json`, a plain-file export made by `npm run export-content`
 *    (the nightly backup). Lets the site run with no Sanity at all.
 * 3. The sample content in `src/content/sample.ts`, so the site always builds.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cache } from 'react';
import { sanityClient } from './sanity/client';
import * as q from './sanity/queries';
import { sample } from '@/content/sample';
import { localGalleryImages } from '@/lib/content/matching-images';

type LocalContent = typeof sample & { siteText?: SiteText };
const exportFile = join(process.cwd(), 'content', 'content.json');
/** Content used when Sanity isn't configured: the exported files if present, else the sample. */
const local: LocalContent = process.env.CONTENT_SOURCE !== 'local' && existsSync(exportFile) ? { ...sample, ...JSON.parse(readFileSync(exportFile, 'utf8')) } : sample;
/** Posts whose publish date has arrived (Sanity's query does the same). */
const livePosts = () => local.posts.filter((p) => new Date(p.publishedAt) <= new Date());
import type {
  AboutPage, Area, Category, Faq, GalleryItem, HomePage, LegalPage, Post,
  PostSummary, Puja, Service, ServiceSummary, SiteSettings, SiteText, Testimonial,
} from '@/types/content';

async function fetchOr<T>(query: string, fallback: T, params: Record<string, string> = {}): Promise<T> {
  if (!sanityClient) return fallback;
  const result = await sanityClient.fetch<T | null>(query, params);
  return result ?? fallback;
}

/** Sanity returns `null` for empty arrays/fields; this keeps pages simple. */
const list = <T,>(value: T[] | null | undefined): T[] => value ?? [];

const toSummary = ({ slug, title, excerpt, coverImage, category, publishedAt, body }: Post): PostSummary => ({
  slug, title, excerpt, coverImage, category, publishedAt, hasKannada: Boolean(body.kn?.length),
});

// `cache` makes repeated calls during one build hit Sanity only once.
export const getSiteSettings = cache(async () => {
  const settings = await fetchOr<SiteSettings>(q.siteSettingsQuery, local.siteSettings);
  return {
    ...settings,
    name: settings.name?.en ? settings.name : local.siteSettings.name,
  };
});

/** Raw "Page headings & text". Pages use `getPageText()` from lib/page-text.ts instead. */
export const getSiteText = cache(() => fetchOr<SiteText>(q.siteTextQuery, local.siteText ?? {}));

export const getHomePage = cache(async (): Promise<HomePage> => {
  const page = await fetchOr<HomePage>(q.homePageQuery, local.homePage);
  return {
    ...page,
    hero: list(page.hero),
    stats: list(page.stats),
    reasons: list(page.reasons),
    faqs: list(page.faqs),
    featuredServices: list(page.featuredServices),
    featuredTestimonials: list(page.featuredTestimonials),
  };
});

export const getAboutPage = cache(async (): Promise<AboutPage> => {
  const page = await fetchOr<AboutPage>(q.aboutPageQuery, local.aboutPage);
  return { ...page, credentials: list(page.credentials), gallery: list(page.gallery) };
});

export const getServices = cache(() =>
  fetchOr<ServiceSummary[]>(q.servicesQuery, local.services).then(list),
);

export const getService = cache(async (slug: string): Promise<Service | undefined> => {
  const fallback = local.services.find((s) => s.slug === slug);
  const service = sanityClient ? await sanityClient.fetch<Service | null>(q.serviceQuery, { slug }) : fallback;
  if (!service) return undefined;
  const relatedPosts = sanityClient
    ? list(service.relatedPosts)
    : livePosts().filter((p) => p.relatedServices.some((s) => s.slug === slug)).slice(0, 3).map(toSummary);
  return { ...service, process: list(service.process), whySeek: list(service.whySeek), faqs: list(service.faqs), relatedPosts };
});

export const getPujas = cache(() => fetchOr<Puja[]>(q.pujasQuery, local.pujas).then(list));

export const getPosts = cache(() =>
  fetchOr<PostSummary[]>(q.postsQuery, livePosts().map(toSummary)).then(list),
);

export const getPost = cache(async (slug: string): Promise<Post | undefined> => {
  const post = sanityClient
    ? await sanityClient.fetch<Post | null>(q.postQuery, { slug })
    : livePosts().find((p) => p.slug === slug);
  if (!post) return undefined;
  return {
    ...post,
    faqs: list(post.faqs),
    relatedServices: list(post.relatedServices),
    hasKannada: post.hasKannada ?? Boolean(post.body.kn?.length),
  };
});

export const getCategories = cache(() => fetchOr<Category[]>(q.categoriesQuery, local.categories).then(list));

export const getTestimonials = cache(() =>
  fetchOr<Testimonial[]>(q.testimonialsQuery, local.testimonials).then(list),
);

export const getGallery = cache(async () => {
  const items = await fetchOr<GalleryItem[]>(q.galleryQuery, local.gallery).then(list);
  const publishedItems = items.filter((item) => item.image || item.youtubeUrl);
  return [...publishedItems, ...localGalleryImages.map((image) => ({ image }))];
});

export const getAreas = cache(async (): Promise<Area[]> => {
  const areas = await fetchOr<Area[]>(q.areasQuery, local.areas).then(list);
  return areas.map((a) => ({ ...a, nearby: list(a.nearby), faqs: list(a.faqs) }));
});

export const getFaqs = cache(() => fetchOr<Faq[]>(q.faqsQuery, local.faqs).then(list));

export const getLegalPages = cache(() => fetchOr<LegalPage[]>(q.legalPagesQuery, local.legalPages).then(list));
