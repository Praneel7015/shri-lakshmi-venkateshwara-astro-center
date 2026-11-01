import { getSiteSettings } from '@/lib/content';
import { ts } from '@/lib/i18n';

/** /humans.txt: the people behind the site (humanstxt.org). */
export const dynamic = 'force-static';

export async function GET() {
  const s = await getSiteSettings();
  const body = [
    '/* TEAM */',
    `Centre: ${ts(s.name, 'en')}`,
    'Contact details coming soon',
    'Location and practitioner details awaiting confirmation',
    'Developer: Praneel S (https://praneel.sindhole.com)',
    '',
    '/* SITE */',
    'Languages: English, Kannada',
    'Standards: HTML, CSS',
    'Software: Next.js, Sanity',
  ].join('\n');
  return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
