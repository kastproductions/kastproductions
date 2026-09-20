/*
 * What the export tells the tracker. Two things have to be true of every page
 * the build writes, and neither is visible in the source of the component:
 * the page loads the tracker from this deployment, and the page counts a click
 * on a call to action.
 *
 * The site carried a component that rendered nothing unless a build variable
 * was set, the deployment never set it, and production measured nothing for
 * months. The fault was invisible in the source and plain in the export, so
 * these assertions read the export.
 *
 * The click is tested by running the code the page ships, in a stand-in that
 * offers only what that code touches. A page carries other inline scripts, the
 * framework's own among them; one that asks for more than the stand-in offers
 * fails and is skipped, which leaves the wiring under test the only thing that
 * can answer a click.
 */
import { expect, test } from "bun:test";
import { indexableRoutes, notFoundFiles, readExport, scriptTags } from "./export";

/* The path Vercel serves the tracker from once Web Analytics is on. */
const tracker = "/_vercel/insights/script.js";

/*
 * Every page a reader can land on: the routes we ask to be indexed, and the
 * ones a wrong address lands on. A visit counts wherever it arrives.
 */
const pages = [...indexableRoutes.map((route) => route.file), ...notFoundFiles];

/* What the tracker's queue holds: the call name, then its payload. */
type Call = [string, { name: string; data?: Record<string, string> }];

/*
 * A clicked element, as much of one as the shipped listener touches: it asks
 * the target for the nearest link of a given href prefix, then reads that
 * link's href. The prefix comes out of the selector the listener passes, so
 * this stand-in answers truthfully whichever prefix the listener asks for.
 */
function clickTarget(href: string) {
  const node = {
    getAttribute: (name: string) => (name === "href" ? href : null),
    closest: (selector: string) => {
      const asked = /^a\[href\^="(.+)"\]$/.exec(selector);
      if (!asked) {
        throw new Error(`the listener asked for ${selector}, which this stand-in cannot answer.`);
      }
      return href.startsWith(asked[1]) ? node : null;
    },
  };
  return node;
}

/*
 * Runs the inline code a page ships and hands back a way to click and a way to
 * read the tracker's queue. The stand-in reports one path for every page,
 * because the event reads whatever path the browser is on and the door is what
 * these tests are about.
 */
function shippedPage(document: string) {
  const win: { va?: (...args: unknown[]) => void; vaq?: Call[] } = {};
  const clicks: ((event: { target: unknown }) => void)[] = [];
  const addEventListener = (type: string, listener: (event: { target: unknown }) => void) => {
    if (type === "click") clicks.push(listener);
  };

  for (const { attributes, body } of scriptTags(document)) {
    /* A tag with a `src` runs a file, and a `type` marks data rather than
     * code: the JSON-LD graph sits in a script tag too. */
    if (attributes.src !== undefined || attributes.type !== undefined || !body.trim()) continue;
    try {
      new Function("window", "addEventListener", "location", body)(win, addEventListener, {
        pathname: "/",
      });
    } catch {
      /* A script that wants a global this stand-in does not offer. */
    }
  }

  return {
    click(href: string) {
      for (const listener of clicks) listener({ target: clickTarget(href) });
    },
    queue: () => (win.vaq ?? []).map((call) => [...call] as Call),
  };
}

for (const file of pages) {
  test(`${file} loads the tracker from this deployment`, () => {
    const loaded = scriptTags(readExport(file))
      .map(({ attributes }) => attributes)
      .filter((attributes) => attributes.src !== undefined);

    const trackers = loaded.filter((attributes) => attributes.src === tracker);
    /* None, and the page measures nothing. Two, and one visit counts twice. */
    expect(trackers).toHaveLength(1);
    /* Deferred, so the tracker waits for the whole page to be parsed and
     * competes with nothing a reader is waiting to see. `defer` takes no
     * value, so carrying the attribute at all is the whole of it. */
    expect("defer" in trackers[0]).toBe(true);

    /* A tracker on somebody else's host reads our visitors on their terms,
     * and is the reason this site would owe a consent banner. */
    for (const { src } of loaded) {
      expect(src.startsWith("/")).toBe(true);
    }
  });

  test(`${file} counts a click on a call to action, naming the door`, () => {
    const page = shippedPage(readExport(file));

    page.click("mailto:hello@kastproductions.com?subject=New%20brief");

    const queued = page.queue();
    expect(queued).toHaveLength(1);
    const [name, payload] = queued[0];
    expect(name).toBe("event");
    /* The subject of the mail is how this site marks the door a reader came
     * through, so the event has to carry it: an event that only counts clicks
     * cannot say which door is working. */
    expect(payload.data?.door).toBe("New brief");
  });

  test(`${file} counts a click on a call to action with no subject`, () => {
    const page = shippedPage(readExport(file));

    page.click("mailto:hello@kastproductions.com");

    expect(page.queue()).toHaveLength(1);
    expect(page.queue()[0][1].data?.door).toBe("address");
  });

  test(`${file} counts nothing when the click is not a call to action`, () => {
    const page = shippedPage(readExport(file));

    /* Every other link on the page: the nav, the footer, a client's website.
     * Counting one of these as a conversion would make the number useless. */
    page.click("https://flueframework.com/docs/ecosystem/");
    page.click("/custom");
    page.click("#pricing");

    expect(page.queue()).toEqual([]);
  });
}
