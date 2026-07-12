"use client";

import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const EMAIL_HREF = "mailto:hello@kastproductions.com";

const NAV_ITEMS = [
  { label: "capabilities", href: "#capabilities" },
  { label: "services", href: "#services" },
  { label: "clients", href: "#clients" },
  { label: "testimonials", href: "#testimonials" },
];

interface MenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Restores focus to the trigger on close (no SheetTrigger in the tree). */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export default function MenuSheet({
  open,
  onOpenChange,
  returnFocusRef,
}: MenuSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-full sm:max-w-sm"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocusRef.current?.focus();
        }}
      >
        <SheetHeader>
          <SheetTitle className="text-left font-mono text-xs font-medium tracking-[0.18em] uppercase">
            KastProductions<span className="text-iris">.</span>
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Sections" className="flex flex-col border-t">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="flex items-baseline gap-4 border-b px-4 py-5 transition-colors hover:bg-muted active:bg-muted"
            >
              <span className="font-mono text-[11px] text-muted-foreground">
                /0{index + 1}
              </span>
              <span className="font-display text-2xl font-medium capitalize">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <Button
            asChild
            className="h-12 w-full font-mono text-[11px] tracking-[0.14em] uppercase"
          >
            <a href={EMAIL_HREF}>Start a project</a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
