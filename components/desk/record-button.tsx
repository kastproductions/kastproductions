import { cn } from "@/lib/utils";

/**
 * The commit.
 *
 * Red is rationed on this desk: it marks the arc past 0 dB and it marks this
 * button, because those are the two places where something is at stake. A
 * transport button is the right shape for the one irreversible action on the
 * page — you press record and the session starts — and it names its action in
 * plain words rather than trusting the visitor to read a symbol.
 */
export function RecordButton({
  href,
  label = "Start a project",
  size = "sm",
  className,
}: {
  href: string;
  label?: string;
  size?: "sm" | "lg";
  className?: string;
}) {
  const large = size === "lg";
  return (
    <a
      href={href}
      className={cn(
        "group/rec relative inline-flex shrink-0 items-center rounded-sm bg-[#332f2b] transition-[transform,background-color] duration-200 active:translate-y-px",
        "shadow-[inset_0_1px_0_rgba(90,84,76,0.9),inset_0_-1px_0_#171514,0_2px_5px_-1px_rgba(0,0,0,0.55)]",
        "hover:bg-[#3c3833]",
        large ? "gap-4 px-6 py-4 md:gap-5 md:px-8 md:py-5" : "gap-2.5 px-3.5 py-2.5",
        className,
      )}
    >
      {/* The lamp. Dark glass with a filament behind it, brighter on hover. */}
      <span
        aria-hidden
        className={cn(
          "relative grid shrink-0 place-items-center rounded-full bg-[#1a1110]",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]",
          large ? "size-6 md:size-7" : "size-4",
        )}
      >
        <span
          className={cn(
            "block rounded-full bg-over transition-[opacity,box-shadow] duration-300",
            "opacity-80 group-hover/rec:opacity-100",
            "group-hover/rec:shadow-[0_0_10px_2px_rgba(214,58,34,0.45)]",
            large ? "size-3.5 md:size-4" : "size-2",
          )}
        />
      </span>
      <span
        className={cn(
          "text-silk transition-colors duration-200 group-hover/rec:text-face",
          large ? "text-[15px]" : "text-[11px]",
        )}
        style={{
          fontFamily: "var(--font-anybody), sans-serif",
          fontVariationSettings: '"wdth" 84, "wght" 650',
          letterSpacing: large ? "0.09em" : "0.12em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </a>
  );
}
