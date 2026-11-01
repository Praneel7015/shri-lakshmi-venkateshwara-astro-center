'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';

interface Item {
  label: string;
  href: string;
}

interface Props {
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
export function MobileMenu({ items, secondary, labels, footer }: Props) {
  const [open, setOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

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
        className="grid size-11 place-items-center rounded-lg border border-moon/20 text-moon xl:hidden"
        aria-label={labels.menu}
        aria-expanded={open}
      >
        <Menu className="size-5" />
      </button>

      {open && createPortal(
        <div ref={dialog} className="bg-sky fixed inset-0 z-50 flex flex-col overflow-y-auto px-6 pt-5 pb-10 text-moon xl:hidden" role="dialog" aria-modal="true" aria-label={labels.menu}>
          <div className="flex justify-end">
            <button type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-lg border border-moon/20" aria-label={labels.close}>
              <X className="size-5" />
            </button>
          </div>
          <nav className="mt-6">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="block border-b border-moon/10 py-3.5 font-display text-3xl hover:text-marigold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-moon/70">
              {secondary.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="hover:text-marigold">{item.label}</Link>
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
