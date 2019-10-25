'use strict';

const rule = require('../../../lib/rules/no-inner-compare');
const {RuleTester} = require('eslint');

let ruleTester = new RuleTester();
ruleTester.run('no-inner-compare', rule, {
  valid: [{
    code: 'expect(true).to.be.ok;'
  }, {
    code: 'expect(a && b).to.be.ok;'
  }, {
    code: 'expect(a || b).to.be.ok;'
  }, {
    code: 'expect(a).to.equal(5);'
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
  }, {
    code: 'expect(a >= b).to.equal(true);',
    errors: [{
      message: 'operator ">=" used in expect(), use "to.be.at.least()" instead'
    }]
  }]
});
