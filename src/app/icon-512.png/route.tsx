import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brand-mark';

/** /icon-512.png: app icon listed in site.webmanifest (Android home screen). */
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(<BrandMark size={512} />, { width: 512, height: 512 });
}
