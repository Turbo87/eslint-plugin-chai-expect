import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const eslintPkg = require('eslint/package.json');

const USE_LANGUAGE_OPTIONS = eslintPkg.version.startsWith('9.');

export function ecmaVersion(version) {
  if (USE_LANGUAGE_OPTIONS) {
    return {
      languageOptions: {
        ecmaVersion: version
      }
    };
  }

  return {
    parserOptions: {
      ecmaVersion: version
    }
  }
}
