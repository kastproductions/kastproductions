import Link from "next/link";
import {
  brand,
  briefHref,
  callHref,
  contactEmail,
  location,
  products,
} from "@/app/content";

export function Brand() {
  return (
    <Link className="brand" href="/">
      <span className="brand__mark" aria-hidden="true" />
      {brand}
    </Link>
  );
}

/*
 * One header for every page. On the home page the section links stay relative
 * hashes; anywhere else they point back at the home page, so `#doors`,
 * `#pricing` and `#questions` keep resolving from every route. A ready-made
 * product appears here the moment it enters `products`.
 */
export function SiteHeader({ home = false }: { home?: boolean }) {
  const at = (hash: string) => (home ? hash : `/${hash}`);

  return (
    <div className="field" id="top">
      <header className="wrap top__row">
        <Brand />
        <nav className="nav" aria-label="Sections">
          {products.map((product) => (
            <Link href={`/${product.slug}`} key={product.slug}>
              {product.name}
            </Link>
          ))}
          <Link href="/custom">Custom</Link>
          <Link href={at("#pricing")}>Pricing</Link>
          <Link href={at("#questions")}>Questions</Link>
        </nav>
        <a className="button button--paper" href={callHref}>
          Book a call
        </a>
      </header>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="field close" id="contact">
      <div className="wrap">
        <div className="close__grid">
          <h2>Bring us a brief.</h2>
          <p className="lede">
            Send the issue you would hand to a new senior engineer, or describe
            the work you want an agent to take over. We reply within one working
            day with a spec and a fixed price.
          </p>
          <div className="actions">
            <a className="button button--paper" href={briefHref}>
              Send us a brief
            </a>
            <a className="button button--ghost" href={callHref}>
              Book a call
            </a>
          </div>
          <p className="contact">
            Or write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        </div>
        <div className="foot">
          <Brand />
          <span>
            Software development agency in {location.city}, {location.country}.
            Copyright {new Date().getFullYear()}.
          </span>
        </div>
      </div>
    </footer>
  );
}
