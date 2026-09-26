import { readFileSync } from "node:fs";

/**
 * Intrinsic dimensions, read from an image file's header.
 *
 * `next/image` needs width and height up front so the layout can reserve the
 * space before the bytes arrive. Reading them from the file rather than
 * hard-coding them means a photo can be re-exported, converted or swapped for
 * a different crop without anyone remembering to update a number — which is
 * exactly the kind of thing nobody remembers to update.
 *
 * Runs at build time only; see the note in images.ts.
 */
export type Dimensions = { width: number; height: number };

export function imageSize(path: string): Dimensions | null {
  let buf: Buffer;
  try {
    buf = readFileSync(path);
  } catch {
    return null; // Not present — the caller treats that as "no photo yet".
  }

  // --- PNG: IHDR is always the first chunk, at a fixed offset. ------------
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // --- JPEG: walk the marker segments to the start-of-frame. -------------
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let p = 2;
    while (p < buf.length - 9) {
      if (buf[p] !== 0xff) {
        p += 1; // Resynchronise past padding.
        continue;
      }
      const marker = buf[p + 1];
      // SOF0-SOF15 carry the frame size. C4 (Huffman table), C8 (JPEG
      // extension) and CC (arithmetic coding conditioning) sit in the same
      // numeric range but are not frame headers.
      if (
        marker >= 0xc0 && marker <= 0xcf &&
        marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
      ) {
        return { height: buf.readUInt16BE(p + 5), width: buf.readUInt16BE(p + 7) };
      }
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        p += 2; // Standalone markers carry no length field.
        continue;
      }
      p += 2 + buf.readUInt16BE(p + 2);
    }
    return null;
  }

  // --- WebP: RIFF container, three possible codec chunks. ----------------
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      // 24-bit little-endian, stored as (dimension - 1).
      return {
        width: (buf.readUIntLE(24, 3) & 0xffffff) + 1,
        height: (buf.readUIntLE(27, 3) & 0xffffff) + 1,
      };
    }
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === "VP8L") {
      // 14 bits each, packed across four bytes after the 1-byte signature.
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }

  return null;
}
