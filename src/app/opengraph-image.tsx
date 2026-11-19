import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand, contactEmail, hero, homePage, location } from "./content";

export const dynamic = "force-static";
export const alt = homePage.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The same sentence the home page leads with, so a link preview and the page a
 * reader lands on cannot say two different things. Display type is set in
 * caps, as the page sets its h1. */
const HEADLINE = hero.heading.toUpperCase();
const NAME = brand.toUpperCase();
const LINE = `Software factory on demand, ${location.city}, ${location.country}`.toUpperCase();

/*
 * The page's own tokens, read from globals.css at build time. A preview that
 * drifts from the site it links to is a broken promise before a reader has
 * clicked, so the card states no colour of its own. Satori draws no OKLCH, so
 * each token is turned into sRGB here.
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
  return reference ? token(reference) : srgb(value);
}

/* `oklch(L% C H)` or `oklch(L% C H / A)` to a colour Satori draws. */
function srgb(value: string): string {
  const parts = value.match(/^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+))?\s*\)$/);
  if (!parts) throw new Error(`opengraph-image: cannot read the colour ${value}`);
  const lightness = Number(parts[1]) / 100;
  const chroma = Number(parts[2]);
  const hue = (Number(parts[3]) * Math.PI) / 180;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  const [red, green, blue] = linear.map((channel) => {
    const encoded = channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, encoded)) * 255);
  });
  return parts[4] === undefined
    ? `rgb(${red}, ${green}, ${blue})`
    : `rgba(${red}, ${green}, ${blue}, ${parts[4]})`;
}

const PAPER = token("paper");
const INK = token("ink");
const FAINT = token("faint");
const LINE_COLOUR = token("line");
const GOLD_BRIGHT = token("gold-bright");
const SUN = token("sun");
const STAMP = token("primary");
const STAMP_TEXT = token("signal-foreground");
const RICE = token("primary-foreground");

/* The paper as globals.css draws it on <body>: a gold light high on the page
 * and the 112px grid. The light fades to its own colour at no opacity, since
 * a fade to `transparent` passes through grey. */
const LIGHT = srgb("oklch(82% 0.11 79 / 0.55)");
const LIGHT_GONE = srgb("oklch(82% 0.11 79 / 0)");
const GRID_X = srgb("oklch(20% 0.015 80 / 0.035)");
const GRID_Y = srgb("oklch(20% 0.015 80 / 0.028)");

/*
 * Satori reads TTF only. Google Fonts serves a static, subset TTF when the
 * request comes from a non-browser client, so each face is fetched once at
 * build time with just the glyphs this image uses. The faces and weights are
 * the page's own: Chakra Petch 300 for the display line, 500 for the
 * nameplate, and Azeret Mono 500 for the label.
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
  loadFont("Chakra Petch", 300, HEADLINE),
  loadFont("Chakra Petch", 500, NAME),
  loadFont("Azeret Mono", 500, `${LINE}${contactEmail}`),
]);

/* The KP seal from the nameplate, as `Seal` in ornaments.tsx draws it. */
function Seal() {
  return (
    <svg height="64" viewBox="0 0 40 40" width="64">
      <circle cx="20" cy="20" fill={STAMP} r="19.25" />
      <circle cx="20" cy="20" fill="none" opacity="0.6" r="15.75" stroke={RICE} strokeWidth="0.9" />
      <g fill="none" stroke={RICE} strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2.5">
        <path d="M10.75 13v14" />
        <path d="M18 13l-7 7.25" />
        <path d="M13.6 17.6L18.2 27" />
        <path d="M22.25 27V13h3.4a3.9 3.9 0 0 1 0 7.8h-3.4" />
      </g>
    </svg>
  );
}

/* The sun disc setting on its horizon lines, as `SunDisc` in ornaments.tsx
 * draws it. */
function SunDisc() {
  return (
    <svg height="300" viewBox="0 0 240 200" width="360">
      <defs>
        <linearGradient id="glow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={GOLD_BRIGHT} />
          <stop offset="1" stopColor={SUN} />
        </linearGradient>
        <clipPath id="above">
          <rect height="140" width="240" x="0" y="0" />
        </clipPath>
      </defs>
      <circle clipPath="url(#above)" cx="120" cy="104" fill="url(#glow)" r="84" />
      <g fill="none" stroke={LINE_COLOUR} strokeLinecap="round" strokeWidth="1.5">
        <path d="M4 140h232" />
        <path d="M36 158h168" />
        <path d="M74 174h92" />
        <path d="M104 188h32" />
      </g>
    </svg>
  );
}

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
          padding: "56px 72px",
          backgroundColor: PAPER,
          backgroundImage: [
            `radial-gradient(circle at 78% 22%, ${LIGHT}, ${LIGHT_GONE} 300px)`,
            `linear-gradient(90deg, ${GRID_X} 1px, transparent 1px)`,
            `linear-gradient(0deg, ${GRID_Y} 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: "1200px 630px, 112px 112px, 112px 112px",
          color: INK,
        }}
      >
        <div style={{ position: "absolute", right: 64, top: 110, display: "flex" }}>
          <SunDisc />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontFamily: "Chakra Petch",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "0.06em",
          }}
        >
          <Seal />
          {NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Chakra Petch",
            fontSize: 80,
            fontWeight: 300,
            lineHeight: 0.98,
            maxWidth: 760,
          }}
        >
          {HEADLINE}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 22,
            borderTop: `1.5px solid ${LINE_COLOUR}`,
            fontFamily: "Azeret Mono",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: FAINT,
          }}
        >
          <span>{LINE}</span>
          <span style={{ color: STAMP_TEXT }}>{contactEmail}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Chakra Petch", data: display, weight: 300, style: "normal" },
        { name: "Chakra Petch", data: nameplate, weight: 500, style: "normal" },
        { name: "Azeret Mono", data: label, weight: 500, style: "normal" },
      ],
    },
  );
}
