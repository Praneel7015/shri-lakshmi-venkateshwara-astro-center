import type { Locale, SiteSettings } from '@/types/content';
import { href, ui } from '@/lib/i18n';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ZodiacWatermark } from '@/components/ui/Ornaments';
import { getPageText } from '@/lib/page-text';
export async function CtaBand({
  locale,
  settings,
  heading,
  text,
}: {
  locale: Locale;
  settings: SiteSettings;
  heading?: string;
  text?: string;
}) {
  void settings;
  const copy = (await getPageText(locale)).ctaBand;
  return (
    <section className="container-site py-16 md:py-24">
      <div className="bg-sky relative overflow-hidden rounded-card border border-marigold/25 px-7 py-12 text-moon md:px-14 md:py-16">
        <ZodiacWatermark place="top-1/2 left-[90%] size-[30rem]" />
        <div className="relative max-w-2xl">
          <p className="mb-4 text-sm text-marigold">
            {locale === 'kn' ? 'ಮುಂದಿನ ಹೆಜ್ಜೆ' : 'YOUR NEXT CHAPTER'}
          </p>
          <h2 className="text-3xl md:text-[2.8rem]">
            {heading ?? copy.title}
          </h2>
          <p className="mt-5 max-w-lg text-moon/75">
            {text ?? copy.intro}
          </p>
          <ButtonLink
            href={href(locale, '/contact/')}
            size="lg"
            className="mt-7"
          >
            {ui(locale).nav.contact}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
