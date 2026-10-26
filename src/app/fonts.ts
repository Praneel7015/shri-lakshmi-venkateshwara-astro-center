import { Anek_Kannada, Tiro_Kannada } from 'next/font/google';

/**
 * Two families, each designed for BOTH Latin and Kannada, so the English and
 * Kannada sites look like the same brand:
 * - Tiro Kannada (Tiro Typeworks): classical, book-like serif for headings.
 * - Anek Kannada (Ek Type): clear, contemporary sans for body text and UI.
 *
 * Speed: only the Latin files are preloaded. The Kannada files (and the
 * italic, used once for the quote) download on their own the moment Kannada
 * text appears, thanks to the browser's unicode-range matching.
 */
export const tiro = Tiro_Kannada({ weight: '400', subsets: ['latin'], variable: '--font-tiro', display: 'swap' });
export const tiroKn = Tiro_Kannada({ weight: '400', subsets: ['kannada'], variable: '--font-tiro-kn', display: 'swap', preload: false });
export const tiroItalic = Tiro_Kannada({ weight: '400', style: 'italic', subsets: ['latin'], variable: '--font-tiro-italic', display: 'swap', preload: false });
export const anek = Anek_Kannada({ weight: 'variable', subsets: ['latin'], variable: '--font-anek', display: 'swap' });
export const anekKn = Anek_Kannada({ weight: 'variable', subsets: ['kannada'], variable: '--font-anek-kn', display: 'swap', preload: false });

export const fontVariables = [tiro, tiroKn, tiroItalic, anek, anekKn].map((f) => f.variable).join(' ');
