import Link from 'next/link';
import type { Locale } from '@/types/content';
import { href, ui } from '@/lib/i18n';
import { breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from './JsonLd';
import { ZodiacWheel } from './Ornaments';

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

/** Night-sky header at the top of every inner page, with breadcrumbs. */
export function PageHero({ locale, title, intro, eyebrow, crumbs }: Props) {
  const d = ui(locale);
  const trail = [{ label: d.breadcrumbHome, path: '/' }, ...crumbs];

  return (
    <section className="bg-sky relative overflow-hidden pt-8 pb-14 text-moon md:pt-12 md:pb-20">
      {/* A still, faint quarter of the zodiac wheel ties inner pages to the home page */}
      <ZodiacWheel className="pointer-events-none absolute top-1/2 -right-48 hidden size-[30rem] -translate-y-1/2 text-marigold/12 md:block" />
      <div className="container-site gentle-arrival relative">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-moon/65">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {trail.map((c, i) => (
              <li key={c.path} className="flex min-w-0 items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === trail.length - 1 ? (
                  <span aria-current="page" className="truncate text-moon/90">{c.label}</span>
                ) : (
                  <Link href={href(locale, c.path)} className="hover:text-moon hover:underline">{c.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow mb-3 text-marigold">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl text-moon md:text-[3.5rem]">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-moon/75 md:text-xl">{intro}</p>}
      </div>
      <JsonLd data={breadcrumbSchema(trail.map((c) => ({ label: c.label, href: href(locale, c.path) })))} />
    </section>
  );
}
