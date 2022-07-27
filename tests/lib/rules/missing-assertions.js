'use strict';

const rule = require('../../../lib/rules/missing-assertion');
const {RuleTester} = require('eslint');

let ruleTester = new RuleTester();
ruleTester.run('missing-assertion', rule, {
  valid: [{
    code: `
      it("works as expected", function() {
        expect(true).to.be.ok;
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        expect(true).to.be.ok();
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        return expect(true).to.be.ok;
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        return expect(true).to.be.ok();
      });
    `
  }, {
    code: 'it("works as expected", () => expect(true).to.be.true);',
    parserOptions: { ecmaVersion: 6 },
  } ],

  invalid: [{
    code: `
      it("fails as expected", function() {
        expect(true);
      });
    `,
    errors: [{
      message: 'expect(...) used without assertion'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        return expect(true);
      });
    `,
    errors: [{
      message: 'expect(...) used without assertion'
    }]
  }, {
    code: 'it("fails as expected", () => expect(true));',
    parserOptions: { ecmaVersion: 6 },
    errors: [{
      message: 'expect(...) used without assertion'
    }]
  }]
});
