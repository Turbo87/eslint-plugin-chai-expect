'use strict';

var rule = require('../../../lib/rules/terminating-properties');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('terminating-properties', rule, {
  valid: [{
    code: [
      'it("works as expected", function() {',
      '  expect(true).to.be.ok;',
      '});'
    ].join('\n')
  }, {
    code: [
      'ok();'
    ].join('\n')
  }, {
    code: [
      'somethingElse.ok();'
    ].join('\n')
  }, {
    code: 'expect(something).to.equal(somethingElse);'
  }],

  invalid: [{
    code: [
      'it("fails as expected", function() {',
      '  expect(true).to.be.ok();',
      '});'
    ].join('\n'),
    errors: [{
      message: '"to.be.ok" used as function'
    }]
  }, {
    code: [
      'it("fails as expected", function() {',
      '  expect(true).to.be.false();',
      '});'
    ].join('\n'),
    errors: [{
      message: '"to.be.false" used as function'
    }]
  }, {
    code: [
      'it("fails as expected", function() {',
      '  expect(true).to.exist();',
      '});'
    ].join('\n'),
    errors: [{
      message: '"to.exist" used as function'
    }]
  }]
});
