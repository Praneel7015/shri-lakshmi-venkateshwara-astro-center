import type { Metadata } from 'next';
import { getCategories, getPosts, getSiteSettings } from '@/lib/content';
import { localeFrom, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { CtaBand } from '@/components/shared/CtaBand';

export async function generateMetadata({ params }: PageProps<'/[locale]/blog'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const d = ui(locale);
  return buildMetadata({ locale, settings: await getSiteSettings(), path: '/blog/', title: d.blog.title, description: d.meta.blog });
}

export default async function BlogPage({ params }: PageProps<'/[locale]/blog'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, posts, categories] = await Promise.all([getSiteSettings(), getPosts(), getCategories()]);

  return (
    <>
      <PageHero locale={locale} title={d.blog.title} intro={d.blog.intro} crumbs={[{ label: d.nav.blog, path: '/blog/' }]} />
      <BlogIndex locale={locale} posts={posts} categories={categories} />
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
