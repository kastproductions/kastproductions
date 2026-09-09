import type { MetadataRoute } from "next";
import { brand, title } from "./content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: title,
    short_name: brand,
    description:
      "Software written by coding agents, reviewed by a named engineer, with the full run record of every feature.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f3ef",
    theme_color: "#1b2b63",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
