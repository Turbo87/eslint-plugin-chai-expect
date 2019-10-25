'use strict';

module.exports = function(context) {
  return {
    ExpressionStatement(node) {
      let {expression} = node;
      if (expression.type !== 'CallExpression')
        return;

      let {callee} = expression;
      if (callee.type === 'Identifier' && callee.name === 'expect') {
        context.report({
          node,
          message: 'expect(...) used without assertion'
        })
      }
    }
  };
};
