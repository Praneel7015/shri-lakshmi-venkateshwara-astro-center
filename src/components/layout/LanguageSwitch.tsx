'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';
import type { Locale } from '@/types/content';
import { switchLocalePath } from '@/lib/i18n';

/** "EN | ಕನ್ನಡ" toggle that keeps you on the same page in the other language. */
export function LanguageSwitch({ locale, className = '', tone = 'light' }: { locale: Locale; className?: string; tone?: 'light' | 'dark' }) {
  const pathname = usePathname() ?? '/';
  const target: Locale = locale === 'en' ? 'kn' : 'en';

  return (
    <Link
      href={switchLocalePath(pathname, target)}
      prefetch={false}
      hrefLang={target === 'kn' ? 'kn-IN' : 'en-IN'}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm transition-colors ${tone === 'dark' ? 'border-moon/25 text-moon/90 hover:border-sage hover:text-sage' : 'border-line text-night/85 hover:border-night hover:text-night'} ${className}`}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span lang={target === 'kn' ? 'kn' : 'en'}>{target === 'kn' ? 'ಕನ್ನಡ' : 'English'}</span>
    </Link>
  );
}
