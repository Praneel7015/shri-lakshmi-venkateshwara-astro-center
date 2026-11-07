import type { NextConfig } from 'next';

/**
 * Production runs on Vercel's Next.js server. English routes are served at
 * `/about/`, while Kannada routes are served at `/kn/about/`; rewrites below
 * route unprefixed English URLs into the internal `/en/` route tree.
 * Published Sanity changes refresh cached pages through the protected
 * on-demand revalidation endpoint, without starting a new deployment.
 */
const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/sanity/image-loader.ts',
  },
  experimental: { globalNotFound: true },
  async rewrites() {
    return [
      { source: '/studio/:path*', destination: '/studio/index.html' },
      { source: '/', destination: '/en/' },
      { source: '/:path((?!kn/|kn$|en/|en$|_next/|studio/|studio$|api/|api$).*)', destination: '/en/:path' },
    ];
  },
};

export default nextConfig;
