import type { HomeSectionProps } from './types';
import { ts } from '@/lib/i18n';
import { TestimonialsRail } from '../TestimonialsRail';
import { GuruMessage } from '../GuruMessage';

export function HomeTestimonials({ locale, page, settings, text }: Pick<HomeSectionProps, 'locale' | 'page' | 'settings' | 'text'>) {
  return (<>
      <TestimonialsRail locale={locale} items={page.featuredTestimonials} title={text.testimonials.title} />
      {page.message && ts(page.message.quote, locale) && <GuruMessage locale={locale} page={page} settings={settings} />}
  </>);
}
