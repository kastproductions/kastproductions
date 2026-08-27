"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * The bridge's channel legends: the navigation, printed on label tape, with a
 * lamp beside each legend that lights for the section you are actually in.
 *
 * This owns the scroll-driven state rather than the header, and that is the
 * whole reason it is a separate component. The lit section changes as you
 * scroll, so anything holding that state re-renders on the way down the page.
 * Held in SiteHeader it re-rendered the nameplate, both screws, the record
 * button and all twelve peak-ladder segments — about 78 elements, of which 15
 * read the state. Here it re-renders the 15.
 */
export function ChannelLegends() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    // A thin band across the middle of the viewport is the root, so at most one
    // section is ever "the one you are reading". The set is tracked rather than
    // just latched on: latching leaves a lamp lit after you scroll back to the
    // master section, which claims you are reading something you left.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = NAV_ITEMS.find((item) => visible.has(item.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="hidden flex-1 items-center justify-center gap-1.5 lg:flex"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`/#${item.id}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex flex-col items-center gap-1.5 rounded-sm px-1 py-1"
          >
            <span
              aria-hidden
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                isActive
                  ? "bg-signal shadow-[0_0_0_2px_rgba(232,160,32,0.18)]"
                  : "bg-rail group-hover:bg-silk-dim",
              )}
            />
            <span
              className={cn(
                "tape legend-sm block px-2.5 py-1 transition-colors duration-300",
                isActive ? "text-ink" : "text-ink-dim group-hover:text-ink",
              )}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
