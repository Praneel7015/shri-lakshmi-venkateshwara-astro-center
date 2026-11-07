'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/types/content';
import { LanguageSwitch } from './LanguageSwitch';

interface Item {
  label: string;
  href: string;
}

interface Props {
  locale: Locale;
  items: Item[];
  secondary: Item[];
  labels: { menu: string; close: string };
  footer: React.ReactNode;
}

/**
 * Full-screen menu for phones. Tapping any link closes it.
 * It is rendered into <body> (a portal) because the header's backdrop blur
 * would otherwise trap `position: fixed` inside the header's 72px height.
 */
export function MobileMenu({ locale, items, secondary, labels, footer }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const currentPath = pathname.replace(/\/+$/, '');
  const isActive = (href: string) => {
    const target = href.replace(/\/+$/, '');
    return currentPath === target || (target.includes('/services/') && currentPath.startsWith(`${target}/`));
  };

  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = dialog.current;
    const opener = trigger.current;
    panel?.querySelector<HTMLElement>('button, a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); return; }
      if (event.key !== 'Tab') return;
      const controls = panel?.querySelectorAll<HTMLElement>('a[href], button');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); opener?.focus(); };
  }, [open]);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        className="grid size-11 place-items-center rounded-lg border border-line text-ink lg:hidden"
        aria-label={labels.menu}
        aria-expanded={open}
      >
        <Menu className="size-5" />
      </button>

      {open && createPortal(
        <div ref={dialog} className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ivory px-5 pt-5 pb-10 text-ink sm:px-6 lg:hidden" role="dialog" aria-modal="true" aria-label={labels.menu}>
          <div className="flex items-center justify-between gap-3">
            <LanguageSwitch locale={locale} />
            <button type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-lg border border-line" aria-label={labels.close}>
              <X className="size-5" />
            </button>
          </div>
          <nav className="mt-6">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} aria-current={isActive(item.href) ? 'page' : undefined} className={`block break-words border-b border-line py-3.5 font-display text-2xl text-night hover:text-saffron-deep sm:text-3xl ${isActive(item.href) ? 'font-semibold underline decoration-2 underline-offset-8' : ''}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-muted">
              {secondary.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="hover:text-lapis">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10">{footer}</div>
        </div>,
        document.body,
      )}
    </>
  );
}
