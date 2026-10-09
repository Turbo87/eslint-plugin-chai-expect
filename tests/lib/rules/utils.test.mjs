import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { describe, it } from 'node:test';
import { ecmaVersion } from './utils.mjs';

const require = createRequire(import.meta.url);
const majorVersion = parseInt(require('eslint/package.json').version, 10);

describe('RuleTester configuration helper', () => {
  it('uses parserOptions before ESLint 9', () => {
    for (const version of [2, 8]) {
      assert.deepEqual(ecmaVersion(2015, version), {
        parserOptions: { ecmaVersion: 2015 }
      });
    }
  });

  it('uses languageOptions from ESLint 9 onwards', () => {
    for (const version of [9, 10]) {
      assert.deepEqual(ecmaVersion(2015, version), {
        languageOptions: { ecmaVersion: 2015 }
      });
    }
  });

  it('defaults to the installed ESLint version', () => {
    assert.deepEqual(ecmaVersion(2015), ecmaVersion(2015, majorVersion));
  });
});
