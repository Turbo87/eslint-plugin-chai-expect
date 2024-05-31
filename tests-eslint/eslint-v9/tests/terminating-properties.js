'use strict';

const { RuleTester } = require('eslint');
const plugin = require('eslint-plugin-chai-expect');

const rule = plugin.rules['terminating-properties'];

let ruleTester = new RuleTester();
ruleTester.run('terminating-properties', rule, {
  valid: [{
    code: `
      it("works as expected", function() {
        expect(true).to.be.ok;
      });
    `
  }, {
    code: `
      it("works as expected", function() {
        return;
      });
    `
  }, {
    code: 'ok();'
  }, {
    code: 'somethingElse.ok();'
  }, {
    code: 'expect(something).to.equal(somethingElse);'
  }],

  invalid: [{
    code: `
      it("fails as expected", function() {
        expect(true).to.be.ok();
      });
    `,
    errors: [{
      message: '"to.be.ok" used as function'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        expect(true).to.be.false();
      });
    `,
    errors: [{
      message: '"to.be.false" used as function'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        expect(true).to.exist();
      });
    `,
    errors: [{
      message: '"to.exist" used as function'
    }]
  },  {
    options: [{properties:['something', 'somethingElse']}],
    code: `
      it("fails as expected", function() {
        expect(result).to.be.something();
        expect(result).to.be.somethingElse();
      });
    `,
    errors: [{
      message: '"to.be.something" used as function'
    }, {
      message: '"to.be.somethingElse" used as function'
    }]
  }, {
    code: `
      it("fails as expected", function() {
        return expect(true).to.exist();
      });
    `,
    errors: [{
      message: '"to.exist" used as function'
    }]
  },  {
    options: [{properties:['something', 'somethingElse']}],
    code: `
      it("fails as expected", function() {
        expect(result).to.be.something();
        return expect(result).to.be.somethingElse();
      });
    `,
    errors: [{
      message: '"to.be.something" used as function'
    }, {
      message: '"to.be.somethingElse" used as function'
    }]
  }]
});
