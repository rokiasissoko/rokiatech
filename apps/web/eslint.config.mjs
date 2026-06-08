import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // eslint-plugin-react calls context.getFilename() which was removed in
  // ESLint 10. Pinning the version prevents the auto-detect codepath.
  { settings: { react: { version: "19" } } },
  globalIgnores(["app/api/**"]),
]);

export default eslintConfig;
