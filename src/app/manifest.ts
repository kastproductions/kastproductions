import type { MetadataRoute } from "next";
import { brand, homePage } from "./content";

export const dynamic = "force-static";

/* The splash screen and the system chrome take the paper colour, the same
 * colour the viewport's theme-color states in layout.tsx. */
const paper = "#ffffff";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: homePage.title,
    short_name: brand,
    description: homePage.description,
    start_url: "/",
    display: "standalone",
    background_color: paper,
    theme_color: paper,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
