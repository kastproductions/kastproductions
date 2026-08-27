import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Knob, PanelLink, Rail, Screw } from "@/components/desk/hardware";
import { RecordButton } from "@/components/desk/record-button";
import { SiteFooter } from "@/components/desk/site-footer";
import { SiteHeader } from "@/components/site-header";
import { EMAIL_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "About",
  description:
    "About KastProductions — an AI-native product studio in Vilnius: senior designers and engineers who build with AI.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — KastProductions",
    description:
      "About KastProductions — an AI-native product studio in Vilnius: senior designers and engineers who build with AI.",
    url: "/about",
  },
};

/** A blanking plate with the plate legend printed: the studio story is not
 * written yet, and pretending otherwise would be the one thing this desk is
 * built to refuse. */
export default function About() {
  return (
    <>
      <SiteHeader />
      <main
        id="top"
        tabIndex={-1}
        className="desk-frame outline-none"
      >
        <section className="mx-auto w-full max-w-[86rem] px-4 py-6 sm:px-6 md:px-10 md:py-10">
          <div className="chassis-face plate-settle rounded-sm">
            <Rail
              left="Unit KP-00 — the studio"
              right="Vilnius LT · 54.69°N 25.28°E"
              className="border-b border-[#191817]"
            />

            <div className="flex flex-col gap-10 px-4 py-14 md:flex-row md:items-start md:gap-16 md:px-10 md:py-20">
              <div className="min-w-0 flex-1">
                <h1
                  className="badge-type max-w-[20ch] text-balance text-silk"
                  style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)" }}
                >
                  Something worth the wait
                </h1>
                <p className="mt-6 max-w-[62ch] text-pretty text-[15px] leading-relaxed text-silk-dim">
                  The full story is still being written. What is already true:
                  a small senior team in Vilnius, seventeen clients across three
                  continents, and AI used at every stage of the build with a
                  human reviewing the output before it ships.
                </p>

                <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                  <RecordButton href={EMAIL_HREF} label="Talk to us instead" />
                  <PanelLink href="/">
                    <ArrowLeft className="size-4" aria-hidden />
                    Back to the desk
                  </PanelLink>
                </div>
              </div>

              <div className="flex shrink-0 items-start gap-6 md:gap-8">
                <Knob position={0.78} cap="signal" label="Speed" />
                <Knob position={0.78} cap="cue" label="Judgment" />
              </div>
            </div>

            <Rail
              left="Page in preparation"
              right={<Screw />}
              className="border-t border-[#3a3733]"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
