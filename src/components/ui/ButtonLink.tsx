import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

const variants = {
  /** Saffron fill: the main action on a page that isn't WhatsApp. */
  primary: 'bg-saffron text-night hover:bg-marigold',
  /** WhatsApp green with the official logo. Use for every WhatsApp link. */
  whatsapp: 'bg-whatsapp text-night hover:brightness-95',
  /** Outline on light backgrounds. */
  outline: 'border border-night/25 text-night hover:border-night hover:bg-night/5',
  /** Outline on dark backgrounds. */
  light: 'border border-moon/30 text-moon hover:border-moon hover:bg-moon/5',
};

type Props = Omit<ComponentProps<'a'>, 'href'> & {
  href: string;
  variant?: keyof typeof variants;
  size?: 'md' | 'lg';
  icon?: ReactNode;
};

/** A link styled as a button. External links (http, tel:, mailto:) render as plain anchors. */
export function ButtonLink({ href, variant = 'primary', size = 'md', icon, className = '', children, ...rest }: Props) {
  const classes = [
    'inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,border-color,filter] duration-150',
    size === 'lg' ? 'px-6 py-3 text-base' : 'px-5 py-2 text-[0.95rem]',
    variants[variant],
    className,
  ].join(' ');

  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const newTab = href.startsWith('http');
    return (
      <a href={href} className={classes} {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })} {...rest}>
        {icon}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {icon}
      {children}
    </Link>
  );
}
