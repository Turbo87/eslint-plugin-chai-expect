'use strict';

const findExpectCall = require('../util/find-expect-call');

const HINTS = {
  '==': 'to.equal()',
  '!=': 'to.not.equal()',
  '===': 'to.equal()',
  '!==': 'to.not.equal()',
  '>': 'to.be.above()',
  '>=': 'to.be.at.least()',
  '<': 'to.be.below()',
  '<=': 'to.be.at.most()'
};

module.exports = function(context) {
  return {
    ExpressionStatement(node) {
      const {expression} = node;
      if (expression.type !== 'MemberExpression' && expression.type !== 'CallExpression')
        return;

      const expect = findExpectCall(expression);
      if (!expect)
        return;

      const args = expect.arguments;
      const [firstArgument] = args;
      if (!firstArgument || firstArgument.type !== 'BinaryExpression')
        return;

      const hint = HINTS[firstArgument.operator];
      if (!hint)
        return;

      context.report({
        node: firstArgument,
        message: `operator "${firstArgument.operator}" used in expect(), use "${hint}" instead`
      })
    }
  };
};
