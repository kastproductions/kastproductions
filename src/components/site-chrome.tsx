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
import { Actions, Dot, PullLink } from "@/components/section";
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

function Brand({ route }: Chrome) {
  return (
    <Link
      className="inline-flex shrink-0 items-center gap-2.75 font-heading text-[1.1rem] font-bold tracking-[-0.02em] no-underline"
      href={homePage.path}
      prefetch={route === homePage.path ? false : undefined}
    >
      <span
        aria-hidden="true"
        className="inline-flex size-8 items-center justify-center rounded-full border-[1.5px] border-foreground pr-[0.1em] font-serif text-[1.05rem] leading-none italic"
      >
        K
      </span>
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
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/88 backdrop-blur-[14px] backdrop-saturate-[1.2]">
      <div className="wrap flex min-h-17 items-center gap-8">
        <Brand route={route} />

        <nav aria-label="Pages" className="ml-auto hidden items-center gap-6.5 md:flex">
          <NavLinks
            linkClassName="font-heading text-[0.92rem] font-medium text-prose no-underline transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-signal aria-[current=page]:underline-offset-[0.5em]"
            route={route}
          />
        </nav>

        <div className="hidden shrink-0 items-center gap-2.5 md:inline-flex">
          <CallsToAction size="sm" />
        </div>

        <MobileNav>
          <NavLinks
            linkClassName="block border-b border-hairline py-3 font-heading text-[1.05rem] font-medium no-underline"
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
      <h2 className="mb-3.5 font-heading text-[0.8rem] font-semibold text-faint">
        {title}
      </h2>
      <ul className="grid gap-2 text-prose [&_a]:font-heading [&_a]:text-[0.92rem] [&_a]:no-underline [&_a]:transition-colors [&_a:hover]:text-signal-foreground">
        {children}
      </ul>
    </div>
  );
}

export function SiteFooter({ route }: Chrome) {
  return (
    <footer className="border-t pt-[clamp(3rem,6vw,5rem)] pb-8" id="contact">
      <div className="wrap">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))]">
          <div className="flex flex-col items-start gap-4 sm:col-span-full lg:col-span-1">
            <Brand route={route} />
            <p className="max-w-[30ch] text-[0.9rem] leading-relaxed text-muted-foreground">
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

        <div className="mt-12 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-hairline pt-5 text-[0.82rem] text-faint">
          <span>
            {company.legalName} · {location.city}, {location.country}
          </span>
          <span className="font-mono text-[0.8rem]">
            Registration {company.registrationCode}
          </span>
        </div>

        <div
          aria-hidden="true"
          className="mt-10 overflow-hidden font-heading text-[clamp(2.6rem,9.4vw,9.5rem)] leading-[0.85] font-extrabold tracking-[-0.05em] whitespace-nowrap select-none [&_em]:font-serif [&_em]:font-normal [&_em]:tracking-[-0.02em]"
        >
          Kast <em>Productions</em>
          <Dot />
        </div>
      </div>
    </footer>
  );
}
