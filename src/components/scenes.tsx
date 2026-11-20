import { type ReactNode, useId } from "react";
import { scenes } from "@/app/content";
import { cn } from "@/lib/utils";

/*
 * The scenes of the Neo Mirai world (ADR-0006), drawn by hand as inline SVG:
 * a hero scene of a future Vilnius at golden hour, and four scenes of teams
 * at work with an agent. They are one set. Every scene is flat planes in the
 * raw palette (paper, rice, gold, sun, night and ink), one ink line, haze
 * made of the same colours at a lower opacity, and small human figures. The
 * sun is a plain disc cut by bands of haze, never a ray.
 *
 * The agent is the same mark in every scene: a small eclipse, the gold disc
 * with its ring of light that the ornaments draw, crossed by a dark moon.
 * Thin dashed gold lines run from it to the work it does.
 *
 * Each scene is a picture, so it carries `role="img"` and takes its name from
 * the alt text in `scenes` in the content module. It sets a viewBox and a
 * width and a height, and fills the width of its container at that ratio, so
 * it holds its place on the first paint. It paints only with token classes,
 * because the export suite fails a colour stated as a value.
 */

type SceneProps = { className?: string };

/* The frame every scene draws in: the named picture, at its own ratio. */
function SceneFrame({
  alt,
  className,
  height,
  name,
  width,
  children,
}: {
  alt: string;
  className?: string;
  height: number;
  name: string;
  width: number;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <svg
      aria-labelledby={`${id}-title`}
      className={cn("block h-auto w-full", className)}
      data-scene={name}
      height={height}
      role="img"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <title id={`${id}-title`}>{alt}</title>
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * Shared parts
 * ------------------------------------------------------------------------- */

/* A seeded random source, so a row of houses comes out the same in every
 * build and the export does not change between two builds of one commit. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
}

/* The agent: a gold disc with a ring of light, crossed by a dark moon. */
function AgentMark({ x, y, r, moon = "fill-ink" }: { x: number; y: number; r: number; moon?: string }) {
  return (
    <g>
      <circle className="fill-gold-bright" cx={x} cy={y} opacity="0.22" r={r * 1.9} />
      <circle className="fill-none stroke-gold-bright" cx={x} cy={y} r={r * 1.35} strokeWidth={r * 0.12} />
      <circle className="fill-gold" cx={x} cy={y} r={r} />
      <circle className={moon} cx={x + r * 0.26} cy={y - r * 0.2} r={r * 0.94} />
    </g>
  );
}

/* A thin dashed gold line: the agent handing a piece of work on. */
function Thread({ d, width = 2 }: { d: string; width?: number }) {
  return (
    <path
      className="fill-none stroke-gold"
      d={d}
      strokeDasharray={`${width * 2} ${width * 3}`}
      strokeLinecap="round"
      strokeWidth={width}
    />
  );
}

type Build = "coat" | "jacket" | "dress" | "child";

/*
 * A person standing, seen from behind or from the front, as one flat
 * silhouette. The feet are at the origin and a grown person is 100 units
 * tall before the scale.
 */
function Standing({
  build = "coat",
  className = "fill-ink",
  s = 1,
  x,
  y,
}: {
  build?: Build;
  className?: string;
  s?: number;
  x: number;
  y: number;
}) {
  const shapes: Record<Build, ReactNode> = {
    coat: (
      <>
        <path d="M-6 -30h4.5v30h-4.5zM1.5 -30h4.5v30h-4.5z" />
        <path d="M-12 -27L-10 -72Q-9.5 -79 -3 -80H3Q9.5 -79 10 -72L12 -27Z" />
        <rect height="6" width="5" x="-2.5" y="-84" />
        <circle cx="0" cy="-88.5" r="7.5" />
      </>
    ),
    jacket: (
      <>
        <path d="M-6.5 -46h5.2v46h-5.2zM1.3 -46h5.2v46h-5.2z" />
        <path d="M-11.5 -43L-10.5 -72Q-10 -79 -3 -80H3Q10 -79 10.5 -72L11.5 -43Z" />
        <rect height="6" width="5" x="-2.5" y="-84" />
        <circle cx="0" cy="-88.5" r="7.5" />
      </>
    ),
    dress: (
      <>
        <path d="M-5 -22h3.6v22h-3.6zM1.4 -22h3.6v22h-3.6z" />
        <path d="M-14 -21L-8 -70Q-7.5 -76 -2.5 -77H2.5Q7.5 -76 8 -70L14 -21Z" />
        <rect height="6" width="4.6" x="-2.3" y="-81" />
        <circle cx="0" cy="-85" r="7" />
        <circle cx="0" cy="-93.5" r="4" />
      </>
    ),
    child: (
      <>
        <path d="M-4.5 -24h3.6v24h-3.6zM0.9 -24h3.6v24h-3.6z" />
        <path d="M-8 -22L-7 -46Q-6.5 -51 -2 -52H2Q6.5 -51 7 -46L8 -22Z" />
        <circle cx="0" cy="-58.5" r="6.5" />
      </>
    ),
  };
  /* The edges of the arms, a fine light line inside the silhouette, so a
   * figure drawn large still reads as a person with arms at the sides. */
  const arms: Record<Build, string> = {
    coat: "M-8.5 -73L-10.5 -40M8.5 -73L10.5 -40",
    jacket: "M-8.5 -73L-10 -46M8.5 -73L10 -46",
    dress: "M-6.5 -71L-9 -46M6.5 -71L9 -46",
    child: "M-5.5 -46L-6.5 -32M5.5 -46L6.5 -32",
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={className}>{shapes[build]}</g>
      <path className="fill-none stroke-rice" d={arms[build]} opacity="0.3" strokeWidth={1.6 / s} />
    </g>
  );
}

/*
 * A person seated at a desk, seen from behind, facing the screen in front of
 * them as the people on the hero's terrace face the city. The seat is at the
 * origin; the chair back stands in front of the person.
 */
function SeatedBack({
  clothes = "fill-night-soft",
  headset = false,
  s = 1,
  x,
  y,
}: {
  clothes?: string;
  headset?: boolean;
  s?: number;
  x: number;
  y: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path className={clothes} d="M-21 4L-23 -38Q-22 -50 -10 -52H10Q22 -50 23 -38L21 4Z" />
      <path className="fill-none stroke-rice" d="M-15 -46L-16 -14M15 -46L16 -14" opacity="0.3" strokeWidth={1.6 / s} />
      <rect className="fill-ink" height="9" width="9" x="-4.5" y="-59" />
      <circle className="fill-ink" cx="0" cy="-68" r="11.5" />
      {headset ? (
        <g>
          <path className="fill-none stroke-gold" d="M-12 -68A12 12 0 0 1 12 -68" strokeWidth="2.6" />
          <rect className="fill-gold" height="9" rx="2" width="5" x="-15" y="-71" />
          <rect className="fill-gold" height="9" rx="2" width="5" x="10" y="-71" />
        </g>
      ) : null}
      <g className="fill-ink-soft">
        <rect height="38" rx="5" width="38" x="-19" y="-26" />
        <rect height="34" width="5" x="-2.5" y="12" />
        <rect height="4" width="46" x="-23" y="44" />
      </g>
      <g className="fill-ink">
        <circle cx="-22" cy="50" r="3.5" />
        <circle cx="22" cy="50" r="3.5" />
      </g>
    </g>
  );
}

/*
 * Ink hatching for a shadow, the way an etched print shades: fine diagonal
 * lines, used on the dark side of a thing and under a desk. Each scene
 * defines the pattern once and fills shadow shapes with it.
 */
function HatchPattern({ id, width = 1.4, gap = 9 }: { id: string; width?: number; gap?: number }) {
  return (
    <pattern height={gap} id={id} patternTransform="rotate(45)" patternUnits="userSpaceOnUse" width={gap}>
      <path className="stroke-ink" d={`M0 0V${gap}`} strokeWidth={width} />
    </pattern>
  );
}

/*
 * The light of the window laid on the floor: one patch per pane, longer
 * towards the viewer, with the mullions as gaps between them. Flat gold, so
 * it reads as light on a surface and never as a ray.
 */
function FloorLight({
  floor,
  panes,
  spread = 1.25,
  depth,
  left,
  right,
  shift = 0,
}: {
  floor: number;
  panes: number;
  spread?: number;
  depth: number;
  left: number;
  right: number;
  shift?: number;
}) {
  const centre = (left + right) / 2;
  const width = (right - left) / panes;
  return (
    <g className="fill-gold-bright" opacity="0.38">
      {Array.from({ length: panes }, (_, i) => {
        const a = left + i * width + 6;
        const b = left + (i + 1) * width - 6;
        const far = (edge: number) => centre + (edge - centre) * spread + shift;
        return (
          <path d={`M${a} ${floor}H${b}L${far(b)} ${floor + depth}H${far(a)}Z`} key={i} />
        );
      })}
    </g>
  );
}

/* A tower on the far bank, the hero's future: its left edge, its width,
 * its height and the shape of its top. */
type TowerTop = "needle" | "slant" | "taper" | "flat";

function Tower({ base, h, top, w, x }: { base: number; h: number; top: TowerTop; w: number; x: number }) {
  const y = base - h;
  const body: Record<TowerTop, ReactNode> = {
    needle: (
      <>
        <rect height={h} width={w} x={x} y={y} />
        <path d={`M${x + w * 0.2} ${y}L${x + w * 0.4} ${y - h * 0.22}H${x + w * 0.6}L${x + w * 0.8} ${y}Z`} />
        <rect height={h * 0.16} width="2" x={x + w / 2 - 1} y={y - h * 0.38} />
      </>
    ),
    slant: <path d={`M${x} ${base}V${y + w * 0.7}L${x + w} ${y}V${base}Z`} />,
    taper: (
      <path
        d={`M${x} ${base}V${y + h * 0.18}L${x + w * 0.3} ${y}H${x + w * 0.7}L${x + w} ${y + h * 0.18}V${base}Z`}
      />
    ),
    flat: (
      <>
        <rect height={h} width={w} x={x} y={y} />
        <rect height={h * 0.08} width={w * 0.5} x={x + w * 0.25} y={y - h * 0.08} />
      </>
    ),
  };
  const lines = Math.max(1, Math.floor(w / 12));
  return (
    <g>
      <g className="fill-ink-soft" opacity="0.38">
        {body[top]}
      </g>
      <g className="fill-none stroke-gold-bright" opacity="0.7" strokeWidth="1.5">
        {Array.from({ length: lines }, (_, i) => {
          const lx = x + ((i + 1) * w) / (lines + 1);
          return <path d={`M${lx} ${y + h * 0.22}V${base - 6}`} key={i} />;
        })}
      </g>
    </g>
  );
}

/* A row of old-town houses: plastered walls under red tile roofs. */
function HouseRow({
  base,
  from,
  maxH,
  minH,
  opacity = 1,
  seed,
  to,
}: {
  base: number;
  from: number;
  maxH: number;
  minH: number;
  opacity?: number;
  seed: number;
  to: number;
}) {
  const random = seeded(seed);
  const houses: ReactNode[] = [];
  let x = from;
  let index = 0;
  while (x < to) {
    const w = 34 + random() * 46;
    const h = minH + random() * (maxH - minH);
    const roof = 14 + random() * 14;
    const gable = random() > 0.6;
    const pick = random();
    const wall = pick > 0.78 ? "fill-gold-bright" : pick > 0.3 ? "fill-paper-soft" : "fill-rice";
    const tile = random() > 0.3 ? "fill-sun-deep" : "fill-sun";
    const top = base - h;
    const windows = Math.max(1, Math.floor(w / 18));
    houses.push(
      <g key={index}>
        <rect className={wall} height={h} opacity={wall === "fill-gold-bright" ? 0.75 : 1} width={w} x={x} y={top} />
        <rect className="fill-ink" height={h} opacity="0.1" width={w * 0.28} x={x + w * 0.72} y={top} />
        <path
          className={tile}
          d={
            gable
              ? `M${x - 2} ${top}L${x + w / 2} ${top - roof * 1.5}L${x + w + 2} ${top}Z`
              : `M${x - 2} ${top}L${x + 8} ${top - roof}H${x + w - 8}L${x + w + 2} ${top}Z`
          }
        />
        <g className="fill-ink-soft" opacity="0.55">
          {Array.from({ length: windows }, (_, i) => (
            <rect
              height="7"
              key={i}
              width="4"
              x={x + ((i + 0.5) * w) / windows - 2}
              y={top + 8}
            />
          ))}
        </g>
      </g>,
    );
    x += w - 2;
    index += 1;
  }
  return <g opacity={opacity}>{houses}</g>;
}

/*
 * The old town in miniature, for the view through a window: the cathedral
 * bell tower, the spires of St Anne's, Gediminas' Tower on its hill and two
 * new towers. Drawn in a box 400 wide with the ground at y 120.
 */
function SkylineStrip({ className = "fill-ink-soft", opacity = 0.45 }: { className?: string; opacity?: number }) {
  return (
    <g className={className} opacity={opacity}>
      <path d="M0 120V96Q30 84 60 92Q80 70 110 72Q140 70 160 92Q190 86 220 96Q260 90 300 98Q350 92 400 100V120Z" />
      <path d="M118 74V50h6v-6h10v6h6v24Z" />
      <path d="M190 96V58h12V46h8v-6h4v-14h2v14h4v6h8v12h12v38Z" />
      <path d="M260 98V66L268 40L276 66V58L284 22L292 58V66L300 40L308 66V98Z" />
      <path d="M330 100V14h14v86ZM352 100V36l12-8v72Z" />
      <path d="M24 100V60h10v40ZM40 100V44h3v-12h1v12h3v56Z" opacity="0.6" />
    </g>
  );
}

/*
 * A tall window on the back wall of a room, with the evening outside: the
 * old town against a gold sky and, by day, the red sun low behind it. By
 * night the sky is night teal, the city shows lit windows, and the moon
 * stands in place of the sun. The panes are cut by ink mullions.
 */
function CityWindow({
  h,
  night = false,
  sun = { x: 0.7, y: 0.55, r: 0.16 },
  w,
  x,
  y,
}: {
  h: number;
  night?: boolean;
  sun?: { x: number; y: number; r: number };
  w: number;
  x: number;
  y: number;
}) {
  const id = useId();
  const pane = `${id}-pane`;
  const glow = `${id}-glow`;
  const columns = Math.max(2, Math.round(w / 150));
  /* The skyline keeps its proportions: it fills the width of a tall window,
   * and repeats along a long low one. */
  const scale = Math.min(w / 400, (h * 0.5) / 120);
  const moon = `${id}-moon`;
  return (
    <g>
      <defs>
        <clipPath id={pane}>
          <rect height={h} width={w} x={x} y={y} />
        </clipPath>
        <linearGradient id={glow} x1="0" x2="0" y1="0" y2="1">
          <stop className="[stop-color:var(--gold-bright)]" offset="0.2" stopOpacity="0" />
          <stop className="[stop-color:var(--gold-bright)]" offset="1" stopOpacity={night ? 0.25 : 0.7} />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${pane})`}>
        <rect className={night ? "fill-night" : "fill-paper"} height={h} width={w} x={x} y={y} />
        <rect fill={`url(#${glow})`} height={h} width={w} x={x} y={y} />
        {night ? (
          <>
            <clipPath id={moon}>
              <circle cx={x + w * sun.x} cy={y + h * sun.y * 0.6} r={w * sun.r * 0.55} />
            </clipPath>
            <circle className="fill-gold-bright" cx={x + w * sun.x} cy={y + h * sun.y * 0.6} r={w * sun.r * 0.55} />
            <circle
              className="fill-night"
              clipPath={`url(#${moon})`}
              cx={x + w * sun.x + w * 0.035}
              cy={y + h * sun.y * 0.6 - w * 0.02}
              r={w * sun.r * 0.5}
            />
          </>
        ) : (
          <circle className="fill-sun" cx={x + w * sun.x} cy={y + h * sun.y} r={w * sun.r} />
        )}
        {Array.from({ length: Math.ceil(w / (400 * scale)) }, (_, tile) => (
        <g key={tile} transform={`translate(${x + tile * 400 * scale} ${y + h - scale * 120}) scale(${scale})`}>
          <SkylineStrip className={night ? "fill-night-soft" : "fill-ink-soft"} opacity={night ? 1 : 0.5} />
          {night ? (
            <g className="fill-gold-bright">
              {[
                [122, 60], [132, 64], [196, 70], [206, 80], [264, 76], [296, 82], [334, 30],
                [338, 48], [334, 66], [340, 84], [356, 50], [358, 70], [28, 72], [44, 60],
                [44, 80], [92, 104], [150, 100], [240, 104], [380, 106],
              ].map(([cx, cy]) => (
                <rect height="3" key={`${cx}-${cy}`} width="2" x={cx} y={cy} />
              ))}
            </g>
          ) : null}
        </g>
        ))}
      </g>
      <g className="fill-none stroke-ink" strokeWidth="3">
        <rect height={h} width={w} x={x} y={y} />
        {Array.from({ length: columns - 1 }, (_, i) => (
          <path d={`M${x + ((i + 1) * w) / columns} ${y}V${y + h}`} key={i} />
        ))}
        <path d={`M${x} ${y + h * 0.3}H${x + w}`} />
      </g>
      <rect className="fill-ink" height="10" width={w + 24} x={x - 12} y={y + h} />
    </g>
  );
}

/* A desk: a rice top with an ink edge, on two ink legs. */
function Desk({ h = 150, w, x, y }: { h?: number; w: number; x: number; y: number }) {
  return (
    <g>
      <g className="fill-ink">
        <rect height={h} width="7" x={x + 16} y={y} />
        <rect height={h} width="7" x={x + w - 23} y={y} />
        <rect height="5" width={w - 40} x={x + 20} y={y + h * 0.55} />
      </g>
      <rect className="fill-rice stroke-ink" height="12" strokeWidth="3" width={w} x={x} y={y - 12} />
    </g>
  );
}

/* A monitor on a stand, the screen in night teal. What it shows is drawn by
 * the scene, inside the screen's box. */
function Monitor({
  children,
  h,
  w,
  x,
  y,
}: {
  children?: ReactNode;
  h: number;
  w: number;
  x: number;
  y: number;
}) {
  return (
    <g>
      <path className="fill-ink" d={`M${x + w / 2 - 5} ${y + h}h10v${h * 0.32}h-10z`} />
      <rect className="fill-ink" height="6" rx="2" width={w * 0.36} x={x + w * 0.32} y={y + h + h * 0.3} />
      <rect className="fill-night stroke-ink" height={h} rx="3" strokeWidth="3" width={w} x={x} y={y} />
      {children}
    </g>
  );
}

/*
 * A band of cloud in steps, as a woodblock print draws one: a long base, a
 * shorter tier on it and a small cap, each with round ends. The tiers share
 * one opacity, so they read as one shape.
 */
function Cloud({ flip = false, tone, w, x, y }: { flip?: boolean; tone: string; w: number; x: number; y: number }) {
  const at = (offset: number, width: number) => (flip ? x + w - offset - width : x + offset);
  return (
    <g className={tone} opacity="0.55">
      <rect height="14" rx="7" width={w} x={x} y={y} />
      <rect height="12" rx="6" width={w * 0.52} x={at(w * 0.14, w * 0.52)} y={y - 9} />
      <rect height="10" rx="5" width={w * 0.2} x={at(w * 0.24, w * 0.2)} y={y - 16} />
      <rect className="fill-gold" height="2" opacity="0.7" rx="1" width={w * 0.8} x={at(w * 0.1, w * 0.8)} y={y + 12} />
    </g>
  );
}

/*
 * The outline of a wooded hill: a smooth profile with its top edge cut into
 * small crowns of trees. `profile` gives the height of the hill at a point
 * between 0 and 1 along it.
 */
function woodedHill(from: number, to: number, base: number, profile: (t: number) => number, seed: number) {
  const random = seeded(seed);
  const points: string[] = [`M${from} ${base}`];
  const steps = Math.round((to - from) / 15);
  let previous = { x: from, y: base - profile(0) };
  points.push(`L${previous.x} ${previous.y}`);
  for (let i = 1; i <= steps; i += 1) {
    const t = i / steps;
    const next = { x: from + (to - from) * t, y: base - profile(t) };
    const r = 7 + random() * 6;
    points.push(`A${r} ${r} 0 0 1 ${next.x.toFixed(1)} ${next.y.toFixed(1)}`);
    previous = next;
  }
  points.push(`L${previous.x} ${base}Z`);
  return points.join("");
}

/* ---------------------------------------------------------------------------
 * The hero: Vilnius at golden hour
 * ------------------------------------------------------------------------- */

export function HeroScene({ className }: SceneProps) {
  const id = useId();
  const sky = `${id}-sky`;
  const disc = `${id}-disc`;
  const hatch = `${id}-hatch`;
  const sunX = 1150;
  const sunY = 372;
  const sunR = 168;
  return (
    <SceneFrame alt={scenes.hero.alt} className={className} height={900} name="hero" width={1600}>
      <defs>
        <linearGradient id={sky} x1="0" x2="0" y1="0" y2="1">
          <stop className="[stop-color:var(--gold-bright)]" offset="0.25" stopOpacity="0" />
          <stop className="[stop-color:var(--gold-bright)]" offset="0.72" stopOpacity="0.55" />
          <stop className="[stop-color:var(--gold)]" offset="0.8" stopOpacity="0.5" />
        </linearGradient>
        <clipPath id={disc}>
          <circle cx={sunX} cy={sunY} r={sunR} />
        </clipPath>
        <HatchPattern id={hatch} width={1.6} gap={7} />
      </defs>

      {/* The sky: paper, warming to gold at the horizon. */}
      <rect className="fill-paper" height="900" width="1600" />
      <rect fill={`url(#${sky})`} height="900" width="1600" />

      {/* The sun, cut by three bands of haze. */}
      <circle className="fill-sun" cx={sunX} cy={sunY} r={sunR} />
      <g className="fill-paper" clipPath={`url(#${disc})`} opacity="0.9">
        <rect height="7" width="400" x={sunX - 200} y={sunY + 82} />
        <rect height="5" width="400" x={sunX - 200} y={sunY + 104} />
        <rect height="3.5" width="400" x={sunX - 200} y={sunY + 122} />
      </g>

      {/* Stepped bands of gold cloud across the lower sky, some in front
          of the sun. */}
      <Cloud tone="fill-gold-bright" w={300} x={740} y={528} />
      <Cloud tone="fill-gold-bright" w={420} x={940} y={556} />
      <Cloud flip tone="fill-gold-bright" w={260} x={1250} y={524} />
      <Cloud tone="fill-gold" w={360} x={1180} y={598} />
      <Cloud flip tone="fill-gold" w={240} x={520} y={606} />
      <Cloud tone="fill-rice" w={200} x={1010} y={500} />

      {/* Birds high on the left, and two small craft crossing the sky. */}
      <g className="fill-none stroke-ink" opacity="0.6" strokeLinecap="round" strokeWidth="2">
        <path d="M402 248q6 -5 12 0q6 -5 12 0" />
        <path d="M444 272q5 -4 10 0q5 -4 10 0" />
        <path d="M470 236q4 -3 8 0q4 -3 8 0" />
      </g>
      <g className="fill-ink-soft" opacity="0.7">
        <path d="M700 330h26l4 3h-34zM706 327h14v3h-14z" />
        <path d="M858 420h18l3 2h-24zM862 418h10v2h-10z" />
      </g>

      {/* The new city across the river, hazy in the evening light. */}
      <g>
        {(
          [
            [620, 22, 90, "flat"], [650, 16, 130, "needle"], [676, 30, 80, "taper"],
            [720, 18, 110, "slant"], [752, 26, 70, "flat"], [790, 14, 150, "needle"],
            [990, 26, 210, "taper"], [1030, 18, 300, "needle"], [1062, 40, 250, "slant"],
            [1112, 22, 380, "needle"], [1146, 46, 280, "flat"], [1204, 30, 440, "needle"],
            [1246, 38, 320, "slant"], [1296, 24, 260, "taper"], [1332, 44, 350, "flat"],
            [1388, 20, 290, "needle"], [1418, 36, 230, "taper"], [1466, 28, 310, "needle"],
            [1506, 48, 200, "flat"], [1562, 32, 250, "slant"],
          ] as const
        ).map(([x, w, h, top]) => (
          <Tower base={662} h={h} key={x} top={top} w={w} x={x} />
        ))}
      </g>
      <rect className="fill-ink-soft" height="8" opacity="0.4" width="1200" x="400" y="656" />

      {/* The river Neris, with the sun laid on it in short strokes. */}
      <rect className="fill-gold-bright" height="48" opacity="0.32" width="1600" y="664" />
      <g className="fill-none stroke-rice" opacity="0.8" strokeLinecap="round" strokeWidth="2">
        <path d="M480 676h60M620 690h90M820 680h40M1380 688h70M1500 676h50" />
      </g>
      <g className="fill-none stroke-sun" strokeLinecap="round" strokeWidth="3">
        <path d="M1100 674h100M1116 684h68M1128 694h44M1140 703h20" />
      </g>

      {/* The Hill of Three Crosses, far off on the left. */}
      <path className="fill-night-soft" d="M250 712Q330 642 420 650Q470 660 520 712Z" opacity="0.35" />
      <g className="fill-rice stroke-ink" strokeWidth="1.5">
        <path d="M368 618h4v34h-4zM360 626h20v4h-20z" />
        <path d="M388 610h4v40h-4zM380 619h20v4h-20z" />
        <path d="M408 620h4v32h-4zM400 628h20v4h-20z" />
      </g>

      {/* The old town: two rows of houses under red tile. */}
      <HouseRow base={762} from={500} maxH={40} minH={22} seed={7} to={1600} />
      <rect className="fill-gold-bright" height="140" opacity="0.3" width="1110" x="490" y="640" />

      {/* Castle hill, its trees, and Gediminas' Tower. */}
      <path
        className="fill-night-soft"
        d={woodedHill(470, 880, 812, (t) => 150 * Math.sin(Math.PI * t) ** 0.7 + (t > 0.3 && t < 0.62 ? 18 : 0), 3)}
      />
      <path
        d={woodedHill(700, 880, 812, (t) => 110 * (1 - t) ** 0.8, 9)}
        fill={`url(#${hatch})`}
        opacity="0.35"
      />
      <g>
        <rect className="fill-sun-deep stroke-ink" height="80" strokeWidth="2" width="48" x="626" y="572" />
        <rect className="fill-ink" height="80" opacity="0.28" width="16" x="658" y="572" />
        <g className="fill-sun-deep stroke-ink" strokeWidth="2">
          <path d="M622 572v-10h8v5h8v-5h8v5h8v-5h8v5h8v-5h8v5h8v-5h6v10Z" />
        </g>
        <g className="fill-ink">
          <path d="M638 604a4 4 0 0 1 8 0v10h-8zM658 604a4 4 0 0 1 8 0v10h-8zM648 630a4 4 0 0 1 8 0v10h-8z" />
        </g>
      </g>

      {/* The cathedral bell tower, white in tiers, and the cathedral at the
          foot of the hill, with its columns and pediment. */}
      <g className="fill-rice stroke-ink" strokeWidth="2">
        <rect height="130" width="40" x="846" y="690" />
        <rect height="40" width="32" x="850" y="650" />
        <rect height="32" width="24" x="854" y="618" />
        <path d="M856 618q10 -24 20 0Z" />
      </g>
      <path className="fill-none stroke-ink" d="M866 600v-28M860 580h12" strokeWidth="2" />
      <circle className="fill-none stroke-ink" cx="866" cy="668" r="7" strokeWidth="1.5" />
      <g className="fill-rice stroke-ink" strokeWidth="2">
        <rect height="64" width="170" x="900" y="756" />
        <path d="M908 756L985 724L1062 756Z" />
        <rect height="10" width="180" x="895" y="756" />
      </g>
      <g className="fill-none stroke-ink" strokeWidth="2">
        <path d="M918 768v52M938 768v52M958 768v52M1012 768v52M1032 768v52M1052 768v52" />
      </g>
      <g className="fill-ink">
        <path d="M983 712h4v12h-4zM904 744h4v12h-4zM1062 744h4v12h-4z" />
      </g>

      {/* St John's bell tower, tall and Baroque. */}
      <g className="fill-rice stroke-ink" strokeWidth="2">
        <rect height="130" width="30" x="1110" y="690" />
        <rect height="44" width="24" x="1113" y="646" />
        <rect height="30" width="18" x="1116" y="616" />
        <path d="M1118 616q7 -30 14 0Z" />
      </g>
      <path className="fill-none stroke-ink" d="M1125 592v-16" strokeWidth="2" />

      {/* St Anne's in red brick, with its three spires, and the Bernardine
          church behind it. */}
      <path className="fill-sun-deep" d="M1300 820V722L1336 690L1372 722V820Z" opacity="0.8" />
      <g className="fill-sun-deep stroke-ink" strokeWidth="2">
        <path d="M1232 820V726L1257 694L1282 726V820Z" />
        <path d="M1252 694L1257 636L1262 694Z" />
        <path d="M1224 820V700L1230 664L1236 700V820Z" />
        <path d="M1278 820V700L1284 664L1290 700V820Z" />
      </g>
      <g className="fill-ink">
        <path d="M1250 770q7 -22 14 0v34h-14z" />
        <path d="M1254 732q3 -10 6 0v14h-6z" />
      </g>

      {/* The dome of St Casimir's, with its crown. */}
      <g>
        <rect className="fill-rice stroke-ink" height="70" strokeWidth="2" width="44" x="1420" y="750" />
        <path className="fill-night-soft stroke-ink" d="M1424 750a18 22 0 0 1 36 0Z" strokeWidth="2" />
        <path className="fill-gold stroke-ink" d="M1434 728l4 -12l4 6l4 -6l4 12Z" strokeWidth="1.5" />
      </g>

      <HouseRow base={826} from={440} maxH={50} minH={30} seed={23} to={1600} />

      {/* The terrace: a stone railing in the foreground, a lamp, and the
          people who stopped to look. */}
      <rect className="fill-ink" height="72" width="1600" y="828" />
      <rect className="fill-ink-soft" height="12" width="1600" y="822" />
      <g className="fill-night-soft">
        {Array.from({ length: 64 }, (_, i) => (
          <rect height="34" key={i} width="9" x={10 + i * 25} y="838" />
        ))}
      </g>
      <rect className="fill-ink" height="10" width="1600" y="872" />
      <g className="fill-ink">
        <path d="M1550 900V700h5v200z" />
        <path d="M1538 700h29l-5 -14h-19z" />
      </g>
      <circle className="fill-gold-bright" cx="1552" cy="704" opacity="0.5" r="10" />

      <Standing build="coat" s={1.5} x={1188} y={898} />
      <Standing build="dress" s={1.42} x={1226} y={898} />
      <Standing build="jacket" s={1.58} x={1408} y={898} />
      <Standing build="child" s={1.3} x={1446} y={898} />
      <Standing build="coat" className="fill-ink-soft" s={1.34} x={268} y={898} />
    </SceneFrame>
  );
}

/* ---------------------------------------------------------------------------
 * The section scenes: teams at work with an agent
 * ------------------------------------------------------------------------- */

/* The room the day scenes share: a plaster back wall, a gold floor. */
function Room({ floor = 690 }: { floor?: number }) {
  return (
    <>
      <rect className="fill-paper" height="900" width="1200" />
      <rect className="fill-paper-soft" height={floor} width="1200" />
      <rect className="fill-gold" height={900 - floor} opacity="0.3" width="1200" y={floor} />
      <path className="fill-none stroke-ink" d={`M0 ${floor}H1200`} strokeWidth="3" />
    </>
  );
}

/* Lines of a message or a document on a screen, as bars with no words. */
function Bars({
  className = "fill-rice",
  gap = 12,
  lengths,
  opacity = 0.7,
  x,
  y,
}: {
  className?: string;
  gap?: number;
  lengths: number[];
  opacity?: number;
  x: number;
  y: number;
}) {
  return (
    <g className={className} opacity={opacity}>
      {lengths.map((length, i) => (
        <rect height="4" key={i} rx="2" width={length} x={x} y={y + i * gap} />
      ))}
    </g>
  );
}

/* A chat on a support screen: the customer's bubbles left, the reply right. */
function Chat({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect className="fill-night-soft" height="26" rx="4" width="92" x={x} y={y} />
      <Bars lengths={[66, 44]} opacity={0.5} gap={9} x={x + 10} y={y + 7} />
      <rect className="fill-gold" height="22" opacity="0.9" rx="4" width="74" x={x + 48} y={y + 36} />
      <rect className="fill-night-soft" height="20" rx="4" width="64" x={x} y={y + 66} />
    </g>
  );
}

/* A lamp hanging from the ceiling on a long cord, lit. */
function Pendant({ drop, x }: { drop: number; x: number }) {
  return (
    <g>
      <path className="fill-none stroke-ink" d={`M${x} 0V${drop}`} strokeWidth="2" />
      <circle className="fill-gold-bright" cx={x} cy={drop + 30} opacity="0.3" r="34" />
      <path className="fill-ink" d={`M${x - 8} ${drop}h16l20 28h-56z`} />
      <path className="fill-gold-bright" d={`M${x - 26} ${drop + 28}h52a26 8 0 0 1 -52 0z`} />
    </g>
  );
}

/* The shadow a standing person casts on the floor. */
function FloorShadow({ w, x, y }: { w: number; x: number; y: number }) {
  return <ellipse className="fill-ink" cx={x} cy={y} opacity="0.16" rx={w / 2} ry={w / 9} />;
}

/* A keyboard on a desk, seen from behind the person who types on it. */
function Keyboard({ w = 90, x, y }: { w?: number; x: number; y: number }) {
  return <rect className="fill-ink-soft" height="6" rx="2" width={w} x={x} y={y - 6} />;
}

export function SupportDeskScene({ className }: SceneProps) {
  const id = useId();
  const hatch = `${id}-hatch`;
  return (
    <SceneFrame
      alt={scenes.supportDesk.alt}
      className={className}
      height={900}
      name="support-desk"
      width={1200}
    >
      <defs>
        <HatchPattern id={hatch} />
      </defs>
      <Room />
      <CityWindow h={440} sun={{ x: 0.7, y: 0.66, r: 0.1 }} w={840} x={180} y={90} />
      <FloorLight depth={210} floor={690} left={190} panes={6} right={1010} shift={-60} spread={1.18} />

      {/* The agent above the desk, handing each request to a person. */}
      <AgentMark x={600} y={200} r={30} />
      <Thread d="M572 232Q420 320 300 448" width={3} />
      <Thread d="M600 240V448" width={3} />
      <Thread d="M628 232Q780 320 900 448" width={3} />
      <g className="fill-rice stroke-ink" strokeWidth="2.5">
        <rect height="26" width="40" x="664" y="176" />
        <rect height="26" width="40" x="674" y="186" />
        <rect height="26" width="40" x="684" y="196" />
      </g>
      <Bars className="fill-ink-soft" gap={7} lengths={[24, 16]} opacity={0.6} x={692} y={205} />

      {/* The long desk, its shadow, and three screens with a chat on each. */}
      <rect fill={`url(#${hatch})`} height="150" opacity="0.3" width="1000" x="100" y="640" />
      <Desk h={160} w={1000} x={100} y={640} />
      {[215, 515, 815].map((x) => (
        <Monitor h={124} key={x} w={170} x={x} y={452}>
          <Chat x={x + 20} y={468} />
        </Monitor>
      ))}
      {[255, 555, 855].map((x) => (
        <Keyboard key={x} x={x} y={626} />
      ))}

      <SeatedBack clothes="fill-sun-deep" headset s={2.4} x={300} y={736} />
      <SeatedBack clothes="fill-night-soft" headset s={2.4} x={600} y={736} />
      <SeatedBack clothes="fill-gold" headset s={2.4} x={900} y={736} />

      {/* A cup and a plant at the end of the desk. */}
      <path className="fill-rice stroke-ink" d="M140 604h26v24h-26z" strokeWidth="2.5" />
      <path className="fill-none stroke-ink" d="M166 610q10 0 10 8t-10 8" strokeWidth="2.5" />
      <g className="fill-night-soft">
        <path d="M1070 610q-30 -60 -6 -110q14 40 6 110z" />
        <path d="M1076 610q10 -70 46 -96q-4 54 -46 96z" />
        <path d="M1068 610q-46 -30 -58 -76q42 16 58 76z" />
      </g>
      <path className="fill-sun-deep stroke-ink" d="M1050 596h44l-6 32h-32z" strokeWidth="2.5" />
    </SceneFrame>
  );
}

export function FinanceDeskScene({ className }: SceneProps) {
  const id = useId();
  const lamp = `${id}-lamp`;
  return (
    <SceneFrame
      alt={scenes.financeDesk.alt}
      className={className}
      height={900}
      name="finance-desk"
      width={1200}
    >
      <defs>
        <radialGradient cx="0.5" cy="0.5" id={lamp} r="0.5">
          <stop className="[stop-color:var(--gold-bright)]" offset="0" stopOpacity="0.55" />
          <stop className="[stop-color:var(--gold-bright)]" offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect className="fill-night-soft" height="900" width="1200" />
      <rect className="fill-night" height="210" width="1200" y="690" />
      <path className="fill-none stroke-ink" d="M0 690H1200" strokeWidth="3" />
      <CityWindow h={440} night sun={{ x: 0.24, y: 0.5, r: 0.12 }} w={620} x={500} y={90} />

      {/* The pool of lamp light over the desk and the floor. */}
      <ellipse cx="400" cy="610" fill={`url(#${lamp})`} rx="380" ry="220" />

      <Desk h={150} w={860} x={80} y={650} />

      {/* The lamp. */}
      <g className="fill-ink">
        <path d="M140 638h60v-6h-60z" />
        <path className="fill-none stroke-ink" d="M170 634L140 520L220 470" strokeWidth="7" />
        <path d="M206 452l52 30l-14 22l-56 -28z" />
      </g>
      <circle className="fill-gold-bright" cx="240" cy="500" r="7" />

      {/* The ledger open on the desk, and a stack of paper stamped as checked. */}
      <g className="fill-rice stroke-ink" strokeWidth="2">
        <path d="M250 638l20 -18h75v18z" />
        <path d="M345 638v-18h75l-14 18z" />
        <path d="M680 638v-12h120v12zM686 626v-10h110v10z" />
      </g>
      <Bars className="fill-ink-soft" gap={0} lengths={[50]} opacity={0.5} x={282} y={628} />
      <circle className="fill-sun-deep" cx="780" cy="608" r="10" />

      {/* The screen: a ledger, and one row the agent marked. */}
      <Monitor h={210} w={330} x={430} y={360}>
        <g className="fill-none stroke-rice" opacity="0.18" strokeWidth="1.5">
          <path d="M536 376v178M650 376v178" />
        </g>
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <rect
              className={i === 5 ? "fill-sun" : "fill-night-soft"}
              height="16"
              opacity={i === 5 ? 0.85 : 0.9}
              width="300"
              x="445"
              y={380 + i * 20}
            />
            <Bars
              className={i === 5 ? "fill-rice" : "fill-gold-bright"}
              gap={0}
              lengths={[60]}
              opacity={i === 5 ? 1 : 0.55}
              x={455}
              y={386 + i * 20}
            />
            <Bars className="fill-rice" gap={0} lengths={[40 + ((i * 17) % 30)]} opacity={0.45} x={660} y={386 + i * 20} />
          </g>
        ))}
      </Monitor>
      <AgentMark moon="fill-night" x={826} y={400} r={26} />
      <Thread d="M802 422Q780 470 750 482" width={3} />

      <SeatedBack clothes="fill-ink-soft" s={2.5} x={330} y={740} />

      {/* A colleague brings a folder. */}
      <FloorShadow w={120} x={1050} y={880} />
      <Standing build="jacket" className="fill-ink" s={4} x={1040} y={880} />
      <path className="fill-gold stroke-ink" d="M1000 640l46 -8l7 46l-46 8z" strokeWidth="2.5" />
    </SceneFrame>
  );
}

export function PullRequestScene({ className }: SceneProps) {
  const id = useId();
  const hatch = `${id}-hatch`;
  return (
    <SceneFrame
      alt={scenes.pullRequestReview.alt}
      className={className}
      height={900}
      name="pull-request-review"
      width={1200}
    >
      <defs>
        <HatchPattern id={hatch} />
      </defs>
      <Room />
      <CityWindow h={470} sun={{ x: 0.52, y: 0.62, r: 0.15 }} w={420} x={720} y={90} />
      <FloorLight depth={210} floor={690} left={730} panes={3} right={1130} shift={-120} spread={1.3} />

      <rect fill={`url(#${hatch})`} height="150" opacity="0.3" width="860" x="60" y="640" />
      <Desk h={150} w={860} x={60} y={650} />

      {/* The diff: changed lines in red and gold, the rest quiet. */}
      <Monitor h={250} w={400} x={160} y={330}>
        {Array.from({ length: 12 }, (_, i) => {
          const tint = i === 3 || i === 4 ? "fill-sun" : i >= 6 && i <= 8 ? "fill-gold" : null;
          return (
            <g key={i}>
              {tint ? <rect className={tint} height="16" opacity="0.4" width="384" x="168" y={344 + i * 19} /> : null}
              <rect className="fill-rice" height="4" opacity="0.25" width="14" x="174" y={350 + i * 19} />
              <rect
                className="fill-rice"
                height="4"
                opacity={tint ? 0.85 : 0.5}
                rx="2"
                width={60 + ((i * 53) % 220)}
                x={202 + ((i * 3) % 4) * 14}
                y={350 + i * 19}
              />
            </g>
          );
        })}
      </Monitor>

      {/* The agent's checks, each one ticked. */}
      <Monitor h={170} w={190} x={590} y={410}>
        {Array.from({ length: 4 }, (_, i) => (
          <g key={i}>
            <circle className="fill-gold" cx="614" cy={438 + i * 34} r="9" />
            <path
              className="fill-none stroke-night"
              d={`M609 ${438 + i * 34}l4 4l7 -8`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
            <rect className="fill-rice" height="4" opacity="0.6" rx="2" width={70 + ((i * 29) % 50)} x="634" y={436 + i * 34} />
          </g>
        ))}
      </Monitor>
      <AgentMark x={760} y={350} r={24} />
      <Thread d="M744 372Q724 390 712 406" width={3} />

      <Keyboard w={110} x={300} y={626} />
      {/* The red stamp on the desk, by the engineer's right hand. */}
      <g>
        <rect className="fill-ink" height="22" rx="3" width="12" x="470" y="598" />
        <rect className="fill-sun-deep stroke-ink" height="12" strokeWidth="2" width="34" x="459" y="618" />
      </g>
      <path className="fill-rice stroke-ink" d="M820 604h28v26h-28z" strokeWidth="2.5" />
      <path className="fill-none stroke-ink" d="M848 610q10 0 10 8t-10 8" strokeWidth="2.5" />

      {/* The engineer, from behind, and a colleague who stands to look. */}
      <SeatedBack clothes="fill-sun-deep" s={2.6} x={360} y={740} />
      <FloorShadow w={110} x={128} y={880} />
      <Standing build="dress" className="fill-night-soft" s={4.1} x={118} y={880} />
      <Pendant drop={150} x={380} />
    </SceneFrame>
  );
}

/* A parcel: a box in kraft gold with a tape line, and an ink edge. */
function Parcel({ h, w, x, y, tone = "fill-gold" }: { h: number; w: number; x: number; y: number; tone?: string }) {
  return (
    <g>
      <rect className={cn(tone, "stroke-ink")} height={h} strokeWidth="2" width={w} x={x} y={y} />
      <path className="fill-none stroke-ink" d={`M${x + w / 2} ${y}v${h}`} opacity="0.45" strokeWidth="2" />
    </g>
  );
}

export function ShopFloorScene({ className }: SceneProps) {
  const id = useId();
  const hatch = `${id}-hatch`;
  const random = seeded(41);
  const shelfBoxes: ReactNode[] = [];
  const tones = ["fill-gold", "fill-gold", "fill-paper-soft", "fill-rice", "fill-sun-deep"];
  for (const [shelfX, width] of [
    [40, 300],
    [860, 300],
  ]) {
    for (let level = 0; level < 4; level += 1) {
      let x = shelfX + 12;
      while (x < shelfX + width - 50) {
        const w = 34 + random() * 30;
        const h = 30 + random() * 46;
        shelfBoxes.push(
          <Parcel
            h={h}
            key={`${shelfX}-${level}-${x}`}
            tone={tones[Math.floor(random() * tones.length)]}
            w={w}
            x={x}
            y={400 + level * 110 - h}
          />,
        );
        x += w + 4 + random() * 8;
      }
    }
  }
  return (
    <SceneFrame alt={scenes.shopFloor.alt} className={className} height={900} name="shop-floor" width={1200}>
      <defs>
        <HatchPattern id={hatch} />
      </defs>
      <Room floor={720} />

      {/* High windows under the roof, the sun low in the middle. */}
      <CityWindow h={150} sun={{ x: 0.5, y: 0.62, r: 0.07 }} w={760} x={220} y={50} />
      <FloorLight depth={180} floor={720} left={300} panes={5} right={900} spread={1.15} />

      {/* Shelving on both sides, full of stock, with shadow under each shelf. */}
      {[40, 860].map((x) => (
        <g key={x}>
          {[0, 1, 2, 3].map((level) => (
            <rect fill={`url(#${hatch})`} height="22" key={level} opacity="0.35" width="292" x={x + 4} y={408 + level * 110} />
          ))}
          <g className="fill-ink">
            <rect height="490" width="8" x={x} y="240" />
            <rect height="490" width="8" x={x + 292} y="240" />
          </g>
          <g className="fill-ink-soft">
            {[0, 1, 2, 3].map((level) => (
              <rect height="8" key={level} width="300" x={x} y={400 + level * 110} />
            ))}
          </g>
        </g>
      ))}
      {shelfBoxes}

      {/* The agent above the floor, matching each parcel to its order. */}
      <AgentMark x={600} y={290} r={30} />
      <Thread d="M576 322Q520 420 460 588" width={3} />
      <Thread d="M626 320Q700 420 760 596" width={3} />

      {/* The packer stands behind the table and tapes an order shut. */}
      <Standing build="jacket" className="fill-night-soft" s={3.4} x={580} y={860} />
      <rect fill={`url(#${hatch})`} height="110" opacity="0.3" width="320" x="340" y="650" />
      <Desk h={110} w={320} x={340} y={650} />
      <Parcel h={66} w={110} x={400} y={572} />
      <path className="fill-gold stroke-ink" d="M400 572l-18 -22h106l22 22z" strokeWidth="2" />
      <rect className="fill-rice stroke-ink" height="24" strokeWidth="2" width="34" x="438" y="594" />
      <Bars className="fill-ink-soft" gap={7} lengths={[20, 14]} opacity={0.6} x={445} y={601} />
      <circle className="fill-none stroke-ink-soft" cx="560" cy="626" r="11" strokeWidth="6" />

      {/* The cart of parcels, pushed across the floor. */}
      <g>
        <Parcel h={60} w={70} x={720} y={650} />
        <Parcel h={50} w={60} x={796} y={660} tone="fill-sun-deep" />
        <Parcel h={44} w={56} x={740} y={606} tone="fill-paper-soft" />
        <rect className="fill-ink" height="10" width="170" x={710} y={710} />
        <path className="fill-none stroke-ink" d="M880 715V590h22" strokeWidth="6" />
        <circle className="fill-ink" cx="730" cy="740" r="14" />
        <circle className="fill-ink" cx="860" cy="740" r="14" />
      </g>
      <FloorShadow w={110} x={940} y={866} />
      <Standing build="coat" className="fill-ink" s={3.6} x={930} y={866} />
    </SceneFrame>
  );
}
