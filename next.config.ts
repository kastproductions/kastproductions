import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    /* `radix-ui` is an umbrella barrel: 35 `import * as` lines re-exported as
     * one namespace. Next's default list covers lucide-react but not this, so
     * pulling `Dialog` out of it walks all 59 @radix-ui packages at build and
     * dev-boot time. Turbopack already tree-shakes it out of the shipped
     * bundle, so this buys build time, not bytes. */
    optimizePackageImports: ["radix-ui"],
  },
};

export default nextConfig;
