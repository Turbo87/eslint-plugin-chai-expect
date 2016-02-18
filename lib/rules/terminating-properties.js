"use strict";

var PROPERTY_TERMINATORS = [
  'ok',
  'true',
  'false',
  'null',
  'undefined',
  'exist',
  'empty',
  'arguments'
];

module.exports = function(context) {
  return {
    ExpressionStatement: function(node) {
      var expression = node.expression;
      if (expression.type !== 'CallExpression')
        return;

      var callee = expression.callee;
      if (callee.type !== 'MemberExpression')
        return;

      var property = callee.property;
      if (property.type !== 'Identifier' || property.name in PROPERTY_TERMINATORS)
        return;

      var expectCall = findExpectCall(callee.object);
      if (!expectCall)
        return;

      var source = context.getSourceCode();

      var calleeText = source.getText(callee);
      var expectText = source.getText(expectCall);
      var assertionText = calleeText.substr(expectText.length + 1);

      context.report({
        node: property,
        message: '"' + assertionText + '" used as function'
      })
    }
  };
};

function findExpectCall(node) {
  if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'expect') {
    return node;
  }

  if (node.type === 'MemberExpression') {
    return findExpectCall(node.object);
  }
}
