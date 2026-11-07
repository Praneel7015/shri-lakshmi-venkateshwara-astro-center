'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function normalizePath(path: string) {
  const normalized = path.replace(/\/+$/, '');
  return normalized || '/';
}

export function ActiveNavLink({
  href,
  routePath,
  className,
  activeClassName,
  children,
}: {
  href: string;
  routePath: string;
  className: string;
  activeClassName: string;
  children: React.ReactNode;
}) {
  const pathname = normalizePath(usePathname() ?? '/');
  const target = normalizePath(href);
  const active = pathname === target || (routePath === '/services/' && pathname.startsWith(`${target}/`));

  return (
    <Link href={href} aria-current={active ? 'page' : undefined} className={`${className} ${active ? activeClassName : ''}`}>
      {children}
    </Link>
  );
}
