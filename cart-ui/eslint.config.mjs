import { defineConfig, globalIgnores } from "eslint/config";
import perfectionist from 'eslint-plugin-perfectionist';
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
  {
    plugins: {
      perfectionist,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      'perfectionist/sort-classes': 'error',
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-jsx-props': 'error',
      'perfectionist/sort-named-exports': 'error',
      'perfectionist/sort-named-imports': 'error',
      'perfectionist/sort-objects': 'error',
      'quotes': ['error', 'single'],
    }
  }
]);

export default eslintConfig;
