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
  }],

  invalid: [{
    code: `
      it("fails as expected", function() {
        expect(true);
      });
    `,
    errors: [{
      message: 'expect(...) used without assertion'
    }]
  }]
});
