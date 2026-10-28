import Image from 'next/image';
import Link from 'next/link';
import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react';
import { Lightbulb } from 'lucide-react';
import type { ImageRef, Locale, SiteSettings } from '@/types/content';
import { ts, ui } from '@/lib/i18n';
import { waLink } from '@/lib/contact';
import { imageUrl } from '@/lib/sanity/image';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { WhatsAppIcon } from '@/components/ui/BrandIcon';

/** Turns a heading into an anchor id for the table of contents. */
export const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-');

export const plainText = (block: PortableTextBlock) =>
  (block.children as { text?: string }[] | undefined)?.map((c) => c.text ?? '').join('') ?? '';

/** All h2 headings in a body, for the "On this page" list. */
export const headingsOf = (blocks: PortableTextBlock[] = []) =>
  blocks.filter((b) => b._type === 'block' && b.style === 'h2').map((b) => ({ text: plainText(b), id: slugify(plainText(b)) }));

/** Rough reading time at ~200 words per minute. */
export const readingMinutes = (blocks: PortableTextBlock[] = []) =>
  Math.max(1, Math.round(blocks.filter((b) => b._type === 'block').map(plainText).join(' ').split(/\s+/).length / 200));

/**
 * Renders rich text written in the Studio. Each custom block type here
 * matches one in `studio/schemas/objects/blockContent.ts`.
 */
export function RichText({ value, locale, settings }: { value: PortableTextBlock[]; locale: Locale; settings: SiteSettings }) {
  const d = ui(locale);

  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value: v }) => <h2 id={slugify(plainText(v))}>{children}</h2>,
      h3: ({ children, value: v }) => <h3 id={slugify(plainText(v))}>{children}</h3>,
      blockquote: ({ children }) => <blockquote className="font-display text-2xl not-italic">{children}</blockquote>,
    },
    marks: {
      link: ({ children, value: v }) => {
        const url: string = v?.href ?? '#';
        return url.startsWith('/') ? <Link href={url}>{children}</Link> : <a href={url} target="_blank" rel="noopener noreferrer">{children}</a>;
      },
    },
    types: {
      image: ({ value: v }: { value: ImageRef & { caption?: string } }) => {
        const src = imageUrl(v, 1400);
        if (!src) return null;
        return (
          <figure>
            <Image src={src} alt={ts(v.alt, locale) || v.caption || ''} width={1400} height={900} sizes="(min-width: 768px) 46rem, 100vw" className="rounded-card" />
            {v.caption && <figcaption className="text-center">{v.caption}</figcaption>}
          </figure>
        );
      },
      callout: ({ value: v }: { value: { text: string } }) => (
        <aside className="not-prose my-8 flex gap-3 rounded-xl bg-sand px-5 py-4">
          <Lightbulb className="mt-1 size-5 shrink-0 text-lapis" aria-hidden="true" />
          <p className="text-night">{v.text}</p>
        </aside>
      ),
      shloka: ({ value: v }: { value: { sanskrit: string; meaning?: string } }) => (
        <figure className="not-prose my-10 rounded-card bg-night px-7 py-8 text-center text-moon">
          <p className="font-display text-2xl leading-relaxed whitespace-pre-line text-marigold">{v.sanskrit}</p>
          {v.meaning && <figcaption className="mt-4 text-moon/70">{v.meaning}</figcaption>}
        </figure>
      ),
      ctaBlock: ({ value: v }: { value: { heading?: string } }) => (
        <div className="not-prose bg-sky relative my-10 flex flex-col items-start gap-5 rounded-card px-7 py-8 text-moon sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl">{v.heading || d.cta.book}</p>
          <ButtonLink href={waLink(settings.whatsapp, d.whatsappGreeting)} variant="whatsapp" size="lg" icon={<WhatsAppIcon colored={false} />}>
            {d.cta.enquire}
          </ButtonLink>
        </div>
      ),
      youtube: ({ value: v }: { value: { url: string } }) => {
        const id = v.url?.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/)?.[1];
        if (!id) return null;
        return (
          <div className="not-prose my-8 aspect-video overflow-hidden rounded-card">
            <iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title="YouTube video" loading="lazy" allowFullScreen className="size-full" />
          </div>
        );
      },
    },
  };

  return (
    <div className="prose-astro">
      <PortableText value={value} components={components} />
    </div>
  );
}
