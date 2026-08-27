import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Jack, PanelLink, Rail } from "@/components/desk/hardware";
import { RecordButton } from "@/components/desk/record-button";
import { SiteFooter } from "@/components/desk/site-footer";
import { SiteHeader } from "@/components/site-header";
import { EMAIL, EMAIL_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with KastProductions for AI-native product work. Email hello@kastproductions.com.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — KastProductions",
    description:
      "Get in touch with KastProductions for AI-native product work. Email hello@kastproductions.com.",
    url: "/contact",
  },
};

/** The output stage on its own page: one destination, one control. */
export default function Contact() {
  return (
    <>
      <SiteHeader />
      <main
        id="top"
        tabIndex={-1}
        className="desk-frame outline-none"
      >
        <section className="mx-auto w-full max-w-[86rem] px-4 py-6 sm:px-6 md:px-10 md:py-10">
          <div className="chassis-face plate-settle relative overflow-hidden rounded-sm">
            <Rail
              left="Master out"
              right="Line level · balanced"
              className="border-b border-[#191817]"
            />

            <div className="relative px-4 py-20 text-center md:px-10 md:py-28">
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

              <div className="relative">
                <h1
                  className="badge-type text-balance text-silk"
                  style={{ fontSize: "clamp(2.1rem, 5vw, 3.8rem)" }}
                >
                  Say hello
                </h1>
                <a
                  href={EMAIL_HREF}
                  className="group/mail badge-type mt-8 inline-block text-silk transition-colors duration-200 hover:text-face"
                  style={{ fontSize: "clamp(1.25rem, 4.2vw, 3rem)" }}
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
                  <PanelLink href="/" className="mt-2">
                    <ArrowLeft className="size-4" aria-hidden />
                    Back to the desk
                  </PanelLink>
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
      </main>
      <SiteFooter />
    </>
  );
}
