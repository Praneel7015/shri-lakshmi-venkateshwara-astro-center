import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategories, getPosts, getSiteSettings } from '@/lib/content';
import { LOCALES, localeFrom, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { CtaBand } from '@/components/shared/CtaBand';

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  return LOCALES.flatMap((locale) => categories.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/blog/category/[slug]'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const { slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);
  if (!category) return {};
  return buildMetadata({ locale, settings: await getSiteSettings(), path: `/blog/category/${slug}/`, title: ts(category.title, locale), description: ui(locale).meta.blog });
}

export default async function CategoryPage({ params }: PageProps<'/[locale]/blog/category/[slug]'>) {
  const locale = await localeFrom(params);
  const { slug } = await params;
  const d = ui(locale);
  const [settings, posts, categories] = await Promise.all([getSiteSettings(), getPosts(), getCategories()]);
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const title = ts(category.title, locale);

  return (
    <>
      <PageHero
        locale={locale}
        title={title}
        eyebrow={d.blog.title}
        crumbs={[{ label: d.nav.blog, path: '/blog/' }, { label: title, path: `/blog/category/${slug}/` }]}
      />
      <BlogIndex locale={locale} posts={posts.filter((p) => p.category?.slug === slug)} categories={categories} activeCategory={slug} />
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
