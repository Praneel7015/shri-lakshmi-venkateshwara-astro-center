import { createImageUrlBuilder } from '@sanity/image-url';
import type { ImageRef } from '@/types/content';
import { dataset, projectId } from './env';

const builder = createImageUrlBuilder({ projectId: projectId || 'placeholder', dataset });

/**
 * Returns a URL for any image in the content: Sanity assets go through the
 * Sanity image CDN, sample/local images are returned as-is.
 */
export function imageUrl(image: ImageRef | undefined, width = 1200): string | undefined {
  if (!image) return undefined;
  if (image.src) return image.src;
  if (!image.asset?._ref) return undefined;
  return builder.image(image).width(width).auto('format').fit('max').url();
}
