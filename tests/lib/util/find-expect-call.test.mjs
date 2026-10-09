'use strict';

import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import findExpectCall from '../../../lib/util/find-expect-call.js';

const require = createRequire(import.meta.url);
const requireFromESLint = createRequire(require.resolve('eslint'));
const espree = requireFromESLint('espree');

describe('find-expect-call util', function () {
  it('Finds expect statements which are considered member expressions', function () {
    let code = 'expect(true).to.be.ok;';
    let ast = espree.parse(code);
    let result = findExpectCall(ast.body[0].expression);
    assert.ok(result !== null && typeof result === 'object');
  });

  it('Finds expect statements which are considered recursive call expressions', function () {
    let code = 'expect(true).to.equal(true);';
    let ast = espree.parse(code);
    let result = findExpectCall(ast.body[0].expression);
    assert.ok(result !== null && typeof result === 'object');
  });
});
