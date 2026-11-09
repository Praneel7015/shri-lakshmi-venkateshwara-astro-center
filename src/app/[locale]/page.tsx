import type { Metadata } from 'next';
import { getGallery, getHomePage, getPosts, getPujas, getSiteSettings, getTestimonials } from '@/lib/content';
import { localeFrom, ts } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { getPageText } from '@/lib/page-text';
import { Hero } from '@/components/sections/home/Hero';
import { HeroCarousel } from '@/components/sections/home/HeroCarousel';
import { WhyUs } from '@/components/sections/home/WhyUs';
import { AboutIntro } from '@/components/sections/home/AboutIntro';
import { ImpactNumbers } from '@/components/sections/home/ImpactNumbers';
import { Expertise } from '@/components/sections/home/Expertise';
import { HomeServices, HomePujas, HomeArticles, HomeTestimonials, HomeGallery, HomeFaq, HomeConsultation } from '@/components/sections/home/sections';
import { CtaBand } from '@/components/shared/CtaBand';
import { Picture } from '@/components/ui/Picture';
import { ScrollTicker } from '@/components/ui/ScrollTicker';

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
  const [settings, page, pujas, posts, gallery, text, testimonials] = await Promise.all([
    getSiteSettings(), getHomePage(), getPujas(), getPosts(), getGallery(), getPageText(locale), getTestimonials(),
  ]);
  const photos = gallery.filter((g) => g.image).slice(0, 6);
  const sectionProps = { locale, page: { ...page, featuredTestimonials: page.featuredTestimonials.length ? page.featuredTestimonials : testimonials.slice(0, 4) }, settings, pujas, posts, photos, text };

  return (
    <>
      {(page.imageAboveHero?.asset?._ref || page.imageAboveHero?.src) && (
        <figure className="relative mx-auto aspect-[5/3] w-full max-w-[1190px] overflow-hidden sm:rounded-lg">
          <Picture
            image={page.imageAboveHero}
            locale={locale}
            alt="Image above the homepage hero"
            sizes="100vw"
            priority
          />
        </figure>
      )}
      <HeroCarousel locale={locale} slides={page.hero.filter((slide) => slide.image?.asset?._ref || slide.image?.src)} />
      <div aria-hidden="true" className="h-1 bg-[linear-gradient(90deg,#A87825,#E9C875,#A87825)]" />
      <Hero locale={locale} page={page} settings={settings} labels={text.homeLabels} />
      <ScrollTicker locale={locale} />
      <AboutIntro locale={locale} page={page} settings={settings} />
      <ImpactNumbers stats={page.stats} locale={locale} />
      <WhyUs locale={locale} reasons={page.reasons} title={text.why.title} />

      <HomeServices {...sectionProps} />
      <Expertise locale={locale} />
      <HomePujas {...sectionProps} />
      <HomeArticles {...sectionProps} />
      <HomeTestimonials {...sectionProps} />
      <HomeGallery {...sectionProps} />
      <HomeFaq {...sectionProps} />
      <HomeConsultation {...sectionProps} />
      <CtaBand locale={locale} settings={settings} />
    </>
  );
}
