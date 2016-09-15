"use strict";

module.exports = function(context) {

  var functionName = 'expect'

  return {
    ExpressionStatement: function(node) {
      var expression = node.expression;

      if (expression.type !== 'CallExpression') {
        return;
      }


      var callee = expression.callee;

      if (callee.type === 'Identifier' && callee.name === functionName) {
        return;
      }

      var propertyName = callee.property.name;

      if (propertyName !== 'length') {
          return;
      }

      context.report({
        node: callee.property,
        message: '"to.be.length" is being deprecated, use "to.have.lengthOf" instead'
      })
    }
  };
};
