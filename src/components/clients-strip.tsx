import type { ReactNode } from "react";
import { clients } from "@/app/content";

/*
 * The seventeen companies, as one strip: a heading beside the names, each
 * linked to the company. The home page prints it as proof under the hero and
 * the about page prints it under the founder with the attribution, so the
 * strip lives here rather than in two page files. The heading is the one
 * thing the two pages say differently, so the page passes it.
 */
export function ClientsStrip({ heading }: { heading: ReactNode }) {
  return (
    <section className="band strip" id="clients" aria-labelledby="clients-title">
      <div className="wrap strip__grid">
        <h2 id="clients-title">{heading}</h2>
        <ul className="strip__list">
          {clients.map((client) => (
            <li key={client.name}>
              <a href={client.url} rel="noreferrer">
                {client.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
