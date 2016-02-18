'use strict';

var rule = require('../../../lib/rules/no-inner-compare');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-inner-compare', rule, {
  valid: [{
    code: 'expect(true).to.be.ok;'
  }, {
    code: 'expect(a && b).to.be.ok;'
  }, {
    code: 'expect(a || b).to.be.ok;'
  }],

  invalid: [{
    code: 'expect(a < b).to.be.ok;',
    errors: [{
      message: 'operator "<" used in expect(), use "to.be.below()" instead'
    }]
  }, {
    code: 'expect(a == b).to.be.ok;',
    errors: [{
      message: 'operator "==" used in expect(), use "to.equal()" instead'
    }]
  }, {
    code: 'expect(a !== b).to.be.ok;',
    errors: [{
      message: 'operator "!==" used in expect(), use "to.not.equal()" instead'
    }]
  }, {
    code: 'expect(a >= b).to.be.ok;',
    errors: [{
      message: 'operator ">=" used in expect(), use "to.be.at.least()" instead'
    }]
  }]
});
