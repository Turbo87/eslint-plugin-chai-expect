'use strict';

var importFrom = require('import-from');
var expect = require('chai').expect;
var espree = importFrom(require.resolve('eslint'), 'espree');
var findExpectCall = require('../../../lib/util/find-expect-call');

describe('find-expect-call util', function () {
  it('Finds expect statements which are considered member expressions', function () {
    var code = 'expect(true).to.be.ok;';
    var ast = espree.parse(code);
    var result = findExpectCall(ast.body[0].expression);
    expect(result).to.be.an('object');
  });

  it('Finds expect statements which are considered recursive call expressions', function () {
    var code = 'expect(true).to.equal(true);';
    var ast = espree.parse(code);
    var result = findExpectCall(ast.body[0].expression);
    expect(result).to.be.an('object');
  });
});
