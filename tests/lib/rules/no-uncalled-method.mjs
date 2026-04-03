'use strict';

import rule from '../../../lib/rules/no-uncalled-method.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {RuleTester} = require('eslint');

let ruleTester = new RuleTester();
ruleTester.run('no-uncalled-method', rule, {
  valid: [{
    code: `
      it("works as expected", function() {
        expect(fn).to.throw();
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        expect(fn).to.throw(Error);
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        expect(fn).to.throw("error message");
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        return expect(fn).to.throw();
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        return;
      });
    `
  }, {
    code: 'expect(true).to.be.ok;'
  }, {
    code: 'obj.throw;'
  }, {
    code: 'somethingElse.throws;'
  }],

  invalid: [{
    code: `
      it("fails as expected", function() {
        expect(fn).to.throw;
      });
    `,
    output: `
      it("fails as expected", function() {
        expect(fn).to.throw();
      });
    `,
    errors: [{
      message: '"to.throw" used as property instead of method call'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        expect(fn).to.throws;
      });
    `,
    output: `
      it("fails as expected", function() {
        expect(fn).to.throws();
      });
    `,
    errors: [{
      message: '"to.throws" used as property instead of method call'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        expect(fn).to.Throw;
      });
    `,
    output: `
      it("fails as expected", function() {
        expect(fn).to.Throw();
      });
    `,
    errors: [{
      message: '"to.Throw" used as property instead of method call'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        return expect(fn).to.throw;
      });
    `,
    output: `
      it("fails as expected", function() {
        return expect(fn).to.throw();
      });
    `,
    errors: [{
      message: '"to.throw" used as property instead of method call'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        expect(fn).to.not.throw;
      });
    `,
    output: `
      it("fails as expected", function() {
        expect(fn).to.not.throw();
      });
    `,
    errors: [{
      message: '"to.not.throw" used as property instead of method call'
    }]
  }, {
    options: [{methods: ['include', 'satisfy']}],
    code: `
      it("fails as expected", function() {
        expect(arr).to.include;
        expect(val).to.satisfy;
      });
    `,
    output: `
      it("fails as expected", function() {
        expect(arr).to.include();
        expect(val).to.satisfy();
      });
    `,
    errors: [{
      message: '"to.include" used as property instead of method call'
    }, {
      message: '"to.satisfy" used as property instead of method call'
    }]
  }]
});
