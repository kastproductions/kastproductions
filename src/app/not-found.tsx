import Link from "next/link";
import type { Metadata } from "next";
import { Actions, Band, HeroCopy, HeroTitle, Lede } from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { buttonVariants } from "@/components/ui/button";

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
        <Band flush>
          <HeroCopy className="wrap">
            <HeroTitle>No page at this address.</HeroTitle>
            <Lede>
              The link is either old or mistyped. Everything we publish is one
              click away: the work we take, what an agent costs, and the
              questions we get on the first call.
            </Lede>
            <Actions>
              <Link className={buttonVariants()} href="/">
                Go to the home page
              </Link>
              <Link className={buttonVariants({ variant: "outline" })} href="/#work">
                See the work we take
              </Link>
            </Actions>
          </HeroCopy>
        </Band>
      </main>

      <SiteFooter />
    </>
  );
}
