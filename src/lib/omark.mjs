// The O mark: a Venn of two equal circles. The left circle is drawn with identical tapered
// horizontal rows, the overlap is a solid lens, the right piece is solid behind a thin gap.
// Plain ESM so both the site (client script) and scripts/build-icons.mjs can use it.

const R = 29;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smooth = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

/** Screen sizes: the gap equals the white between thick rows (6 − 3.72 ≈ 2.3). */
export const SCALE = { pitch: 6, thin: 1.1, thickK: 0.62, taper: 4.5, gap: 2.3 };
/** Favicon sizes (16–32px): fewer, heavier rows. */
export const SCALE_SMALL = { pitch: 11, thin: 2.6, thickK: 0.62, taper: 6, gap: 4.2 };

const circlePath = (cx) =>
  `M${cx - R} 50A${R} ${R} 0 1 0 ${cx + R} 50A${R} ${R} 0 1 0 ${cx - R} 50Z`;

function rowGrid(s) {
  const n = Math.floor((2 * R) / s.pitch) + 1;
  return { n, first: 50 - ((n - 1) * s.pitch) / 2 };
}

/** Rows that attach to the overlap, top to bottom (used to map reading progress onto rows). */
export function rowCount(s = SCALE) {
  return rows(s, 0).length;
}

function rows(s, sep) {
  const ac = 39 - sep;
  const bx = 61 + sep;
  const ri = R - s.gap / 2 - 1;
  const { n, first } = rowGrid(s);
  const out = [];
  for (let i = 0; i < n; i++) {
    const y = first + i * s.pitch;
    const dy = y - 50;
    if (Math.abs(dy) >= R - 0.5) continue;
    const h = Math.sqrt(R * R - dy * dy);
    const xl = ac - h;
    let xr = bx - h; // overlap's edge
    const attached = (xr - ac) ** 2 + dy * dy <= ri * ri;
    if (!attached) xr = Math.min(xr, ac + h) - s.gap - 2.5; // stop well short of the tip
    if (xr - xl < 4) continue;
    out.push({ i, y, dy, xl, xr, attached });
  }
  return out;
}

// With two equal circles every horizontal chord of the crescent has the same length, so one
// profile fits every row: full weight on the O's outer edge (that edge draws the circle), a long
// taper, and a thin neck that runs straight into the solid overlap.
function rowPaths(s, f) {
  const thick = s.pitch * s.thickK;
  const list = rows(s, f.sep);
  let d = "";
  list.forEach((r, k) => {
    const len = r.xr - r.xl;
    const wave = f.flowing ? Math.sin(f.t * 1.7 - r.i * 0.55) : 0;
    const et = len * 0.5 + wave * 1.8; // where the weight hands over to the hairline
    const fill = f.fill ? f.fill(k, list.length) : 1;
    const reach = (len + 1) * clamp(f.grow * 1.15 - (Math.abs(r.dy) / R) * 0.15) * fill;
    if (reach < 0.5) return;
    const end = r.attached ? r.xr + 0.8 : r.xr; // attached rows tuck into the overlap: no seam
    const start = Math.max(r.xl - 1, end - reach);
    const top = [];
    const bot = [];
    const steps = Math.max(10, Math.ceil((end - start) / 0.4));
    for (let j = 0; j <= steps; j++) {
      const x = start + ((end - start) * j) / steps;
      const w = s.thin + (thick - s.thin) * (1 - smooth(et - s.taper, et + s.taper, x - r.xl));
      top.push(`${x.toFixed(2)} ${(r.y - w / 2).toFixed(2)}`);
      bot.unshift(`${x.toFixed(2)} ${(r.y + w / 2).toFixed(2)}`);
    }
    const cap = s.thin / 2;
    d += `M${top.join("L")}A${cap} ${cap} 0 0 1 ${bot[0]}L${bot.join("L")}Z`;
  });
  return d;
}

/**
 * SVG body for a 0 0 100 100 viewBox.
 * f: { sep, t, grow, flowing, fill?(rowIndex, rowCount) → 0..1, ghost?: 0..1 }
 */
export function markup(s, f, fg, id) {
  const ac = 39 - f.sep;
  const a = circlePath(ac);
  const b = circlePath(61 + f.sep);
  const gap = `<path d="${a}" fill="none" stroke="#000" stroke-width="${s.gap}"/>`;
  const mask = (mid, inner) =>
    `<mask id="${mid}" maskUnits="userSpaceOnUse" x="-40" y="-40" width="180" height="180">${inner}${gap}</mask>`;
  const solidIn = clamp(f.grow * 3);
  const ghost =
    f.ghost && f.fill
      ? `<path d="${rowPaths(s, { ...f, fill: undefined })}" fill="${fg}" opacity="${(0.18 * f.ghost).toFixed(3)}"/>`
      : "";
  return (
    `<defs>` +
    `<clipPath id="${id}L"><path d="${a}"/></clipPath>` +
    mask(`${id}R`, `<path d="${b}" fill="#fff"/><path d="${a}" fill="#000"/>`) +
    mask(`${id}G`, `<rect x="-40" y="-40" width="180" height="180" fill="#fff"/>`) +
    `<clipPath id="${id}A"><path d="${a}"/></clipPath></defs>` +
    `<g opacity="${solidIn.toFixed(3)}">` +
    `<path d="${b}" fill="${fg}" mask="url(#${id}R)"/>` +
    `<g mask="url(#${id}G)"><path d="${b}" fill="${fg}" clip-path="url(#${id}A)"/></g></g>` +
    `<g clip-path="url(#${id}L)">${ghost}<path d="${rowPaths(s, f)}" fill="${fg}"/></g>`
  );
}

/** A finished, still frame. */
export const STILL = { sep: 0, t: 0, grow: 1, flowing: false };
