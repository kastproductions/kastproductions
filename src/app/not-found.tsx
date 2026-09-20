import Link from "next/link";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

/*
 * The page a wrong address lands on. It states what happened and where to go
 * next, and it carries no canonical and no robots directive of its own: the
 * framework writes `noindex` here, and a second directive beside it would
 * leave a crawler to choose. See `tests/opengraph.test.ts`.
 */
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__copy">
            <h1>No page at this address.</h1>
            <p className="lede">
              The link is either old or mistyped. Everything we publish is one
              click away: the work we take, what an agent costs, and the
              questions we get on the first call.
            </p>
            <div className="actions">
              <Link className="btn btn--signal" href="/">
                Go to the home page
              </Link>
              <Link className="btn btn--line" href="/#work">
                See the work we take
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
