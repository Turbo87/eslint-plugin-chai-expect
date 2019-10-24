'use strict';

const importFrom = require('import-from');
const {expect} = require('chai');
const espree = importFrom(require.resolve('eslint'), 'espree');
const findExpectCall = require('../../../lib/util/find-expect-call');

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
