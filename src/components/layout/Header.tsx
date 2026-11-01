import Link from 'next/link';
import type { Locale, ServiceSummary, SiteSettings } from '@/types/content';
import { href, ui } from '@/lib/i18n';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { mainNav, secondaryNav } from './navigation';
export function Header({
  locale,
  settings,
}: {
  locale: Locale;
  settings: SiteSettings;
  services: ServiceSummary[];
}) {
  const d = ui(locale);
  const nav = mainNav(d);
  return (
    <header className="site-header sticky top-0 z-40 border-b border-marigold/20 bg-night text-moon">
      <div className="container-site flex items-center justify-between gap-4 py-5">
        <Logo locale={locale} settings={settings} />
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-5">
            {nav.map((i) => (
              <li key={i.path}>
                <Link
                  className="text-sm text-moon/85 hover:text-marigold"
                  href={href(locale, i.path)}
                >
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitch locale={locale} />
          <div className="hidden lg:block">
            <ButtonLink href={href(locale, '/contact/')}>
              {d.cta.book}
            </ButtonLink>
          </div>
          <MobileMenu
            items={[
              { label: d.nav.home, href: href(locale, '/') },
              ...nav.map((i) => ({
                label: i.label,
                href: href(locale, i.path),
              })),
            ]}
            secondary={secondaryNav(d).map((i) => ({
              label: i.label,
              href: href(locale, i.path),
            }))}
            labels={{ menu: d.menu, close: d.close }}
            footer={
              <ButtonLink href={href(locale, '/contact/')}>
                {d.cta.book}
              </ButtonLink>
            }
          />
        </div>
      </div>
    </header>
  );
}
