"use strict";

module.exports = function(context) {
  return {
    ExpressionStatement: function(node) {
      var expression = node.expression;
      if (expression.type !== 'CallExpression')
        return;

      var callee = expression.callee;
      if (callee.type === 'Identifier' && callee.name === 'expect') {
        context.report({
          node: node,
          message: 'expect(...) used without assertion'
        })
      }
    }
  };
};
