import Image from 'next/image';
import type { ImageRef, Locale } from '@/types/content';
import { ts } from '@/lib/i18n';
import { imageUrl } from '@/lib/sanity/image';
import { Mandala } from './Ornaments';

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
}

/**
 * Fills its (relatively positioned) parent with an image from Sanity.
 * Until a photo is uploaded it shows a mandala placeholder instead, so
 * layouts never look broken.
 */
export function Picture({ image, locale, alt = '', sizes = '100vw', priority, className = '', tone = 'light' }: Props) {
  const src = imageUrl(image, 2000);
  if (!src) {
    const colours =
      tone === 'dark'
        ? 'bg-[radial-gradient(circle_at_50%_35%,var(--color-night-3),var(--color-night-2)_70%)] text-marigold/45'
        : 'bg-[radial-gradient(circle_at_50%_40%,#fbf3e6,var(--color-sand)_75%)] text-saffron/35';
    return (
      <div className={`absolute inset-0 grid place-items-center overflow-hidden ${colours} ${className}`}>
        <Mandala className="h-[70%] max-h-64 w-auto" />
      </div>
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
      style={image?.hotspot ? { objectPosition: `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%` } : undefined}
    />
  );
}
