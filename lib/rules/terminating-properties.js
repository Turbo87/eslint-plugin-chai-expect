'use strict';

const findExpectCall = require('../util/find-expect-call');

const PROPERTY_TERMINATORS = [
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
  const options = context.options[0] || {};
  const additionalTerminators = options.properties || [];
  const validTerminators = [...PROPERTY_TERMINATORS, ...additionalTerminators];

  return {
    ExpressionStatement(node) {
      const {expression} = node;
      if (expression.type !== 'CallExpression')
        return;

      const {callee} = expression;
      if (callee.type !== 'MemberExpression')
        return;

      const {property} = callee;
      if (property.type !== 'Identifier' || !validTerminators.includes(property.name))
        return;

      const expectCall = findExpectCall(callee.object);
      if (!expectCall)
        return;

      const source = context.getSourceCode();

      const calleeText = source.getText(callee);
      const expectText = source.getText(expectCall);
      const assertionText = calleeText.substr(expectText.length + 1);

      context.report({
        node: property,
        message: `"${assertionText}" used as function`
      })
    }
  };
};
