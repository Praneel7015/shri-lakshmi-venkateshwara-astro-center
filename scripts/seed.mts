/**
 * Loads the sample content (src/content/sample.ts) into Sanity, so the client
 * starts with a filled-in Studio instead of a blank one.
 *
 *   npm run seed            → uploads (needs NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_WRITE_TOKEN in .env.local)
 *   npm run seed -- --dry   → only writes studio/seed/sample.ndjson so you can inspect it
 *
 * Safe to re-run: documents are created or replaced by fixed IDs.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createClient } from '@sanity/client';
import { sample } from '../src/content/sample';

// Read .env.local if it exists (Node 20.12+ built-in).
try {
  process.loadEnvFile('.env.local');
} catch {
  /* no .env.local yet */
}

type Doc = { _id: string; _type: string; [key: string]: unknown };

const slug = (current: string) => ({ _type: 'slug', current });
const ref = (_ref: string) => ({ _type: 'reference', _ref });

/** Sanity needs a unique `_key` on every object inside an array. */
let n = 0;
function addKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) =>
      item && typeof item === 'object' && !Array.isArray(item) ? { _key: `seed${(n++).toString(36)}`, ...addKeys(item) } : addKeys(item),
    ) as T;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, addKeys(v)])) as T;
  }
  return value;
}
const typed = <T extends object>(type: string, items: T[] = []) => items.map((item) => ({ _type: type, ...item }));

const { siteSettings, homePage, aboutPage, services, pujas, posts, categories, testimonials, areas, faqs, legalPages } = sample;

const docs: Doc[] = [
  { _id: 'siteSettings', _type: 'siteSettings', ...siteSettings },
  {
    _id: 'homePage',
    _type: 'homePage',
    ...homePage,
    hero: typed('heroSlide', homePage.hero),
    stats: typed('stat', homePage.stats),
    reasons: typed('reason', homePage.reasons),
    faqs: typed('faqItem', homePage.faqs),
    featuredServices: homePage.featuredServices.map((s) => ref(`service-${s.slug}`)),
    featuredTestimonials: homePage.featuredTestimonials.map((_, i) => ref(`testimonial-${i}`)),
  },
  { _id: 'aboutPage', _type: 'aboutPage', ...aboutPage, credentials: typed('credential', aboutPage.credentials) },
  { _id: 'author-guruji', _type: 'author', ...posts[0].author },
  ...categories.map((c) => ({ _id: `category-${c.slug}`, _type: 'category', title: c.title, slug: slug(c.slug) })),
  ...services.map(({ slug: s, relatedPosts: _unused, ...rest }, i) => ({
    _id: `service-${s}`, _type: 'service', ...rest, slug: slug(s), order: i,
    process: typed('step', rest.process), whySeek: typed('localeString', rest.whySeek), faqs: typed('faqItem', rest.faqs),
  })),
  ...pujas.map(({ slug: s, ...rest }, i) => ({ _id: `puja-${s}`, _type: 'puja', ...rest, slug: slug(s), order: i, benefits: typed('localeString', rest.benefits) })),
  ...posts.map(({ slug: s, category, author: _a, relatedServices, hasKannada: _h, ...rest }) => ({
    _id: `post-${s}`, _type: 'blogPost', ...rest, slug: slug(s),
    category: category && ref(`category-${category.slug}`),
    author: ref('author-guruji'),
    relatedServices: relatedServices.map((r) => ref(`service-${r.slug}`)),
    faqs: typed('faqItem', rest.faqs),
  })),
  ...testimonials.map((t, i) => ({ _id: `testimonial-${i}`, _type: 'testimonial', ...t })),
  ...areas.map(({ slug: s, nearby, ...rest }) => ({
    _id: `area-${s}`, _type: 'area', ...rest, slug: slug(s), nearby: nearby.map((x) => ref(`area-${x}`)), faqs: typed('faqItem', rest.faqs),
  })),
  ...faqs.map((f, i) => ({ _id: `faq-${i}`, _type: 'faq', ...f, order: i })),
  ...legalPages.map(({ slug: s, ...rest }) => ({ _id: `legal-${s}`, _type: 'legalPage', ...rest, slug: slug(s) })),
].map(addKeys);

const outDir = join(import.meta.dirname, '..', 'studio', 'seed');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'sample.ndjson'), docs.map((d) => JSON.stringify(d)).join('\n'));
console.log(`Prepared ${docs.length} documents → studio/seed/sample.ndjson`);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
if (process.argv.includes('--dry')) process.exit(0);
if (!projectId || !token) {
  console.log('No NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_WRITE_TOKEN in .env.local: skipped upload.');
  process.exit(0);
}

const client = createClient({ projectId, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production', apiVersion: '2026-01-01', token, useCdn: false });
const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());
await tx.commit();
console.log(`Uploaded ${docs.length} documents to Sanity project ${projectId}.`);
