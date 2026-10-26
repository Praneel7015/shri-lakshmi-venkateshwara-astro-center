import type { Metadata } from 'next';
import { waLink } from '@/lib/contact';
import { getHomePage, getPosts, getPujas, getSiteSettings } from '@/lib/content';
import { href, localeFrom, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { faqSchema } from '@/lib/seo';
import { Hero } from '@/components/sections/home/Hero';
import { AboutIntro } from '@/components/sections/home/AboutIntro';
import { WhyUs } from '@/components/sections/home/WhyUs';
import { GuruMessage } from '@/components/sections/home/GuruMessage';
import { TestimonialsRail } from '@/components/sections/home/TestimonialsRail';
import { ServiceCard, ServiceList } from '@/components/cards/ServiceCard';
import { PujaCard } from '@/components/cards/PujaCard';
import { PostCard } from '@/components/cards/PostCard';
import { CtaBand } from '@/components/shared/CtaBand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const [settings, page] = await Promise.all([getSiteSettings(), getHomePage()]);
  return buildMetadata({
    locale,
    settings,
    path: '/',
    title: ts(settings.defaultSeo.metaTitle, locale),
    description: ts(settings.defaultSeo.metaDescription, locale),
    seo: page.seo ?? settings.defaultSeo,
  });
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const locale = await localeFrom(params);
  const d = ui(locale);
  const [settings, page, pujas, posts, text] = await Promise.all([getSiteSettings(), getHomePage(), getPujas(), getPosts(), getPageText(locale)]);

  return (
    <>
      <Hero locale={locale} page={page} settings={settings} />
      <AboutIntro locale={locale} page={page} settings={settings} />

      {/* Services: a ruled two-column list */}
      <section className="pb-16 md:pb-24">
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
          <ButtonLink href={href(locale, '/services/')} variant="outline" className="mt-8">{d.cta.allServices}</ButtonLink>
        </div>
      </section>

      <WhyUs locale={locale} reasons={page.reasons} title={text.why.title} />

      {/* Pujas */}
      {pujas.length > 0 && (
        <section className="py-16 md:py-24">
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
            <ButtonLink href={href(locale, '/pujas/')} variant="outline" className="mt-8">{d.cta.allPujas}</ButtonLink>
          </div>
        </section>
      )}

      <GuruMessage locale={locale} page={page} settings={settings} />
      <TestimonialsRail locale={locale} items={page.featuredTestimonials} title={text.testimonials.title} />

      {/* Latest articles */}
      {posts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-site">
            <SectionHeading
              title={text.blog.homeTitle}
              action={<ButtonLink href={href(locale, '/blog/')} variant="outline">{d.cta.allPosts}</ButtonLink>}
            />
            <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug}><PostCard post={p} locale={locale} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs.length > 0 && (
        <section className="bg-sand py-16 md:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="text-3xl text-night md:text-[2.6rem]">{text.faq.title}</h2>
              <p className="mt-4 max-w-md text-muted">{text.faq.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={waLink(settings.whatsapp, d.whatsappGreeting)} variant="whatsapp" icon={<WhatsAppIcon colored={false} className="size-[1.1rem]" />}>
                  {d.cta.askOnWhatsapp}
                </ButtonLink>
                <ButtonLink href={href(locale, '/faq/')} variant="outline">{d.cta.allQuestions}</ButtonLink>
              </div>
            </div>
            <Accordion items={page.faqs} locale={locale} />
          </div>
          <JsonLd data={faqSchema(page.faqs, locale)} />
        </section>
      )}

      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
