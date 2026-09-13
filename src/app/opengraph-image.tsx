import { ImageResponse } from "next/og";
import { brand, contactEmail, hero, location, title } from "./content";

export const dynamic = "force-static";
export const alt = title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The same sentence the home page leads with, so a link preview and the page a
 * reader lands on cannot say two different things. */
const HEADLINE = hero.heading;
const LINE = `Software factory on demand, ${location.city}, ${location.country}`;

/*
 * Satori reads TTF only. Google Fonts serves a static, subset TTF when the
 * request comes from a non-browser client, so the font is fetched once at
 * build time with just the glyphs this image uses.
 */
async function loadBricolage(text: string): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@96,600&text=${encodeURIComponent(text)}`,
  ).then((response) => response.text());
  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url) {
    throw new Error("opengraph-image: Google Fonts returned no TTF source for Bricolage Grotesque");
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`opengraph-image: ${response.status} fetching Bricolage Grotesque`);
  }
  return response.arrayBuffer();
}

const bricolage = await loadBricolage(`${brand}${HEADLINE}${LINE}${contactEmail}`);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#1b2b63",
          color: "#f3f3ef",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34 }}>
          <div style={{ width: 24, height: 24, background: "#ffb92e", borderRadius: 2 }} />
          {brand}
        </div>
        <div
          style={{
            fontSize: 80,
            lineHeight: 1.02,
            letterSpacing: "-0.028em",
          }}
        >
          {HEADLINE}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#b7bedf",
          }}
        >
          <span>{LINE}</span>
          <span>{contactEmail}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bricolage Grotesque", data: bricolage, weight: 600, style: "normal" }],
    },
  );
}
