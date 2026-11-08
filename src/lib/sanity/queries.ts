/**
 * Every GROQ query the site runs, in one place.
 * Each query returns data in the shape defined in `src/types/content.ts`.
 *
 * Tip: paste any of these into the "Vision" tab in the Studio to test it.
 */

// ── Reusable projections ───────────────────────────────────────────────
const serviceSummary = /* groq */ `{
  "slug": slug.current, title, shortDescription, icon, heroImage, _updatedAt
}`;

const postSummary = /* groq */ `{
  "slug": slug.current, title, excerpt, coverImage, publishedAt, _updatedAt,
  "category": category->{ "slug": slug.current, title },
  "hasKannada": coalesce(count(body.kn), 0) > 0
}`;

const testimonial = /* groq */ `{
  name, city, text, rating, source, service, youtubeUrl, date
}`;

// ── Singletons ─────────────────────────────────────────────────────────
export const siteSettingsQuery = /* groq */ `*[_id == "siteSettings"][0]`;

export const siteTextQuery = /* groq */ `*[_id == "siteText"][0]`;

export const homePageQuery = /* groq */ `*[_id == "homePage"][0]{
  ...,
  "featuredServices": featuredServices[]->${serviceSummary},
  "featuredTestimonials": featuredTestimonials[]->${testimonial}
}`;

export const aboutPageQuery = /* groq */ `*[_id == "aboutPage"][0]`;

// ── Services & pujas ───────────────────────────────────────────────────
export const servicesQuery = /* groq */ `*[_type == "service"] | order(order asc, title.en asc) ${serviceSummary}`;

export const serviceQuery = /* groq */ `*[_type == "service" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  "relatedPosts": *[_type == "blogPost" && references(^._id)] | order(publishedAt desc)[0...3] ${postSummary}
}`;

export const pujasQuery = /* groq */ `*[_type == "puja"] | order(order asc) { ..., "slug": slug.current }`;

// ── Blog ───────────────────────────────────────────────────────────────
// Only posts whose publish date has arrived are shown.
const livePosts = /* groq */ `_type == "blogPost" && defined(slug.current) && publishedAt <= now()`;

export const postsQuery = /* groq */ `*[${livePosts}] | order(publishedAt desc) ${postSummary}`;

export const postQuery = /* groq */ `*[${livePosts} && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  "category": category->{ "slug": slug.current, title },
  "author": author->{ name, role, bio, image },
  "relatedServices": relatedServices[]->${serviceSummary},
  "hasKannada": coalesce(count(body.kn), 0) > 0
}`;

export const categoriesQuery = /* groq */ `*[_type == "category"] | order(title.en asc) { "slug": slug.current, title }`;

// ── Everything else ────────────────────────────────────────────────────
export const testimonialsQuery = /* groq */ `*[_type == "testimonial"] | order(date desc) ${testimonial}`;

export const galleryQuery = /* groq */ `*[_type == "galleryItem"] | order(order asc) { image, caption, youtubeUrl }`;

export const areasQuery = /* groq */ `*[_type == "area"] | order(name.en asc) {
  ..., "slug": slug.current, "nearby": nearby[]->slug.current
}`;

export const faqsQuery = /* groq */ `*[_type == "faq"] | order(order asc) { question, answer }`;

export const legalPagesQuery = /* groq */ `*[_type == "legalPage"] { ..., "slug": slug.current }`;
