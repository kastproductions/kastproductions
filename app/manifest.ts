import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KastProductions — AI-native product studio",
    short_name: "KastProductions",
    description:
      "AI-native product studio in Vilnius. Senior judgment at the speed of AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#151413",
    theme_color: "#151413",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
