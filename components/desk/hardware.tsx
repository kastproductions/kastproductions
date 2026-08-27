import { cn } from "@/lib/utils";

/**
 * The desk's drawn parts.
 *
 * All geometry, no pictures: crisp vector hardware with one stroke weight
 * family and one light direction (from above). Every part here is a real
 * control on a real console, and each one is used on this page for the job it
 * does in life — a jack marks a connection, a fader marks a strip you can act
 * on, a knob marks a setting, a screw holds a panel down.
 */

/** A module rail: the silkscreened strip along the top or bottom of a panel. */
export function Rail({
  left,
  right,
  className,
}: {
  left: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-1 px-4 py-2.5",
        "sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:px-6",
        className,
      )}
    >
      <span className="legend-sm engraved text-silk-dim">{left}</span>
      {right ? (
        <span className="legend-sm engraved text-silk-dim sm:text-right">
          {right}
        </span>
      ) : null}
    </div>
  );
}

/** A machined button with no lamp: everything on the desk that is not the
 * commit. Same body, same press, no red. */
export function PanelLink({
  href,
  children,
  className,
  ...rest
}: React.ComponentProps<"a">) {
  return (
    <a
      href={href}
      className={cn(
        "group/panel inline-flex shrink-0 items-center gap-2.5 rounded-sm bg-[#2b2825] px-5 py-4",
        "shadow-[inset_0_1px_0_rgba(90,84,76,0.85),inset_0_-1px_0_#171514,0_2px_5px_-1px_rgba(0,0,0,0.5)]",
        "text-silk transition-[background-color,transform] duration-200 hover:bg-[#343029] hover:text-face active:translate-y-px",
        className,
      )}
      style={{
        fontFamily: "var(--font-anybody), sans-serif",
        fontVariationSettings: '"wdth" 84, "wght" 620',
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontSize: "13px",
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Screw({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      aria-hidden
      className={cn("size-3 shrink-0", className)}
    >
      <circle cx="7" cy="7" r="6" fill="var(--brass-dark)" />
      <circle cx="7" cy="7" r="6" fill="none" stroke="#2f2921" strokeWidth="1" />
      <circle cx="7" cy="6.2" r="5" fill="none" stroke="#c4ae74" strokeWidth="0.8" />
      <path d="M 3.4 5.4 L 10.6 8.6" stroke="#241e17" strokeWidth="1.7" />
    </svg>
  );
}

/** A rack ear: the flange a 19" unit is bolted to the rails by. */
export function RackEar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "panel-raised flex w-6 flex-col items-center justify-between rounded-l-sm py-3 md:w-8",
        className,
      )}
    >
      <Screw />
      <Screw />
    </div>
  );
}

interface KnobProps {
  /** 0 = fully counter-clockwise, 1 = fully clockwise. */
  position: number;
  cap: "signal" | "cue" | "alloy";
  label: string;
  className?: string;
}

const CAP_FILL: Record<KnobProps["cap"], { top: string; side: string }> = {
  signal: { top: "#e8a020", side: "#a86f11" },
  cue: { top: "#58b08a", side: "#2f7a5b" },
  alloy: { top: "#b9b2a5", side: "#6e6960" },
};

/** 270° of travel, the standard for a panel pot, starting at 7 o'clock. */
const KNOB_SWEEP = 270;

export function Knob({ position, cap, label, className }: KnobProps) {
  const fill = CAP_FILL[cap];
  const angle = -KNOB_SWEEP / 2 + KNOB_SWEEP * position;
  const ticks = Array.from({ length: 11 }, (_, index) => {
    const degrees = -KNOB_SWEEP / 2 + (KNOB_SWEEP / 10) * index;
    const radians = (degrees * Math.PI) / 180;
    return {
      x1: 30 + 25 * Math.sin(radians),
      y1: 30 - 25 * Math.cos(radians),
      x2: 30 + 28.5 * Math.sin(radians),
      y2: 30 - 28.5 * Math.cos(radians),
      key: index,
    };
  });

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <svg viewBox="0 0 60 60" aria-hidden className="size-11 md:size-14">
        {ticks.map((t) => (
          <path
            key={t.key}
            d={`M ${t.x1.toFixed(2)} ${t.y1.toFixed(2)} L ${t.x2.toFixed(2)} ${t.y2.toFixed(2)}`}
            stroke="#8e877c"
            strokeWidth="1.4"
          />
        ))}
        {/* Body: knurled skirt, then the coloured cap. */}
        <circle cx="30" cy="31" r="20" fill="#151413" opacity="0.55" />
        <circle cx="30" cy="30" r="20" fill={fill.side} />
        <circle cx="30" cy="29" r="19" fill={fill.top} />
        <circle
          cx="30"
          cy="29"
          r="19"
          fill="none"
          stroke="#0f0e0d"
          strokeOpacity="0.35"
        />
        {/* Knurling: short radial cuts around the cap edge. */}
        {Array.from({ length: 24 }, (_, index) => {
          const radians = ((index * 360) / 24) * (Math.PI / 180);
          return (
            <path
              key={`knurl-${index}`}
              d={`M ${(30 + 15.5 * Math.sin(radians)).toFixed(2)} ${(29 - 15.5 * Math.cos(radians)).toFixed(2)} L ${(30 + 18.6 * Math.sin(radians)).toFixed(2)} ${(29 - 18.6 * Math.cos(radians)).toFixed(2)}`}
              stroke="#0f0e0d"
              strokeOpacity="0.28"
              strokeWidth="1.5"
            />
          );
        })}
        {/* Pointer. */}
        <g transform={`rotate(${angle.toFixed(1)} 30 29)`}>
          <path
            d="M 30 14.5 L 30 24"
            stroke="#16150f"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
      </svg>
      <span className="legend-sm text-silk-dim engraved">{label}</span>
    </div>
  );
}

/**
 * A 1/4" jack socket. The bay's cells use it as the connection point, and it
 * lights green when the row it belongs to is patched (hovered or focused).
 */
export function Jack({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 34"
      aria-hidden
      className={cn("size-6 shrink-0", className)}
    >
      <circle cx="17" cy="17" r="16" fill="#3d3833" />
      <circle cx="17" cy="16.2" r="16" fill="none" stroke="var(--rail-lit)" strokeWidth="1.2" />
      <circle cx="17" cy="17" r="12" fill="var(--brass-dark)" />
      <circle cx="17" cy="17" r="12" fill="none" stroke="#2c2620" strokeWidth="1" />
      <circle cx="17" cy="17" r="8" fill="var(--shadow-deep)" />
      <circle
        cx="17"
        cy="17"
        r="8"
        fill="none"
        stroke="var(--shadow-deep)"
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      {/* The plug tip, revealed when the cell is patched. */}
      <circle
        cx="17"
        cy="17"
        r="4.5"
        className="fill-cue opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </svg>
  );
}

/**
 * A channel fader, sized to fill the strip it belongs to.
 *
 * The cap rides up when the strip is engaged, which is what a fader is for: it
 * says "this one is live now". It carries no number, because there is nothing
 * here to measure — the scale is marks, with the unity mark cut longer, exactly
 * as it is engraved on a panel.
 */
const FADER_MARKS = Array.from({ length: 9 }, (_, index) => ({
  key: index,
  /* Third mark down is unity: longer, brighter, the one your eye finds. */
  unity: index === 2,
}));

export function Fader({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative w-9 shrink-0 self-stretch", className)}
    >
      {/* The slot the cap travels in. */}
      <div
        aria-hidden
        className="panel-recessed absolute inset-y-1 left-1/2 w-[7px] -translate-x-1/2 rounded-full"
      />

      <div
        aria-hidden
        className="absolute inset-y-2 left-0 flex flex-col justify-between"
      >
        {FADER_MARKS.map((mark) => (
          <span
            key={mark.key}
            className={cn(
              "block h-px",
              mark.unity ? "w-3 bg-silk-dim" : "w-1.5 bg-rail",
            )}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-[12%] transition-[bottom] duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bottom-[66%] group-focus-visible:bottom-[66%]">
        <svg viewBox="0 0 40 26" aria-hidden className="w-full">
          <rect x="4" y="3" width="32" height="21" rx="2" fill="#100f0e" opacity="0.55" />
          <rect x="4" y="2" width="32" height="21" rx="2" fill="#4b4740" />
          <rect x="4" y="2" width="32" height="20" rx="2" fill="#5c574f" />
          <rect
            x="4"
            y="2"
            width="32"
            height="21"
            rx="2"
            fill="none"
            stroke="#26231f"
          />
          {[6, 9, 16, 19].map((y) => (
            <path
              key={y}
              d={`M 7 ${y} L 33 ${y}`}
              stroke="#2b2823"
              strokeWidth="1.4"
            />
          ))}
          {/* Index line: where the cap actually reads. */}
          <path d="M 5 12.5 L 35 12.5" stroke="#efe9dc" strokeWidth="1.6" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Printed label tape. Every studio labels its bay with it, and it is the only
 * paper on the chassis, so it is where a name goes when a name must be read.
 */
export function Tape({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "tape legend-sm block truncate px-2 py-1 text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * The bridge's peak ladder. Twelve segments reading the same drive every
 * needle reads, so the header is part of the instrument rather than a bar
 * pinned above it.
 */
const LADDER = Array.from({ length: 12 }, (_, index) => {
  const threshold = index / 12;
  return {
    threshold,
    key: index,
    tone:
      index >= 10
        ? "bg-over"
        : index >= 7
          ? "bg-signal"
          : "bg-cue",
  };
});

export function PeakLadder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex items-end gap-[3px]", className)}
    >
      {LADDER.map((segment) => (
        <span key={segment.key} className="relative block h-4 w-[3px]">
          <span className="absolute inset-0 rounded-[1px] bg-rail/45" />
          <span
            className={cn("absolute inset-0 rounded-[1px]", segment.tone)}
            style={{
              opacity: `clamp(0, calc((var(--vu-drive) - ${segment.threshold.toFixed(4)}) * 24), 1)`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
