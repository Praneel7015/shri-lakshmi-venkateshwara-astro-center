import { ImageResponse } from 'next/og';
import { getSiteSettings } from '@/lib/content';
import { ts } from '@/lib/i18n';

/**
 * The default social-share image (/og-image.png, 1200×630), drawn at build
 * time from Site Settings. Posts and services with their own image use that.
 */
export const dynamic = 'force-static';

export async function GET() {
  const settings = await getSiteSettings();
  const rings = [520, 420, 320];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 90px', color: '#FAF7EF', position: 'relative',
          background: 'radial-gradient(ellipse at 80% 0%, rgba(232,190,82,0.18), transparent 60%), #08182D',
        }}
      >
        {rings.map((size) => (
          <div
            key={size}
            style={{
              position: 'absolute', right: 120 - size / 2 + 160, top: 315 - size / 2, width: size, height: size,
              borderRadius: '50%', border: '1.5px solid rgba(232,190,82,0.35)',
            }}
          />
        ))}
        <div style={{ fontSize: 26, letterSpacing: 6, textTransform: 'uppercase', color: '#E8BE52' }}>Vedic astrology and Vastu</div>
        <div style={{ fontSize: 64, marginTop: 18, lineHeight: 1.05, maxWidth: 780 }}>{ts(settings.name, 'en')}</div>
        <div style={{ fontSize: 34, marginTop: 28, maxWidth: 700, color: 'rgba(236,230,255,0.75)' }}>{ts(settings.tagline, 'en')}</div>
        {ts(settings.hours, 'en') && <div style={{ fontSize: 26, marginTop: 44, color: '#E8BE52' }}>Open {ts(settings.hours, 'en')}</div>}
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
