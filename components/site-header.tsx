"use client";

import { useRef, useState } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMAIL_HREF = "mailto:hello@kastproductions.com";

const NAV_ITEMS = [
  { label: "capabilities", href: "#capabilities" },
  { label: "services", href: "#services" },
  { label: "clients", href: "#clients" },
  { label: "testimonials", href: "#testimonials" },
];

/* The sheet (radix Dialog + focus scope) loads only when the menu is used. */
const MenuSheet = dynamic(() => import("@/components/menu-sheet"), {
  ssr: false,
});

function preloadMenuSheet() {
  void import("@/components/menu-sheet");
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:border focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:tracking-[0.14em] focus:uppercase"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between border-x px-5 sm:px-8 md:px-12">
        <NextLink
          href="/"
          className="font-mono text-xs font-medium tracking-[0.18em] uppercase"
        >
          KastProductions<span className="text-blueprint">.</span>
        </NextLink>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden font-mono text-[11px] tracking-[0.14em] uppercase md:inline-flex"
          >
            <a href={EMAIL_HREF}>Start a project</a>
          </Button>

          <Button
            ref={triggerRef}
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={open}
            onPointerEnter={preloadMenuSheet}
            onFocus={preloadMenuSheet}
            onClick={() => {
              setMenuMounted(true);
              setOpen(true);
            }}
          >
            <Menu />
          </Button>

          {menuMounted ? (
            <MenuSheet
              open={open}
              onOpenChange={setOpen}
              returnFocusRef={triggerRef}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}
