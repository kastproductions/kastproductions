import Link from "next/link";
import type { ReactNode } from "react";
import {
  aboutPage,
  brand,
  briefHref,
  callHref,
  company,
  contactEmail,
  contactPage,
  customPage,
  evalSuitePage,
  homePage,
  jobPages,
  legalPages,
  location,
  products,
  slackPage,
} from "@/app/content";
import { MobileNav } from "@/components/mobile-nav";
import { Eclipse, Seal, SunDisc } from "@/components/ornaments";
import { Actions, PullLink } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";

type Chrome = { route?: string };

/*
 * The header and the footer every page shares. The header carries the two
 * doors, the two anchors a buyer asks for on the first call, and the page
 * that says who signs the merge; the two calls to action sit at its end. On
 * a narrow screen the links fold into a sheet (`MobileNav`). The wide
 * header's links are in the HTML either way, so a crawler reads them whether
 * or not the sheet ever opens.
 */

/* The nameplate: the KP seal, and the name beside it in display caps. */
function Brand({ route }: Chrome) {
  return (
    <Link
      className="inline-flex min-h-11 shrink-0 items-center gap-2.5 font-heading text-[0.98rem] font-medium tracking-[0.06em] uppercase no-underline"
      href={homePage.path}
      prefetch={route === homePage.path ? false : undefined}
    >
      <Seal className="size-9" />
      <span translate="no">{brand}</span>
    </Link>
  );
}

function PageLink({
  route,
  href,
  className,
  children,
}: {
  route?: string;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const current = route === href;
  return (
    <Link
      aria-current={current ? "page" : undefined}
      className={className}
      href={href}
      prefetch={current ? false : undefined}
    >
      {children}
    </Link>
  );
}

function SectionLink({
  home,
  hash,
  className,
  children,
}: {
  home: boolean;
  hash: string;
  className?: string;
  children: ReactNode;
}) {
  return home ? (
    <a className={className} href={hash}>
      {children}
    </a>
  ) : (
    <Link className={className} href={`/${hash}`}>
      {children}
    </Link>
  );
}

function NavLinks({ route, linkClassName }: Chrome & { linkClassName: string }) {
  const home = route === homePage.path;
  return (
    <>
      {products.map((product) => (
        <PageLink
          className={linkClassName}
          href={`/${product.slug}`}
          key={product.slug}
          route={route}
        >
          {product.name}
        </PageLink>
      ))}
      <PageLink className={linkClassName} href={customPage.path} route={route}>
        Custom agent
      </PageLink>
      <SectionLink className={linkClassName} hash="#pricing" home={home}>
        Pricing
      </SectionLink>
      <SectionLink className={linkClassName} hash="#questions" home={home}>
        Questions
      </SectionLink>
      <PageLink className={linkClassName} href={aboutPage.path} route={route}>
        About
      </PageLink>
    </>
  );
}

function CallsToAction({ size }: { size: "sm" | "default" }) {
  return (
    <>
      <a className={buttonVariants({ variant: "outline", size })} href={callHref}>
        Book a call
      </a>
      <a className={buttonVariants({ size })} href={briefHref}>
        Send a brief
      </a>
    </>
  );
}

export function SiteHeader({ route }: Chrome) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/92 backdrop-blur-[14px]">
      <div className="wrap flex min-h-18 items-center gap-6 lg:gap-8">
        <Brand route={route} />

        <nav aria-label="Pages" className="ml-auto hidden items-center gap-5 md:flex lg:gap-7">
          <NavLinks
            linkClassName="relative inline-flex min-h-11 items-center label-mono text-[0.68rem] text-prose no-underline transition-colors after:absolute after:bottom-1.5 after:left-1/2 after:size-1.25 after:-translate-x-1/2 after:translate-y-1 after:rounded-full after:bg-signal after:opacity-0 after:transition-[opacity,translate] after:duration-200 hover:text-foreground hover:after:translate-y-0 hover:after:opacity-100 aria-[current=page]:text-foreground aria-[current=page]:after:translate-y-0 aria-[current=page]:after:opacity-100"
            route={route}
          />
        </nav>

        <div className="hidden shrink-0 items-center gap-2.5 md:inline-flex">
          <CallsToAction size="sm" />
        </div>

        <MobileNav>
          <NavLinks
            linkClassName="block border-b border-hairline py-3.5 font-heading text-[1.05rem] font-medium tracking-[0.04em] uppercase no-underline aria-[current=page]:text-signal-foreground"
            route={route}
          />
          <Actions className="mt-4 *:flex-1">
            <CallsToAction size="default" />
          </Actions>
        </MobileNav>
      </div>
    </header>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 label-mono text-faint">{title}</h2>
      <ul className="grid gap-1 text-foreground [&_a]:inline-flex [&_a]:min-h-8 [&_a]:items-center [&_a]:text-[0.98rem] [&_a]:no-underline [&_a]:decoration-signal [&_a]:decoration-1 [&_a]:underline-offset-[0.3em] [&_a:hover]:underline [&_a[aria-current=page]]:underline">
        {children}
      </ul>
    </div>
  );
}

export function SiteFooter({ route }: Chrome) {
  return (
    <footer className="night mt-(--band) pt-[clamp(2.5rem,5vw,4rem)] pb-10" id="contact">
      <div className="wrap">
        {/* The nameplate, and the sun setting on the rule under it. */}
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-hairline">
          <div className="pb-5">
            <Brand route={route} />
          </div>
          <SunDisc className="w-[min(15rem,30vw)] min-w-0 shrink" />
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]">
          <div className="flex flex-col items-start gap-4 sm:col-span-full lg:col-span-1">
            <p className="max-w-[30ch] text-[0.95rem] leading-relaxed text-muted-foreground">
              Software factory on demand. One standing agent for one company,
              deployed into that company&rsquo;s own accounts, stopped at an
              approval gate before anything reaches a customer.
            </p>
            <PullLink href={`mailto:${contactEmail}`}>{contactEmail}</PullLink>
          </div>

          <FooterColumn title="Agents">
            {products.map((product) => (
              <li key={product.slug}>
                <PageLink href={`/${product.slug}`} route={route}>
                  {product.name}
                </PageLink>
              </li>
            ))}
            {jobPages.map((job) => (
              <li key={job.path}>
                <PageLink href={job.path} route={route}>
                  {job.title}
                </PageLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Ways to buy">
            <li>
              <PageLink href={customPage.path} route={route}>
                Custom agent
              </PageLink>
            </li>
            <li>
              <Link href="/#pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/#questions">Questions</Link>
            </li>
            <li>
              <PageLink href={slackPage.path} route={route}>
                An agent in Slack
              </PageLink>
            </li>
          </FooterColumn>

          <FooterColumn title="Company">
            <li>
              <PageLink href={aboutPage.path} route={route}>
                About the founder
              </PageLink>
            </li>
            <li>
              <PageLink href={evalSuitePage.path} route={route}>
                The eval suite
              </PageLink>
            </li>
            <li>
              <PageLink href={contactPage.path} route={route}>
                Contact
              </PageLink>
            </li>
            <li>
              <a
                href="https://github.com/kastproductions"
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </li>
          </FooterColumn>

          <FooterColumn title="Legal">
            {legalPages.map((page) => (
              <li key={page.path}>
                <PageLink href={page.path} route={route}>
                  {page.title}
                </PageLink>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-hairline pt-5 label-mono text-faint">
          <Eclipse className="size-6" />
          <span>{company.legalName}</span>
          <span>
            {location.city}, {location.country}
          </span>
          <span className="sm:ml-auto">
            Registration&nbsp;<span translate="no">{company.registrationCode}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/*
 * The vertical rail of the reference, in the margin beside the first screen
 * once the margin is wide enough for it: the eclipse, a line, and the name
 * and the city set down the page in mono caps. It scrolls away with the first
 * screen, as the reference's rail does, so it never crosses a night band. It
 * repeats what the footer states, so a screen reader skips it.
 */
export function Rail() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-48 left-[max(1.25rem,calc((100vw-78rem)/2-4.5rem))] z-40 hidden flex-col items-center gap-4 text-faint rail:flex"
    >
      <Eclipse className="size-7" />
      <span className="h-20 w-px bg-line" />
      <span className="label-mono text-[0.66rem] [writing-mode:vertical-rl]" translate="no">
        {brand} · {location.city}, {location.country}
      </span>
      <span className="h-20 w-px bg-line" />
    </div>
  );
}
