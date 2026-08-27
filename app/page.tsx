/*
 * ==========================================================================
 * IMPECCABLE DIRECTION CONTRACT — seed key kastprod-redesign-01
 * ==========================================================================
 * THESIS: Speed and judgment are ganged on this desk, not traded against each
 *   other. The page is the instrument that proves it. Refuses the agency
 *   default: dark hero, bento capability cards, logo marquee, one neon accent.
 * OWN-WORLD: Anodised graphite chassis, machined bevels, ivory meter faces and
 *   printed label tape, walnut end cheek, brass screws. Anybody condensed as
 *   silkscreen legend, Archivo as body. Colour is hardware: amber = signal
 *   present, green = routed, red = past 0 dB and the one committing action.
 * STORY: A founder recognises a real instrument, reads 17 patched clients and
 *   six named references, and sends one email.
 * FIRST VIEWPORT: The master section. Two large VU meters centre stage,
 *   labelled SPEED and JUDGMENT, with a lit LINK lamp between them; four
 *   corner readouts on the frame; the claim set below in condensed badging;
 *   the red commit button at the bottom of the module.
 * FORM: Mixing console / control surface — candidate 5 of 7 on the grounded
 *   list, assigned by concept-seed, seed key kastprod-redesign-01.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the
 *   finish review, the verdict, DESIGN.md, and every shipping raster carrying
 *   its provenance.
 *
 * Signal flow is the page order, because that is how a desk is read:
 *   MASTER (thesis) → SOURCES (clients) → CHANNELS (services)
 *   → OUTBOARD (process) → RETURNS (references) → OUT (contact)
 * ==========================================================================
 */

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  Fader,
  Jack,
  Knob,
  PanelLink,
  RackEar,
  Rail,
  Screw,
  Tape,
} from "@/components/desk/hardware";
import { RecordButton } from "@/components/desk/record-button";
import { SiteFooter } from "@/components/desk/site-footer";
import { VuMeter } from "@/components/desk/vu-meter";
import { SiteHeader } from "@/components/site-header";
import { EMAIL, EMAIL_HREF } from "@/lib/nav";
import { cn } from "@/lib/utils";

const shell = "mx-auto w-full max-w-[86rem] px-4 sm:px-6 md:px-10";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main
        id="top"
        tabIndex={-1}
        className="desk-frame outline-none"
      >
        <Master />
        <Sources />
        <Channels />
        <Outboard />
        <Returns />
        <Out />
      </main>
      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* MASTER — the thesis                                                 */
/* ------------------------------------------------------------------ */

/**
 * The master section: the thesis, and the whole of it inside the first viewport.
 *
 * The vertical rhythm here is tuned, not chosen. FIRST VIEWPORT promises the
 * movements, the LINK lamp, the readout rails, the claim and the red commit
 * button all above the fold, and a 1440x900 laptop is the machine this visitor
 * is on. Each movement is capped at 28rem and the paddings are cut so the
 * button lands inside 900px; loosen any of them and the promise breaks.
 */
function Master() {
  return (
    <section
      aria-labelledby="master-heading"
      className={cn(shell, "py-4")}
    >
      <div className="chassis-face plate-settle rounded-sm">
        <Rail
          left="Master section"
          right="Vilnius LT · 54.69°N 25.28°E"
          className="border-b border-[#191817]"
        />

        {/* The instrument. Two movements, ganged, with the link engaged. The
         * channel legend and the movement's specification are engraved on the
         * panel under each face, where a console puts them and where the needle
         * cannot strike through them. */}
        <div className="flex items-start justify-center gap-3 px-3 pt-6 sm:gap-6 sm:px-6 md:gap-10 md:px-10 md:pt-8">
          <MasterMovement
            channel="l"
            label="Speed"
            spec="Integration 300ms"
          />

          <div className="flex shrink-0 flex-col items-center gap-2.5 pt-8 md:gap-3 md:pt-12">
            <span
              aria-hidden
              className="lamp-warm grid size-5 place-items-center rounded-full bg-[#101a14] shadow-[inset_0_2px_3px_rgba(0,0,0,0.7)] md:size-6"
            >
              <span className="block size-2.5 rounded-full bg-cue shadow-[0_0_8px_1px_rgba(88,176,138,0.5)] md:size-3" />
            </span>
            <span className="legend-sm engraved text-silk [writing-mode:vertical-rl] md:[writing-mode:horizontal-tb]">
              Link
            </span>
            <span aria-hidden className="hidden h-8 w-px bg-rail md:block" />
          </div>

          <MasterMovement
            channel="r"
            label="Judgment"
            spec="Overshoot 1.5%"
          />
        </div>

        {/* The claim, silkscreened on the panel below the movements. */}
        <div className="px-4 pt-8 pb-6 text-center md:px-10 md:pt-6 md:pb-5">
          <h1
            id="master-heading"
            className="badge-type mx-auto max-w-[22ch] text-balance text-silk"
            style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.2rem)" }}
          >
            We design, build and ship AI-native products
          </h1>
          <p className="mx-auto mt-5 max-w-[68ch] text-pretty text-[15px] leading-relaxed text-silk-dim">
            Senior judgment at the speed of AI. The two are linked: neither rises
            without the other. We put AI to work across design, engineering and
            testing: websites, APIs and AI features, shipped faster without
            trading away quality.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <RecordButton href={EMAIL_HREF} size="lg" />
            <PanelLink href="#clients">
              See who is patched in
              <ArrowDown className="size-4" aria-hidden />
            </PanelLink>
          </div>
        </div>

        <Rail
          left="17 clients patched · 3 continents"
          right="Available for new work"
          className="border-t border-[#3a3733]"
        />
      </div>
    </section>
  );
}

/** One movement plus the two legends cut into the panel beneath it. */
function MasterMovement({
  channel,
  label,
  spec,
}: {
  channel: "l" | "r";
  label: string;
  spec: string;
}) {
  return (
    <div className="flex w-full max-w-[25rem] flex-col items-center gap-2.5 md:gap-3">
      <VuMeter channel={channel} label={label} />
      <span
        className="engraved text-silk"
        style={{
          fontFamily: "var(--font-anybody), sans-serif",
          fontVariationSettings: '"wdth" 80, "wght" 650',
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          fontSize: "clamp(0.7rem, 1.4vw, 1rem)",
        }}
      >
        {label}
      </span>
      <span className="legend-sm engraved hidden text-silk-dim sm:block">
        {spec}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SOURCES — the patchbay                                              */
/* ------------------------------------------------------------------ */

/**
 * The seventeen sources. Names, not marks.
 *
 * The supplied logo files are opaque 200x200 rasters with backgrounds baked in
 * — nine dark, eight light — so no single card colour holds them together, and
 * a wall of mismatched tiles would say less than the names do. A patchbay is
 * labelled with printed tape, and "Volkswagen Financial Services" set in the
 * studio's own condensed caps is more recognisable than a 200px mark anyway.
 * Restore the marks here if transparent, single-weight versions ever arrive.
 */
const clients = [
  { name: "Trustpilot", companyUrl: "https://www.trustpilot.com/" },
  { name: "Volkswagen Financial Services", companyUrl: "https://www.vwfs.com/" },
  { name: "An Post", companyUrl: "https://www.anpost.com/" },
  { name: "Irish Life", companyUrl: "https://www.irishlife.ie/" },
  { name: "Rocket Software", companyUrl: "https://www.rocketsoftware.com/" },
  { name: "Toptal", companyUrl: "https://www.toptal.com/" },
  { name: "Zipmex", companyUrl: "https://zipmex.com/" },
  { name: "Bidfood", companyUrl: "https://www.bidfood.nl/" },
  { name: "Macaw", companyUrl: "https://www.macaw.net/" },
  { name: "RNHB", companyUrl: "https://www.rnhb.nl/" },
  { name: "Bound Interactive", companyUrl: "https://boundinteractive.com/" },
  { name: "Central Innovation", companyUrl: "https://centralinnovation.com/" },
  { name: "All Human", companyUrl: "https://allhuman.com/" },
  { name: "Netfront", companyUrl: "https://netfront.com.au/" },
  { name: "PEXX", companyUrl: "https://pexx.com/" },
  { name: "Apart Tech", companyUrl: "https://www.apart.tech/" },
  { name: "visionI", companyUrl: "https://www.visioni.com.au/" },
];

/* Three tape strips across the bay, the way a bay is actually labelled. */
const BAY_ROWS = [clients.slice(0, 6), clients.slice(6, 12), clients.slice(12)];

function Sources() {
  return (
    <section id="clients" className={cn(shell, "under-bridge py-16 md:py-24")}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <h2
            className="badge-type max-w-[16ch] text-balance text-silk"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.3rem)" }}
          >
            In good company
          </h2>
          <p className="mt-5 max-w-[58ch] text-pretty text-[15px] leading-relaxed text-silk-dim">
            From venture-backed startups to public institutions across three
            continents. Teams that want to move fast without shipping AI slop.
          </p>
        </div>
        <RecordButton href={EMAIL_HREF} label="Become one" className="self-start md:self-auto" />
      </div>

      <div className="panel-recessed mt-10 rounded-sm p-3 md:mt-14 md:p-5">
        <div className="flex items-center justify-between gap-4 px-1 pb-3.5">
          <span className="legend-sm text-silk-dim">Bay A · sources</span>
          <span className="legend-sm text-silk-dim" data-numerals="tabular">
            17 patched
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {BAY_ROWS.map((row, rowIndex) => (
            <ul
              key={rowIndex}
              className="tape flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[2px] px-3 py-3 md:gap-x-9 md:px-5 md:py-4"
            >
              {row.map((client) => (
                <li key={client.name}>
                  <a
                    href={client.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5"
                  >
                    <Jack className="size-4 shrink-0 md:size-5" />
                    <span
                      className="text-ink-dim transition-colors duration-300 group-hover:text-ink"
                      style={{
                        fontFamily: "var(--font-anybody), sans-serif",
                        fontVariationSettings: '"wdth" 82, "wght" 650',
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontSize: "clamp(0.75rem, 1.1vw, 0.9375rem)",
                      }}
                    >
                      {client.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <div className="flex items-center justify-between px-1 pt-4">
          <Screw />
          <span className="legend-sm text-silk-dim">
            Normalled to master bus
          </span>
          <Screw />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CHANNELS — the fader bank                                           */
/* ------------------------------------------------------------------ */

const services = [
  {
    name: "AI integration",
    category: "AI",
    blurb:
      "LLM features, RAG and agents wired into real products, shipped with evals and guardrails.",
    featured: true,
  },
  {
    name: "Full-stack POC",
    category: "POC",
    blurb:
      "Idea to a working full-stack prototype in weeks. Proof before you commit.",
    featured: true,
  },
  {
    name: "UI/UX design",
    category: "Design",
    blurb:
      "Flows, wireframes and polished interfaces, designed in the browser against real content.",
  },
  {
    name: "Website development",
    category: "Web",
    blurb:
      "Marketing sites and web apps in Next.js: fast, accessible and easy to maintain.",
  },
  {
    name: "API development",
    category: "Backend",
    blurb: "Typed REST and GraphQL backends that frontends love to consume.",
  },
  {
    name: "Mobile development",
    category: "Mobile",
    blurb: "React Native apps that share code and ship to both stores.",
  },
  {
    name: "End-to-end testing",
    category: "Quality",
    blurb: "Playwright suites that catch regressions before your users do.",
  },
];

function Channels() {
  return (
    <section id="services" className={cn(shell, "under-bridge py-16 md:py-24")}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <h2
            className="badge-type max-w-[18ch] text-balance text-silk"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.3rem)" }}
          >
            What we take on
          </h2>
          <p className="mt-5 max-w-[58ch] text-pretty text-[15px] leading-relaxed text-silk-dim">
            Design, engineering and AI: from product interfaces to rapid
            full-stack proofs of concept. Two channels run hot most of the
            year. The amber lamp marks them.
          </p>
        </div>
        <span className="legend-sm shrink-0 text-silk-dim">
          Bank B · channels 1–8
        </span>
      </div>

      {/* One chassis, scored into strips by a hairline rail — not eight cards.
       * The strips share a single panel face and are divided the way a fader
       * bank is divided; `gap-px` over the rail colour is the score line. Four
       * across only from `xl`, because at 1024 the titles wrap to three lines
       * and crush each strip's copy against its fader. */}
      <ul className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-[#1b1918] shadow-[inset_0_1px_0_rgba(61,57,54,0.55),inset_0_-1px_0_#141312] sm:grid-cols-2 md:mt-14 xl:grid-cols-4">
        {services.map((service, index) => (
          <li key={service.name} className="flex">
            <a
              href={EMAIL_HREF}
              className="group flex flex-1 gap-4 bg-panel p-4 md:gap-5 md:p-5"
            >
              <Fader />

              <div className="flex min-w-0 flex-1 flex-col gap-3.5">
                <div className="flex items-start justify-between gap-3">
                  {/* Two lines are reserved whether the title needs them or
                   * not. `Website development` and `Mobile development` wrap
                   * while their row-mates do not, and a bank whose copy blocks
                   * start at different heights is not a bank. */}
                  <h3
                    className="badge-type min-h-[1.84em] text-[21px] text-silk transition-colors duration-300 group-hover:text-face"
                    style={{ letterSpacing: "-0.015em" }}
                  >
                    {service.name}
                  </h3>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1 size-2 shrink-0 rounded-full",
                      service.featured
                        ? "bg-signal shadow-[0_0_7px_1px_rgba(232,160,32,0.45)]"
                        : "bg-rail",
                    )}
                  />
                </div>

                <p className="text-[13.5px] leading-relaxed text-silk-dim">
                  {service.blurb}
                </p>

                <span className="mt-auto flex items-center gap-2 pt-2">
                  <span className="legend-sm text-silk-dim transition-colors duration-300 group-hover:text-signal">
                    Enquire
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-silk-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                  />
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className="legend-sm shrink-0 text-silk-dim"
                    data-numerals="tabular"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Tape className="flex-1">{service.category}</Tape>
                </div>
              </div>
            </a>
          </li>
        ))}

        {/* Channel 8 is a blanking plate: the bank is not full, and that is the
         * most useful thing the panel can say. A real blank is plain metal held
         * on by four screws, so it is drawn plain — a hatched fill would be a
         * texture standing in for a surface.
         *
         * The inner column mirrors a strip's exactly, same padding and same
         * `gap-3.5`, because on one uninterrupted metal face a baseline that
         * breaks across a shared row reads louder than it would across card
         * gutters. `justify-between` here was doing precisely that. */}
        <li className="flex">
          <a
            href={EMAIL_HREF}
            className="group relative flex flex-1 bg-[#1e1c1a] p-4 shadow-[inset_0_0_18px_rgba(0,0,0,0.35)] md:p-5"
          >
            <Screw className="absolute top-2.5 left-2.5" />
            <Screw className="absolute top-2.5 right-2.5" />
            <Screw className="absolute bottom-2.5 left-2.5" />
            <Screw className="absolute bottom-2.5 right-2.5" />

            <div className="flex min-w-0 flex-1 flex-col gap-3.5 px-4">
              <h3
                className="badge-type min-h-[1.84em] text-[21px] text-silk transition-colors duration-300 group-hover:text-face"
                style={{ letterSpacing: "-0.015em" }}
              >
                Slot free
              </h3>

              <p className="text-[13.5px] leading-relaxed text-silk-dim">
                Something not on this bank? The blanking plate comes off. Tell us
                what you are building.
              </p>

              <span className="mt-auto flex items-center gap-2 pt-2">
                <span className="legend-sm text-silk-dim transition-colors duration-300 group-hover:text-signal">
                  Write to us
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 text-silk-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                />
              </span>
            </div>
          </a>
        </li>
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* OUTBOARD — how the work is actually processed                       */
/* ------------------------------------------------------------------ */

const units = [
  {
    model: "KP-01",
    title: "Design",
    description:
      "Interfaces with a point of view, explored and refined with AI so we cover more ground in less time.",
    controls: [
      { label: "Systems", position: 0.72, cap: "alloy" as const },
      { label: "Prototypes", position: 0.55, cap: "signal" as const },
      { label: "UI", position: 0.84, cap: "cue" as const },
    ],
  },
  {
    model: "KP-02",
    title: "Engineering",
    description:
      "Production-grade React, Next.js and TypeScript. AI-assisted, human-reviewed, built to ship and scale.",
    controls: [
      { label: "React", position: 0.86, cap: "cue" as const },
      { label: "Next.js", position: 0.78, cap: "alloy" as const },
      { label: "TypeScript", position: 0.9, cap: "signal" as const },
    ],
  },
  {
    model: "KP-03",
    title: "AI",
    description:
      "LLM features, RAG and agents designed into the product from day one, with evals and guardrails instead of guesswork.",
    controls: [
      { label: "LLMs", position: 0.8, cap: "signal" as const },
      { label: "RAG", position: 0.64, cap: "alloy" as const },
      { label: "Agents", position: 0.71, cap: "cue" as const },
    ],
  },
];

function Outboard() {
  return (
    <section id="process" className={cn(shell, "under-bridge py-16 md:py-24")}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <h2
          className="badge-type max-w-[24ch] text-balance text-silk"
          style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.3rem)" }}
        >
          The judgment of a senior team, at the speed of AI
        </h2>
        <span className="legend-sm shrink-0 text-silk-dim">
          Rack C · inserts
        </span>
      </div>

      <div className="mt-10 flex flex-col gap-3 md:mt-14">
        {units.map((unit) => (
          <article key={unit.model} className="panel-raised flex rounded-sm">
            <RackEar />
            <div className="flex min-w-0 flex-1 flex-col gap-6 px-4 py-5 md:flex-row md:items-center md:gap-10 md:px-8 md:py-7">
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <h3
                    className="badge-type text-[21px] text-silk md:text-[30px]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {unit.title}
                  </h3>
                  <span
                    className="legend-sm text-silk-dim"
                    data-numerals="tabular"
                  >
                    {unit.model}
                  </span>
                </div>
                <p className="mt-3 max-w-[62ch] text-pretty text-[14px] leading-relaxed text-silk-dim md:text-[15px]">
                  {unit.description}
                </p>
              </div>
              <div className="flex shrink-0 items-start gap-5 md:gap-7">
                {unit.controls.map((control) => (
                  <Knob
                    key={control.label}
                    position={control.position}
                    cap={control.cap}
                    label={control.label}
                  />
                ))}
              </div>
            </div>
            <RackEar className="rounded-l-none rounded-r-sm" />
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RETURNS — the track sheet                                           */
/* ------------------------------------------------------------------ */

const references = [
  {
    name: "Cathal McAliskey",
    position: "Lead IT Consultant · GemPool",
    imageUrl: "/reviewers/1631633235263.jpeg",
    featured: true,
    message:
      "Karolis is the consummate professional. Highly personable, excellent communication skills, dedicated and technically astute. Along with all that he is a nice guy.",
  },
  {
    name: "Kristian Tasevski",
    position: "Head of Mobile · Bound",
    imageUrl: "/reviewers/1554286352901.jpeg",
    message:
      "Karolis is one of those rare developers who has an exceptional eye for detail, everything that he works on has a certain visual aesthetic to it. I was directly managing Karolis on a number of different projects at UserCentric for high profile enterprise clients of ours and all of the front-end work that Karolis did on those projects just looked great. He also has a strong self driven motivation to continue to learn and to stay up to date with whatever is topical in the dev community, and contributed a lot to our Engineering culture at UserCentric by always sharing with us what was the latest and greatest in the scene.",
  },
  {
    name: "Orla Lewis",
    position: "Product Design Manager · Irish Life",
    imageUrl: "/reviewers/1645312108470.jpeg",
    message:
      "Karolis worked as a react developer with my UX team. He was instrumental in building and developing our design system, a first for the company. I found him to be highly skilled and knowledgeable and an expert in his field. He is a strong communicator and diligent in his work. I highly recommend Karolis and hope to work with him again in the future.",
  },
  {
    name: "Greg Stephenson",
    position: "Founder · Netfront",
    imageUrl: "/reviewers/1516274019938.jpeg",
    message:
      "I have had the pleasure of working with Karolis across a few projects. Karolis has a very keen eye for detail and a great analytical approach to programming. I was impressed with the polished UI and UX considerations Karolis made while working with him. In addition to his solid programming skills, Karolis is a great communicator and easy to work with. I would recommend Karolis to anyone who is looking for a good react developer, he would be a true asset to your team.",
  },
  {
    name: "Nando Mogollon",
    position: "Founder & Director · BuilDigital",
    imageUrl: "/reviewers/1600770423042.jpeg",
    message:
      "I had the opportunity to work with Karolis from 2016 to 2019 while he was in Australia. I can attest he is a highly motivated, committed and responsible individual. Working with him gives you the confidence that work is going to be done and to the best standard. He would be a tremendous asset for you to hire or to get his services as a highly qualified professional.",
  },
  {
    name: "Povilas Nanevičius",
    position: "Mainframe Engineer · Rocket Software",
    imageUrl: "/reviewers/1578655726413.jpeg",
    message:
      "I know Karolis was in his element in Reactjs: researching, delivering latest and greatest Reactjs UI in his work, spending free time rewriting Three.js games with React components, building web apps. Full of energy, efficient, right on the point. Looking forward to working (and having lunch time IT discussions) with you again!",
  },
];

function Returns() {
  const [featured, ...rest] = references;
  return (
    <section
      id="references"
      data-field="paper"
      className="under-bridge bg-face text-ink shadow-[inset_0_6px_14px_-8px_rgba(0,0,0,0.6),inset_0_-6px_14px_-8px_rgba(0,0,0,0.6)]"
    >
      <div className={cn(shell, "py-16 md:py-24")}>
        <div className="flex flex-col gap-4 border-b border-face-line pb-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="badge-type max-w-[20ch] text-balance text-ink"
            style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.3rem)" }}
          >
            Words from people we&rsquo;ve built with
          </h2>
          <span
            className="legend-sm shrink-0 text-ink-dim"
            data-numerals="tabular"
          >
            Reel 01 · 6 on file · unedited
          </span>
        </div>

        <figure className="mt-12 md:mt-16">
          {/* Sentence case, deliberately. `badge-type` uppercases, and a
           * 160-character quotation in caps stops being a display line and
           * starts being a shout — it also misrepresents how the referee wrote
           * it. The display voice here comes from the face, the width axis and
           * the size instead. */}
          <blockquote
            className="max-w-[30ch] text-balance text-ink md:max-w-[34ch]"
            style={{
              fontFamily: "var(--font-anybody), sans-serif",
              fontSize: "clamp(1.55rem, 3.1vw, 2.8rem)",
              fontVariationSettings: '"wdth" 94, "wght" 620',
              letterSpacing: "-0.02em",
              lineHeight: 1.14,
            }}
          >
            {featured.message}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Image
              src={featured.imageUrl}
              alt=""
              width={112}
              height={112}
              className="size-14 rounded-[2px] object-cover shadow-[0_1px_3px_rgba(0,0,0,0.35)] md:size-16"
            />
            <span className="flex flex-col gap-1">
              <span className="text-[15px] font-medium text-ink">
                {featured.name}
              </span>
              <span className="legend-sm text-ink-dim">
                {featured.position}
              </span>
            </span>
          </figcaption>
        </figure>

        {/* The rest as track-sheet rows: ruled, dense, one per line. */}
        <ul className="mt-16 border-t border-face-line md:mt-20">
          {rest.map((item) => (
            <li
              key={item.name}
              className="grid gap-4 border-b border-face-line py-7 md:grid-cols-[16rem_1fr] md:gap-10 md:py-9"
            >
              <div className="flex items-center gap-3.5">
                <Image
                  src={item.imageUrl}
                  alt=""
                  width={96}
                  height={96}
                  className="size-11 rounded-[2px] object-cover shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                />
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="truncate text-[14px] font-medium text-ink">
                    {item.name}
                  </span>
                  <span className="legend-sm text-ink-dim">
                    {item.position}
                  </span>
                </span>
              </div>
              <blockquote className="max-w-[72ch] text-[14.5px] leading-relaxed text-ink/85">
                {item.message}
              </blockquote>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-[46ch] text-[15px] leading-relaxed text-ink-dim">
            Every quote above is a real client reference, printed as written.
          </p>
          <a
            href={EMAIL_HREF}
            className="group inline-flex items-center gap-2.5 text-ink"
            style={{
              fontFamily: "var(--font-anybody), sans-serif",
              fontVariationSettings: '"wdth" 86, "wght" 620',
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              fontSize: "13px",
            }}
          >
            <span className="underline decoration-ink/30 decoration-2 underline-offset-[6px] transition-colors duration-200 group-hover:decoration-ink">
              Worked with us? Add your note
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* OUT — the master output                                             */
/* ------------------------------------------------------------------ */

function Out() {
  return (
    <section id="contact" className={cn(shell, "under-bridge py-16 md:py-24")}>
      <div className="panel relative overflow-hidden rounded-sm">
        <Rail
          left="Master out"
          right="Line level · balanced"
          className="border-b border-[#191817]"
        />

        <div className="relative px-4 py-16 md:px-10 md:py-24">
          {/* The signal leaves the desk. Real geometry, drawn once. */}
          <svg
            aria-hidden
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full opacity-70"
          >
            <path
              d="M 1080 96 C 900 96 980 268 760 268 C 520 268 420 150 120 150"
              fill="none"
              stroke="#131211"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M 1080 96 C 900 96 980 268 760 268 C 520 268 420 150 120 150"
              fill="none"
              stroke="#2e2b27"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 1080 94 C 900 94 980 266 760 266 C 520 266 420 148 120 148"
              fill="none"
              stroke="#413c36"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative text-center">
            {/* This was a tracked label sitting above the email. A small
             * uppercase line above a large one is a kicker, and the section had
             * no heading at all, so it becomes the heading it was pretending to
             * introduce. */}
            <h2
              className="badge-type text-balance text-silk"
              style={{ fontSize: "clamp(1.65rem, 3.4vw, 3rem)" }}
            >
              Have a project in mind?
            </h2>
            <a
              href={EMAIL_HREF}
              className="group/mail badge-type mt-8 inline-block text-silk transition-colors duration-200 hover:text-face"
              style={{ fontSize: "clamp(1.25rem, 4.2vw, 3.2rem)" }}
            >
              <span className="underline decoration-signal/50 decoration-[3px] underline-offset-[0.14em] transition-colors duration-200 group-hover/mail:decoration-signal">
                {EMAIL}
              </span>
            </a>

            <div className="mt-12 flex flex-col items-center gap-6">
              <RecordButton href={EMAIL_HREF} size="lg" />
              <span className="flex items-center gap-3">
                <Jack className="size-5" />
                <span className="legend-sm text-silk-dim">
                  Vilnius, LT · available for new work
                </span>
              </span>
            </div>
          </div>
        </div>

        <Rail
          left="© KastProductions"
          right="Output stage"
          className="border-t border-[#3a3733]"
        />
      </div>
    </section>
  );
}
