import type { HomeSectionProps } from './types';
import { href, ui } from '@/lib/i18n';
import { faqSchema } from '@/lib/seo';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';

export function HomeFaq({ locale, page, text }: Pick<HomeSectionProps, 'locale' | 'page' | 'text'>) {
  const d = ui(locale);
  return (<>
      {/* FAQ */}
      {page.faqs.length > 0 && (
        <section className="bg-sand stars relative py-16 md:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="text-3xl text-night md:text-[2.6rem]">{text.faq.title}</h2>
              <p className="mt-4 max-w-md text-muted">{text.faq.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={href(locale, '/contact/')}>
                  {d.nav.contact}
                </ButtonLink>
                <ButtonLink href={href(locale, '/faq/')} variant="outline">{d.cta.allQuestions}</ButtonLink>
              </div>
            </div>
            <Accordion items={page.faqs} locale={locale} />
          </div>
          <JsonLd data={faqSchema(page.faqs, locale)} />
        </section>
      )}
  </>);
}
