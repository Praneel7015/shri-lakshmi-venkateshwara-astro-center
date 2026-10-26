import type { ReactNode } from 'react';
import { KolamDivider } from './Ornaments';

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'center' | 'left';
  /** Use on dark (night) backgrounds. */
  dark?: boolean;
  /** A button shown at the right of a left-aligned heading (e.g. "All articles"). */
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, intro, align = 'center', dark = false, action }: Props) {
  const centered = align === 'center' && !action;
  const heading = (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className={`eyebrow mb-3 ${dark ? 'text-marigold' : 'text-saffron-deep'}`}>{eyebrow}</p>}
      <h2 className={`text-3xl md:text-[2.75rem] ${dark ? 'text-moon' : 'text-night'}`}>{title}</h2>
      <KolamDivider className={`mt-5 h-5 w-40 ${centered ? 'mx-auto' : ''} ${dark ? 'text-marigold/70' : 'text-saffron/70'}`} />
      {intro && <p className={`mt-5 text-lg ${dark ? 'text-moon/75' : 'text-muted'}`}>{intro}</p>}
    </div>
  );
  if (!action) return <div className="mb-10 md:mb-14">{heading}</div>;
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
      {heading}
      {action}
    </div>
  );
}
