import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const EMAIL = "hello@kastproductions.com";
const EMAIL_HREF = `mailto:${EMAIL}`;

/* The sheet — a framed max-w container. `frame` adds the vertical rails;
 * full-bleed colour fields use `frameInner` and break out of them. */
const frameInner = "mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12";
const frame = cn(frameInner, "border-x");

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" tabIndex={-1} className="pt-14">
        <Hero />
        <ClientMarquee />
        <Capabilities />
        <Services />
        <Clients />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
      <span aria-hidden className="size-1.5 rounded-full bg-klein" />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="border-b">
      <div className={frame}>
        <div className="flex items-center justify-between gap-4 border-b py-3 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase md:text-[11px]">
          <span>AI-native product studio</span>
          <span className="hidden sm:block">Vilnius, LT · 54.69° N, 25.28° E</span>
        </div>

        <div className="py-20 md:py-32">
          <h1 className="max-w-[15ch] font-display text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.94] font-semibold tracking-[-0.03em]">
            <span className="block motion-safe:animate-unmask">
              We design, build
            </span>
            <span className="block motion-safe:animate-unmask motion-safe:[animation-delay:130ms]">
              &amp; ship AI-native
            </span>
            <span className="block motion-safe:animate-unmask motion-safe:[animation-delay:260ms]">
              products<span className="text-klein">.</span>
            </span>
          </h1>
          <p className="motion-safe:animate-rise mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground motion-safe:[animation-delay:420ms] md:text-xl">
            An AI-native product studio. We put AI to work across design,
            engineering and testing — shipping websites, APIs and AI features
            faster, without trading away quality.
          </p>
          <div className="motion-safe:animate-rise mt-10 flex flex-col gap-3 sm:flex-row motion-safe:[animation-delay:540ms]">
            <Button
              asChild
              variant="klein"
              className="h-12 px-7 font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              <a href={EMAIL_HREF}>Start a project</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 px-7 font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              <a href="#services">Explore services ↓</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientMarquee() {
  return (
    <section aria-label="Selected clients" className="border-b">
      <div className="relative overflow-hidden py-4 md:py-6">
        <Marquee
          pauseOnHover
          className="[--duration:55s] [--gap:3.5rem] md:[--gap:5.5rem]"
        >
          {clients.map((client) => (
            <a
              key={client.name}
              href={client.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={client.name}
              className="group/logo flex shrink-0"
            >
              <span className="flex size-16 items-center justify-center overflow-hidden rounded-xl border bg-card p-3.5 transition-colors duration-300 group-hover/logo:border-klein/40 md:size-20 md:p-4">
                <Image
                  src={client.iconUrl}
                  alt={client.name}
                  width={96}
                  height={96}
                  className="size-full object-contain opacity-70 grayscale transition duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
                />
              </span>
            </a>
          ))}
        </Marquee>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32"
        />
      </div>
    </section>
  );
}

const capabilities = [
  {
    title: "Design",
    tag: "systems · prototypes · UI",
    description:
      "Interfaces with a point of view — explored and refined with AI so we cover more ground in less time.",
  },
  {
    title: "Engineering",
    tag: "react · next.js · typescript",
    description:
      "Production-grade React, Next.js and TypeScript — AI-assisted, human-reviewed, built to ship and scale.",
  },
  {
    title: "AI",
    tag: "llms · rag · agents",
    description:
      "LLM features, RAG and agents designed into the product from day one — with evals and guardrails, not guesswork.",
  },
];

function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-14 border-b">
      <div className={cn(frame, "py-20 md:py-28")}>
        <div className="motion-safe:animate-reveal max-w-4xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-6 font-display text-3xl leading-[1.04] font-semibold tracking-[-0.02em] text-balance md:text-5xl lg:text-6xl">
            The judgment of a senior team, at the speed of AI.
          </h2>
        </div>
        <div className="motion-safe:animate-reveal mt-14 grid gap-px border bg-border md:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item.title} className="group relative bg-background p-8 md:p-10">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-klein transition-transform duration-500 group-hover:scale-x-100"
              />
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground lowercase">
                {item.tag}
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    name: "AI integration",
    category: "ai",
    blurb:
      "LLM features, RAG and agents wired into real products — shipped with evals and guardrails.",
    featured: true,
  },
  {
    name: "Full-stack POC",
    category: "poc",
    blurb:
      "Idea to a working full-stack prototype in weeks — proof before you commit.",
    featured: true,
  },
  {
    name: "UI/UX design",
    category: "design",
    blurb:
      "Flows, wireframes and polished interfaces — designed in the browser, against real content.",
  },
  {
    name: "Website development",
    category: "web",
    blurb:
      "Marketing sites and web apps in Next.js — fast, accessible and easy to maintain.",
  },
  {
    name: "API development",
    category: "backend",
    blurb: "Typed REST and GraphQL backends that frontends love to consume.",
  },
  {
    name: "Mobile development",
    category: "mobile",
    blurb: "React Native apps that share code and ship to both stores.",
  },
  {
    name: "End-to-end testing",
    category: "quality",
    blurb: "Playwright suites that catch regressions before your users do.",
  },
];

function Services() {
  return (
    <section id="services" className="scroll-mt-14 border-b">
      <div className={cn(frame, "py-20 md:py-28")}>
        <div className="motion-safe:animate-reveal">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-6 font-display text-3xl leading-[1.04] font-semibold tracking-[-0.02em] text-balance md:text-5xl lg:text-6xl">
            What we take on
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground md:text-base">
            Design, engineering and AI — from product interfaces to rapid
            full-stack proofs of concept.
          </p>
        </div>
        <ul className="motion-safe:animate-reveal mt-12 border-t">
          {services.map((service) => (
            <li key={service.name} className="group border-b">
              <a
                href={EMAIL_HREF}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-7 md:py-9"
              >
                <h3 className="font-display text-3xl leading-none font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-klein md:text-5xl">
                  {service.name}
                </h3>
                <span
                  className={cn(
                    "flex items-center gap-3 justify-self-end font-mono text-[11px] tracking-[0.18em] uppercase",
                    service.featured ? "text-klein" : "text-muted-foreground",
                  )}
                >
                  {service.featured ? (
                    <span aria-hidden className="size-1.5 rounded-full bg-klein" />
                  ) : null}
                  {service.category}
                  <ArrowRight
                    aria-hidden
                    className="size-4 -translate-x-1 text-klein opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </span>
                <p className="col-span-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {service.blurb}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const clients = [
  { name: "Zipmex", companyUrl: "https://zipmex.com/", iconUrl: "/logos/zipmex.png" },
  { name: "Trustpilot", companyUrl: "https://www.trustpilot.com/", iconUrl: "/logos/trustpilot.png" },
  { name: "Bound Interactive", companyUrl: "https://boundinteractive.com/", iconUrl: "/logos/bound.png" },
  { name: "Rocket Software", companyUrl: "https://www.rocketsoftware.com/", iconUrl: "/logos/rocket-software.png" },
  { name: "Netfront", companyUrl: "https://netfront.com.au/", iconUrl: "/logos/netfront.png" },
  { name: "All Human", companyUrl: "https://allhuman.com/", iconUrl: "/logos/allhuman.png" },
  { name: "Central Innovation", companyUrl: "https://centralinnovation.com/", iconUrl: "/logos/central-innovation.png" },
  { name: "Irish Life", companyUrl: "https://www.irishlife.ie/", iconUrl: "/logos/irish-life.png" },
  { name: "Macaw", companyUrl: "https://www.macaw.net/", iconUrl: "/logos/macaw.png" },
  { name: "PEXX", companyUrl: "https://pexx.com/", iconUrl: "/logos/pexx.png" },
  { name: "Apart Tech", companyUrl: "https://www.apart.tech/", iconUrl: "/logos/apart-tech.png" },
  { name: "Toptal", companyUrl: "https://www.toptal.com/", iconUrl: "/logos/toptal.png" },
  { name: "An Post", companyUrl: "https://www.anpost.com/", iconUrl: "/logos/anpost.png" },
  { name: "Bidfood", companyUrl: "https://www.bidfood.nl/", iconUrl: "/logos/bidfood.png" },
  { name: "RNHB", companyUrl: "https://www.rnhb.nl/", iconUrl: "/logos/rnhb.png" },
  { name: "Volkswagen Financial Services", companyUrl: "https://www.vwfs.com/", iconUrl: "/logos/vwfs.png" },
  { name: "visionI", companyUrl: "https://www.visioni.com.au/", iconUrl: "/logos/visioni.png" },
];

function Clients() {
  return (
    <section id="clients" className="scroll-mt-14 border-b bg-klein-soft">
      <div className={cn(frameInner, "py-20 md:py-28")}>
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16">
          <div className="motion-safe:animate-reveal">
            <Eyebrow>Clients</Eyebrow>
            <h2 className="mt-6 max-w-sm font-display text-3xl leading-[1.04] font-semibold tracking-[-0.02em] text-balance md:text-5xl">
              In good company<span className="text-klein">.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/70 md:text-base">
              From venture-backed startups to public institutions across 3
              continents — teams that want to move fast without shipping AI
              slop.
            </p>
            <Button
              asChild
              variant="klein"
              className="mt-8 h-11 px-6 font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              <a href={EMAIL_HREF}>
                Become one
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
          <ul className="motion-safe:animate-reveal flex flex-wrap gap-x-6 gap-y-1.5 md:justify-end">
            {clients.map((client) => (
              <li key={client.name}>
                <a
                  href={client.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl leading-tight font-medium tracking-tight text-foreground/65 transition-colors hover:text-klein md:text-3xl"
                >
                  {client.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Kristian Tasevski",
    position: "Head of Mobile · Bound",
    imageUrl: "/reviewers/1554286352901.jpeg",
    message:
      "Karolis is one of those rare developers who has an exceptional eye for detail, everything that he works on has a certain visual aesthetic to it. I was directly managing Karolis on a number of different projects at UserCentric for high profile enterprise clients of ours and all of the front-end work that Karolis did on those projects just looked great. He also has a strong self driven motivation to continue to learn and to stay up to date with whatever is topical in the dev community, and contributed a lot to our Engineering culture at UserCentric by always sharing with us what was the latest and greatest in the scene.",
  },
  {
    name: "Greg Stephenson",
    position: "Founder · Netfront",
    imageUrl: "/reviewers/1516274019938.jpeg",
    message:
      "I have had the pleasure of working with Karolis across a few projects. Karolis has a very keen eye for detail and a great analytical approach to programming. I was impressed with the polished UI and UX considerations Karolis made while working with him. In addition to his solid programming skills, Karolis is a great communicator and easy to work with. I would recommend Karolis to anyone who is looking for a good react developer, he would be a true asset to your team.",
  },
  {
    name: "Povilas Nanevičius",
    position: "Mainframe Engineer · Rocket Software",
    imageUrl: "/reviewers/1578655726413.jpeg",
    message:
      "I know Karolis was in his element in Reactjs: researching, delivering latest and greatest Reactjs UI in his work, spending free time rewriting Three.js games with React components, building web apps. Full of energy, efficient, right on the point. Looking forward to working (and having lunch time IT discussions) with you again!",
  },
  {
    name: "Nando Mogollon",
    position: "Founder & Director · BuilDigital",
    imageUrl: "/reviewers/1600770423042.jpeg",
    message:
      "I had the opportunity to work with Karolis from 2016 to 2019 while he was in Australia. I can attest he is a highly motivated, committed and responsible individual. Working with him gives you the confidence that work is going to be done and to the best standard. He would be a tremendous asset for you to hire or to get his services as a highly qualified professional.",
  },
  {
    name: "Cathal McAliskey",
    position: "Lead IT Consultant · GemPool",
    imageUrl: "/reviewers/1631633235263.jpeg",
    featured: true,
    message:
      "Karolis is the consummate professional. Highly personable, excellent communication skills, dedicated and technically astute. Along with all that he is a nice guy.",
  },
  {
    name: "Orla Lewis",
    position: "Product Design Manager · Irish Life",
    imageUrl: "/reviewers/1645312108470.jpeg",
    message:
      "Karolis worked as a react developer with my UX team. He was instrumental in building and developing our design system, a first for the company. I found him to be highly skilled and knowledgeable and an expert in his field. He is a strong communicator and diligent in his work. I highly recommend Karolis and hope to work with him again in the future.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function Testimonials() {
  const featured = testimonials.find((item) => item.featured) ?? testimonials[0];
  const rest = testimonials.filter((item) => item !== featured);
  return (
    <section id="testimonials" className="scroll-mt-14 border-b">
      <div className={cn(frame, "py-20 md:py-28")}>
        <div className="motion-safe:animate-reveal max-w-2xl">
          <Eyebrow>Testimonials</Eyebrow>
          <h2 className="mt-6 font-display text-3xl leading-[1.04] font-semibold tracking-[-0.02em] text-balance md:text-5xl lg:text-6xl">
            Words from people we&rsquo;ve built with
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Every quote is from a real client — unedited and unfiltered.
          </p>
        </div>

        <figure className="motion-safe:animate-reveal mt-14 border-t pt-10 md:pt-14">
          <blockquote className="max-w-4xl font-display text-2xl leading-[1.15] font-medium tracking-[-0.02em] text-balance md:text-4xl">
            <span aria-hidden className="text-klein">&ldquo;</span>
            {featured.message}
            <span aria-hidden className="text-klein">&rdquo;</span>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Avatar className="size-12 border">
              <AvatarImage src={featured.imageUrl} alt="" />
              <AvatarFallback className="font-mono text-xs">
                {initials(featured.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{featured.name}</p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                {featured.position}
              </p>
            </div>
          </figcaption>
        </figure>

        <div className="motion-safe:animate-reveal mt-px grid gap-px border bg-border md:grid-cols-2">
          {rest.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col gap-8 bg-background p-8 md:p-10"
            >
              <blockquote className="text-sm leading-relaxed text-foreground/85">
                {item.message}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4">
                <Avatar className="size-11 border">
                  <AvatarImage src={item.imageUrl} alt="" />
                  <AvatarFallback className="font-mono text-xs">
                    {initials(item.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    {item.position}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
          <a
            href={EMAIL_HREF}
            className="group flex flex-col justify-between gap-8 bg-background p-8 md:p-10"
          >
            <p className="font-display text-xl leading-tight font-semibold tracking-tight text-balance md:text-2xl">
              Worked with us?{" "}
              <span className="text-klein">Add your note.</span>
            </p>
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors group-hover:text-klein">
              Write to {EMAIL}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section aria-label="Contact" className="bg-klein text-klein-foreground">
      <div className={cn(frameInner, "py-24 text-center md:py-36")}>
        <h2 className="sr-only">Contact</h2>
        <p className="motion-safe:animate-reveal font-mono text-[11px] tracking-[0.2em] text-klein-foreground/70 uppercase">
          Have a project in mind?
        </p>
        <a
          href={EMAIL_HREF}
          className="motion-safe:animate-reveal mt-8 inline-block font-display text-[clamp(1.75rem,6vw,5rem)] font-semibold tracking-[-0.02em] underline decoration-[0.055em] underline-offset-[0.12em] transition-[text-decoration-thickness] hover:decoration-[0.11em]"
        >
          {EMAIL}
        </a>
        <div className="motion-safe:animate-reveal mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.18em] text-klein-foreground/70 uppercase">
          <span>Vilnius, LT</span>
          <span aria-hidden>·</span>
          <span>Available for new work</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t">
      <div
        className={cn(
          frame,
          "flex flex-col items-center justify-between gap-2 py-6 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase sm:flex-row md:text-[11px]",
        )}
      >
        <span>© {new Date().getFullYear()} Kast Productions</span>
        <span className="hidden sm:block">AI-native product studio</span>
        <a href="#top" className="transition-colors hover:text-klein">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
