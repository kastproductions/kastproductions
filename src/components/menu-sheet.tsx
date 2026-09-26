"use client";

import { MenuIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/*
 * The header's links on a narrow screen, in a sheet that drops from the top.
 * `MobileNav` loads this module on the first press of its button, so the
 * sheet mounts open: the press that loaded it is the press that opened it.
 *
 * A link to a section of the page it is on changes nothing but the hash, so
 * the sheet closes on any link a reader picks rather than staying over the
 * section they asked for.
 */
export function MenuSheet({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger
        aria-label="Menu"
        render={<Button className="ml-auto md:hidden" size="sm" variant="outline" />}
      >
        Menu
        <MenuIcon data-icon="inline-end" />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav
          aria-label="Pages"
          className="flex max-h-[calc(100dvh-4.5rem)] flex-col overflow-y-auto overscroll-contain px-(--gutter) pt-3 pb-5"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          {children}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
