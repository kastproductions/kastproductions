import {
  Band,
  HeadNote,
  HeroCopy,
  HeroTitle,
  Lede,
  Note,
  Prose,
  PullLink,
  Unit,
  UnitBody,
  UnitHead,
} from "@/components/section";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { evalSuitePage, homePage } from "../content";
import { pageMetadata } from "../head-directives";
import { graphHtml, pageNodes } from "../structured-data";

export const metadata = pageMetadata(evalSuitePage);

/* The page and the way here from the home page. It explains one part of the
 * mechanism and sells nothing, so it states no offer. */
const graph = graphHtml(pageNodes(evalSuitePage));

/* What the definition of correct covers. Four readings, and every one of them
 * is a line the home page already states: the answer, the authority, the
 * gate and the spend cap. */
const covers = [
  "The answer. What a correct answer to this message contains, and what it must not contain.",
  "The authority. Which systems the agent reads, which it writes to, and which it never touches.",
  "The gate. Where the agent stops and waits for a named person, which is before every outward action: a sent email, a published page, a posted message, a payment.",
  "The cap. What the agent does when a session reaches its spend cap: it stops and asks, or stops and reports when there is nobody to ask.",
];

export default function EvalSuite() {
  return (
    <>
      <SiteHeader route={evalSuitePage.path} />

      <main id="main">
        <Band flush>
          <HeroCopy className="wrap">
            <HeroTitle>How we know your agent is right</HeroTitle>
            <Lede wide>
              An eval suite is the written definition of correct for one
              standing agent. This page says what is in it, how it runs on
              every change we make, and what we do when correct cannot be
              written down for a piece of work.
            </Lede>
          </HeroCopy>
        </Band>

        <Band id="definition" aria-labelledby="definition-title">
          <Unit>
            <UnitHead title="What an eval suite is" titleId="definition-title">
              <HeadNote>One agent, one suite. It is written before the agent is built, and you can read it.</HeadNote>
            </UnitHead>
            <UnitBody>
              <Prose>
                A standing agent does one kind of work, unattended, in your own
                systems. Before we build it, we write down what a correct piece
                of that work looks like. That document is the eval suite. It is
                a list of sessions the agent must handle: for each one, the
                message that starts it and what the answer that ends it must
                contain.
              </Prose>
              <Prose>
                The definition covers more than the words in the answer.
                Correct, for a standing agent, is the answer and the way it got
                there, so it covers four things.
              </Prose>
              {/* The four readings, each behind a short black rule. */}
              <ul className="my-4 grid max-w-(--measure) gap-2 text-base text-prose [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:top-[0.7em] [&>li]:before:left-0 [&>li]:before:h-px [&>li]:before:w-2 [&>li]:before:bg-foreground">
                {covers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Prose>
                The suite is yours to read. Your accounts, your keys and your
                code are yours from the first commit, and the suite is part of
                that code.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band id="every-change" aria-labelledby="change-title">
          <Unit>
            <UnitHead title="How it runs on every change" titleId="change-title">
              <HeadNote>A change that fails the suite does not ship.</HeadNote>
            </UnitHead>
            <UnitBody>
              <Prose>
                An agent that runs unattended keeps changing after it is live.
                The model under it moves, the framework it is built on moves,
                the systems it touches change shape, and you ask for something
                new. Every one of those is a change to your agent, and we make
                it inside your agent&rsquo;s own repository and deployment.
              </Prose>
              <Prose>
                The suite runs on every change. A change the suite passes is
                approved and deployed. A change the suite fails stops there: it
                is not deployed, and the failing entry names the piece of work
                the agent got wrong. That is why the definition is written down
                before the build. A rule that exists only in someone&rsquo;s
                head cannot stop anything.
              </Prose>
              <Prose>
                When what you want changes what correct means, the suite
                changes first and the agent follows it. The monthly report says
                what we changed, and the suite is what you check that against.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band id="unwritten" aria-labelledby="unwritten-title">
          <Unit>
            <UnitHead title="When correct cannot be written down" titleId="unwritten-title">
              <HeadNote>Some work has no written answer. We say so before we build.</HeadNote>
            </UnitHead>
            <UnitBody>
              <Prose>
                Some work has a correct answer that nobody can write down in
                advance. Whether a reply to an angry customer has the right
                tone. Whether a refund is fair. Which of two ways to do it when
                both fit the brief. A person can judge each of these when it
                comes up, and no document can settle it before it does.
              </Prose>
              <Prose>
                An agent judged on work like that is judged on nothing. So when
                we cannot write down what correct means for a piece of work, we
                say so before we build it, and that work does not go to the
                agent&rsquo;s own judgement.
              </Prose>
              <Note gate>
                That work goes behind an approval gate and to a named person.
                The agent does the part that can be defined and stops at the
                gate. A named person at your company decides. The approval
                policy we write names that person.
              </Note>
              <Prose>
                An outward action is behind a gate whatever the suite says. A
                sent email, a published page, a posted message or a payment
                reaches someone outside your company, and only a named person
                at your company approves one. The gate for unwritten work is
                the same gate, used for one more reason.
              </Prose>
              <Prose>
                What we do not do is build that work anyway and call the agent
                autonomous. A page that promises an agent that decides
                everything on its own is promising a definition of correct it
                has not shown you.
              </Prose>
              <PullLink href={`${homePage.path}#mechanism`}>
                The other four parts of how we keep it right
              </PullLink>
            </UnitBody>
          </Unit>
        </Band>
      </main>

      <SiteFooter route={evalSuitePage.path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph }} />
    </>
  );
}
