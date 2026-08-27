import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      /* `output: "export"` forces `images.unoptimized`, so `next/image`
       * emits the same bare <img> a hand-written one does, with no srcset,
       * while charging ~14KB of client runtime per route that uses it. The
       * rule's advice is unavailable to this project, so it can only ever
       * fire falsely here. */
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
