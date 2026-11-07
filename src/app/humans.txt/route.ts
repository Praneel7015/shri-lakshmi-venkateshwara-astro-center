import { getSiteSettings } from '@/lib/content';
import { ts } from '@/lib/i18n';

/** /humans.txt: the people behind the site (humanstxt.org). */
export const dynamic = 'force-static';

export async function GET() {
  const s = await getSiteSettings();
  const body = [
    '/* TEAM */',
    `Centre: ${ts(s.name, 'en')}`,
    s.phone ? `Phone: ${s.phone}` : '',
    s.email ? `Email: ${s.email}` : '',
    ts(s.hours, 'en') ? `Opening hours: ${ts(s.hours, 'en')}` : '',
    [s.address?.locality, s.address?.city, s.address?.region].filter(Boolean).length
      ? `Location: ${[s.address?.locality, s.address?.city, s.address?.region].filter(Boolean).join(', ')}`
      : '',
    'Developer: Praneel S (https://praneel.sindhole.com)',
    '',
    '/* SITE */',
    'Languages: English, Kannada',
    'Standards: HTML, CSS',
    'Software: Next.js, Sanity',
  ].filter(Boolean).join('\n');
  return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
