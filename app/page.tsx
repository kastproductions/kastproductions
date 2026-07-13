import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const EMAIL = "hello@kastproductions.com";
const EMAIL_HREF = `mailto:${EMAIL}`;

/* Shared framed container — the vertical rails of the drawing sheet. */
const frame = "mx-auto w-full max-w-7xl border-x px-5 sm:px-8 md:px-12";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" tabIndex={-1} className="pt-14">
        <Hero />
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


function Eyebrow({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
      <span className="text-foreground">{index}</span>
      <span aria-hidden className="h-px w-8 bg-border" />
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
          <span>KP — Design &amp; frontend consultancy</span>
          <span className="hidden sm:block">
            Vilnius, LT · 54.6872° N, 25.2797° E
          </span>
        </div>

        <div className="py-20 md:py-32">
          <h1 className="motion-safe:animate-rise max-w-5xl font-display text-5xl leading-[0.95] font-semibold tracking-tighter text-balance sm:text-7xl md:text-8xl">
            We design &amp; build high&#8209;quality{" "}
            <span className="text-blueprint">digital products.</span>
          </h1>
          <p className="motion-safe:animate-rise mt-8 max-w-xl text-base text-muted-foreground md:text-lg motion-safe:[animation-delay:120ms]">
            Kast Productions is an independent design and frontend development
            consultancy. We build unconventional websites, APIs and mobile
            products with unique design.
          </p>
          <div className="motion-safe:animate-rise mt-10 flex flex-col gap-3 sm:flex-row motion-safe:[animation-delay:240ms]">
            <Button
              asChild
              className="h-12 px-7 font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              <a href={EMAIL_HREF}>Start a project</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 px-7 font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              <a href="#capabilities">See capabilities ↓</a>
            </Button>
          </div>
        </div>

        <div
          aria-hidden
          className="motion-safe:animate-rise flex items-center gap-4 pb-8 motion-safe:[animation-delay:360ms]"
        >
          <span className="h-2.5 w-px bg-border" />
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Designed and built by hand
          </span>
          <span className="h-px flex-1 bg-border" />
          <span className="h-2.5 w-px bg-border" />
        </div>
      </div>
    </section>
  );
}

const capabilities = [
  {
    title: "Design",
    description:
      "Interfaces with a point of view — design systems, prototypes and UI that stay elegant under real content.",
  },
  {
    title: "Development",
    description:
      "Production-grade React, Next.js and TypeScript. Websites, APIs and mobile products built to ship.",
  },
  {
    title: "Strategy",
    description:
      "Technical direction and honest advice, from the first sketch to launch and beyond.",
  },
];

function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-14 border-b">
      <div className={cn(frame, "py-20 md:py-28")}>
        <div className="motion-safe:animate-reveal">
          <Eyebrow index="01">Capabilities</Eyebrow>
          <h2 className="mt-6 max-w-3xl font-display text-3xl leading-tight font-semibold text-balance md:text-5xl">
            We connect brands with people through design that is unique,
            elegant and centered on real needs.
          </h2>
        </div>
        <div className="motion-safe:animate-reveal mt-14 grid gap-px border bg-border md:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item.title} className="bg-background p-8 md:p-10">
              <h3 className="font-display text-xl font-semibold md:text-2xl">
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
    name: "UI/UX design",
    blurb:
      "Flows, wireframes and polished interfaces — designed in the browser, against real content.",
  },
  {
    name: "Website development",
    blurb:
      "Marketing sites and web apps in Next.js — fast, accessible and easy to maintain.",
  },
  {
    name: "API development",
    blurb: "Typed REST and GraphQL backends that frontends love to consume.",
  },
  {
    name: "Mobile development",
    blurb: "React Native apps that share code and ship to both stores.",
  },
  {
    name: "End-to-end testing",
    blurb: "Playwright suites that catch regressions before your users do.",
  },
];

function Services() {
  return (
    <section id="services" className="scroll-mt-14 border-b">
      <div className={cn(frame, "py-20 md:py-28")}>
        <div className="motion-safe:animate-reveal">
          <Eyebrow index="02">Services</Eyebrow>
          <h2 className="mt-6 font-display text-3xl leading-tight font-semibold text-balance md:text-5xl">
            Services we provide
          </h2>
        </div>
        <ul className="motion-safe:animate-reveal mt-14 border-t">
          {services.map((service, index) => (
            <li key={service.name} className="group border-b py-6 md:py-8">
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-muted-foreground">
                  /0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold transition-colors group-hover:text-blueprint md:text-4xl">
                    {service.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {service.blurb}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const clients = [
  {
    name: "Zipmex",
    companyUrl: "https://zipmex.com/",
    iconUrl: "/logos/zipmex.png",
  },
  {
    name: "Trustpilot",
    companyUrl: "https://www.trustpilot.com/",
    iconUrl: "/logos/trustpilot.png",
  },
  {
    name: "Bound Interactive",
    companyUrl: "https://boundinteractive.com/",
    iconUrl: "/logos/bound.png",
  },
  {
    name: "Rocket Software",
    companyUrl: "https://www.rocketsoftware.com/",
    iconUrl: "/logos/rocket-software.png",
  },
  {
    name: "Netfront",
    companyUrl: "https://netfront.com.au/",
    iconUrl: "/logos/netfront.png",
  },
  {
    name: "All Human",
    companyUrl: "https://allhuman.com/",
    iconUrl: "/logos/allhuman.png",
  },
  {
    name: "Central Innovation",
    companyUrl: "https://centralinnovation.com/",
    iconUrl: "/logos/central-innovation.png",
  },
  {
    name: "Irish Life",
    companyUrl: "https://www.irishlife.ie/",
    iconUrl: "/logos/irish-life.png",
  },
  {
    name: "Macaw",
    companyUrl: "https://www.macaw.net/",
    iconUrl: "/logos/macaw.png",
  },
  {
    name: "PEXX",
    companyUrl: "https://pexx.com/",
    iconUrl: "/logos/pexx.png",
  },
  {
    name: "Apart Tech",
    companyUrl: "https://www.apart.tech/",
    iconUrl: "/logos/apart-tech.png",
  },
  {
    name: "Toptal",
    companyUrl: "https://www.toptal.com/",
    iconUrl: "/logos/toptal.png",
  },
  {
    name: "An Post",
    companyUrl: "https://www.anpost.com/",
    iconUrl: "/logos/anpost.png",
  },
  {
    name: "Bidfood",
    companyUrl: "https://www.bidfood.nl/",
    iconUrl: "/logos/bidfood.png",
  },
  {
    name: "RNHB",
    companyUrl: "https://www.rnhb.nl/",
    iconUrl: "/logos/rnhb.png",
  },
  {
    name: "Volkswagen Financial Services",
    companyUrl: "https://www.vwfs.com/",
    iconUrl: "/logos/vwfs.png",
  },
  {
    name: "visionI",
    companyUrl: "https://www.visioni.com.au/",
    iconUrl: "/logos/visioni.png",
  },
];

function Clients() {
  return (
    <section id="clients" className="scroll-mt-14 border-b">
      <div className={cn(frame, "py-20 md:py-28")}>
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <div className="motion-safe:animate-reveal">
            <Eyebrow index="03">Clients</Eyebrow>
            <h2 className="mt-6 max-w-md font-display text-3xl leading-tight font-semibold text-balance md:text-5xl">
              In good company
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Products and platforms that combine craft, empathy and inclusive
              technology will conquer the world. Here’s who we’ve
              partnered with to go further.
            </p>
          </div>
          <ul className="motion-safe:animate-reveal grid grid-cols-3 gap-px border bg-border sm:grid-cols-4">
            {clients.map((client) => (
              <li key={client.name} className="bg-background">
                <a
                  href={client.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex aspect-square items-center justify-center p-4 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0"
                >
                  <Image
                    src={client.iconUrl}
                    alt={client.name}
                    width={96}
                    height={96}
                    className="size-full object-contain"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 truncate px-2 pb-1.5 text-center font-mono text-[9px] tracking-[0.08em] text-muted-foreground uppercase opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    {client.name}
                  </span>
                </a>
              </li>
            ))}
            <li aria-hidden className="aspect-square bg-background" />
            <li aria-hidden className="hidden aspect-square bg-background sm:block" />
            <li aria-hidden className="hidden aspect-square bg-background sm:block" />
            <li className="col-span-3 bg-background sm:col-span-4">
              <a
                href={EMAIL_HREF}
                className="flex items-center justify-center gap-2 p-5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-blueprint"
              >
                You + us
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Kristian Tasevski",
    position: "Head of Mobile | Bound",
    imageUrl: "/reviewers/1554286352901.jpeg",
    message:
      "Karolis is one of those rare developers who has an exceptional eye for detail, everything that he works on has a certain visual aesthetic to it. I was directly managing Karolis on a number of different projects at UserCentric for high profile enterprise clients of ours and all of the front-end work that Karolis did on those projects just looked great. He also has a strong self driven motivation to continue to learn and to stay up to date with whatever is topical in the dev community, and contributed a lot to our Engineering culture at UserCentric by always sharing with us what was the latest and greatest in the scene.",
  },
  {
    name: "Greg Stephenson",
    position: "Founder at Netfront",
    imageUrl: "/reviewers/1516274019938.jpeg",
    message:
      "I have had the pleasure of working with Karolis across a few projects. Karolis has a very keen eye for detail and a great analytical approach to programming. I was impressed with the polished UI and UX considerations Karolis made while working with him. In addition to his solid programming skills, Karolis is a great communicator and easy to work with. I would recommend Karolis to anyone who is looking for a good react developer, he would be a true asset to your team.",
  },
  {
    name: "Povilas Nanevičius",
    position: "Mainframe Engineer at Rocket Software",
    imageUrl: "/reviewers/1578655726413.jpeg",
    message:
      "I know Karolis was in his element in Reactjs: researching, delivering latest and greatest Reactjs UI in his work, spending free time rewriting Three.js games with React components, building web apps. Full of energy, efficient, right on the point. Looking forward to working (and having lunch time IT discussions) with you again!",
  },
  {
    name: "Nando Mogollon",
    position: "Founder and Director at BuilDigital",
    imageUrl: "/reviewers/1600770423042.jpeg",
    message:
      "I had the opportunity to work with Karolis from 2016 to 2019 while he was in Australia. I can attest he is a highly motivated, committed and responsible individual. Working with him gives you the confidence that work is going to be done and to the best standard. He would be a tremendous asset for you to hire or to get his services as a highly qualified professional.",
  },
  {
    name: "Cathal McAliskey",
    position: "Lead IT Consultant at GemPool Recruitment",
    imageUrl: "/reviewers/1631633235263.jpeg",
    message:
      "Karolis is the consummate professional. Highly personable, excellent communication skills, dedicated and technically astute. Along with all that he is a nice guy.",
  },
  {
    name: "Orla Lewis",
    position: "Product Design Manager at Irish Life",
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
  return (
    <section id="testimonials" className="scroll-mt-14 border-b">
      <div className={cn(frame, "py-20 md:py-28")}>
        <div className="motion-safe:animate-reveal">
          <Eyebrow index="04">Testimonials</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-display text-3xl leading-tight font-semibold text-balance md:text-5xl">
            What our clients say
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Every review on this page has been written by a real client. It is
            neither filtered nor edited by us.
          </p>
        </div>
        <div className="mt-14 grid gap-px border bg-border md:grid-cols-2">
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              className={cn(
                "motion-safe:animate-reveal flex flex-col gap-8 bg-background p-8 md:p-10",
                index === 0 && "md:col-span-2",
              )}
            >
              <blockquote>
                <Quote
                  className="size-6 text-muted-foreground"
                  aria-hidden
                  fill="currentColor"
                  strokeWidth={0}
                />
                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed text-foreground/85",
                    index === 0 && "max-w-3xl md:text-base",
                  )}
                >
                  {item.message}
                </p>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4">
                <Avatar className="size-12 border">
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
            className="motion-safe:animate-reveal group flex flex-col justify-between gap-8 bg-background p-8 md:p-10"
          >
            <p className="font-display text-xl font-semibold text-balance md:text-2xl">
              Worked with us?{" "}
              <span className="text-blueprint">Add your note.</span>
            </p>
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors group-hover:text-blueprint">
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
    <section className="border-b bg-primary text-primary-foreground">
      <div className={cn(frame, "border-white/20 py-20 text-center md:py-28")}>
        <div className="motion-safe:animate-reveal">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-80">
            05 — Get in touch · New projects, collaborations, quick hellos
          </p>
          <a
            href={EMAIL_HREF}
            className="mt-8 inline-block font-display text-2xl font-semibold tracking-tight underline decoration-2 underline-offset-8 transition-[text-decoration-thickness] hover:decoration-4 sm:text-4xl md:text-6xl"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div
        className={cn(
          frame,
          "flex flex-col items-center justify-between gap-2 py-6 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase sm:flex-row md:text-[11px]",
        )}
      >
        <span>© {new Date().getFullYear()} Kast Productions</span>
        <span>Vilnius, Lithuania</span>
        <a href="#top" className="transition-colors hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
