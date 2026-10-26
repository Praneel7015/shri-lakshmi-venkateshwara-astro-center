import Link from 'next/link';
import type { Locale } from '@/types/content';
import { href, ui } from '@/lib/i18n';
import { breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from './JsonLd';
import { KolamDivider, StarField, ZodiacWheel } from './Ornaments';

interface Crumb {
  label: string;
  /** Language-neutral path, e.g. `/services/`. */
  path: string;
}

interface Props {
  locale: Locale;
  title: string;
  intro?: string;
  eyebrow?: string;
  /** Breadcrumb trail after "Home". The last item is the current page. */
  crumbs: Crumb[];
}

/** Dark night-sky header used at the top of every inner page, with breadcrumbs. */
export function PageHero({ locale, title, intro, eyebrow, crumbs }: Props) {
  const d = ui(locale);
  const trail = [{ label: d.breadcrumbHome, path: '/' }, ...crumbs];

  return (
    <section className="bg-sky relative overflow-hidden pt-10 pb-16 text-moon md:pt-14 md:pb-24">
      <StarField className="pointer-events-none absolute inset-0 size-full text-moon/70" />
      {/* Half-visible turning wheel fills the empty right side on wide screens */}
      <ZodiacWheel className="animate-orbit pointer-events-none absolute top-1/2 -right-40 hidden size-[30rem] -translate-y-1/2 text-marigold/15 md:block lg:-right-20" />
      <div className="container-site relative">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-moon/60">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {trail.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === trail.length - 1 ? (
                  <span aria-current="page" className="text-moon/90">{c.label}</span>
                ) : (
                  <Link href={href(locale, c.path)} className="hover:text-marigold">{c.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow mb-4 text-marigold">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl text-moon md:text-6xl">{title}</h1>
        <KolamDivider className="mt-6 h-5 w-40 text-marigold/70" />
        {intro && <p className="mt-6 max-w-2xl text-lg text-moon/75 md:text-xl">{intro}</p>}
      </div>
      <JsonLd data={breadcrumbSchema(trail.map((c) => ({ label: c.label, href: href(locale, c.path) })))} />
    </section>
  );
}
