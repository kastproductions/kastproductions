import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand, contactEmail, hero, homePage, location } from "./content";

export const dynamic = "force-static";
export const alt = homePage.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The same sentence the home page leads with, so a link preview and the page a
 * reader lands on cannot say two different things. */
const HEADLINE = hero.heading;
const NAME = brand;
const LINE = `Software factory on demand, ${location.city}, ${location.country}`;

/*
 * The page's own tokens, read from globals.css at build time. A preview that
 * drifts from the site it links to is a broken promise before a reader has
 * clicked, so the card states no colour of its own.
 */
const stylesheet = await readFile(join(process.cwd(), "src/app/globals.css"), "utf8");
const rootBlock = stylesheet.match(/:root\s*\{([^}]*)\}/)?.[1] ?? "";
const declared = new Map(
  [...rootBlock.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
);

function token(name: string): string {
  const value = declared.get(name);
  if (!value) throw new Error(`opengraph-image: globals.css declares no --${name} in :root`);
  const reference = value.match(/^var\(--([\w-]+)\)$/)?.[1];
  if (reference) return token(reference);
  if (!/^#[0-9a-f]{6}$/i.test(value)) {
    throw new Error(`opengraph-image: --${name} is not a hex colour: ${value}`);
  }
  return value;
}

const PAPER = token("paper");
const INK = token("ink");
const FAINT = token("faint");
const LINE_COLOUR = token("line");
const SIGNAL = token("signal-foreground");

/*
 * Satori reads TTF only. Google Fonts serves a static, subset TTF when the
 * request comes from a non-browser client, so each face is fetched once at
 * build time with just the glyphs this image uses. The face and weights are
 * the page's own: Schibsted Grotesk 600 for the headline, 700 for the name,
 * and 500 for the line under them.
 */
async function loadFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((response) => response.text());
  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url) {
    throw new Error(`opengraph-image: Google Fonts returned no TTF source for ${family} ${weight}`);
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`opengraph-image: ${response.status} fetching ${family} ${weight}`);
  }
  return response.arrayBuffer();
}

const [display, nameplate, label] = await Promise.all([
  loadFont("Schibsted Grotesk", 600, HEADLINE),
  loadFont("Schibsted Grotesk", 700, NAME),
  loadFont("Schibsted Grotesk", 500, `${LINE}${contactEmail}`),
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
          padding: "64px 80px",
          backgroundColor: PAPER,
          color: INK,
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 600,
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
            paddingTop: 24,
            borderTop: `2px solid ${LINE_COLOUR}`,
            fontSize: 24,
            fontWeight: 500,
            color: FAINT,
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
        { name: "Schibsted Grotesk", data: display, weight: 600, style: "normal" },
        { name: "Schibsted Grotesk", data: nameplate, weight: 700, style: "normal" },
        { name: "Schibsted Grotesk", data: label, weight: 500, style: "normal" },
      ],
    },
  );
}
