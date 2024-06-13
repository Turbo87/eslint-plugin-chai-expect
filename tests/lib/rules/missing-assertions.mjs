'use strict';

import {ecmaVersion} from './utils.mjs';
import rule from '../../../lib/rules/missing-assertion.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
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
    ...ecmaVersion(6),
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
    ...ecmaVersion(6),
    errors: [{
      message: 'expect(...) used without assertion'
    }]
  }]
});
