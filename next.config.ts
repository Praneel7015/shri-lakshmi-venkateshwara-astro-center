import type { NextConfig } from 'next';

/**
 * Production: a fully static export (`out/`) that is uploaded to GoDaddy cPanel.
 *
 * URL scheme: English lives at `/about/`, Kannada at `/kn/about/`.
 * Internally every page is built under `app/[locale]/`, so English pages are
 * exported to `out/en/...`. On the live server `public/.htaccess` silently
 * rewrites `/about/` → `/en/about/`. In `next dev` there is no Apache, so the
 * same rewrite is done here. Rewrites are not allowed together with
 * `output: 'export'`, which is why each one is only switched on in its own mode.
 */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  trailingSlash: true,
  ...(isDev ? {} : { output: 'export' as const }),
  images: {
    // Images come from the Sanity CDN, which resizes them for us.
    loader: 'custom',
    loaderFile: './src/lib/sanity/image-loader.ts',
  },
  experimental: {
    globalNotFound: true,
  },
  ...(isDev
    ? {
        async rewrites() {
          return [
            { source: '/', destination: '/en/' },
            { source: '/:path((?!kn/|kn$|en/|en$|_next/).*)', destination: '/en/:path' },
          ];
        },
      }
    : {}),
};

export default nextConfig;
