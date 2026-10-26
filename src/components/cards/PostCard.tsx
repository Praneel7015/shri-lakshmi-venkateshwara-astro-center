import Link from 'next/link';
import type { Locale, PostSummary } from '@/types/content';
import { formatDate, href, ts } from '@/lib/i18n';
import { Picture } from '@/components/ui/Picture';

export function PostCard({ post, locale, large = false, as: Heading = 'h3' }: { post: PostSummary; locale: Locale; large?: boolean; as?: 'h2' | 'h3' }) {
  return (
    <article className={`group relative flex h-full flex-col ${large ? 'md:grid md:grid-cols-2 md:items-center md:gap-10' : ''}`}>
      <div className={`relative overflow-hidden rounded-card ${large ? 'aspect-[4/3]' : 'aspect-[3/2]'}`}>
        <Picture
          image={post.coverImage}
          locale={locale}
          alt={ts(post.title, locale)}
          sizes={large ? '(min-width: 768px) 38rem, 100vw' : '(min-width: 768px) 24rem, 100vw'}
          
        />
      </div>
      <div className={large ? 'mt-6 md:mt-0' : 'mt-5 flex flex-1 flex-col'}>
        <p className="flex flex-wrap items-center gap-x-3 text-sm text-muted">
          {post.category && <span className="font-medium text-lapis">{ts(post.category.title, locale)}</span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
        </p>
        <Heading className={`mt-2 text-night decoration-lapis/40 group-hover:underline ${large ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
          {/* The link covers the whole card (see `after:` classes) */}
          <Link href={href(locale, `/blog/${post.slug}/`)} className="after:absolute after:inset-0">
            {ts(post.title, locale)}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-muted">{ts(post.excerpt, locale)}</p>
      </div>
    </article>
  );
}
