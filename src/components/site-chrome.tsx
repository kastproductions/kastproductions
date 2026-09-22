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

type Chrome = { route?: string };

/*
 * The header and the footer every page shares. The header carries the two
 * doors, the two anchors a buyer asks for on the first call, and the page
 * that says who signs the merge; the two calls to action sit at its end. On
 * a narrow screen the links fold into a <details> sheet, so the menu works
 * with no script.
 */

function Brand({ route }: Chrome) {
  return (
    <Link
      className="brand"
      href={homePage.path}
      prefetch={route === homePage.path ? false : undefined}
    >
      <span className="brand__mark" aria-hidden="true">
        K
      </span>
      <span translate="no">{brand}</span>
    </Link>
  );
}

function PageLink({
  route,
  href,
  children,
}: {
  route?: string;
  href: string;
  children: ReactNode;
}) {
  const current = route === href;
  return (
    <Link
      aria-current={current ? "page" : undefined}
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

function NavLinks({ route }: Chrome) {
  const home = route === homePage.path;
  return (
    <>
      {products.map((product) => (
        <PageLink href={`/${product.slug}`} key={product.slug} route={route}>
          {product.name}
        </PageLink>
      ))}
      <PageLink href={customPage.path} route={route}>
        Custom agent
      </PageLink>
      <SectionLink hash="#pricing" home={home}>
        Pricing
      </SectionLink>
      <SectionLink hash="#questions" home={home}>
        Questions
      </SectionLink>
      <PageLink href={aboutPage.path} route={route}>
        About
      </PageLink>
    </>
  );
}

export function SiteHeader({ route }: Chrome) {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Brand route={route} />

        <nav aria-label="Pages" className="nav__links">
          <NavLinks route={route} />
        </nav>

        <div className="nav__cta">
          <a className="btn btn--line" href={callHref}>
            Book a call
          </a>
          <a className="btn btn--signal" href={briefHref}>
            Send a brief
          </a>
        </div>

        <details className="nav__menu">
          <summary aria-label="Menu">
            Menu
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav aria-label="Pages" className="nav__sheet">
            <NavLinks route={route} />
            <div className="actions">
              <a className="btn btn--line" href={callHref}>
                Book a call
              </a>
              <a className="btn btn--signal" href={briefHref}>
                Send a brief
              </a>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter({ route }: Chrome) {
  return (
    <footer className="foot" id="contact">
      <div className="wrap">
        <div className="foot__grid">
          <div className="foot__brand">
            <Brand route={route} />
            <p>
              Software factory on demand. One standing agent for one company,
              deployed into that company&rsquo;s own accounts, stopped at an
              approval gate before anything reaches a customer.
            </p>
            <a className="pull" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>

          <div className="foot__col">
            <h2>Agents</h2>
            <ul>
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
            </ul>
          </div>

          <div className="foot__col">
            <h2>Ways to buy</h2>
            <ul>
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
            </ul>
          </div>

          <div className="foot__col">
            <h2>Company</h2>
            <ul>
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
            </ul>
          </div>

          <div className="foot__col">
            <h2>Legal</h2>
            <ul>
              {legalPages.map((page) => (
                <li key={page.path}>
                  <PageLink href={page.path} route={route}>
                    {page.title}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot__bottom">
          <span>
            {company.legalName} · {location.city}, {location.country}
          </span>
          <span className="mono">Registration {company.registrationCode}</span>
        </div>

        <div aria-hidden="true" className="foot__word">
          Kast <em>Productions</em>
          <span className="dot">.</span>
        </div>
      </div>
    </footer>
  );
}
