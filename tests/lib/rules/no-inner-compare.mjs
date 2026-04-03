'use strict';

import rule from '../../../lib/rules/no-inner-compare.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {RuleTester} = require('eslint');
const eslintVersion = parseInt(require('eslint/package.json').version.split('.')[0], 10);

// ESLint 7+ supports suggestion testing in RuleTester
function suggestions(list) {
  return eslintVersion >= 7 ? { suggestions: list } : {};
}

let ruleTester = new RuleTester();
ruleTester.run('no-inner-compare', rule, {
  valid: [{
    code: 'new A();'
  }, {
    code: 'expect(true).to.be.ok;'
  }, {
    code: 'expect(a && b).to.be.ok;'
  }, {
    code: 'expect(a || b).to.be.ok;'
  }, {
    code: 'expect(a | b).to.be.ok;'
  }, {
    code: 'expect(a).to.equal(5);'
  }, {
    code: `
      it('should have no problems', function () {
        return expect(a).to.be.ok();
      });
    `
  }, {
    code: `
    it('should have no problems', function () {
      return new A();
    });
    `
  }],

  invalid: [{
    code: 'expect(a < b).to.be.ok;',
    errors: [{
      message: 'operator "<" used in expect(), use "to.be.below()" instead',
      ...suggestions([{
        desc: 'Replace with expect(a).to.be.below(b)',
        output: 'expect(a).to.be.below(b);'
      }])
    }]
  }, {
    code: 'expect(a == b).to.be.ok;',
    errors: [{
      message: 'operator "==" used in expect(), use "to.equal()" instead',
      ...suggestions([{
        desc: 'Replace with expect(a).to.equal(b)',
        output: 'expect(a).to.equal(b);'
      }])
    }]
  }, {
    code: 'expect(a !== b).to.be.ok;',
    errors: [{
      message: 'operator "!==" used in expect(), use "to.not.equal()" instead',
      ...suggestions([{
        desc: 'Replace with expect(a).to.not.equal(b)',
        output: 'expect(a).to.not.equal(b);'
      }])
    }]
  }, {
    code: 'expect(a >= b).to.be.ok;',
    errors: [{
      message: 'operator ">=" used in expect(), use "to.be.at.least()" instead',
      ...suggestions([{
        desc: 'Replace with expect(a).to.be.at.least(b)',
        output: 'expect(a).to.be.at.least(b);'
      }])
    }]
  }, {
    code: 'expect(a >= b).to.equal(true);',
    errors: [{
      message: 'operator ">=" used in expect(), use "to.be.at.least()" instead',
      ...suggestions([{
        desc: 'Replace with expect(a).to.be.at.least(b)',
        output: 'expect(a).to.be.at.least(b);'
      }])
    }]
  }, {
    code: `
      it('should have no problems but does', function () {
        return expect(a >= b).to.equal(true);
      });
    `,
    errors: [{
      message: 'operator ">=" used in expect(), use "to.be.at.least()" instead',
      ...suggestions([{
        desc: 'Replace with expect(a).to.be.at.least(b)',
        output: `
      it('should have no problems but does', function () {
        return expect(a).to.be.at.least(b);
      });
    `
      }])
    }]
  }, {
    code: `
      it('should have no problems but does', function () {
        return expect(a >= b).to.be.true;
      });
    `,
    errors: [{
      message: 'operator ">=" used in expect(), use "to.be.at.least()" instead',
      ...suggestions([{
        desc: 'Replace with expect(a).to.be.at.least(b)',
        output: `
      it('should have no problems but does', function () {
        return expect(a).to.be.at.least(b);
      });
    `
      }])
    }]
  }]
});
