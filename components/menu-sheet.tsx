"use client";

import type { MouseEvent, RefObject } from "react";
import { RecordButton } from "@/components/desk/record-button";
import { Screw } from "@/components/desk/hardware";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EMAIL_HREF, NAV_ITEMS } from "@/lib/nav";

interface MenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the trigger on close (no SheetTrigger in the tree). */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

/** The bay pulled out of the rack: the same channel legends, stacked. */
export default function MenuSheet({
  open,
  onOpenChange,
  returnFocusRef,
}: MenuSheetProps) {
  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    const target = document.getElementById(id);
    // On an interior page the section is not in this document, so let the
    // anchor navigate home instead of swallowing the click.
    if (!target) return;
    event.preventDefault();
    onOpenChange(false);
    // The sheet locks body scroll, so scroll only after it releases (~200ms
    // close animation). scroll-behavior comes from CSS (motion-safe), so
    // reduced-motion users get an instant jump.
    window.setTimeout(() => {
      target.scrollIntoView({ block: "start" });
      history.replaceState(null, "", `#${id}`);
    }, 240);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="panel w-full max-w-full gap-0 overscroll-contain border-l-0 shadow-[inset_1px_0_0_#3d3936] sm:max-w-sm"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusRef.current?.focus({ preventScroll: true });
        }}
      >
        <SheetHeader className="flex-row items-center gap-2.5 px-4 pt-5 pb-5">
          <span
            aria-hidden
            className="h-8 w-1.5 rounded-[1px] bg-gradient-to-b from-wood via-wood to-wood-dark"
          />
          <SheetTitle
            className="text-left text-[21px] text-silk"
            style={{
              fontFamily: "var(--font-anybody), sans-serif",
              fontVariationSettings: '"wdth" 84, "wght" 700',
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            KastProductions
          </SheetTitle>
          <Screw className="ml-auto" />
        </SheetHeader>

        <nav aria-label="Sections" className="flex flex-col gap-2 px-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(event) => handleNavClick(event, item.id)}
              className="group panel-recessed flex items-center gap-3 rounded-sm px-3 py-3.5"
            >
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full bg-rail transition-colors duration-300 group-hover:bg-signal group-active:bg-signal"
              />
              <span className="tape legend block flex-1 px-2.5 py-1.5 text-ink">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-auto px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <RecordButton
            href={EMAIL_HREF}
            className="w-full justify-center py-4"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
