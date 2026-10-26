/**
 * The only file pages use to get content.
 *
 * When a Sanity project is configured (NEXT_PUBLIC_SANITY_PROJECT_ID), every
 * function reads from Sanity. Until then it returns the sample content in
 * `src/content/sample.ts`, so the site always builds and can be designed
 * before the client has entered anything.
 */
import { cache } from 'react';
import { sanityClient } from './sanity/client';
import * as q from './sanity/queries';
import { sample } from '@/content/sample';
import type {
  AboutPage, Area, Category, Faq, GalleryItem, HomePage, LegalPage, Post,
  PostSummary, Puja, Service, ServiceSummary, SiteSettings, Testimonial,
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
export const getSiteSettings = cache(() => fetchOr<SiteSettings>(q.siteSettingsQuery, sample.siteSettings));

export const getHomePage = cache(async (): Promise<HomePage> => {
  const page = await fetchOr<HomePage>(q.homePageQuery, sample.homePage);
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
  const page = await fetchOr<AboutPage>(q.aboutPageQuery, sample.aboutPage);
  return { ...page, credentials: list(page.credentials), gallery: list(page.gallery) };
});

export const getServices = cache(() =>
  fetchOr<ServiceSummary[]>(q.servicesQuery, sample.services).then(list),
);

export const getService = cache(async (slug: string): Promise<Service | undefined> => {
  const fallback = sample.services.find((s) => s.slug === slug);
  const service = sanityClient ? await sanityClient.fetch<Service | null>(q.serviceQuery, { slug }) : fallback;
  if (!service) return undefined;
  const relatedPosts = sanityClient
    ? list(service.relatedPosts)
    : sample.posts.filter((p) => p.relatedServices.some((s) => s.slug === slug)).slice(0, 3).map(toSummary);
  return { ...service, process: list(service.process), whySeek: list(service.whySeek), faqs: list(service.faqs), relatedPosts };
});

export const getPujas = cache(() => fetchOr<Puja[]>(q.pujasQuery, sample.pujas).then(list));

export const getPosts = cache(() =>
  fetchOr<PostSummary[]>(q.postsQuery, sample.posts.map(toSummary)).then(list),
);

export const getPost = cache(async (slug: string): Promise<Post | undefined> => {
  const post = sanityClient
    ? await sanityClient.fetch<Post | null>(q.postQuery, { slug })
    : sample.posts.find((p) => p.slug === slug);
  if (!post) return undefined;
  return {
    ...post,
    faqs: list(post.faqs),
    relatedServices: list(post.relatedServices),
    hasKannada: post.hasKannada ?? Boolean(post.body.kn?.length),
  };
});

export const getCategories = cache(() => fetchOr<Category[]>(q.categoriesQuery, sample.categories).then(list));

export const getTestimonials = cache(() =>
  fetchOr<Testimonial[]>(q.testimonialsQuery, sample.testimonials).then(list),
);

export const getGallery = cache(() => fetchOr<GalleryItem[]>(q.galleryQuery, sample.gallery).then(list));

export const getAreas = cache(async (): Promise<Area[]> => {
  const areas = await fetchOr<Area[]>(q.areasQuery, sample.areas).then(list);
  return areas.map((a) => ({ ...a, nearby: list(a.nearby), faqs: list(a.faqs) }));
});

export const getFaqs = cache(() => fetchOr<Faq[]>(q.faqsQuery, sample.faqs).then(list));

export const getLegalPages = cache(() => fetchOr<LegalPage[]>(q.legalPagesQuery, sample.legalPages).then(list));
