import { Figtree, Fraunces, Noto_Sans_Kannada, Noto_Serif_Kannada } from 'next/font/google';

/**
 * Fonts are downloaded at build time and served from our own domain.
 * Latin: Fraunces (headings) + Figtree (body).
 * Kannada: Noto Serif Kannada (headings) + Noto Sans Kannada (body).
 * The browser only downloads a Kannada font when Kannada text appears.
 */
export const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap', axes: ['opsz', 'SOFT'] });
export const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });
export const serifKn = Noto_Serif_Kannada({ subsets: ['kannada'], variable: '--font-serif-kn', display: 'swap', preload: false });
export const sansKn = Noto_Sans_Kannada({ subsets: ['kannada'], variable: '--font-sans-kn', display: 'swap', preload: false });

export const fontVariables = [fraunces.variable, figtree.variable, serifKn.variable, sansKn.variable].join(' ');
