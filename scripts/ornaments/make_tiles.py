"""Draw the repeating star / zodiac background tiles in public/ornaments/.

The tiles are single-colour (black on transparent) and used as CSS masks, so
their colour comes from the theme tokens in globals.css. Zodiac signs are
traced from a font into plain SVG paths: a background image can't use the
site's web fonts, and system fallback would draw them as coloured emoji.

Run (needs Python 3 + fonttools: `pip install fonttools`):
    python3 scripts/ornaments/make_tiles.py [path/to/font.ttf]

Default font: MesloLGM Nerd Font (Apache 2.0 / MIT; its zodiac outlines come
from DejaVu). Any font with U+2648–U+2653 works. See scripts/ornaments/CREDITS.md.
"""

import random
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "public" / "ornaments"
DEFAULT_FONT = "/usr/share/fonts/TTF/MesloLGMNerdFontPropo-Regular.ttf"


def sparkle(x, y, r):
    """A four-point star with curved (concave) sides, like the Vishwanathguruji tile."""
    return (
        f"M{x:.1f} {y - r:.1f}Q{x:.1f} {y:.1f} {x + r:.1f} {y:.1f}"
        f"Q{x:.1f} {y:.1f} {x:.1f} {y + r:.1f}Q{x:.1f} {y:.1f} {x - r:.1f} {y:.1f}"
        f"Q{x:.1f} {y:.1f} {x:.1f} {y - r:.1f}Z"
    )


def dot(x, y, r):
    return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}"/>'


def glyph_path(font, char, x, y, size):
    """The outline of `char`, scaled to `size` px tall and centred on (x, y)."""
    glyph_set = font.getGlyphSet()
    name = font.getBestCmap()[ord(char)]
    upm = font["head"].unitsPerEm
    scale = size / upm
    glyph = glyph_set[name]
    pen = SVGPathPen(glyph_set)
    # Flip y (fonts grow upwards) and centre the advance width on x.
    tpen = TransformPen(pen, (scale, 0, 0, -scale, x - glyph.width * scale / 2, y + size * 0.35))
    glyph.draw(tpen)
    return pen.getCommands()


def light_tile():
    """160px tile for light sections: sparkles in two sizes and a few dots."""
    stars = [sparkle(40, 40, 9), sparkle(120, 118, 6), sparkle(128, 34, 3.5), sparkle(30, 128, 3.5)]
    dots = [dot(84, 80, 1.6), dot(96, 18, 1.1), dot(12, 84, 1.1), dot(150, 76, 1.1), dot(70, 150, 1.1)]
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">'
        f'<path d="{"".join(stars)}"/>{"".join(dots)}</svg>\n'
    )


def night_tile(font):
    """480px tile for dark bands: scattered sparkles and dots, four zodiac signs
    and one small constellation. Large so the repeat isn't obvious."""
    rnd = random.Random(27)  # 27 nakshatras: a fixed seed keeps the tile stable
    signs = [("♈", 70, 92), ("♌", 380, 150), ("♐", 150, 380), ("♓", 420, 420)]
    taken = [(x, y) for _, x, y in signs] + [(250, 250), (300, 270), (330, 230), (290, 210)]

    def free(x, y, gap=34):
        return all((x - a) ** 2 + (y - b) ** 2 > gap**2 for a, b in taken)

    stars, dots = [], []
    while len(stars) < 16:
        x, y = rnd.uniform(12, 468), rnd.uniform(12, 468)
        if free(x, y):
            taken.append((x, y))
            stars.append(sparkle(x, y, rnd.choice([3, 4, 5, 7, 9])))
    while len(dots) < 26:
        x, y = rnd.uniform(6, 474), rnd.uniform(6, 474)
        if free(x, y, 16):
            taken.append((x, y))
            dots.append(dot(x, y, rnd.choice([0.9, 1.2, 1.6])))

    glyphs = "".join(glyph_path(font, ch, x, y, 26) for ch, x, y in signs)
    # A small constellation (roughly the Saptarishi bend), drawn as thin lines.
    pts = [(250, 250), (290, 210), (330, 230), (300, 270)]
    lines = " ".join(f"M{a[0]} {a[1]}L{b[0]} {b[1]}" for a, b in zip(pts, pts[1:]))
    constellation = f'<path d="{lines}" fill="none" stroke="#000" stroke-width="0.8"/>' + "".join(dot(x, y, 2.2) for x, y in pts)
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">'
        f'<path d="{"".join(stars)}"/>{"".join(dots)}<path d="{glyphs}"/>{constellation}</svg>\n'
    )


def main():
    font = TTFont(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FONT)
    OUT.mkdir(parents=True, exist_ok=True)
    for name, svg in {"stars-light.svg": light_tile(), "stars-night.svg": night_tile(font)}.items():
        (OUT / name).write_text(svg, encoding="utf-8")
        print(f"public/ornaments/{name}  {len(svg) / 1024:.1f} KB")


if __name__ == "__main__":
    main()
