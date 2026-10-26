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



