/**
 * Generates the guilloche engravings in public/engraving/.
 *
 * Guilloche is the interlaced line-work on banknotes, share certificates and
 * bond coupons. It is made from epitrochoids — the path traced by a point on a
 * small circle rolling around a larger one:
 *
 *     x = r1·cos(t) + r2·cos(ratio·t + phase)
 *     y = r1·sin(t) + r2·sin(ratio·t + phase)
 *
 * Overlay a couple of dozen of those at evenly rotated phase and the moire
 * between them produces the woven rosette. `ratio` sets the petal count and
 * r2/r1 sets how deep the weave cuts.
 *
 * Why generated rather than drawn: these are the only backgrounds on the site
 * that carry the "financial instrument" association honestly — they are the
 * real thing, not a photograph of one — and at 10 KB gzipped for the hero they
 * cost a fraction of the photograph they replace.
 *
 * Run with:  node scripts/generate-engravings.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "engraving");
const TAU = Math.PI * 2;

/**
 * Relative `l` commands at integer precision. Neighbouring samples are only a
 * few units apart, so a delta costs 1-3 characters where an absolute
 * coordinate costs 5-7 — about a 3x saving over the whole file, for a drift of
 * at most half a unit on a 800-unit viewBox that is drawn in 0.7-unit hairlines.
 */
function relPath(points) {
  let out = "";
  let px = 0;
  let py = 0;
  points.forEach(([x, y], i) => {
    const ix = Math.round(x);
    const iy = Math.round(y);
    if (i === 0) {
      out += `M${ix} ${iy}`;
    } else {
      const dx = ix - px;
      const dy = iy - py;
      if (dx === 0 && dy === 0) return;
      out += `l${dx} ${dy}`;
    }
    px = ix;
    py = iy;
  });
  return `${out}z`.replace(/ -/g, "-");
}

function epitrochoid({ r1, r2, ratio, phase, steps, cx, cy, squash = 1 }) {
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = (TAU * i) / steps;
    pts.push([
      cx + r1 * Math.cos(t) + r2 * Math.cos(ratio * t + phase),
      cy + (r1 * Math.sin(t) + r2 * Math.sin(ratio * t + phase)) * squash,
    ]);
  }
  return pts;
}

function svg(viewBox, body, width) {
  // stroke="currentColor" keeps the palette in CSS: one asset serves the brass
  // watermark on navy and the ink watermark on bone.
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" ` +
    `stroke="currentColor" stroke-width="${width}">${body}</svg>`
  );
}

function rosette({ size, r1, r2, ratio, copies, steps, width }) {
  const c = size / 2;
  let body = "";
  for (let k = 0; k < copies; k += 1) {
    const phase = (TAU * k) / copies;
    body += `<path d="${relPath(epitrochoid({ r1, r2, ratio, phase, steps, cx: c, cy: c }))}"/>`;
  }
  return svg(`0 0 ${size} ${size}`, body, width);
}

/**
 * The horizontal ribbon used on section seams — the cheque-border relative of
 * the rosette. Two sine components beat against each other; the phase sweep
 * across copies opens and closes the weave along the band.
 */
function band({ w, h, copies, steps, width }) {
  const mid = h / 2;
  let body = "";
  for (let k = 0; k < copies; k += 1) {
    const phase = (TAU * k) / copies;
    const pts = [];
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = t * w;
      const y =
        mid +
        (h * 0.32) * Math.sin(TAU * 3 * t + phase) +
        (h * 0.16) * Math.sin(TAU * 7 * t - phase * 1.6);
      pts.push([x, y]);
    }
    // Open ribbon, not a closed loop.
    body += `<path d="${relPath(pts).slice(0, -1)}"/>`;
  }
  return svg(`0 0 ${w} ${h}`, body, width);
}

mkdirSync(OUT, { recursive: true });

const assets = {
  // Hero watermark. Large and cropped by its container, so the aperture reads
  // as a deliberate void rather than a hole in the middle of a circle.
  "rosette.svg": rosette({ size: 800, r1: 300, r2: 110, ratio: 7, copies: 22, steps: 260, width: 0.7 }),
  // A tighter, denser rosette for the closing CTA, where it sits smaller.
  "rosette-fine.svg": rosette({ size: 800, r1: 300, r2: 120, ratio: 13, copies: 20, steps: 240, width: 0.7 }),
  "band.svg": band({ w: 1200, h: 120, copies: 14, steps: 300, width: 0.7 }),
};

/**
 * Card motifs. Each service gets a different petal count and weave depth, so
 * twelve cards in a grid read as twelve engravings rather than one repeated
 * twelve times. Curated rather than hashed — a hash picks ugly pairs.
 */
const MOTIFS = [
  // [slug, petal count, weave depth]. Petal count does the differentiating;
  // weave depth stays inside r2/r1 <= 0.42, past which the outer edge stops
  // being a circle and turns into a rounded polygon.
  ["local-tax-return-preparation", 3, 112],
  ["tax-problem-consulting", 4, 116],
  ["tax-preparation", 5, 118],
  ["income-tax-return-filing", 6, 114],
  ["accounting-services", 7, 110],
  ["payroll-support", 8, 106],
  ["business-tax-services", 9, 102],
  ["irs-audit-representation", 10, 98],
  ["tax-planning", 11, 94],
  ["loan-modifications", 12, 90],
  ["new-business-tax-consulting", 13, 86],
  ["debt-settlement", 14, 82],
];

for (const [slug, ratio, r2] of MOTIFS) {
  assets[`motif-${slug}.svg`] = rosette({
    size: 400,
    r1: 150,
    r2: r2 / 2,
    ratio,
    copies: 10,
    steps: 170,
    width: 0.9,
  });
}

let total = 0;
for (const [name, content] of Object.entries(assets)) {
  writeFileSync(join(OUT, name), content);
  const gz = gzipSync(content, { level: 9 }).length;
  total += gz;
  console.log(`${name.padEnd(36)} ${String(content.length).padStart(7)} B  ${(gz / 1024).toFixed(1).padStart(6)} KB gz`);
}
console.log(`${"".padEnd(36)} ${"".padStart(7)}    ${(total / 1024).toFixed(1).padStart(6)} KB gz total`);
