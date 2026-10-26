import { getPosts, getServices, getSiteSettings } from '@/lib/content';
import { ts } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/metadata';

/** /llms.txt: a plain-text summary of the site for AI assistants (llmstxt.org). */
export const dynamic = 'force-static';

export async function GET() {
  const [settings, services, posts] = await Promise.all([getSiteSettings(), getServices(), getPosts()]);
  const a = settings.address;
  const lines = [
    `# ${ts(settings.name, 'en')}`,
    '',
    `> ${ts(settings.defaultSeo.metaDescription, 'en')}`,
    '',
    `Astrologer: ${ts(settings.astrologerName, 'en')}`,
    `Address: ${ts(a.street, 'en')}, ${a.locality}, ${a.city} ${a.postalCode}, ${a.region}, India`,
    `Phone / WhatsApp: ${settings.phone}`,
    `Hours: ${ts(settings.hours, 'en')}`,
    'Languages: Kannada, English (site available at / and /kn/)',
    '',
    '## Services',
    ...services.map((s) => `- [${ts(s.title, 'en')}](${absoluteUrl(`/services/${s.slug}/`)}): ${ts(s.shortDescription, 'en')}`),
    '',
    '## Articles',
    ...posts.map((p) => `- [${ts(p.title, 'en')}](${absoluteUrl(`/blog/${p.slug}/`)})`),
    '',
    '## Pages',
    `- [About](${absoluteUrl('/about/')})`,
    `- [Pujas](${absoluteUrl('/pujas/')})`,
    `- [Contact](${absoluteUrl('/contact/')})`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
