"use client";

import { MenuIcon } from "lucide-react";
import { type ComponentType, type ReactNode, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MenuSheetComponent = ComponentType<{ children: ReactNode }>;

/* The sheet and the dialog behind it are about a third of the script every
 * page would otherwise load, for a menu only a narrow screen shows and only
 * some readers open. The module arrives when a pointer reaches the button or
 * focus lands on it, which is usually before the press that needs it. */
const loadMenuSheet = () =>
  import("./menu-sheet").then((module): MenuSheetComponent => module.MenuSheet);

/*
 * The header's menu button on a narrow screen. Until a reader presses it, it
 * is a plain button; the press loads `MenuSheet`, which takes its place and
 * mounts open. The links are drawn by the header and passed in, so the two
 * lists cannot drift.
 */
export function MobileNav({ children }: { children: ReactNode }) {
  const [MenuSheet, setMenuSheet] = useState<MenuSheetComponent | null>(null);

  if (MenuSheet) return <MenuSheet>{children}</MenuSheet>;

  return (
    <button
      aria-expanded={false}
      aria-haspopup="dialog"
      aria-label="Menu"
      className={cn(buttonVariants({ size: "sm", variant: "outline" }), "ml-auto md:hidden")}
      onClick={() => {
        void loadMenuSheet().then((component) => setMenuSheet(() => component));
      }}
      onFocus={loadMenuSheet}
      onPointerEnter={loadMenuSheet}
      type="button"
    >
      Menu
      <MenuIcon data-icon="inline-end" />
    </button>
  );
}
