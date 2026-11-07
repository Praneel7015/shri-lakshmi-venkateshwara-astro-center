import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { getService, getServices, getSiteSettings } from '@/lib/content';
import { href, LOCALES, localeFrom, t, ts, ui } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import { faqSchema, serviceSchema } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { Picture } from '@/components/ui/Picture';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/ui/JsonLd';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RichText } from '@/components/blog/RichText';
import { PostCard } from '@/components/cards/PostCard';
import { CtaBand } from '@/components/shared/CtaBand';



export async function generateStaticParams() {
  const services = await getServices();
  return LOCALES.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/services/[slug]'>): Promise<Metadata> {
  const locale = await localeFrom(params);
  const { slug } = await params;
  const [settings, service] = await Promise.all([getSiteSettings(), getService(slug)]);
  if (!service) return {};
  return buildMetadata({
    locale, settings, path: `/services/${slug}/`, title: ts(service.title, locale),
    description: `${ts(service.shortDescription, locale)} ${ui(locale).meta.consult(`${settings.address.locality}, ${settings.address.city}`)}`,
    seo: service.seo, image: service.heroImage,
  });
}

export default async function ServicePage({ params }: PageProps<'/[locale]/services/[slug]'>) {
  const locale = await localeFrom(params);
  const { slug } = await params;
  const [settings, service] = await Promise.all([getSiteSettings(), getService(slug)]);
  if (!service) notFound();
  const d = ui(locale);
  const title = ts(service.title, locale);

  return (
    <>
      <PageHero
        locale={locale}
        title={title}
        intro={ts(service.shortDescription, locale)}
        crumbs={[{ label: d.nav.services, path: '/services/' }, { label: title, path: `/services/${slug}/` }]}
      />

      <section className="py-14 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div>
            {service.heroImage && (
              <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-card">
                <Picture image={service.heroImage} locale={locale} alt={title} sizes="(min-width: 1024px) 46rem, 100vw" priority />
              </div>
            )}
            {/* Mark English fallback text as English on the Kannada site */}
            <div lang={locale === 'kn' && !service.body.kn?.length ? 'en' : undefined}>
              <RichText value={t(service.body, locale) ?? []} locale={locale} settings={settings} />
            </div>

            {service.whySeek.length > 0 && (
              <div className="mt-14">
                <h2 className="text-2xl text-night md:text-3xl">{d.service.whySeek}</h2>
                <ul className="mt-5 grid gap-x-8 border-b border-line sm:grid-cols-2">
                  {service.whySeek.map((w, i) => (
                    <li key={i} className="flex items-center gap-3 border-t border-line py-3">
                      <Check className="size-5 shrink-0 text-lapis" aria-hidden="true" />
                      {ts(w, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sticky enquiry card */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-card bg-night p-6 text-moon">
              <h2 className="text-2xl">{d.service.sidebarTitle}</h2>
              <p className="mt-3 text-moon/70">{d.service.sidebarText}</p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href={href(locale, '/contact/')}>
                  {d.cta.enquire}
                </ButtonLink>

              </div>
              <p className="mt-6 border-t border-moon/10 pt-5 text-sm text-moon/60">{ts(settings.hours, locale)}</p>
            </div>
          </aside>
        </div>
      </section>

      {service.process.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="container-site">
            <SectionHeading title={d.service.process} />
            <ol className="grid gap-8 md:grid-cols-4">
              {service.process.map((step, i) => (
                <li key={i} className="relative border-t border-line pt-6">
                  <span className="absolute -top-4 left-0 grid size-8 place-items-center rounded-full bg-night font-display text-sm text-marigold">{i + 1}</span>
                  <h3 className="mt-2 text-xl text-night">{ts(step.title, locale)}</h3>
                  <p className="mt-2 text-muted">{ts(step.text, locale)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section className="bg-sand stars relative py-20">
          <div className="container-site max-w-3xl">
            <SectionHeading title={d.service.faq} />
            <Accordion items={service.faqs} locale={locale} />
          </div>
          <JsonLd data={faqSchema(service.faqs, locale)} />
        </section>
      )}

      {service.relatedPosts.length > 0 && (
        <section className="py-20">
          <div className="container-site">
            <SectionHeading title={d.service.related} />
            <ul className="flex flex-wrap justify-center gap-12 md:gap-6">
              {service.relatedPosts.map((p) => (
                <li key={p.slug} className="w-full md:w-[calc((100%-3rem)/3)]"><PostCard post={p} locale={locale} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand locale={locale} settings={settings} />
      <JsonLd data={serviceSchema(service, locale)} />
    </>
  );
}
