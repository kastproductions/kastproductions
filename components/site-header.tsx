"use client";

import { useRef, useState } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { AlignRight } from "lucide-react";
import { ChannelLegends } from "@/components/channel-legends";
import { PeakLadder, Screw } from "@/components/desk/hardware";
import { RecordButton } from "@/components/desk/record-button";

/* The sheet (radix Dialog + focus scope) loads only when the menu is used. */
const MenuSheet = dynamic(() => import("@/components/menu-sheet"), {
  ssr: false,
});

function preloadMenuSheet() {
  void import("@/components/menu-sheet");
}

/**
 * The meter bridge.
 *
 * On a console the bridge is the one thing you can read from across the room:
 * it tells you which strip is live and what the signal is doing. It does that
 * job here. The channel legends are the navigation, printed on label tape, and
 * the lamp beside the legend lights for the section you are actually in — so
 * the header is an instrument reading the page, not a bar sitting above it.
 *
 * The legends own that reading. Nothing here changes while you scroll, so
 * nothing here re-renders while you scroll.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="panel-raised fixed inset-x-0 top-0 z-50 rounded-none">
      <a
        href="#top"
        className="legend sr-only text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10 focus:bg-face focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <div className="flex h-[58px] items-center gap-3 px-3 sm:gap-5 sm:px-5 md:h-[74px] md:gap-7 md:px-6">
        <Screw className="hidden shrink-0 md:block" />

        {/* Nameplate. */}
        <NextLink
          href="/"
          className="group flex shrink-0 items-center gap-2.5 outline-none"
        >
          <span
            aria-hidden
            className="h-8 w-1.5 rounded-[1px] bg-gradient-to-b from-wood via-wood to-wood-dark md:h-10 md:w-2"
          />
          <span className="flex flex-col leading-none">
            <span
              className="text-[15px] text-silk transition-colors group-hover:text-face md:text-[21px]"
              style={{
                fontFamily: "var(--font-anybody), sans-serif",
                fontVariationSettings: '"wdth" 84, "wght" 700',
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              KastProductions
            </span>
            <span className="legend-sm mt-1 hidden text-silk-dim md:block">
              AI-native product studio
            </span>
          </span>
        </NextLink>

        {/* Channel legends. */}
        <ChannelLegends />

        <div className="ml-auto flex items-center gap-3 sm:gap-4 md:gap-5 lg:ml-0">
          <div className="hidden flex-col items-end gap-1.5 sm:flex">
            <PeakLadder />
            <span className="legend-sm text-silk-dim">Bus</span>
          </div>

          <RecordButton
            href="mailto:hello@kastproductions.com"
            className="hidden md:inline-flex"
          />

          <button
            ref={triggerRef}
            type="button"
            className="panel-raised flex size-10 items-center justify-center rounded-sm text-silk transition-colors hover:text-face lg:hidden"
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
            <AlignRight className="size-5" />
          </button>

          {menuMounted ? (
            <MenuSheet
              open={open}
              onOpenChange={setOpen}
              returnFocusRef={triggerRef}
            />
          ) : null}

          <Screw className="hidden shrink-0 md:block" />
        </div>
      </div>

      {/* The rail the bridge is bolted to. */}
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-rail to-transparent"
      />
    </header>
  );
}
