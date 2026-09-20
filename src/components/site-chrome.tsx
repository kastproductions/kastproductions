import Link from "next/link";
import type { ReactNode } from "react";
import {
  brand,
  briefHref,
  callHref,
  contactEmail,
  location,
  products,
} from "@/app/content";

/*
 * Every page tells its chrome which route it is on. A link back to that same
 * route then asks for no prefetch: the router fetches a route's payload the
 * first time a link to it enters the viewport, and the payload of the page a
 * reader already reads is 10 kB gzipped they would pay for twice. Every other
 * link keeps the router's own default, which is `undefined`.
 */
type Chrome = { route?: string };

/*
 * The mark is a gate: a bar a run stops against. It is the one place the brand
 * shows the thing the whole offer turns on.
 */
export function Brand({ route }: Chrome) {
  return (
    <Link className="brand" href="/" prefetch={route === "/" ? false : undefined}>
      <span className="brand__mark" aria-hidden="true" />
      {brand}
    </Link>
  );
}

/*
 * A link to a section. On the home page that section is already in the
 * document, so a plain anchor is the whole navigation: the browser scrolls to
 * it. `next/link` there would add a router pass and a prefetch of the page
 * under the reader's feet. From any other route it is a navigation to the home
 * page, which the router does without a reload.
 */
function SectionLink({
  home,
  hash,
  children,
}: {
  home: boolean;
  hash: string;
  children: ReactNode;
}) {
  return home ? (
    <a href={hash}>{children}</a>
  ) : (
    <Link href={`/${hash}`}>{children}</Link>
  );
}

/*
 * One header for every page, sticky so the one action a reader needs is always
 * at hand. `#pricing` and `#questions` keep resolving from every route: on the
 * home page they are anchors, anywhere else they point back at the home page.
 * A ready-made product appears here the moment it enters `products`.
 */
export function SiteHeader({ route }: Chrome) {
  const home = route === "/";

  return (
    <div className="top" id="top">
      <header className="wrap top__row">
        <Brand route={route} />
        <nav className="nav" aria-label="Sections">
          {products.map((product) => (
            <Link
              href={`/${product.slug}`}
              key={product.slug}
              prefetch={route === `/${product.slug}` ? false : undefined}
            >
              {product.name}
            </Link>
          ))}
          <Link href="/custom" prefetch={route === "/custom" ? false : undefined}>
            Custom agents
          </Link>
          <SectionLink home={home} hash="#pricing">
            Pricing
          </SectionLink>
          <SectionLink home={home} hash="#questions">
            Questions
          </SectionLink>
        </nav>
        <a className="btn btn--signal" href={briefHref}>
          Send us a brief
        </a>
      </header>
    </div>
  );
}

export function SiteFooter({ route }: Chrome) {
  return (
    <footer className="band band--panel close" id="contact">
      <div className="wrap">
        <div className="close__grid">
          <h2>Bring us a brief.</h2>
          <p className="lede">
            Send the issue you would hand to a new senior engineer, or describe
            the work you want an agent to take over. We reply within one working
            day with a spec and a fixed price.
          </p>
          <div className="actions">
            <a className="btn btn--signal" href={briefHref}>
              Send us a brief
            </a>
            <a className="btn btn--line" href={callHref}>
              Book a call
            </a>
          </div>
          <p className="contact">
            Or write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
        <div className="foot">
          <Brand route={route} />
          <span>
            Software development agency in {location.city}, {location.country}.
            Copyright {new Date().getFullYear()}.
          </span>
        </div>
      </div>
    </footer>
  );
}
