import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2018,
      globals: {
        ...globals.mocha,
        ...globals.node,
      },
    },
  }
];
