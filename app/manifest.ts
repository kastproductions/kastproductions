import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KastProductions — Design & Frontend Engineering Studio",
    short_name: "KastProductions",
    description:
      "Independent design and frontend engineering studio in Vilnius.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbfb",
    theme_color: "#fbfbfb",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
