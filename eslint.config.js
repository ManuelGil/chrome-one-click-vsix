import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],

    languageOptions: {
      ecmaVersion: 'latest',

      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.es2024,
        chrome: 'readonly',
      },
    },

    rules: {
      'no-console': 'warn',

      '@typescript-eslint/consistent-type-imports': 'error',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    ignores: ['.wxt', 'dist', 'node_modules'],
  },
);
