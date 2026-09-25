import type { ReactNode } from "react";
import { clients } from "@/app/content";
import { Band } from "@/components/section";

/*
 * The seventeen companies, as one strip: a heading beside the names, each
 * linked to the company. The home page prints it as proof under the hero and
 * the about page prints it under the founder with the attribution, so the
 * strip lives here rather than in two page files. The heading is the one
 * thing the two pages say differently, so the page passes it.
 */
export function ClientsStrip({ heading }: { heading: ReactNode }) {
  return (
    <Band aria-labelledby="clients-title" className="py-7" id="clients">
      <div className="wrap grid items-baseline gap-6 lg:grid-cols-[var(--head-col)_minmax(0,1fr)] lg:gap-(--split)">
        <h2
          className="font-heading text-[0.85rem] leading-[1.4] font-semibold text-faint"
          id="clients-title"
        >
          {heading}
        </h2>
        <ul className="flex flex-wrap items-baseline gap-x-5.5 gap-y-2">
          {clients.map((client) => (
            <li key={client.name}>
              <a
                className="font-heading text-[0.92rem] font-semibold whitespace-nowrap text-muted-foreground no-underline transition-colors hover:text-foreground"
                href={client.url}
                rel="noreferrer"
              >
                {client.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}
