import { ChannelsSection } from "@/components/channels-section";
import { RunRecord } from "@/components/run-record";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import type { Product } from "@/app/content";
import { callHref, leadTime, mailtoFor, productPage, work } from "@/app/content";
import { graphHtml, pageNodes } from "@/app/structured-data";

/*
 * One ready-made product, on its own page. The markup lives here rather than in
 * a route, because `output: "export"` refuses a dynamic segment that generates
 * no paths, and the catalogue is empty until a product runs. Turning a product
 * on takes two edits, both listed in the Catalogue section of README.md: add it
 * to `products`, then add a route file that calls this component and builds its
 * metadata from `productPage`, the way a written page builds its own.
 */

export function ProductPage({ product }: { product: Product }) {
  /* The product's own page record, and the nodes that follow from it, so
   * adding a product to the catalogue gives its page a graph with no further
   * edit. */
  const page = productPage(product);
  const graph = graphHtml(pageNodes(page, { prices: product.prices }));

  return (
    <>
      <SiteHeader route={page.path} />

      <main id="main">
        <section className="band band--flush hero">
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <h1>{product.name}</h1>
              <p className="lede">{product.lede}</p>
              <div className="actions">
                <a
                  className="btn btn--signal"
                  href={mailtoFor(product.subject)}
                >
                  Ask about this one
                </a>
                <a className="btn btn--line" href={callHref}>
                  Book a call
                </a>
              </div>
            </div>
            <RunRecord />
          </div>
        </section>

        <section className="band" id="stations" aria-labelledby="stations-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="stations-title">How a run works</h2>
              <p>{product.stationsIntro}</p>
            </div>
            <div className="unit__body">
              {/* Numbered, because a run really is four steps in order. */}
              <ol className="rows rows--seq">
                {product.stations.map((station) => (
                  <li key={station.title}>
                    <div className="row row--stack">
                      <span className="row__label">{station.title}</span>
                      <p>{station.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="note note--gate">{product.boundary}</p>
              <p className="note">{product.record}</p>
            </div>
          </div>
        </section>

        <section className="band" id="work" aria-labelledby="work-title">
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="work-title">What a run looks like</h2>
              <p>
                <span className="tag">Example</span> Days count from approved
                brief to a signed merge.
              </p>
            </div>
            <div className="unit__body">
              <table className="sheet-table">
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
          </div>
        </section>

        <section
          className="band"
          id="prerequisites"
          aria-labelledby="prereq-title"
        >
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="prereq-title">What it needs before it works</h2>
              <p>
                Deploying the code is quick. Connecting it to your company is
                the part nobody prints, so we print it. Live in {leadTime} once
                the rows marked You are in place.
              </p>
            </div>
            <div className="unit__body">
              <table className="sheet-table">
                <thead>
                  <tr>
                    <th scope="col">Who</th>
                    <th scope="col">What</th>
                  </tr>
                </thead>
                <tbody>
                  {product.prerequisites.map((prerequisite) => (
                    <tr key={prerequisite.item}>
                      <td data-label="Who" className="who">
                        {prerequisite.who}
                      </td>
                      <td data-label="What">{prerequisite.item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <ChannelsSection />

        <section
          className="band band--panel"
          id="pricing"
          aria-labelledby="product-price-title"
        >
          <div className="wrap unit">
            <div className="unit__head">
              <h2 id="product-price-title">What it costs</h2>
              <p>
                {product.authority} The build price is a floor, because the work
                follows the number of systems your agent touches.
              </p>
            </div>
            <div className="unit__body plans">
              <div className="plan">
                <h3>{product.name}</h3>
                <p>{product.promise}</p>
                <div className="plan__figures">
                  {product.prices.map((price) => (
                    <div className="plan__price" key={price.per}>
                      {price.amount} <span>{price.per}</span>
                    </div>
                  ))}
                </div>
                <a
                  className="btn btn--line"
                  href={mailtoFor(product.subject)}
                >
                  Ask about this one
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter route={page.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph }}
      />
    </>
  );
}
