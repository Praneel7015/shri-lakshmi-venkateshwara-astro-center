import type { Metadata } from 'next';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { waLink } from '@/lib/contact';
import { getHomePage, getPosts, getPujas, getSiteSettings } from '@/lib/content';
import { href, localeFrom, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { faqSchema } from '@/lib/seo';
import { Hero } from '@/components/sections/home/Hero';
import { ServiceTicker } from '@/components/sections/home/ServiceTicker';
import { AboutIntro } from '@/components/sections/home/AboutIntro';
import { StatsBand } from '@/components/sections/home/StatsBand';
import { WhyUs } from '@/components/sections/home/WhyUs';
import { GuruMessage } from '@/components/sections/home/GuruMessage';
import { TestimonialsRail } from '@/components/sections/home/TestimonialsRail';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { PujaCard } from '@/components/cards/PujaCard';
import { PostCard } from '@/components/cards/PostCard';
import { CtaBand } from '@/components/shared/CtaBand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';

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
  const arrow = <ArrowRight className="size-4" aria-hidden="true" />;

  return (
    <>
      <Hero locale={locale} page={page} settings={settings} />
      <ServiceTicker locale={locale} services={page.featuredServices} />
      <AboutIntro locale={locale} page={page} settings={settings} />

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="container-site">
          <SectionHeading eyebrow={d.nav.services} title={text.services.title} intro={text.services.intro} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.featuredServices.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <ServiceCard service={s} locale={locale} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StatsBand locale={locale} stats={page.stats} />
      <WhyUs locale={locale} reasons={page.reasons} title={text.why.title} />

      {/* Pujas */}
      {pujas.length > 0 && (
        <section className="bg-paper border-y border-line py-20 md:py-28">
          <div className="container-site">
            <SectionHeading eyebrow={d.nav.pujas} title={text.pujas.title} intro={text.pujas.intro} />
            {/* Swipeable row on phones, three columns from tablet up */}
            <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
              {pujas.slice(0, 3).map((p) => (
                <li key={p.slug} className="w-[82%] shrink-0 snap-center sm:w-[55%] md:w-auto">
                  <PujaCard puja={p} locale={locale} settings={settings} />
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <ButtonLink href={href(locale, '/pujas/')} variant="outline" className="flex-row-reverse" icon={arrow}>{d.cta.viewAll}</ButtonLink>
            </div>
          </div>
        </section>
      )}

      <GuruMessage locale={locale} page={page} settings={settings} />
      <TestimonialsRail locale={locale} items={page.featuredTestimonials} title={text.testimonials.title} />

      {/* Latest articles */}
      {posts.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container-site">
            <SectionHeading
              eyebrow={d.nav.blog}
              title={text.blog.homeTitle}
              align="left"
              action={<ButtonLink href={href(locale, '/blog/')} variant="outline" className="flex-row-reverse" icon={arrow}>{d.cta.allPosts}</ButtonLink>}
            />
            <ul className="grid gap-12 md:grid-cols-3 md:gap-6">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug}><PostCard post={p} locale={locale} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs.length > 0 && (
        <section className="bg-sand py-20 md:py-28">
          <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow={d.nav.faq} title={text.faq.title} align="left" />
              <p className="-mt-4 text-muted md:-mt-6">{text.faq.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={waLink(settings.whatsapp, d.whatsappGreeting)} variant="whatsapp" icon={<MessageCircle className="size-4" aria-hidden="true" />}>
                  {d.cta.whatsapp}
                </ButtonLink>
                <ButtonLink href={href(locale, '/faq/')} variant="outline" className="flex-row-reverse" icon={arrow}>{d.cta.viewAll}</ButtonLink>
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
