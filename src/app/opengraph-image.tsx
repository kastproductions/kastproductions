import { ImageResponse } from "next/og";
import { brand, contactEmail, hero, homePage, location } from "./content";

export const dynamic = "force-static";
export const alt = homePage.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The same sentence the home page leads with, so a link preview and the page a
 * reader lands on cannot say two different things. */
const HEADLINE = hero.heading;
const LINE = `Software factory on demand, ${location.city}, ${location.country}`;

/* The page's own tokens. A preview that drifts from the site it links to is a
 * broken promise before a reader has clicked. */
const FIELD = "#0d1330";
const TYPE = "#e9eaf4";
const TYPE_2 = "#98a2cf";
const RULE = "#2f3b73";
const SIGNAL = "#ffb92e";

/*
 * Satori reads TTF only. Google Fonts serves a static, subset TTF when the
 * request comes from a non-browser client, so the face is fetched once at build
 * time with just the glyphs this image uses. The display weight and width match
 * the page's own display setting.
 */
async function loadArchivo(text: string): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@118,600&text=${encodeURIComponent(text)}`,
  ).then((response) => response.text());
  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url) {
    throw new Error("opengraph-image: Google Fonts returned no TTF source for Archivo");
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`opengraph-image: ${response.status} fetching Archivo`);
  }
  return response.arrayBuffer();
}

const archivo = await loadArchivo(`${brand}${HEADLINE}${LINE}${contactEmail}`);

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
          padding: "60px 72px",
          background: FIELD,
          color: TYPE,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32 }}>
          <div style={{ width: 11, height: 34, background: SIGNAL }} />
          {brand}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          {HEADLINE}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 26,
            borderTop: `1px solid ${RULE}`,
            fontSize: 26,
            color: TYPE_2,
          }}
        >
          <span>{LINE}</span>
          <span>{contactEmail}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo", data: archivo, weight: 600, style: "normal" }],
    },
  );
}
