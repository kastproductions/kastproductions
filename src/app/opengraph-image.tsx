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
 * broken promise before a reader has clicked. The mailbox is the one action
 * the card offers, so it is the one thing in the signature blue. */
const FIELD = "#ffffff";
const TYPE = "#000000";
const TYPE_2 = "#5f636c";
const SIGNAL = "#2340e0";

/*
 * Satori reads TTF only. Google Fonts serves a static, subset TTF when the
 * request comes from a non-browser client, so each weight is fetched once at
 * build time with just the glyphs this image uses. The weights match the
 * page's own: 800 for the display heading, 500 for everything else.
 */
async function loadSchibsted(weight: number, text: string): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((response) => response.text());
  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url) {
    throw new Error(
      `opengraph-image: Google Fonts returned no TTF source for Schibsted Grotesk ${weight}`,
    );
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`opengraph-image: ${response.status} fetching Schibsted Grotesk ${weight}`);
  }
  return response.arrayBuffer();
}

const [display, text] = await Promise.all([
  loadSchibsted(800, `K${brand}${HEADLINE}`),
  loadSchibsted(500, `${LINE}${contactEmail}`),
]);

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
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              background: TYPE,
              color: FIELD,
              fontSize: 28,
            }}
          >
            K
          </div>
          {brand}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 0.98,
            letterSpacing: "-0.05em",
            maxWidth: 980,
          }}
        >
          {HEADLINE}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: `2px solid ${TYPE}`,
            fontSize: 26,
            fontWeight: 500,
            color: TYPE_2,
          }}
        >
          <span>{LINE}</span>
          <span style={{ color: SIGNAL }}>{contactEmail}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted Grotesk", data: display, weight: 800, style: "normal" },
        { name: "Schibsted Grotesk", data: text, weight: 500, style: "normal" },
      ],
    },
  );
}
