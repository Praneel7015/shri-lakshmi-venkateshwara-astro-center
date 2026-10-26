import { ImageResponse } from 'next/og';

/** Home-screen icon for iPhones (/apple-icon.png). Replace with the client's logo when available. */
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#15142e' }}>
        <div style={{ width: 130, height: 130, borderRadius: '50%', border: '4px solid #f2b33d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', border: '3px solid #e8892b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#f2b33d' }} />
          </div>
        </div>
      </div>
    ),
    { width: 180, height: 180 },
  );
}
