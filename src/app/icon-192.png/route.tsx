import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brand-mark';

/** /icon-192.png: app icon listed in site.webmanifest (Android home screen). */
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(<BrandMark size={192} />, { width: 192, height: 192 });
}
