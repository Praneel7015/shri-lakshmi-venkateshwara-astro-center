import Link from 'next/link';
import type { Category, Locale, PostSummary } from '@/types/content';
import { href, ts, ui } from '@/lib/i18n';
import { PostCard } from '@/components/cards/PostCard';

interface Props {
  locale: Locale;
  posts: PostSummary[];
  categories: Category[];
  /** Slug of the category being shown, or undefined for "All". */
  activeCategory?: string;
}

/** Category chips + featured post + grid. Shared by /blog/ and /blog/category/[slug]/. */
export function BlogIndex({ locale, posts, categories, activeCategory }: Props) {
  const d = ui(locale);
  const [featured, ...rest] = posts;
  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition-colors ${active ? 'border-night bg-night text-ivory' : 'border-line bg-white/70 text-night hover:border-night'}`;

  return (
    <section className="py-12 md:py-16">
      <div className="container-site">
        <nav aria-label="Categories" className="no-scrollbar -mx-5 mb-12 overflow-x-auto px-5">
          <ul className="flex w-max gap-2">
            <li><Link href={href(locale, '/blog/')} className={chip(!activeCategory)}>{d.blog.all}</Link></li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={href(locale, `/blog/category/${c.slug}/`)} className={chip(activeCategory === c.slug)}>{ts(c.title, locale)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {!featured ? (
          <p className="text-muted">{d.blog.empty}</p>
        ) : (
          <>
            <div className="mb-16 border-b border-line pb-16">
              <PostCard post={featured} locale={locale} large as="h2" />
            </div>
            <ul className="grid gap-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
              {rest.map((p) => (
                <li key={p.slug}><PostCard post={p} locale={locale} as="h2" /></li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
