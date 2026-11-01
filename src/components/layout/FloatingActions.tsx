import type { Locale, SiteSettings } from '@/types/content';
import { ui } from '@/lib/i18n';
import { BackToTop } from './BackToTop';
export function FloatingActions({
  locale,
  settings,
}: {
  locale: Locale;
  settings: SiteSettings;
}) {
  void settings;
  return <BackToTop label={ui(locale).backToTop} />;
}
