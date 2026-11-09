import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

const variants = {
  /** Saffron fill: the main action on a page that isn't WhatsApp. */
  primary: 'bg-saffron text-night hover:bg-marigold',
  /** Orange WhatsApp action with its logo. */
  whatsapp: 'bg-whatsapp text-night hover:brightness-95',
  /** Outline on light backgrounds. */
  outline: 'border border-night/25 text-night hover:border-night hover:bg-night/5',
  /** Outline on dark backgrounds. */
  light: 'border border-moon/30 text-moon hover:border-moon hover:bg-moon/5',
  /** Gold outline on dark backgrounds (footer, dark bands). */
  gold: 'border border-marigold/50 text-marigold hover:border-marigold hover:bg-marigold/10',
};

const sizes = {
  sm: 'min-h-9 py-2 px-3.5 text-sm',
  md: 'min-h-10 py-2.5 px-4 text-[0.95rem]',
  lg: 'min-h-12 py-3 px-5 text-base',
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

/**
 * Classes for anything that should look like a button (links, <button>s).
 * Wrap the text in <span className="btn-label"> so it lines up with the icon
 * (see globals.css).
 */
export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') {
  return [
    'inline-flex shrink-0 items-center justify-center gap-2 text-center rounded-lg font-semibold transition-[background-color,border-color,filter,transform,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0',
    sizes[size],
    variants[variant],
    extra,
  ].join(' ');
}

type Props = Omit<ComponentProps<'a'>, 'href'> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

/** A link styled as a button. External links (http, tel:, mailto:) render as plain anchors. */
export function ButtonLink({ href, variant = 'primary', size = 'md', icon, className = '', children, ...rest }: Props) {
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {icon}
      <span className="btn-label">{children}</span>
    </>
  );

  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const newTab = href.startsWith('http');
    return (
      <a href={href} className={classes} {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

/** A quiet "see all" link: underlined text, no box. For secondary actions like "All articles". */
export function MoreLink({ href, dark = false, className = '', children }: { href: string; dark?: boolean; className?: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-10 items-center font-semibold underline underline-offset-[6px] transition-colors ${
        dark ? 'text-marigold decoration-marigold/40 hover:decoration-marigold' : 'text-lapis decoration-lapis/30 hover:decoration-lapis'
      } ${className}`}
    >
      {children}
    </Link>
  );
}
