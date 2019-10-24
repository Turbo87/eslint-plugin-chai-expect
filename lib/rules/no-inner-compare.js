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
      let {expression} = node;
      if (expression.type !== 'MemberExpression' && expression.type !== 'CallExpression')
        return;

      let expect = findExpectCall(expression);
      if (!expect)
        return;

      let args = expect.arguments;
      let [firstArgument] = args;
      if (!firstArgument || firstArgument.type !== 'BinaryExpression')
        return;

      let hint = HINTS[firstArgument.operator];
      if (!hint)
        return;

      context.report({
        node: firstArgument,
        message: `operator "${firstArgument.operator}" used in expect(), use "${hint}" instead`
      });
    }
  };
};
