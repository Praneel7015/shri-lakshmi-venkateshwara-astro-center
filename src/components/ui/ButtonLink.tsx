import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

const variants = {
  /** Saffron fill: the main call to action. */
  primary: 'bg-saffron text-night hover:bg-marigold shadow-[0_8px_24px_-10px_rgb(232_137_43/0.7)]',
  /** Outline on light backgrounds. */
  outline: 'border border-night/20 text-night hover:border-night hover:bg-night hover:text-ivory',
  /** Outline on dark backgrounds. */
  light: 'border border-moon/30 text-moon hover:border-marigold hover:text-marigold',
  /** WhatsApp green. */
  whatsapp: 'bg-[#1f8a4c] text-white hover:bg-[#176e3c]',
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
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-200',
    size === 'lg' ? 'px-7 py-3.5 text-base' : 'px-5 py-2.5 text-[0.95rem]',
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
