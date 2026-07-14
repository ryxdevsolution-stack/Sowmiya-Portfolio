import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * ESLint 9 flat config.
 *
 * The project previously declared a `lint` script but shipped no config file at
 * all, so linting silently did nothing. `next lint` was also removed in Next 16,
 * so the script now invokes eslint directly.
 *
 * eslint-config-next@16 ships flat configs as CommonJS arrays, so they come in
 * via the default import and are spread — there is no named export to destructure.
 */
export default [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // Unused code is a real signal in a codebase this small.
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
