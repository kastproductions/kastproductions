import { ChannelsSection } from "@/components/channels-section";
import { PlanCard, Plans } from "@/components/plan-card";
import { RunRecord } from "@/components/run-record";
import {
  Band,
  HeadNote,
  HeroActions,
  HeroSplit,
  HeroTitle,
  Lede,
  Note,
  Row,
  RowLabel,
  Rows,
  RowText,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { StopPoint } from "@/components/stop-point";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Product } from "@/app/content";
import {
  briefCta,
  leadTime,
  mailtoFor,
  productPage,
  work,
} from "@/app/content";
import { graphHtml, pageNodes } from "@/app/structured-data";

/*
 * One ready-made product, on its own page. The markup lives here rather than in
 * a route, because `output: "export"` refuses a dynamic segment that generates
 * no paths, and the catalogue holds only a product that runs today. A product
 * takes two edits, both listed in the Catalogue section of README.md: add it
 * to `products`, then add a route file that calls this component and builds its
 * metadata from `productPage`, the way a written page builds its own.
 *
 * The page reads in the order a buyer asks: how a run goes, in numbered
 * steps, and where it stops for a named person; what a run looks like, as a
 * labelled example; what a buyer needs first and who sets up each line; where
 * the team reaches it; and what it costs, with the lead time beside the price.
 */

/* Below md a sheet table reads as a stack of cards: the heading row goes, each
 * row is a block, and each cell prints its column name above its value from
 * its own `data-label`. */
const stackedTable = "max-md:block";
const stackedRow = "max-md:block max-md:py-3.5";
const stackedCell =
  "max-md:block max-md:py-0.5 max-md:pr-0 max-md:before:block max-md:before:font-heading max-md:before:text-label max-md:before:font-semibold max-md:before:text-faint max-md:before:content-[attr(data-label)]";

export function ProductPage({ product }: { product: Product }) {
  /* The product's own page record, and the nodes that follow from it, so
   * adding a product to the catalogue gives its page a graph with no further
   * edit. */
  const page = productPage(product);
  const graph = graphHtml(pageNodes(page, { prices: product.prices }));
  const brief = mailtoFor(product.subject);

  return (
    <>
      <SiteHeader route={page.path} />

      <main id="main">
        <Band aria-labelledby="hero-title" flush id="hero">
          <HeroSplit aside={<RunRecord />}>
            <HeroTitle id="hero-title">{product.name}</HeroTitle>
            <Lede>{product.lede}</Lede>
            <HeroActions href={brief} />
          </HeroSplit>
        </Band>

        <Band aria-labelledby="steps-title" id="steps">
          <Unit>
            <UnitHead title="How a run goes" titleId="steps-title">
              <HeadNote>{product.stationsIntro}</HeadNote>
            </UnitHead>
            <UnitBody>
              {/* Numbered, because a run really is four steps in order. */}
              <Rows sequence>
                {product.stations.map((station) => (
                  <li key={station.title}>
                    <Row stack>
                      <RowLabel>{station.title}</RowLabel>
                      <RowText>{station.body}</RowText>
                    </Row>
                  </li>
                ))}
              </Rows>
              <StopPoint titleId="stop-title">
                {product.authority} {product.boundary}
              </StopPoint>
              <Note>{product.record}</Note>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="work-title" data-example id="work" tone="panel">
          <Unit>
            <UnitHead title="What a run looks like" titleId="work-title">
              <HeadNote>
                <Badge className="align-middle" variant="signal">
                  Example
                </Badge>{" "}
                Days count from approved brief to a signed merge.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Table className={stackedTable}>
                <TableHeader className="max-md:hidden">
                  <TableRow>
                    <TableHead scope="col">Kind of company</TableHead>
                    <TableHead scope="col">Brief</TableHead>
                    <TableHead scope="col">Days</TableHead>
                    <TableHead scope="col">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={stackedTable}>
                  {work.map((run) => (
                    <TableRow className={stackedRow} key={run.brief}>
                      <TableCell className={stackedCell} data-label="Kind of company">
                        {run.client}
                      </TableCell>
                      <TableCell className={stackedCell} data-label="Brief">
                        {run.brief}
                      </TableCell>
                      <TableCell
                        className={cn(
                          stackedCell,
                          "font-mono text-small whitespace-nowrap",
                        )}
                        data-label="Days"
                      >
                        {run.days}
                      </TableCell>
                      <TableCell className={stackedCell} data-label="Result">
                        {run.result}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </UnitBody>
          </Unit>
        </Band>

        <Band aria-labelledby="systems-title" id="systems">
          <Unit>
            <UnitHead title="What you need first" titleId="systems-title">
              <HeadNote>
                It works in {product.systems}. Deploying the code is quick.
                Connecting it to your company is the part nobody prints, so we
                print it, with who sets up each line. Live in {leadTime} once
                the lines marked You are in place.
              </HeadNote>
            </UnitHead>
            <UnitBody>
              <Table className={stackedTable}>
                <TableHeader className="max-md:hidden">
                  <TableRow>
                    <TableHead scope="col">Who</TableHead>
                    <TableHead scope="col">What</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={stackedTable}>
                  {product.prerequisites.map((prerequisite) => (
                    <TableRow className={stackedRow} key={prerequisite.item}>
                      <TableCell
                        className={cn(
                          stackedCell,
                          "w-16 font-heading first:font-semibold max-md:w-auto",
                        )}
                        data-label="Who"
                      >
                        {prerequisite.who}
                      </TableCell>
                      <TableCell className={stackedCell} data-label="What">
                        {prerequisite.item}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </UnitBody>
          </Unit>
        </Band>

        <ChannelsSection />

        <Band aria-labelledby="product-price-title" id="pricing" tone="panel">
          <Unit>
            <UnitHead title="What it costs" titleId="product-price-title">
              <HeadNote>
                The build price is a floor, because the work follows the number
                of systems your agent touches. The monthly price pays for the
                eval suite on every change, the fixes and a monthly report.
              </HeadNote>
            </UnitHead>
            <Plans>
              <PlanCard
                title={product.name}
                body={product.promise}
                prices={product.prices}
                href={brief}
                cta={briefCta}
              />
              <Note>
                Live in {leadTime} once the accounts marked You are in place.
              </Note>
            </Plans>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={page.path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graph }}
      />
    </>
  );
}
