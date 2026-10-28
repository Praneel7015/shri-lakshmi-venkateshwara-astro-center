import Script from 'next/script';
import type { SiteSettings } from '@/types/content';

// The IDs are written into inline scripts, so only accept the exact formats
// (the Studio validates too, but this is the line that matters).
const GTM_ID = /^GTM-[A-Z0-9]+$/;
const GOOGLE_TAG_ID = /^(G|AW|GT|DC)-[A-Z0-9]+$/;

/**
 * Marketing tags from Site settings → Tracking & ads, on every page.
 * Google Tag Manager is the recommended route: the marketing team then adds
 * any tag inside Tag Manager without a website change. Direct Google tag IDs
 * (Analytics G-…, Ads AW-…) are supported for teams not using Tag Manager.
 * Loaded after the page is interactive, so they never slow the first paint.
 */
export function Tracking({ tracking }: { tracking: SiteSettings['tracking'] }) {
  const gtmId = tracking?.gtmId?.trim();
  const gtm = gtmId && GTM_ID.test(gtmId) ? gtmId : undefined;
  const tagIds = (tracking?.googleTagIds ?? []).map((id) => id.trim()).filter((id) => GOOGLE_TAG_ID.test(id));

  return (
    <>
      {gtm && (
        <>
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
          </Script>
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} title="Google Tag Manager" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
          </noscript>
        </>
      )}
      {tagIds.length > 0 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${tagIds[0]}`} strategy="afterInteractive" />
          <Script id="gtag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${tagIds.map((id) => `gtag('config','${id}');`).join('')}`}
          </Script>
        </>
      )}
    </>
  );
}
