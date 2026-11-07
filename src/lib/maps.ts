/**
 * Accept either a Google Maps embed URL or the iframe snippet copied from
 * Google Maps. Only the iframe's HTTPS src is used; pasted markup is never
 * rendered as HTML.
 */
export function getGoogleMapsEmbedUrl(input?: string | null): string | null {
  const value = input?.trim();
  if (!value) return null;

  const iframe = /<iframe\b[^>]*\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/i.exec(value);
  const source = (iframe?.[1] ?? iframe?.[2] ?? iframe?.[3] ?? value).replace(/&amp;/gi, '&');

  try {
    const url = new URL(source);
    const allowedHosts = new Set([
      'google.com',
      'www.google.com',
      'maps.google.com',
      'google.co.in',
      'www.google.co.in',
      'maps.google.co.in',
    ]);
    if (url.protocol !== 'https:' || !allowedHosts.has(url.hostname.toLowerCase())) return null;
    if (!url.pathname.startsWith('/maps')) return null;
    return url.toString();
  } catch {
    return null;
  }
}
