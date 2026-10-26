import type { ReactNode } from 'react';

interface Props {
  title: string;
  intro?: string;
  /** Small label above the title. Only when it adds something the title doesn't say. */
  eyebrow?: string;
  /** Use on dark (night) backgrounds. */
  dark?: boolean;
  /** A link shown at the right of the heading (e.g. "All articles"). */
  action?: ReactNode;
  /** Centre only short headings over centred content (rare). */
  align?: 'left' | 'center';
}

/**
 * Section heading. Left-aligned by default; on wide screens the intro sits
 * beside the title instead of under it, which keeps sections compact.
 */
export function SectionHeading({ title, intro, eyebrow, dark = false, action, align = 'left' }: Props) {
  const muted = dark ? 'text-moon/70' : 'text-muted';
  if (align === 'center') {
    return (
      <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
        {eyebrow && <p className={`eyebrow mb-2 ${dark ? 'text-marigold' : 'text-lapis'}`}>{eyebrow}</p>}
        <h2 className={`text-3xl md:text-[2.6rem] ${dark ? 'text-moon' : 'text-night'}`}>{title}</h2>
        {intro && <p className={`mt-4 text-lg ${muted}`}>{intro}</p>}
      </div>
    );
  }
  return (
    <div className="mb-10 grid items-end gap-x-12 gap-y-4 md:mb-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        {eyebrow && <p className={`eyebrow mb-2 ${dark ? 'text-marigold' : 'text-lapis'}`}>{eyebrow}</p>}
        <h2 className={`text-3xl md:text-[2.6rem] ${dark ? 'text-moon' : 'text-night'}`}>{title}</h2>
      </div>
      {(intro || action) && (
        <div className="flex flex-wrap items-end justify-between gap-4 lg:justify-end">
          {intro && <p className={`max-w-xl text-lg lg:text-right ${muted}`}>{intro}</p>}
          {action}
        </div>
      )}
    </div>
  );
}
