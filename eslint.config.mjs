import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * ESLint flat config.
 *
 * eslint-config-next already bundles eslint-plugin-jsx-a11y and activates its
 * recommended rules.  We only need to override specific rule severities here —
 * do NOT re-register the plugin, which causes "Cannot redefine plugin" errors.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Stricter accessibility overrides on top of next's defaults.
  {
    rules: {
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/interactive-supports-focus": "error",
      "jsx-a11y/label-has-associated-control": "error",
      "jsx-a11y/no-autofocus": ["warn", { ignoreNonDOM: true }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
