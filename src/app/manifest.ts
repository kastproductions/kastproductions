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
    /* A browser offers to install a site only when the manifest names a
     * raster icon of at least 192 pixels. `public/logo.png` is `icon.svg`
     * drawn at 512 pixels; see `logo` in structured-data.ts. */
    icons: [
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
