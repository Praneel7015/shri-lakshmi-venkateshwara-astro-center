import { createClient } from '@sanity/client';
import { apiVersion, dataset, isSanityConfigured, projectId } from './env';

/**
 * The one Sanity client used by the site. Content is only read at build time
 * (the site is a static export), so the CDN is turned off to always get the
 * freshest published version.
 */
export const sanityClient = isSanityConfigured && process.env.CONTENT_SOURCE !== 'local'
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
  : null;
