import { getPosts, getSiteSettings } from '@/lib/content';
import { href, htmlLang, isLocale, LOCALES, ts } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/metadata';

// RSS feed per language: /blog/rss.xml and /kn/blog/rss.xml
export const dynamic = 'force-static';
export const revalidate = 3600;
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : 'en';
  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);
  const items = posts
    .filter((p) => locale === 'en' || p.hasKannada)
    .map((p) => {
      const url = absoluteUrl(href(locale, `/blog/${p.slug}/`));
      return `<item><title>${escape(ts(p.title, locale))}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate><description>${escape(ts(p.excerpt, locale))}</description></item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(ts(settings.name, locale))}</title><link>${absoluteUrl(href(locale, '/blog/'))}</link><description>${escape(ts(settings.tagline, locale))}</description><language>${htmlLang[locale]}</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
