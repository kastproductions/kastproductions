import { useId } from "react";
import { cn } from "@/lib/utils";

/*
 * The ornaments of the Neo Mirai world (ADR-0006), drawn by hand as SVG: the
 * stamp seal with the KP monogram, the sun disc setting on its horizon lines,
 * and the eclipse. Each takes its neutral form only. There is no ray, no
 * burst and no flag in any of them, as the impeccable skill asks of a sun.
 *
 * Every ornament paints with theme tokens, so on a night surface it takes the
 * night colours with no prop. Every one is hidden from a screen reader,
 * because it says nothing the page does not say in words, and carries a
 * `data-ornament` name so the export suite can find it.
 */

type OrnamentProps = { className?: string };

/*
 * The seal: a round stamp in the action colour with a fine inner ring, and
 * the K and the P cut in straight strokes so the monogram never waits on a
 * font. On paper it is stamp red; on night teal it turns gold.
 */
export function Seal({ className }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0", className)}
      data-ornament="seal"
      focusable="false"
      viewBox="0 0 40 40"
    >
      <circle className="fill-primary" cx="20" cy="20" r="19.25" />
      <circle
        className="fill-none stroke-primary-foreground"
        cx="20"
        cy="20"
        opacity="0.6"
        r="15.75"
        strokeWidth="0.9"
      />
      <g
        className="fill-none stroke-primary-foreground"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2.5"
      >
        <path d="M10.75 13v14" />
        <path d="M18 13l-7 7.25" />
        <path d="M13.6 17.6L18.2 27" />
        <path d="M22.25 27V13h3.4a3.9 3.9 0 0 1 0 7.8h-3.4" />
      </g>
    </svg>
  );
}

/*
 * The sun disc, setting: a disc in gold that warms to the sun colour at its
 * foot, cut by the horizon, with three horizon lines under it that shorten
 * towards the viewer.
 */
export function SunDisc({ className }: OrnamentProps) {
  const id = useId();
  const glow = `${id}-glow`;
  const above = `${id}-above`;
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0", className)}
      data-ornament="sun"
      focusable="false"
      viewBox="0 0 240 200"
    >
      <defs>
        <linearGradient id={glow} x1="0" x2="0" y1="0" y2="1">
          <stop className="[stop-color:var(--gold-bright)]" offset="0" />
          <stop className="[stop-color:var(--sun)]" offset="1" />
        </linearGradient>
        <clipPath id={above}>
          <rect height="140" width="240" x="0" y="0" />
        </clipPath>
      </defs>
      <circle clipPath={`url(#${above})`} cx="120" cy="104" fill={`url(#${glow})`} r="84" />
      <g className="fill-none stroke-line" strokeLinecap="round" strokeWidth="1.5">
        <path d="M4 140h232" />
        <path d="M36 158h168" />
        <path d="M74 174h92" />
        <path d="M104 188h32" />
      </g>
    </svg>
  );
}

/*
 * The eclipse: a gold disc with a thin ring of light around it, and the dark
 * disc of the moon crossing it from the upper right. The moon takes the
 * eclipse token, which is ink on paper and night on night teal, so it reads
 * as a hole in the light on either surface.
 */
export function Eclipse({ className }: OrnamentProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0", className)}
      data-ornament="eclipse"
      focusable="false"
      viewBox="0 0 120 120"
    >
      <circle className="fill-none stroke-line" cx="60" cy="60" r="55" strokeWidth="1" />
      <circle className="fill-none stroke-gold-bright" cx="60" cy="60" r="47" strokeWidth="1.5" />
      <circle className="fill-gold" cx="60" cy="60" r="40" />
      <circle className="fill-eclipse" cx="70" cy="52" r="38" />
    </svg>
  );
}
