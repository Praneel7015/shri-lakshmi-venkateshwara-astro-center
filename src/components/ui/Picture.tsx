import Image from 'next/image';
import type { ImageRef, Locale } from '@/types/content';
import { ts } from '@/lib/i18n';
import { imageUrl } from '@/lib/sanity/image';
import { Sparkle, ZodiacWheel } from './Ornaments';

interface Props {
  image?: ImageRef;
  locale: Locale;
  /** Fallback alt text if the editor did not write one. */
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Placeholder style when there is no image yet. */
  tone?: 'light' | 'dark';
  /** Placeholder emblem: a zodiac wheel, or a single sparkle where a wheel is already drawn around it (hero). */
  emblem?: 'wheel' | 'sparkle';
  /** Preserve the full image and use a soft crop behind it to fill the frame. */
  fit?: 'cover' | 'contain-backdrop';
}

/**
 * Fills its (relatively positioned) parent with an image from Sanity.
 * Until a photo is uploaded it shows a small patch of night sky (star tile and
 * a faint zodiac wheel) instead, so layouts never look broken.
 */
export function Picture({ image, locale, alt = '', sizes = '100vw', priority, className = '', tone = 'light', emblem = 'wheel', fit = 'cover' }: Props) {
  const src = imageUrl(image, 2000);
  if (!src) {
    const colours =
      tone === 'dark'
        ? 'stars-night bg-[radial-gradient(circle_at_50%_35%,var(--color-night-3),var(--color-night)_75%)] text-marigold/60'
        : 'stars bg-[radial-gradient(circle_at_50%_40%,var(--color-ivory),var(--color-sand)_80%)] text-lapis/55';
    return (
      <div className={`absolute inset-0 grid place-items-center overflow-hidden ${colours} ${className}`}>
        {emblem === 'wheel' ? <ZodiacWheel className="h-[78%] max-h-72 w-auto" /> : <Sparkle className="size-1/4" />}
      </div>
    );
  }
  const hotspot = image?.hotspot ? { objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` } : undefined;
  if (fit === 'contain-backdrop') {
    return (
      <>
        <Image src={src} alt="" fill sizes={sizes} aria-hidden="true" className="scale-110 object-cover opacity-55 blur-xl" style={hotspot} />
        <Image src={src} alt={ts(image?.alt, locale) || alt} fill sizes={sizes} priority={priority} className={`object-contain ${className}`} style={hotspot} />
      </>
    );
  }
  return (
    <Image
      src={src}
      alt={ts(image?.alt, locale) || alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={hotspot}
    />
  );
}
