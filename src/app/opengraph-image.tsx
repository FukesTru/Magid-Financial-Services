import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt =
  "Magid Financial Services — expert payroll and tax solutions, Huntingdon Valley, PA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The exact strings drawn into the card. Google's font API subsets to the
   characters we ask for, so these double as the subset request — anything
   rendered but not listed here would silently fall back to another face. */
const MONOGRAM = "M";
const HEADLINE = "Filed right. Filed on time.";
const TAGLINE = "Since 1989.";
const LOCKUP = "MAGID FINANCIAL SERVICES";
// The year is already the headline's second line; repeating it here wasted
// the one place the card could name the services.
const FOOTER = `${site.address.locality}, ${site.address.region}  ·  Payroll, tax & accounting  ·  All 50 states  ·  ${site.phone.display}`;

/**
 * Fetch a Google font as raw TTF for the image renderer.
 *
 * Returns null on any failure so a network hiccup at build time degrades to
 * the renderer's default face rather than failing the build.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await fetch(url).then((res) => res.text());
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const [display, body] = await Promise.all([
    loadGoogleFont("Playfair Display", 600, MONOGRAM + HEADLINE + TAGLINE),
    loadGoogleFont("Inter", 400, LOCKUP + FOOTER),
  ]);

  const fonts = [
    display && {
      name: "Playfair",
      data: display,
      weight: 600 as const,
      style: "normal" as const,
    },
    body && {
      name: "Inter",
      data: body,
      weight: 400 as const,
      style: "normal" as const,
    },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 600 | 400;
    style: "normal";
  }[];

  const serif = display ? "Playfair" : "serif";
  const sans = body ? "Inter" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0f1a",
          backgroundImage:
            "radial-gradient(60% 70% at 50% 0%, rgba(201,168,76,0.20) 0%, rgba(10,15,26,0) 70%)",
          padding: "72px 80px",
        }}
      >
        {/* Monogram + firm name */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 62,
              height: 62,
              border: "2px solid rgba(201,168,76,0.55)",
              color: "#C9A84C",
              fontSize: 34,
              fontFamily: serif,
            }}
          >
            {MONOGRAM}
          </div>
          <div
            style={{
              fontSize: 25,
              letterSpacing: "0.2em",
              color: "#a4b0c2",
              fontFamily: sans,
            }}
          >
            {LOCKUP}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              color: "#f6f8fb",
              fontFamily: serif,
              maxWidth: 960,
            }}
          >
            {HEADLINE}
          </div>
          <div
            style={{
              fontSize: 46,
              lineHeight: 1.24,
              marginTop: 14,
              color: "#e2c877",
              fontFamily: serif,
              maxWidth: 960,
            }}
          >
            {TAGLINE}
          </div>
          <div
            style={{
              width: 132,
              height: 4,
              marginTop: 36,
              backgroundColor: "#C9A84C",
            }}
          />
        </div>

        {/* Footer line */}
        <div style={{ display: "flex", fontSize: 23, color: "#7b8799", fontFamily: sans }}>
          {FOOTER}
        </div>
      </div>
    ),
    { ...size, ...(fonts.length > 0 ? { fonts } : {}) },
  );
}
