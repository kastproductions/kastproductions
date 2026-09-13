import type { Metadata } from "next";
import { ChannelsSection } from "@/components/channels-section";
import { RunRecord } from "@/components/run-record";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import type { Product } from "@/app/content";
import {
  brand,
  callHref,
  leadTime,
  mailtoFor,
  work,
} from "@/app/content";
import { indexedRobots, openGraphImage } from "@/app/head-directives";
import { breadcrumbs, graphHtml, service, webPage } from "@/app/structured-data";

/*
 * One ready-made product, on its own page. The markup lives here rather than in
 * a route, because `output: "export"` refuses a dynamic segment that generates
 * no paths, and the catalogue is empty until a product runs. Turning a product
 * on takes two edits, both listed in the Catalogue section of README.md: add it
 * to `products`, then add a route file that calls this component.
 */

export function productMetadata(product: Product): Metadata {
  return {
    title: product.name,
    description: product.promise,
    alternates: { canonical: `/${product.slug}` },
    robots: indexedRobots,
    openGraph: {
      ...openGraphImage,
      type: "website",
      url: `/${product.slug}`,
      siteName: brand,
      locale: "en_GB",
      title: `${product.name} | ${brand}`,
      description: product.promise,
    },
  };
}

export function ProductPage({ product }: { product: Product }) {
  /* The product's own nodes, built from its record, so adding a product to the
   * catalogue gives its page a graph with no further edit. */
  const page = {
    path: `/${product.slug}`,
    name: product.name,
    description: product.promise,
  };
  const graph = graphHtml([
    webPage(page),
    service({ ...page, prices: product.prices }),
    breadcrumbs(page),
  ]);

  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="hero field">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1>{product.name}</h1>
              <p className="lede">{product.lede}</p>
              <div className="actions">
                <a
                  className="button button--paper"
                  href={mailtoFor(product.subject)}
                >
                  Ask about this one
                </a>
                <a className="button button--ghost" href={callHref}>
                  Book a call
                </a>
              </div>
            </div>
            <RunRecord />
          </div>
        </section>

        <section className="section" id="stations" aria-labelledby="stations-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="stations-title">How a run works</h2>
              <p>{product.stationsIntro}</p>
            </div>
            <ol className="steps steps--plain">
              {product.stations.map((station) => (
                <li key={station.title}>
                  <div>
                    <h3>{station.title}</h3>
                    <p>{station.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="split">
              <p className="note note--boundary">{product.boundary}</p>
              <p className="note">{product.record}</p>
            </div>
          </div>
        </section>

        <section className="section work" id="work" aria-labelledby="work-title">
          <div className="wrap">
            <div className="section__head">
              <h2 id="work-title">
                What a run looks like <span className="tag">Example</span>
              </h2>
              <p>Days count from approved brief to a signed merge.</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Kind of company</th>
                  <th scope="col">Brief</th>
                  <th scope="col">Days</th>
                  <th scope="col">Result</th>
                </tr>
              </thead>
              <tbody>
                {work.map((run) => (
                  <tr key={run.brief}>
                    <td data-label="Client">{run.client}</td>
                    <td data-label="Brief">{run.brief}</td>
                    <td data-label="Days" className="num">
                      {run.days}
                    </td>
                    <td data-label="Result">{run.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          className="section work"
          id="prerequisites"
          aria-labelledby="prereq-title"
        >
          <div className="wrap">
            <div className="section__head">
              <h2 id="prereq-title">What it needs before it works</h2>
              <p>
                Deploying the code is quick. Connecting it to your company is
                the part nobody prints, so we print it. Live in {leadTime} once
                the rows marked You are in place.
              </p>
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Who</th>
                  <th scope="col">What</th>
                </tr>
              </thead>
              <tbody>
                {product.prerequisites.map((prerequisite) => (
                  <tr key={prerequisite.item}>
                    <td data-label="Who">{prerequisite.who}</td>
                    <td data-label="What">{prerequisite.item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ChannelsSection />

        <section
          className="section"
          id="pricing"
          aria-labelledby="product-price-title"
        >
          <div className="wrap">
            <div className="section__head">
              <h2 id="product-price-title">What it costs</h2>
              <p>
                {product.authority} The build price is a floor, because the work
                follows the number of systems your agent touches.
              </p>
            </div>
            <div className="plans">
              <div className="plan">
                <h3>{product.name}</h3>
                <p>{product.promise}</p>
                {product.prices.map((price) => (
                  <div className="plan__price" key={price.per}>
                    {price.amount} <small>{price.per}</small>
                  </div>
                ))}
                <a
                  className="button button--ink"
                  href={mailtoFor(product.subject)}
                >
                  Ask about this one
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph }}
      />
    </>
  );
}
