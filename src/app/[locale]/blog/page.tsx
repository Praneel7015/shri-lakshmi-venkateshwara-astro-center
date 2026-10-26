import type { Metadata } from 'next';
import { getCategories, getPosts, getSiteSettings } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { PageHero } from '@/components/ui/PageHero';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { CtaBand } from '@/components/shared/CtaBand';

export async function generateMetadata({ params }: PageProps<'/[locale]/blog'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const text = await getPageText(locale);
  return buildMetadata({ locale, settings: await getSiteSettings(), path: '/blog/', title: text.blog.title, description: ui(locale).meta.blog });
}

export default async function BlogPage({ params }: PageProps<'/[locale]/blog'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, posts, categories, text] = await Promise.all([getSiteSettings(), getPosts(), getCategories(), getPageText(locale)]);

  return (
    <>
      <PageHero locale={locale} title={text.blog.title} intro={text.blog.intro} crumbs={[{ label: d.nav.blog, path: '/blog/' }]} />
      <BlogIndex locale={locale} posts={posts} categories={categories} />
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
