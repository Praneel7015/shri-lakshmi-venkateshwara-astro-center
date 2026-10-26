import { getSiteSettings } from '@/lib/content';
import { ts } from '@/lib/i18n';

/** /humans.txt: the people behind the site (humanstxt.org). */
export const dynamic = 'force-static';

export async function GET() {
  const s = await getSiteSettings();
  const body = [
    '/* TEAM */',
    `Astrologer: ${ts(s.astrologerName, 'en')}`,
    `Contact: ${s.email}`,
    `Location: ${s.address.locality}, ${s.address.city}, India`,
    '',
    '/* SITE */',
    'Languages: English, Kannada',
    'Standards: HTML, CSS, schema.org',
    'Software: Next.js, Sanity',
  ].join('\n');
  return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
