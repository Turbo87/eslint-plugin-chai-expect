'use strict';

var rule = require('../../../lib/rules/no-invalid-terminating-properties');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-invalid-terminating-properties', rule, {
  valid: [{
    code: 'expect(foo).to.be.ok;'
  }, {
    code: 'expect(foo).to.be.true;'
  }, {
    code: 'expect(foo).to.be.false;'
  }, {
    code: 'expect(foo).to.be.null;'
  }, {
    code: 'expect(foo).to.be.undefined;'
  }, {
    code: 'expect(foo).to.exist;'
  }, {
    code: 'expect(foo).to.be.empty;'
  }, {
    code: 'expect(foo).to.be.arguments;'
  }, {
    code: 'expect(foo).to.be.json;',
    options: [ {"properties": ["json"] } ]
  }, {
    code: 'expect(foo).to.be.html;',
    options: [ {"properties": ["json", "html"] } ]
  }, {
    code: 'foo(bar).to.be.falsy;'
  }],

  invalid: [{
    code: 'expect(foo).to.be.falsy;',
    errors: [{
      message: '"falsy" is not a valid property'
    }]
  }, {
    code: 'expect(foo).to.be.truthy;',
    errors: [{
      message: '"truthy" is not a valid property'
    }]
  }, {
    code: 'expect(foo).to.be.json;',
    errors: [{
      message: '"json" is not a valid property'
    }]
  }]
});
