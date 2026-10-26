/** Sanity connection settings, read from `.env.local` (see `.env.example`). */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
// Hard-coded on purpose: Sanity recommends pinning the API version.
export const apiVersion = '2026-01-01';

/** False until a Sanity project ID is set; the site then uses sample content. */
export const isSanityConfigured = Boolean(projectId);
