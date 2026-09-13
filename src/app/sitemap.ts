import type { MetadataRoute } from "next";
import { products, siteUrl } from "./content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/custom`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    /* A product enters the sitemap when it enters the catalogue. */
    ...products.map((product) => ({
      url: `${siteUrl}/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
