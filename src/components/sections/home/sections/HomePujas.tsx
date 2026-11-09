import type { HomeSectionProps } from './types';
import { href, ui } from '@/lib/i18n';
import { PujaCard } from '@/components/cards/PujaCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MoreLink } from '@/components/ui/ButtonLink';

export function HomePujas({ locale, settings, pujas, text }: Pick<HomeSectionProps, 'locale' | 'settings' | 'pujas' | 'text'>) {
  const d = ui(locale);
  return (<>
      {/* Pujas */}
      {pujas.length > 0 && (
        <section className="pt-16 pb-8 md:pt-24 md:pb-12">
          <div className="container-site">
            <SectionHeading
              title={text.pujas.title}
              intro={text.pujas.intro}
            />
            {/* Swipeable row on phones, three columns from tablet up */}
            <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
              {pujas.slice(0, 3).map((p) => (
                <li key={p.slug} className="w-[82%] shrink-0 snap-start sm:w-[55%] md:w-auto">
                  <PujaCard puja={p} locale={locale} settings={settings} />
                </li>
              ))}
            </ul>
            <MoreLink href={href(locale, '/pujas/')} className="mt-6">{d.cta.allPujas}</MoreLink>
          </div>
        </section>
      )}
  </>);
}
