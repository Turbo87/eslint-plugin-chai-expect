"use strict";

var findExpectCall = require('../util/find-expect-call');

var HINTS = {
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
    ExpressionStatement: function(node) {
      var expression = node.expression;
      if (expression.type !== 'MemberExpression')
        return;

      var expect = findExpectCall(expression);
      if (!expect)
        return;

      var args = expect.arguments;
      var firstArgument = args[0];
      if (!firstArgument || firstArgument.type !== 'BinaryExpression')
        return;

      var hint = HINTS[firstArgument.operator];
      if (!hint)
        return;

      context.report({
        node: firstArgument,
        message: 'operator "' + firstArgument.operator + '" used in expect(), use "' + hint + '" instead'
      })
    }
  };
};
