import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { describe, it } from 'node:test';
import noInnerCompare from '../../../lib/rules/no-inner-compare.js';
import noUncalledMethod from '../../../lib/rules/no-uncalled-method.js';
import terminatingProperties from '../../../lib/rules/terminating-properties.js';

const require = createRequire(import.meta.url);
const requireFromESLint = createRequire(require.resolve('eslint'));
const espree = requireFromESLint('espree');

// Current RuleTester supplies context.sourceCode; ESLint 2–8 uses getSourceCode().
describe('legacy ESLint source-code API', () => {
  for (const { name, rule, code, output, message } of [
    {
      name: 'no-inner-compare',
      rule: noInnerCompare,
      code: 'expect(a === b).to.be.true;',
      output: 'expect(a).to.equal(b)',
      message: 'operator "===" used in expect(), use "to.equal()" instead'
    },
    {
      name: 'no-uncalled-method',
      rule: noUncalledMethod,
      code: 'expect(fn).to.throw;',
      output: 'expect(fn).to.throw()',
      message: '"to.throw" used as property instead of method call'
    },
    {
      name: 'terminating-properties',
      rule: terminatingProperties,
      code: 'expect(value).to.be.ok();',
      output: 'expect(value).to.be.ok',
      message: '"to.be.ok" used as function'
    }
  ]) {
    it(name, () => {
      const ast = espree.parse(code, { range: true });
      const reports = [];
      let sourceRequests = 0;
      const listeners = rule.create({
        options: [],
        getSourceCode() {
          sourceRequests++;
          return { getText: node => code.slice(...node.range) };
        },
        report: report => reports.push(report)
      });

      listeners.ExpressionStatement(ast.body[0]);

      assert.equal(sourceRequests, 1);
      assert.equal(reports.length, 1);
      assert.equal(reports[0].message, message);
      const fix = reports[0].fix || reports[0].suggest[0].fix;
      const replacement = fix({ replaceText: (node, text) => ({ node, text }) });
      assert.equal(replacement.text, output);
      assert.equal(replacement.node, ast.body[0].expression);
    });
  }

  it('no-inner-compare tolerates a context without a source-code API when no comparison is checked', () => {
    const listeners = noInnerCompare.create({});
    assert.doesNotThrow(() => {
      listeners.ExpressionStatement(espree.parse('expect(value);').body[0]);
    });
  });
});
