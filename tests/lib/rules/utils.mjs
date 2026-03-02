import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const eslintPkg = require('eslint/package.json');

// ESLint 9+ uses languageOptions, earlier versions use parserOptions
const majorVersion = parseInt(eslintPkg.version.split('.')[0], 10);
const USE_LANGUAGE_OPTIONS = majorVersion >= 9;

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
