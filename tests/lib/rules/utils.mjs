import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const eslintPkg = require('eslint/package.json');

// ESLint 9+ uses languageOptions, earlier versions use parserOptions
const majorVersion = parseInt(eslintPkg.version.split('.')[0], 10);

export function ecmaVersion(version, eslintMajorVersion = majorVersion) {
  if (eslintMajorVersion >= 9) {
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
