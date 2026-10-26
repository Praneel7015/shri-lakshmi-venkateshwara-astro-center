/**
 * Decorative SVG artwork: drawn in code so it stays crisp, tiny and themable
 * (all strokes use `currentColor`; set the colour with a text-* class).
 * Every ornament is aria-hidden: it carries no meaning for screen readers.
 */

const ZODIAC = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

/** The slowly turning zodiac wheel behind the home hero. */
export function ZodiacWheel({ className = '' }: { className?: string }) {
  const c = 200;
  const ticks = Array.from({ length: 108 }, (_, i) => i); // 108 = 27 nakshatras × 4 padas
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <circle cx={c} cy={c} r="196" strokeWidth="0.8" />
      <circle cx={c} cy={c} r="168" strokeWidth="0.6" />
      <circle cx={c} cy={c} r="124" strokeWidth="0.6" strokeDasharray="2 6" />
      <circle cx={c} cy={c} r="70" strokeWidth="0.6" />
      {ticks.map((i) => {
        const a = (i / ticks.length) * Math.PI * 2;
        const r1 = i % 9 === 0 ? 180 : 188;
        return (
          <line key={i} x1={c + Math.cos(a) * r1} y1={c + Math.sin(a) * r1} x2={c + Math.cos(a) * 196} y2={c + Math.sin(a) * 196} strokeWidth="0.6" />
        );
      })}
      {ZODIAC.map((sign, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const sep = a + Math.PI / 12;
        return (
          <g key={sign}>
            <line x1={c + Math.cos(sep) * 70} y1={c + Math.sin(sep) * 70} x2={c + Math.cos(sep) * 168} y2={c + Math.sin(sep) * 168} strokeWidth="0.5" />
            <text x={c + Math.cos(a) * 146} y={c + Math.sin(a) * 146} fill="currentColor" stroke="none" fontSize="18" textAnchor="middle" dominantBaseline="central">
              {sign}{'︎'}
            </text>
          </g>
        );
      })}
      {/* Nine grahas as dots on the inner ring */}
      {Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return <circle key={i} cx={c + Math.cos(a) * 98} cy={c + Math.sin(a) * 98} r="2.4" fill="currentColor" stroke="none" />;
      })}
      <path d={petals(c, 40, 60, 8)} strokeWidth="0.7" />
    </svg>
  );
}

/** A lotus-petal path, used in the wheel centre and the mandala. */
function petals(c: number, inner: number, outer: number, count: number) {
  let d = '';
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const w = Math.PI / count;
    const x0 = c + Math.cos(a - w) * inner, y0 = c + Math.sin(a - w) * inner;
    const x1 = c + Math.cos(a + w) * inner, y1 = c + Math.sin(a + w) * inner;
    const tx = c + Math.cos(a) * outer, ty = c + Math.sin(a) * outer;
    d += `M${x0.toFixed(1)} ${y0.toFixed(1)} Q${tx.toFixed(1)} ${ty.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)} `;
  }
  return d;
}

/** Concentric lotus mandala, used where a photo hasn't been uploaded yet. */
export function Mandala({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="88" strokeDasharray="1 4" />
      <path d={petals(100, 52, 86, 16)} />
      <path d={petals(100, 34, 62, 12)} />
      <path d={petals(100, 14, 36, 8)} />
      <circle cx="100" cy="100" r="10" />
      <circle cx="100" cy="100" r="3" fill="currentColor" />
    </svg>
  );
}

/** Thin kolam-style divider with a centre lotus. */
export function KolamDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 12 H92" />
      <path d="M148 12 H240" />
      <circle cx="96" cy="12" r="1.6" fill="currentColor" />
      <circle cx="144" cy="12" r="1.6" fill="currentColor" />
      <path d="M120 2 C126 8 126 16 120 22 C114 16 114 8 120 2 Z" />
      <path d="M120 12 C128 6 136 8 140 12 C136 16 128 18 120 12 Z" />
      <path d="M120 12 C112 6 104 8 100 12 C104 16 112 18 120 12 Z" />
    </svg>
  );
}

/** Scattered twinkling stars for dark sections. Positions are fixed so the build is deterministic. */
const STARS = [
  [6, 12, 1.2], [14, 68, 0.8], [22, 30, 1.6], [31, 84, 1], [38, 8, 0.9], [46, 52, 1.3], [53, 22, 0.7],
  [61, 74, 1.5], [68, 40, 0.9], [74, 10, 1.2], [81, 62, 0.8], [88, 26, 1.4], [94, 80, 1], [10, 92, 1.1],
  [57, 92, 0.8], [84, 94, 1.2], [3, 48, 0.9], [97, 46, 1.1],
] as const;

export function StarField({ className = '' }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
      {STARS.map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r * 0.22}
          fill="currentColor"
          className="animate-twinkle"
          style={{ animationDelay: `${(i % 6) * 0.7}s`, transformOrigin: `${x}% ${y}%` }}
        />
      ))}
    </svg>
  );
}

/** Small 8-point star used as a bullet / accent. */
export function Spark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="currentColor">
      <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" />
    </svg>
  );
}
