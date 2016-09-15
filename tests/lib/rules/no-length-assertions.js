'use strict';

var rule = require('../../../lib/rules/no-length-assertions');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-length-assertions', rule, {
  valid: [{
    code: 'expect([1]).to.have.lengthOf(1);'
  }, {
    code: 'expect([1].length).to.be.equal(1);'
  }, {
    code: 'expect([1].length).to.equal(1);'
  }],
  invalid: [{
    code: 'expect([1]).to.be.length(1);',
    errors: [{
      message: '"to.be.length" is being deprecated, use "to.have.lengthOf" instead'
    }]
  }]
});
