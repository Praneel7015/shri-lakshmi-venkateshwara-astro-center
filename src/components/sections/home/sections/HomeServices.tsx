import type { HomeSectionProps } from './types';
import { href, ui } from '@/lib/i18n';
import { ServiceCard, ServiceList } from '@/components/cards/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MoreLink } from '@/components/ui/ButtonLink';

export function HomeServices({ locale, page, text }: Pick<HomeSectionProps, 'locale' | 'page' | 'text'>) {
  const d = ui(locale);
  return (<>
      {/* Services: image cards on a starry sand band */}
      <section className="bg-sand stars relative py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            title={text.services.title}
            intro={text.services.intro}
          />
          <ServiceList>
            {page.featuredServices.map((s) => (
              <li key={s.slug}><ServiceCard service={s} locale={locale} /></li>
            ))}
          </ServiceList>
          <MoreLink href={href(locale, '/services/')} className="mt-6">{d.cta.allServices}</MoreLink>
        </div>
      </section>
  </>);
}
