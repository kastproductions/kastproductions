import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Static route → generated once at build time (works with output: "export").
export const alt =
  "KastProductions — AI-native product studio in Vilnius";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const KLEIN = "#1f16f0";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: KLEIN,
          color: "#ffffff",
          padding: "76px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.82)",
          }}
        >
          <div style={{ display: "flex" }}>KastProductions.</div>
          <div style={{ display: "flex" }}>Vilnius, LT</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -3,
            maxWidth: 1000,
          }}
        >
          We design, build &amp; ship AI-native products.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 27,
            letterSpacing: 1,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          <div style={{ display: "flex" }}>AI-native product studio</div>
          <div style={{ display: "flex" }}>hello@kastproductions.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
