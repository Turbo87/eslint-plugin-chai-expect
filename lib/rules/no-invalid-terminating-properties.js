"use strict";

var findExpectCall = require('../util/find-expect-call');
var PROPERTY_TERMINATORS = require('../util/property-terminators');

module.exports = function(context) {
  return {
    ExpressionStatement: function(node) {
      var expression = node.expression;

      if (expression.type !== 'MemberExpression') {
        return;
      }

      var property = expression.property;
      if (property.type !== 'Identifier' || PROPERTY_TERMINATORS.indexOf(property.name) !== -1) {
        return;
      }

      var expectCall = findExpectCall(expression);
      if (!expectCall)
        return;

      context.report({
        node: property,
        message: '"' + property.name + '" is not a valid property'
      })
    }
  };
};


