/**
 * `next/image` loader. Static exports can't use Next's built-in image
 * optimiser, so we ask the Sanity CDN for the right width instead.
 * Local images (e.g. `/images/logo.svg`) are returned untouched.
 */
export default function sanityLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith('https://cdn.sanity.io')) return src;
  const url = new URL(src);
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  url.searchParams.set('auto', 'format');
  return url.toString();
}
