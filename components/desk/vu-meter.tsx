import { cn } from "@/lib/utils";

/**
 * A VU meter face, drawn rather than decorated.
 *
 * The scale is the real one. A moving-coil pointer follows voltage, not
 * decibels, so the printed marks crowd towards the left pin: deflection is
 * `10^((dB - 3) / 20)` across a 60° sweep, which puts 0 VU at 71% of the arc
 * exactly where a Sifam face puts it.
 *
 * The pivot sits below the viewBox, because that is where it sits inside a real
 * movement — the pointer emerges from behind the bottom bezel. The box is
 * trimmed to the bezel itself so the caller gets no invisible padding to fight
 * when it silkscreens the channel legend underneath.
 *
 * The whole face is static markup. Only the needle group reads `--vu-l` /
 * `--vu-r`, so the meter costs nothing until the engine moves it.
 */

const PIVOT_X = 154;
const PIVOT_Y = 228;
const SWEEP = 60; // degrees, -30 to +30

/**
 * Where a dB mark sits on the face. A moving coil follows voltage, so the mark
 * for `db` lands at `10^((db - 3) / 20)` of the sweep, normalised so +3 VU
 * reaches the right pin. Nothing about that is guessable from the callsite.
 */
function polar(db: number, radius: number) {
  const degrees = -SWEEP / 2 + SWEEP * Math.pow(10, (db - 3) / 20);
  const radians = (degrees * Math.PI) / 180;
  return {
    x: PIVOT_X + radius * Math.sin(radians),
    y: PIVOT_Y - radius * Math.cos(radians),
  };
}

function tick(db: number, inner: number, outer: number) {
  const a = polar(db, inner);
  const b = polar(db, outer);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} L ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

const MAJOR = [-20, -10, -7, -5, -3, -2, -1, 0, 1, 2, 3];
const MINOR = [-15, -12, -9, -8, -6, -4, 0.5, 1.5, 2.5];

/* Only the marks with room around them get a numeral. The -3/-2/-1 cluster
 * sits inside 20px of arc, so printing all three collides — a real face solves
 * this the same way, by leaving the crowded marks unnumbered. */
const LABELLED: [number, string][] = [
  [-20, "20"],
  [-10, "10"],
  [-7, "7"],
  [-5, "5"],
  [-3, "3"],
  [0, "0"],
  [3, "+3"],
];

/* The red band starts at 0 VU and runs to the right pin — the only red the
 * instrument allows itself. */
const RED_BAND = (() => {
  const start = polar(0, 190);
  const end = polar(3, 190);
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A 190 190 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
})();

const SCALE_ARC = (() => {
  const start = polar(-20, 178);
  const end = polar(3, 178);
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A 178 178 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
})();

/**
 * These are two units, not one unit drawn twice.
 *
 * A matched pair on a real desk is two separately manufactured movements, fitted
 * at different times and aged by the same room at different rates. Differing the
 * glass vector alone was not enough: it moved the rendered faces by about one
 * level, which nobody sees. So each unit also carries its own face tone, its own
 * resting deflection, and its own bezel screw angles.
 *
 * The resting deflection is the honest part. No two moving coils zero at exactly
 * the same place, and the engine publishes a different rest per channel, so the
 * pair sits slightly apart when the page is idle and converges under signal —
 * which is what a ganged pair actually does.
 */
const UNIT = {
  l: {
    glass: { x1: "0", y1: "0", x2: "1", y2: "0.92", peak: 0.2 },
    /* Cooler, fresher face. */
    face: ["#f7f2e8", "#efe9dc", "#e3dac8"],
    screws: [-24, 61, 12, -47],
  },
  r: {
    glass: { x1: "0.34", y1: "0", x2: "0.62", y2: "1", peak: 0.075 },
    /* Older unit: the paper has gone warmer and a shade darker. */
    face: ["#f1e9d8", "#e8dfcb", "#d9cdb4"],
    screws: [38, -12, -66, 25],
  },
} as const;

const SCREWS = [
  [14, 14],
  [294, 14],
  [14, 198],
  [294, 198],
];

interface VuMeterProps {
  channel: "l" | "r";
  /** The channel this movement reads. Silkscreened on the panel by the caller;
   * here it names the meter for assistive technology and keys the gradient ids. */
  label: string;
  className?: string;
}

export function VuMeter({ channel, label, className }: VuMeterProps) {
  const uid = `vu-${channel}-${label.replace(/[^a-z]/gi, "").toLowerCase()}`;
  const unit = UNIT[channel];
  const glass = unit.glass;
  return (
    <svg
      viewBox="0 0 308 212"
      className={cn("block h-auto w-full", className)}
      role="img"
      aria-label={`${label} — VU meter`}
    >
      <defs>
        <linearGradient id={`${uid}-face`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={unit.face[0]} />
          <stop offset="0.55" stopColor={unit.face[1]} />
          <stop offset="1" stopColor={unit.face[2]} />
        </linearGradient>
        <linearGradient
          id={`${uid}-glass`}
          x1={glass.x1}
          y1={glass.y1}
          x2={glass.x2}
          y2={glass.y2}
        >
          <stop offset="0" stopColor="var(--specular)" stopOpacity={glass.peak} />
          <stop offset="0.34" stopColor="var(--specular)" stopOpacity="0.04" />
          <stop offset="0.36" stopColor="var(--specular)" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <rect x="10" y="10" width="288" height="192" rx="3" />
        </clipPath>
      </defs>

      {/* The cut-out the movement drops into. */}
      <rect x="0" y="0" width="308" height="212" rx="5" fill="#1a1817" stroke="#0f0e0d" />
      <rect
        x="4"
        y="4"
        width="300"
        height="204"
        rx="4"
        fill="none"
        stroke="#403c37"
      />

      <rect
        x="10"
        y="10"
        width="288"
        height="192"
        rx="3"
        fill={`url(#${uid}-face)`}
      />

      <g clipPath={`url(#${uid}-clip)`}>
        <path d={RED_BAND} fill="none" stroke="#d63a22" strokeWidth="7" />
        <path d={SCALE_ARC} fill="none" stroke="#16150f" strokeWidth="1.4" />

        {MINOR.map((db) => (
          <path
            key={`minor-${db}`}
            d={tick(db, 178, 170)}
            stroke="#16150f"
            strokeWidth="1.2"
          />
        ))}
        {MAJOR.map((db) => (
          <path
            key={`major-${db}`}
            d={tick(db, 178, 163)}
            stroke="#16150f"
            strokeWidth={db >= 0 ? 2.6 : 2}
          />
        ))}

        {/* The printed scale. Below the `md` breakpoint the face is too small
         * for legible numerals, so the marks carry the scale alone — which is
         * what a small movement does in life. */}
        <g className="max-md:hidden">
          {LABELLED.map(([db, text]) => {
            const p = polar(db, 154);
            return (
              <text
                key={`label-${db}`}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#16150f"
                fontSize="16"
                style={{
                  fontFamily: "var(--font-anybody), sans-serif",
                  fontVariationSettings: '"wdth" 78, "wght" 600',
                }}
              >
                {text}
              </text>
            );
          })}
        </g>

        {/* The face carries the scale and the movement's own marks. The channel
         * legend goes on the panel below, where the needle cannot strike it. */}
        <text
          x="154"
          y="170"
          textAnchor="middle"
          fill="var(--ink-faint)"
          fontSize="14"
          className="max-md:hidden"
          style={{
            fontFamily: "var(--font-anybody), sans-serif",
            fontVariationSettings: '"wdth" 80, "wght" 500',
            letterSpacing: "0.42em",
          }}
        >
          VU
        </text>

        {/* Needle. The tip stops just past the scale arc at r=184, where a real
         * pointer stops: a pointer that overshoots its own scale reads as a
         * broken movement. Shadow first, because a real pointer sits above the
         * face and casts onto it, and both travel in the same rotated group. */}
        <g className={channel === "l" ? "needle-l" : "needle-r"}>
          <path
            d="M 153.6 229.5 L 154.9 45.5 L 156.5 45.5 L 157.8 229.5 Z"
            fill="#16150f"
            opacity="0.18"
          />
          <path
            d="M 151.9 228 L 153.15 44 L 154.85 44 L 156.1 228 Z"
            fill="#16150f"
          />
        </g>
      </g>

      {/* Glass over the movement. */}
      <rect
        x="10"
        y="10"
        width="288"
        height="192"
        rx="3"
        fill={`url(#${uid}-glass)`}
        pointerEvents="none"
      />
      <rect
        x="10"
        y="10"
        width="288"
        height="192"
        rx="3"
        fill="none"
        stroke="#0f0e0d"
        strokeOpacity="0.5"
      />

      {/* Peak lamp: dark until the needle actually passes 0 VU. */}
      <g
        style={{
          opacity: `clamp(0, calc((var(--vu-${channel}) - 0.708) * 7), 1)`,
        }}
      >
        <circle cx="276" cy="180" r="7" fill="#d63a22" />
        <circle cx="276" cy="180" r="7" fill="none" stroke="#7c1f11" />
      </g>
      <circle
        cx="276"
        cy="180"
        r="7.5"
        fill="none"
        stroke="#b5aa94"
        strokeWidth="1.5"
      />
      <text
        x="262"
        y="184"
        textAnchor="end"
        fill="#8b8578"
        fontSize="9"
        className="max-md:hidden"
        style={{
          fontFamily: "var(--font-anybody), sans-serif",
          fontVariationSettings: '"wdth" 82, "wght" 600',
          letterSpacing: "0.2em",
        }}
      >
        PEAK
      </text>

      {/* Screws are driven home by hand, so no two sit at the same angle, and
       * the two units were fitted on different days. */}
      {SCREWS.map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="4.5" fill="var(--brass-dark)" />
          <circle
            cx={cx}
            cy={cy}
            r="4.5"
            fill="none"
            stroke="#3a3229"
            strokeWidth="0.8"
          />
          <path
            d={`M ${cx - 3} ${cy} L ${cx + 3} ${cy}`}
            stroke="#2b241c"
            strokeWidth="1.3"
            transform={`rotate(${unit.screws[index]} ${cx} ${cy})`}
          />
        </g>
      ))}
    </svg>
  );
}
