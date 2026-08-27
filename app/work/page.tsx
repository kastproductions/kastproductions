import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Jack, PanelLink, Rail, Screw } from "@/components/desk/hardware";
import { RecordButton } from "@/components/desk/record-button";
import { SiteFooter } from "@/components/desk/site-footer";
import { SiteHeader } from "@/components/site-header";
import { EMAIL_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected AI-native product work by KastProductions — case studies in preparation.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — KastProductions",
    description:
      "Selected AI-native product work by KastProductions — case studies in preparation.",
    url: "/work",
  },
};

/**
 * An empty bay, labelled honestly.
 *
 * There are no case studies yet, so the page shows the thing a studio actually
 * has at this point: a bay with the tape printed and nothing patched into it.
 * That reads as work in progress rather than as a missing page.
 */
export default function Work() {
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
              left="Bay D — case studies"
              right="0 patched"
              className="border-b border-[#191817]"
            />

            <div className="px-4 py-14 md:px-10 md:py-20">
              <h1
                className="badge-type max-w-[20ch] text-balance text-silk"
                style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)" }}
              >
                Nothing patched here yet
              </h1>
              <p className="mt-6 max-w-[62ch] text-pretty text-[15px] leading-relaxed text-silk-dim">
                Selected projects are being written up. Until they are, the
                client list and the references on the desk carry more weight
                than a case study would. Want a walkthrough of specific work?
                Ask, and you get it the same week.
              </p>

              {/* The unpatched row: the empty state, drawn. */}
              <div
                aria-hidden
                className="panel-recessed mt-12 flex flex-wrap items-center gap-4 rounded-sm px-4 py-5 md:gap-6 md:px-6"
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <Jack key={index} className="size-6 opacity-45" />
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                <RecordButton href={EMAIL_HREF} label="Ask for a walkthrough" />
                <PanelLink href="/">
                  <ArrowLeft className="size-4" aria-hidden />
                  Back to the desk
                </PanelLink>
              </div>
            </div>

            <Rail
              left="Awaiting sources"
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
