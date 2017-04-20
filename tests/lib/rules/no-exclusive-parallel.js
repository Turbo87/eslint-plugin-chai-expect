'use strict';

var rule = require('../../../lib/rules/no-exclusive-parallel');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('missing-assertion', rule, {
  valid: [{
    code: [
      'parallel("works as expected", function() {',
      '  expect(true).to.be.ok;',
      '});',
      'parallel.skip("works as expected", function() {',
      '  expect(true).to.be.ok;',
      '});',
      'parallel.slow("works as expected", function() {',
      '  expect(true).to.be.ok;',
      '});'
    ].join('\n')
  }],

  invalid: [{
    code: [
      'parallel.only("works as expected", function() {',
      '  expect(true).to.be.ok;',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Unexpected exclusive parallel mocha test.'
    }]
  }]
});
