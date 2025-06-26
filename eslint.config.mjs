import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },

  {
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
  },
  {
    ignores: [
      'coverage',
      '**/public',
      '**/dist',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
      'node_modules',
      'packages/language-server/node_modules',
      'packages/language-server/dist',
      'packages/vscode/node_modules',
      'packages/vscode/.vscode-test',
      'packages/vscode/dist',
      'packages/vscode/dist-tests',
    ],
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
