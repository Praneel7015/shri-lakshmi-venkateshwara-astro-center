import { createClient } from '@sanity/client';
import { apiVersion, dataset, isSanityConfigured, projectId } from './env';

/**
 * The one Sanity client used by the Vercel server. Cached pages are refreshed
 * by the protected Sanity webhook; bypassing the CDN ensures regenerated pages
 * read the latest published version.
 */
export const sanityClient = isSanityConfigured && process.env.CONTENT_SOURCE !== 'local'
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
  : null;
