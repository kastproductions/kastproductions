/*
 * Whether every synthetic part of the site says it is an example.
 *
 * The agent console, the run records and the work table are made up. A reader
 * who takes one of them for a real client's run has been misled, so the Claims
 * section of README.md asks for a visible "Example" label on each. A page marks
 * a synthetic block with `data-example`, and this suite holds every such block
 * to carrying an "Example" badge. It also holds the synthetic words the content
 * module prints (the console's handle and the work table's briefs) to sitting
 * inside a marked block, so a block that loses its mark fails here too.
 */
import { expect, test } from "bun:test";
import {
  backlogPage,
  homePage,
  mention,
  productPage,
  products,
  slackPage,
  work,
} from "../src/app/content";
import { decodeEntities, everyPage, fileFor, mainOf } from "./export";

type Block = { text: string; badges: string[] };

/* The marked blocks in a page's main, and the main's text outside them. */
function readBlocks(html: string): { blocks: Block[]; outside: string } {
  const blocks: Block[] = [];
  const open: Block[] = [];
  let badge: string[] | null = null;
  let outside = "";

  new HTMLRewriter()
    .on("[data-example]", {
      element(element) {
        const block: Block = { text: "", badges: [] };
        blocks.push(block);
        open.push(block);
        element.onEndTag(() => {
          open.pop();
        });
      },
    })
    .on('[data-slot="badge"]', {
      element(element) {
        const text: string[] = [];
        badge = text;
        open.at(-1)?.badges.push("");
        const owner = open.at(-1);
        element.onEndTag(() => {
          if (owner) owner.badges[owner.badges.length - 1] = text.join("").trim();
          badge = null;
        });
      },
    })
    .on("*", {
      text(chunk) {
        badge?.push(chunk.text);
        if (open.length > 0) {
          for (const block of open) block.text += chunk.text;
        } else {
          outside += chunk.text;
        }
      },
    })
    .transform(html);

  return {
    blocks: blocks.map((block) => ({ ...block, text: decodeEntities(block.text) })),
    outside: decodeEntities(outside),
  };
}

/* The words the content module holds for the synthetic parts. */
const syntheticWords = [mention.handle, ...work.map((row) => row.brief)];

/* The pages that print a synthetic part: the console on the home page and the
 * Slack page, the run record and the work table on a product page, and the
 * example run on the backlog page. */
const pagesWithExamples = [
  homePage.path,
  slackPage.path,
  backlogPage.path,
  ...products.map((product) => productPage(product).path),
];

for (const path of pagesWithExamples) {
  test(`${path} marks its synthetic parts`, () => {
    const { blocks } = readBlocks(mainOf(fileFor(path)));
    expect(blocks.length).toBeGreaterThan(0);
  });
}

for (const file of everyPage) {
  test(`${file}: every synthetic part carries the Example label`, () => {
    const { blocks, outside } = readBlocks(mainOf(file));
    for (const block of blocks) {
      expect(block.badges.map((text) => text.toLowerCase())).toContain("example");
    }
    for (const words of syntheticWords) {
      expect(outside).not.toContain(words);
    }
  });
}
