import { getSiteSettings } from '@/lib/content';
import { SITE_URL } from '@/lib/metadata';

/** /.well-known/security.txt (RFC 9116): who to tell about a security problem. */
export const dynamic = 'force-static';

export async function GET() {
  const settings = await getSiteSettings();
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  const body = [
    `Contact: mailto:${settings.email}`,
    `Expires: ${expires.toISOString()}`,
    'Preferred-Languages: en, kn',
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
  ].join('\n');
  return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
