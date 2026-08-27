import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** The plate along the bottom edge of the chassis. */
export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("panel-raised mt-4 rounded-none", className)}>
      <div className="mx-auto flex w-full max-w-[86rem] flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 md:px-10">
        <span className="legend-sm engraved text-silk-dim">
          © {new Date().getFullYear()} Kast Productions · Vilnius, LT
        </span>
        <span className="legend-sm engraved hidden text-silk-dim sm:block">
          AI-native product studio
        </span>
        <a
          href="#top"
          className="legend-sm flex items-center gap-2 text-silk-dim transition-colors hover:text-signal"
        >
          Back to the bridge
          <ArrowUp className="size-3.5" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
