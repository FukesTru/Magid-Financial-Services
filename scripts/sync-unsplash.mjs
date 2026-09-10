#!/usr/bin/env node
/**
 * Resolve every photography slot against the Unsplash API and write the
 * result to `src/lib/photo-manifest.json`.
 *
 *   UNSPLASH_ACCESS_KEY=... npm run photos:sync
 *
 * The key is read from the environment or from `.env.local`, and is never
 * written to the manifest, logged, or committed — the site itself does not
 * talk to Unsplash at runtime. This script resolves photos once; the manifest
 * it produces is a plain static file that gets committed alongside the code.
 *
 * Useful flags:
 *
 *   --force          Re-resolve slots that are already filled in.
 *   --only=<key>     Work on one slot: --only=hero-background,
 *                    --only=service/payroll-support.
 *   --dry-run        Report what would change without writing anything.
 *
 * Results are merged into the existing manifest and already-filled slots are
 * skipped, so an interrupted run costs nothing to resume. That matters: a demo
 * Unsplash application is capped at 50 requests an hour and a full sync of all
 * fifteen slots spends about thirty.
 *
 * Behind an HTTPS proxy, Node's built-in fetch ignores HTTPS_PROXY unless you
 * run it with NODE_USE_ENV_PROXY=1 (Node >= 22.21).
 */

import { deflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { allSlots, serviceQueries } from "./unsplash-slots.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(repoRoot, "src/lib/photo-manifest.json");
const sitePath = resolve(repoRoot, "src/lib/site.ts");

const API = "https://api.unsplash.com";

/**
 * Unsplash asks that links back to a photographer carry these, so it can
 * attribute traffic to the application sending it.
 * https://help.unsplash.com/en/articles/2511315-guideline-attribution
 */
const UTM = "utm_source=magid_financial_services&utm_medium=referral";

/* -------------------------------------------------------------------------- */
/* Arguments                                                                   */
/* -------------------------------------------------------------------------- */

const args = process.argv.slice(2);
const force = args.includes("--force");
const dryRun = args.includes("--dry-run");
const only = args.find((a) => a.startsWith("--only="))?.slice("--only=".length);

const unknownFlag = args.find(
  (a) => a.startsWith("-") && !["--force", "--dry-run"].includes(a) && !a.startsWith("--only="),
);
if (unknownFlag) {
  fail(`Unknown flag ${unknownFlag}. Supported: --force, --only=<key>, --dry-run.`);
}

/* -------------------------------------------------------------------------- */
/* Access key                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Read the key from the environment, falling back to `.env.local` so the
 * script works the same way `next dev` does. `.env*` is gitignored.
 */
function readAccessKey() {
  const fromEnv = process.env.UNSPLASH_ACCESS_KEY?.trim();
  if (fromEnv) return fromEnv;

  try {
    const envFile = readFileSync(resolve(repoRoot, ".env.local"), "utf8");
    const match = envFile.match(/^\s*UNSPLASH_ACCESS_KEY\s*=\s*(.+)$/m);
    const value = match?.[1]?.trim().replace(/^["']|["']$/g, "");
    if (value) return value;
  } catch {
    // No .env.local — fall through to the error below.
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Unsplash                                                                    */
/* -------------------------------------------------------------------------- */

let accessKey = null;
let requestCount = 0;
let rateRemaining = null;

async function unsplash(url) {
  requestCount += 1;

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Accept-Version": "v1",
    },
  });

  const remaining = response.headers.get("x-ratelimit-remaining");
  if (remaining !== null) rateRemaining = Number(remaining);

  if (response.status === 401) {
    fail("Unsplash rejected the access key (401). Check UNSPLASH_ACCESS_KEY.");
  }
  if (response.status === 403 && rateRemaining === 0) {
    fail(
      "Unsplash rate limit reached (50 requests/hour on a demo application).\n" +
        "Filled slots are already saved — re-run this in an hour to finish the rest.",
    );
  }
  if (!response.ok) {
    // Strip the key out of anything we echo back, in case it is in the URL.
    const safeUrl = url.replace(/client_id=[^&]+/g, "client_id=REDACTED");
    fail(`Unsplash returned ${response.status} for ${safeUrl}`);
  }

  // Be a polite client; the search and download endpoints share one budget.
  await new Promise((r) => setTimeout(r, 250));

  return response.json();
}

/**
 * Tell Unsplash the photo was used.
 *
 * This is a requirement of the API terms, not an optimisation: applications
 * are expected to hit `links.download_location` whenever a photo is put to
 * use, so downloads are counted against the photographer. Failing it should
 * not sink the sync, so it only warns.
 * https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
 */
async function trackDownload(photo) {
  try {
    await unsplash(photo.links.download_location);
  } catch (error) {
    warn(`Could not register a download for ${photo.id}: ${error.message}`);
  }
}

async function findPhoto(slot) {
  if (slot.pin) {
    return unsplash(`${API}/photos/${encodeURIComponent(slot.pin)}`);
  }

  const params = new URLSearchParams({
    query: slot.query,
    per_page: "10",
    orientation: slot.orientation,
    // Client work — keep the results conservative.
    content_filter: "high",
  });

  const { results } = await unsplash(`${API}/search/photos?${params}`);
  if (!results?.length) return null;

  // Big enough to survive a full-bleed backdrop, and not already used elsewhere
  // on the page — the same stock photo twice reads as a mistake.
  const minEdge = slot.orientation === "portrait" ? 1400 : 1800;
  const usable = results.filter(
    (photo) =>
      !usedIds.has(photo.id) &&
      (slot.orientation === "portrait" ? photo.height : photo.width) >= minEdge,
  );

  return usable[0] ?? results.find((photo) => !usedIds.has(photo.id)) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Placeholder colour                                                          */
/* -------------------------------------------------------------------------- */

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

/**
 * Build a 1x1 PNG of the photo's average colour, as a data URL.
 *
 * next/image needs a `blurDataURL` for any remote image that wants a blur-up
 * placeholder, and it cannot generate one for a URL it has not fetched. Unsplash
 * hands back the photo's dominant colour, which is all a blurred placeholder
 * ever shows anyway — so the image fades up out of its own colour instead of
 * popping in against navy. Encoded here rather than pulled from a library so
 * the script keeps zero dependencies.
 */
function colourPlaceholder(hex) {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex ?? "");
  if (!match) return null;

  const [r, g, b] = match[1].match(/../g).map((pair) => parseInt(pair, 16));

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(1, 0); // width
  ihdr.writeUInt32BE(1, 4); // height
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  // bytes 10-12 stay zero: deflate, adaptive filtering, no interlace.

  // One scanline: a leading filter byte, then the pixel.
  const idat = deflateSync(Buffer.from([0, r, g, b]));

  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);

  return `data:image/png;base64,${png.toString("base64")}`;
}

/* -------------------------------------------------------------------------- */
/* Manifest                                                                    */
/* -------------------------------------------------------------------------- */

const MANIFEST_README =
  "Generated by `npm run photos:sync` — edit scripts/unsplash-slots.mjs, not this file.";

function loadManifest() {
  try {
    const parsed = JSON.parse(readFileSync(manifestPath, "utf8"));
    return parsed?.slots && typeof parsed.slots === "object" ? parsed : { slots: {} };
  } catch {
    return { slots: {} };
  }
}

/** Shape one API response into the small record the site actually reads. */
function toEntry(slot, photo) {
  const description = photo.description?.trim() || photo.alt_description?.trim() || "";

  return {
    id: photo.id,
    // The bare file URL. next/image re-fetches and re-encodes server side, so
    // Unsplash's own sizing parameters would only be thrown away.
    src: photo.urls.raw.split("?")[0],
    width: photo.width,
    height: photo.height,
    // Decorative slots ship with alt="" so screen readers skip them; the rest
    // get Unsplash's description as a draft for a human to rewrite.
    alt: slot.decorative ? "" : description,
    needsAltReview: !slot.decorative,
    blurDataURL: colourPlaceholder(photo.color),
    credit: {
      name: photo.user.name,
      url: `${photo.user.links.html}?${UTM}`,
    },
    photoUrl: `${photo.links.html}?${UTM}`,
    syncedAt: new Date().toISOString().slice(0, 10),
  };
}

/* -------------------------------------------------------------------------- */
/* Drift check                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * `src/lib/site.ts` is the one place services are defined. If a service is
 * added there without a matching card query, the card would render photo-less
 * with no warning — so catch the drift here instead.
 */
function assertServiceQueriesMatchSite() {
  const source = readFileSync(sitePath, "utf8");
  const block = source.slice(source.indexOf("export const services"));
  const slugs = [...block.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

  if (!slugs.length) {
    fail(
      `Could not read any service slugs out of ${sitePath}.\n` +
        "If the shape of `services` changed, update the parser in this script.",
    );
  }

  const queried = new Set(Object.keys(serviceQueries));
  const missing = slugs.filter((slug) => !queried.has(slug));
  const extra = [...queried].filter((slug) => !slugs.includes(slug));

  if (missing.length || extra.length) {
    fail(
      "scripts/unsplash-slots.mjs has drifted from src/lib/site.ts.\n" +
        (missing.length ? `  Services with no card query: ${missing.join(", ")}\n` : "") +
        (extra.length ? `  Queries for unknown services: ${extra.join(", ")}\n` : ""),
    );
  }
}

/* -------------------------------------------------------------------------- */
/* Reporting                                                                   */
/* -------------------------------------------------------------------------- */

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

function warn(message) {
  console.warn(`  ! ${message}`);
}

/* -------------------------------------------------------------------------- */
/* Run                                                                         */
/* -------------------------------------------------------------------------- */

assertServiceQueriesMatchSite();

const manifest = loadManifest();
const usedIds = new Set(
  Object.values(manifest.slots)
    .map((entry) => entry?.id)
    .filter(Boolean),
);

let slots = allSlots();
if (only) {
  slots = slots.filter((slot) => slot.key === only);
  if (!slots.length) {
    fail(`No slot named "${only}". Known slots:\n  ${allSlots().map((s) => s.key).join("\n  ")}`);
  }
}

const pending = slots.filter((slot) => force || !manifest.slots[slot.key]);

if (!pending.length) {
  console.log(
    `\nAll ${slots.length} slot(s) already resolved. Re-run with --force to replace them.\n`,
  );
  process.exit(0);
}

if (dryRun) {
  console.log(`\nWould resolve ${pending.length} slot(s):\n`);
  for (const slot of pending) {
    console.log(`  ${slot.key.padEnd(34)} ${slot.pin ? `pinned ${slot.pin}` : `"${slot.query}"`}`);
  }
  console.log("");
  process.exit(0);
}

accessKey = readAccessKey();
if (!accessKey) {
  fail(
    "No Unsplash access key.\n" +
      "  Set UNSPLASH_ACCESS_KEY in your environment, or add it to .env.local:\n" +
      "    UNSPLASH_ACCESS_KEY=your-access-key\n" +
      "  Keys come from https://unsplash.com/oauth/applications",
  );
}

console.log(`\nResolving ${pending.length} photo slot(s)…\n`);

const needAltReview = [];
let resolved = 0;

for (const slot of pending) {
  process.stdout.write(`  ${slot.key.padEnd(34)}`);

  const photo = await findPhoto(slot);
  if (!photo) {
    console.log(`no usable result for "${slot.query}"`);
    warn("Try a different query, or pin a photo id in scripts/unsplash-slots.mjs.");
    continue;
  }

  await trackDownload(photo);

  const entry = toEntry(slot, photo);
  manifest.slots[slot.key] = entry;
  usedIds.add(photo.id);
  resolved += 1;
  if (entry.needsAltReview) needAltReview.push(slot.key);

  console.log(`${photo.id}  (${photo.width}x${photo.height})  © ${entry.credit.name}`);
}

manifest._readme = MANIFEST_README;
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`\n✓ ${resolved} slot(s) written to src/lib/photo-manifest.json`);
console.log(`  ${requestCount} API requests used${
  rateRemaining === null ? "" : `, ${rateRemaining} left this hour`
}`);

if (needAltReview.length) {
  console.log(
    `\n  Alt text to review by hand (Unsplash's own description was used as a draft):\n` +
      needAltReview.map((key) => `    ${key}`).join("\n") +
      `\n  Edit the "alt" field in the manifest, then clear "needsAltReview".`,
  );
}

console.log("");
