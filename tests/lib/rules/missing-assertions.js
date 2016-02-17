'use strict';

var rule = require('../../../lib/rules/missing-assertion');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('missing-assertion', rule, {
  valid: [{
    code: [
      'it("works as expected", function() {',
      '  expect(true).to.be.ok;',
      '});'
    ].join('\n')
  }],

  invalid: [{
    code: [
      'it("fails as expected", function() {',
      '  expect(true);',
      '});'
    ].join('\n'),
    errors: [{
      message: 'expect(...) used without assertion'
    }]
  }]
});
