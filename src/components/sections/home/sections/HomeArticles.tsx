import type { HomeSectionProps } from './types';
import { href, ui } from '@/lib/i18n';
import { PostCard } from '@/components/cards/PostCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MoreLink } from '@/components/ui/ButtonLink';

export function HomeArticles({ locale, posts, text }: Pick<HomeSectionProps, 'locale' | 'posts' | 'text'>) {
  const d = ui(locale);
  return (<>
      {/* Latest articles */}
      {posts.length > 0 && (
        <section className="pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="container-site">
            <SectionHeading
              title={text.blog.homeTitle}
              action={<MoreLink href={href(locale, '/blog/')}>{d.cta.allPosts}</MoreLink>}
            />
            <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug}><PostCard post={p} locale={locale} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
  </>);
}
