import { ImageResponse } from 'next/og';
import { BrandMark } from '@/lib/brand-mark';

/**
 * /favicon.ico: browsers and Google ask for this exact file. It's a real ICO
 * container holding one 48×48 PNG (allowed by the ICO format since Vista).
 */
export const dynamic = 'force-static';

export async function GET() {
  const png = Buffer.from(await new ImageResponse(<BrandMark size={48} />, { width: 48, height: 48 }).arrayBuffer());
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(48, 6); // width
  header.writeUInt8(48, 7); // height
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14); // image size
  header.writeUInt32LE(22, 18); // image offset
  return new Response(Buffer.concat([header, png]), { headers: { 'Content-Type': 'image/x-icon' } });
}
