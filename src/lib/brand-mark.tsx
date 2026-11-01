/**
 * The site's mark (mandala in a ring) as plain markup for `next/og`, which
 * draws favicons and app icons at build time. Satori (the renderer behind
 * next/og) can't use our React SVG components, so this inlines the SVG.
 */
const svg = (size: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">` +
  '<rect width="64" height="64" rx="14" fill="#08182D"/>' +
  '<circle cx="32" cy="32" r="21" fill="none" stroke="#E8BE52" stroke-width="2.5"/>' +
  '<circle cx="32" cy="32" r="11" fill="none" stroke="#E8BE52" stroke-width="2"/>' +
  '<path d="M32 15 L34 30 L49 32 L34 34 L32 49 L30 34 L15 32 L30 30 Z" fill="#E8BE52"/>' +
  '</svg>';

export function BrandMark({ size }: { size: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt="" width={size} height={size} src={`data:image/svg+xml;base64,${Buffer.from(svg(size)).toString('base64')}`} />;
}
