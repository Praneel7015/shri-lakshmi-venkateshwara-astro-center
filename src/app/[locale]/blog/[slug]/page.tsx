import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Languages } from 'lucide-react';
import { getPost, getPosts, getSiteSettings } from '@/lib/content';
import { formatDate, href, LOCALES, localeFrom, t, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { articleSchema, faqSchema } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { headingsOf, readingMinutes, RichText } from '@/components/blog/RichText';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { PostCard } from '@/components/cards/PostCard';
import { postImage } from '@/lib/content/matching-images';
import { CtaBand } from '@/components/shared/CtaBand';



/**
 * Every post gets an English and a Kannada URL. If the Kannada body hasn't
 * been written, the Kannada page shows the English text with a notice, and is
 * marked noindex with its canonical pointing at English (see buildMetadata).
 */
export async function generateStaticParams() {
  const posts = await getPosts();
  return LOCALES.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/blog/[slug]'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const { slug } = await params;
  const [settings, post] = await Promise.all([getSiteSettings(), getPost(slug)]);
  if (!post) return {};
  return buildMetadata({
    locale, settings, path: `/blog/${slug}/`, title: ts(post.title, locale), description: ts(post.excerpt, locale),
    seo: post.seo, image: postImage(post), type: 'article', publishedTime: post.publishedAt, modifiedTime: post._updatedAt,
    hasKannada: post.hasKannada,
  });
}

export default async function PostPage({ params }: PageProps<'/[locale]/blog/[slug]'>) {
  const locale = await localeFrom(params);
  const { slug } = await params;
  const [settings, post, allPosts] = await Promise.all([getSiteSettings(), getPost(slug), getPosts()]);
  if (!post) notFound();

  const d = ui(locale);
  const title = ts(post.title, locale);
  const body = t(post.body, locale) ?? [];
  const toc = headingsOf(body);
  const englishOnly = locale === 'kn' && !post.hasKannada;
  const more = allPosts.filter((p) => p.slug !== slug && p.category?.slug === post.category?.slug).slice(0, 3);

  return (
    <>
      <PageHero
        locale={locale}
        title={title}
        eyebrow={post.category ? ts(post.category.title, locale) : d.blog.title}
        crumbs={[{ label: d.nav.blog, path: '/blog/' }, { label: title, path: `/blog/${slug}/` }]}
      />

      <article className="pb-16">
        <div className="container-site">
          {postImage(post) && (
            <div className="relative -mt-10 aspect-[21/9] overflow-hidden rounded-card md:-mt-14">
              <Picture image={postImage(post)} locale={locale} alt={title} sizes="(min-width: 1216px) 72rem, 100vw" priority />
            </div>
          )}

          <div className="grid pt-12 gap-12 lg:grid-cols-[14rem_1fr_14rem]">
            {/* Left: meta + table of contents */}
            <aside className="text-sm text-muted lg:sticky lg:top-32 lg:self-start">
              <p>
                {d.blog.by} <span className="font-semibold text-night">{ts(post.author?.name ?? settings.astrologerName, locale)}</span>
              </p>
              <p className="mt-1">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time> · {readingMinutes(body)} {d.blog.minRead}
              </p>
              {toc.length > 1 && (
                <nav aria-label={d.blog.onThisPage} className="mt-8 hidden lg:block">
                  <p className="mb-3 text-sm font-medium text-night">{d.blog.onThisPage}</p>
                  <ul className="space-y-2 border-l border-line">
                    {toc.map((h) => (
                      <li key={h.id}><a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 hover:border-lapis hover:text-night">{h.text}</a></li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>

            <div className="min-w-0">
              {englishOnly && (
                <p lang="kn" className="mb-8 flex items-center gap-3 rounded-2xl border border-line bg-sand px-5 py-4 text-night">
                  <Languages className="size-5 shrink-0 text-saffron-deep" aria-hidden="true" />
                  {d.blog.englishOnly}
                </p>
              )}
              <div lang={englishOnly ? 'en' : undefined}>
                <RichText value={body} locale={locale} settings={settings} />
              </div>

              {post.faqs.length > 0 && (
                <div className="mt-14">
                  <h2 className="mb-6 text-3xl text-night">{d.service.faq}</h2>
                  <Accordion items={post.faqs} locale={locale} />
                  <JsonLd data={faqSchema(post.faqs, locale)} />
                </div>
              )}

              {post.author && (
                <div className="mt-14 flex gap-5 rounded-card border border-line bg-white/70 p-6">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                    <Picture image={post.author.image} locale={locale} sizes="4rem" />
                  </div>
                  <div>
                    <p className="font-display text-xl text-night">{ts(post.author.name, locale)}</p>
                    <p className="text-sm text-saffron-deep">{ts(post.author.role, locale)}</p>
                    <p className="mt-2 text-muted">{ts(post.author.bio, locale)}</p>
                    <Link href={href(locale, '/about/')} className="mt-2 inline-block text-sm font-semibold text-saffron-deep hover:underline">{d.cta.aboutGuruji}</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right: related services */}
            {post.relatedServices.length > 0 && (
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <p className="mb-3 text-sm font-medium text-night">{d.blog.related}</p>
                <ul className="space-y-3">
                  {post.relatedServices.map((s) => (
                    <li key={s.slug}><ServiceCard service={s} locale={locale} variant="compact" /></li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="py-20">
          <div className="container-site">
            <SectionHeading title={d.service.related} />
            <ul className="flex flex-wrap justify-center gap-12 md:gap-6">
              {more.map((p) => (
                <li key={p.slug} className="w-full md:w-[calc((100%-3rem)/3)]"><PostCard post={p} locale={locale} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand locale={locale} settings={settings} />
      <JsonLd data={articleSchema(post, settings, locale)} />
    </>
  );
}
