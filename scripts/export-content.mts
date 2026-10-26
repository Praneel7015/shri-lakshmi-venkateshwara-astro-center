/**
 * Exports everything written in Sanity into plain files, so the content never
 * depends on Sanity (no vendor lock-in):
 *
 *   content/content.json   every document, in the exact shape the website reads
 *   content/media/…        every uploaded image, as normal image files
 *   content/blog/*.md      each blog post as Markdown with frontmatter (any CMS can import these)
 *
 *   npm run export-content                    → writes ./content
 *   npm run export-content -- --out backup    → writes ./backup
 *
 * The website can build from content/content.json with Sanity switched off:
 * see README → "Leaving Sanity".
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createClient } from '@sanity/client';
import type { PortableTextBlock } from '@portabletext/react';

try {
  process.loadEnvFile('.env.local');
} catch {
  /* CI passes values through the environment */
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID (in .env.local or the environment) first.');
  process.exit(1);
}
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const client = createClient({ projectId, dataset, apiVersion: '2026-01-01', useCdn: false, token: process.env.SANITY_READ_TOKEN || undefined, perspective: 'published' });

const outArg = process.argv.indexOf('--out');
const OUT = join(process.cwd(), outArg > -1 ? process.argv[outArg + 1] : 'content');
mkdirSync(join(OUT, 'media'), { recursive: true });
mkdirSync(join(OUT, 'blog'), { recursive: true });

// ── 1. Fetch every document, shaped like src/content/sample.ts ──────────
const summary = `{ "slug": slug.current, title, shortDescription, icon, heroImage }`;
const data = await client.fetch(/* groq */ `{
  "siteSettings": *[_id == "siteSettings"][0],
  "siteText": *[_id == "siteText"][0],
  "homePage": *[_id == "homePage"][0]{ ..., "featuredServices": featuredServices[]->${summary}, "featuredTestimonials": featuredTestimonials[]->{ name, city, text, rating, service, youtubeUrl, date } },
  "aboutPage": *[_id == "aboutPage"][0],
  "services": *[_type == "service"] | order(order asc) { ..., "slug": slug.current, "relatedPosts": [] },
  "pujas": *[_type == "puja"] | order(order asc) { ..., "slug": slug.current },
  "posts": *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc) {
    ..., "slug": slug.current,
    "category": category->{ "slug": slug.current, title },
    "author": author->{ name, role, bio, image },
    "relatedServices": relatedServices[]->${summary},
    "hasKannada": coalesce(count(body.kn), 0) > 0
  },
  "categories": *[_type == "category"] { "slug": slug.current, title },
  "testimonials": *[_type == "testimonial"] | order(date desc) { name, city, text, rating, service, youtubeUrl, date },
  "gallery": *[_type == "galleryItem"] | order(order asc) { image, caption, youtubeUrl },
  "areas": *[_type == "area"] { ..., "slug": slug.current, "nearby": nearby[]->slug.current },
  "faqs": *[_type == "faq"] | order(order asc) { question, answer },
  "legalPages": *[_type == "legalPage"] { ..., "slug": slug.current }
}`);

// ── 2. Download images and point the content at the local copies ────────
const downloaded = new Map<string, string>();
async function localiseImages(value: unknown): Promise<unknown> {
  if (Array.isArray(value)) return Promise.all(value.map(localiseImages));
  if (!value || typeof value !== 'object') return value;
  const obj = value as Record<string, unknown>;
  const ref = (obj.asset as { _ref?: string } | undefined)?._ref;
  if (ref?.startsWith('image-')) {
    // image-<id>-<w>x<h>-<ext>  →  <id>-<w>x<h>.<ext>
    const [, id, dims, ext] = ref.split('-');
    const file = `${id}-${dims}.${ext}`;
    if (!downloaded.has(ref)) {
      const target = join(OUT, 'media', file);
      if (!existsSync(target)) {
        const res = await fetch(`https://cdn.sanity.io/images/${projectId}/${dataset}/${file}`);
        if (res.ok) writeFileSync(target, Buffer.from(await res.arrayBuffer()));
      }
      downloaded.set(ref, `/media/${file}`);
    }
    const rest = Object.fromEntries(Object.entries(obj).filter(([k]) => k !== 'asset' && k !== 'crop'));
    return { ...(await localiseImages(rest) as object), src: downloaded.get(ref) };
  }
  const entries = await Promise.all(Object.entries(obj).map(async ([k, v]) => [k, await localiseImages(v)] as const));
  return Object.fromEntries(entries);
}
const content = (await localiseImages(data)) as typeof data;
writeFileSync(join(OUT, 'content.json'), JSON.stringify(content, null, 2));

// ── 3. Blog posts as Markdown ────────────────────────────────────────────
const text = (b: PortableTextBlock) => ((b.children as { text: string }[] | undefined) ?? []).map((c) => c.text).join('');
function toMarkdown(blocks: PortableTextBlock[] = []): string {
  return blocks
    .map((b) => {
      const v = b as PortableTextBlock & Record<string, unknown>;
      switch (b._type) {
        case 'block':
          if (b.style === 'h2') return `## ${text(b)}`;
          if (b.style === 'h3') return `### ${text(b)}`;
          if (b.style === 'blockquote') return `> ${text(b)}`;
          if (b.listItem === 'bullet') return `- ${text(b)}`;
          if (b.listItem === 'number') return `1. ${text(b)}`;
          return text(b);
        case 'image': return `![${(v.alt as { en?: string })?.en ?? ''}](${v.src ?? ''})`;
        case 'callout': return `> **Tip:** ${v.text}`;
        case 'shloka': return `> ${String(v.sanskrit).replace(/\n/g, '\n> ')}${v.meaning ? `\n>\n> ${v.meaning}` : ''}`;
        case 'ctaBlock': return `<!-- booking button: ${v.heading ?? ''} -->`;
        case 'youtube': return `[YouTube video](${v.url})`;
        default: return '';
      }
    })
    .join('\n\n');
}
const yaml = (s: unknown) => JSON.stringify(s ?? '');
for (const post of content.posts ?? []) {
  for (const lang of ['en', 'kn'] as const) {
    const body = post.body?.[lang];
    if (!body?.length) continue;
    const front = [
      '---',
      `title: ${yaml(post.title?.[lang] ?? post.title?.en)}`,
      `slug: ${post.slug}`,
      `lang: ${lang}`,
      `date: ${post.publishedAt}`,
      `excerpt: ${yaml(post.excerpt?.[lang] ?? post.excerpt?.en)}`,
      `category: ${yaml(post.category?.slug)}`,
      `cover: ${yaml(post.coverImage?.src)}`,
      '---',
      '',
    ].join('\n');
    writeFileSync(join(OUT, 'blog', `${post.slug}${lang === 'kn' ? '.kn' : ''}.md`), front + toMarkdown(body) + '\n');
  }
}

writeFileSync(
  join(OUT, 'README.md'),
  `# Content export\n\nExported ${new Date().toISOString()} from Sanity project \`${projectId}\` (${dataset}).\n\n` +
    '- `content.json`: every document, in the shape the website reads (see src/types/content.ts).\n' +
    '- `media/`: every uploaded image.\n- `blog/`: each post as Markdown (`.kn.md` = Kannada).\n\n' +
    'To run the website without Sanity, copy this folder to `content/` in the main branch and remove NEXT_PUBLIC_SANITY_PROJECT_ID. See the main README.\n',
);

console.log(`Exported ${Object.values(content).flat().length} items, ${downloaded.size} images, ${(content.posts ?? []).length} posts → ${OUT}`);
