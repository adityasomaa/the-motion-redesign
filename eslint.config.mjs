import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // images.unoptimized is required on this Vercel team, so next/image adds nothing; assets ship pre-compressed (AVIF/WebP).
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scripts/**",
    // Vendored Componentry sources, kept close to upstream so they can be diffed against the registry.
    "src/components/ui/**",
  ]),
]);

export default eslintConfig;
