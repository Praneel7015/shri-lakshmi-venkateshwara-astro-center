import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // `const { a, ...rest } = obj` is our way to drop a field; don't flag `a`.
    rules: { '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }] },
  },
  globalIgnores(['.next/**', 'out/**', 'studio/**', 'next-env.d.ts']),
]);
