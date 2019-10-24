'use strict';

const importFrom = require('import-from');
const {expect} = require('chai');
const espree = importFrom(require.resolve('eslint'), 'espree');
const findExpectCall = require('../../../lib/util/find-expect-call');

describe('find-expect-call util', function () {
  it('Finds expect statements which are considered member expressions', function () {
    const code = 'expect(true).to.be.ok;';
    const ast = espree.parse(code);
    const result = findExpectCall(ast.body[0].expression);
    expect(result).to.be.an('object');
  });

  it('Finds expect statements which are considered recursive call expressions', function () {
    const code = 'expect(true).to.equal(true);';
    const ast = espree.parse(code);
    const result = findExpectCall(ast.body[0].expression);
    expect(result).to.be.an('object');
  });
});
