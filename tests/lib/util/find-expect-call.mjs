'use strict';

import { createRequire } from 'node:module';
import importFrom from 'import-from';
import {expect} from 'chai';
import findExpectCall from '../../../lib/util/find-expect-call.js';

const require = createRequire(import.meta.url);
const espree = importFrom(require.resolve('eslint'), 'espree');

describe('find-expect-call util', function () {
  it('Finds expect statements which are considered member expressions', function () {
    let code = 'expect(true).to.be.ok;';
    let ast = espree.parse(code);
    let result = findExpectCall(ast.body[0].expression);
    expect(result).to.be.an('object');
  });

  it('Finds expect statements which are considered recursive call expressions', function () {
    let code = 'expect(true).to.equal(true);';
    let ast = espree.parse(code);
    let result = findExpectCall(ast.body[0].expression);
    expect(result).to.be.an('object');
  });
});
