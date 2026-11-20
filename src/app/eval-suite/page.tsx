import {
  Band,
  HeadNote,
  HeroFrame,
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
 * is a rule the home page already states: the answer, the authority, the
 * gate and the spend cap, in a buyer's words. */
const covers = [
  "The result. What a correct result for the task contains, and what it must not contain.",
  "What it may touch. Which systems the agent reads, which it writes to, and which it never touches.",
  "Where it stops. Before anything that reaches someone outside your company (a sent email, a published page, a posted message, a payment), the agent stops and waits for a named person.",
  "What it may spend. Each session has a spend cap, a ceiling on model cost that we agree with you. A session that reaches it stops and asks a person, or stops and reports when nobody is there to ask.",
];

export default function EvalSuite() {
  return (
    <>
      <SiteHeader route={evalSuitePage.path} />

      <main id="main">
        <Band flush>
          <HeroFrame>
            <HeroTitle>How we know your agent is right</HeroTitle>
            <Lede wide>
              An eval suite is a written test of what correct means for your
              agent: a list of tasks, and what a correct result for each one
              contains. We write it before we build, and it runs on every
              change we make. This page also says what we do when correct
              cannot be written down.
            </Lede>
          </HeroFrame>
        </Band>

        <Band id="definition" aria-labelledby="definition-title">
          <Unit>
            <UnitHead title="What an eval suite is" titleId="definition-title">
              <HeadNote>One agent, one suite. We write it before the agent is built, and you can read it.</HeadNote>
            </UnitHead>
            <UnitBody>
              <Prose>
                Your agent does one kind of work, on its own, in your own
                systems. Before we build it, we write down what a correct piece
                of that work looks like. That document is the eval suite. It
                lists the tasks the agent must handle: for each one, the
                message that starts it and what the result must contain.
              </Prose>
              <Prose>
                Correct covers more than the words of the result. It also
                covers how the agent got there, so the suite checks four
                things.
              </Prose>
              {/* The four readings, each behind a short black rule. */}
              <ul className="my-4 grid max-w-(--measure) gap-2 text-body text-prose [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:top-[0.7em] [&>li]:before:left-0 [&>li]:before:h-px [&>li]:before:w-2 [&>li]:before:bg-foreground">
                {covers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Prose>
                The suite is part of your agent&rsquo;s code, so it sits in
                your repository from the first commit, and you can read it.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band id="every-change" aria-labelledby="change-title" tone="panel">
          <Unit>
            <UnitHead title="How it runs on every change" titleId="change-title">
              <HeadNote>A change that fails the suite does not ship.</HeadNote>
            </UnitHead>
            <UnitBody>
              <Prose>
                An agent keeps changing after it is live. The model under it
                changes, the framework it is built on changes, the systems it
                touches change, and you ask for new work. Each of those is a
                change to your agent, and we make it in your agent&rsquo;s own
                repository.
              </Prose>
              <Prose>
                The suite runs on every change. A change that passes is
                deployed. A change that fails stops there, and the failing task
                shows what the agent got wrong. That is why we write the suite
                before the build: a rule that exists only in someone&rsquo;s
                head cannot stop a change.
              </Prose>
              <Prose>
                When what you want changes what correct means, we change the
                suite first, and the agent follows it. The monthly report says
                what we changed, and you can check it against the suite.
              </Prose>
            </UnitBody>
          </Unit>
        </Band>

        <Band id="unwritten" aria-labelledby="unwritten-title">
          <Unit>
            <UnitHead title="When correct cannot be written down" titleId="unwritten-title">
              <HeadNote>Some work has no written answer. We tell you before we build.</HeadNote>
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
                An agent tested on work like that is tested on nothing. So when
                we cannot write down what correct means for a piece of work, we
                tell you before we build, and the agent does not decide that
                work on its own.
              </Prose>
              <Note gate>
                That work waits for a named person. The agent does the part we
                can test, then stops. A named person at your company decides,
                and the approval rule we write names that person.
              </Note>
              <Prose>
                Anything that reaches someone outside your company waits for a
                named person, whatever the suite says. Work we cannot test
                waits at the same point, for one more reason.
              </Prose>
              <Prose>
                We will not build that work anyway and call the agent
                autonomous. A promise of an agent that decides everything on
                its own is a promise of a test you have not been shown.
              </Prose>
              <PullLink className="mt-6 inline-block" href={`${homePage.path}#safety`}>
                The other three rules that make an agent safe to run
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
