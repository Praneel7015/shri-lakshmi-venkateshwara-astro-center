import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { fontVariables } from './fonts';
import { Mandala } from '@/components/ui/Ornaments';
import { ui } from '@/lib/i18n';

/**
 * 404 page for any URL that doesn't exist. It's exported as `out/404.html`,
 * and `.htaccess` tells Apache to serve it. Shown in both languages because
 * we can't know which one the visitor wanted.
 */
export const metadata: Metadata = { title: '404 · Page not found', robots: { index: false } };

export default function GlobalNotFound() {
  const en = ui('en').notFound;
  const kn = ui('kn').notFound;
  return (
    <html lang="en-IN" className={fontVariables}>
      <body className="bg-sky relative grid min-h-screen place-items-center overflow-hidden px-6 text-center text-moon">
        <div className="relative max-w-lg">
          <Mandala className="mx-auto mb-8 size-24 text-marigold/60" />
          <p className="mb-3 font-display text-2xl text-marigold">404</p>
          <h1 className="text-4xl md:text-5xl">{en.title}</h1>
          <p className="mt-4 text-moon/70">{en.text}</p>
          <p lang="kn" className="mt-6 text-moon/60">{kn.text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-saffron px-6 py-3 font-semibold text-night hover:bg-marigold">{en.back}</Link>
            <Link href="/kn/" lang="kn" className="rounded-full border border-moon/30 px-6 py-3 font-semibold hover:border-marigold hover:text-marigold">{kn.back}</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
