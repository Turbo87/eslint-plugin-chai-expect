import eslint from 'eslint';
import plugin from 'eslint-plugin-chai-expect';

const RuleTester  = eslint.RuleTester;
const rule = plugin.rules['no-inner-literal'];

let ruleTester = new RuleTester();
ruleTester.run('no-inner-literal', rule, {
  valid: [{
    code: 'new A();'
  }, {
    code: 'expect();'
  }, {
    code: 'expect(a).to.be.ok;'
  }, {
    code: 'expect(a && b).to.be.ok;'
  }, {
    code: 'expect(a || b).to.be.ok;'
  }, {
    code: 'expect(a).to.equal(5);'
  }, {
    code: 'expect(`template literal`).to.equal(5);',
    languageOptions: {
      ecmaVersion: 2015
    }
  }, {
    code: 'expect(tagged`template literal`).to.equal(5);',
    languageOptions: {
      ecmaVersion: 2015
    }
  }, {
    code: `
      it('should have no problems', function () {
        return expect(a).to.be.ok();
      });
    `
  }, {
    code: `
      it('should have no problems', function () {
        return expect(a).to.be.true;
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
    code: 'expect(undefined).to.be.ok;',
    errors: [{
      message: '`undefined` used in expect()'
    }]
  }, {
    code: 'expect(null).to.be.ok;',
    errors: [{
      message: '`null` used in expect()'
    }]
  }, {
    code: 'expect(true).to.be.ok;',
    errors: [{
      message: '`true` used in expect()'
    }]
  }, {
    code: 'expect(52).to.be.ok;',
    errors: [{
      message: '`52` used in expect()'
    }]
  }, {
    code: 'expect("string").to.be.ok;',
    errors: [{
      message: '`"string"` used in expect()'
    }]
  }, {
    code: 'expect(/regex/).to.be.ok;',
    errors: [{
      message: '`/regex/` used in expect()'
    }]
  }, {
    code: 'expect(NaN).to.be.ok;',
    errors: [{
      message: '`NaN` used in expect()'
    }]
  }, {
    code: 'expect(Infinity).to.be.ok;',
    errors: [{
      message: '`Infinity` used in expect()'
    }]
  }, {
    code: 'expect(+Infinity).to.be.ok;',
    errors: [{
      message: '`+Infinity` used in expect()'
    }]
  }, {
    code: 'expect(-Infinity).to.be.ok;',
    errors: [{
      message: '`-Infinity` used in expect()'
    }]
  }, {
    code: 'expect(this).to.be.ok;',
    errors: [{
      message: '`this` used in expect()'
    }]
  }, {
    code: 'expect(false).to.equal(true);',
    errors: [{
      message: '`false` used in expect()'
    }]
  }, {
    code: `
      it('should have no problems but does', function () {
        return expect(false).to.equal(true);
      });
    `,
    errors: [{
      message: '`false` used in expect()'
    }]
  }, {
    code: `
      it('should have no problems but does', function () {
        return expect(false).to.be.true;
      });
    `,
    errors: [{
      message: '`false` used in expect()'
    }]
  }, {
    code: 'expect(132n).to.be.ok;',
    errors: [{
      message: '`132n` used in expect()'
    }],
    languageOptions: {
      ecmaVersion: 2020
    }
  }]
});
