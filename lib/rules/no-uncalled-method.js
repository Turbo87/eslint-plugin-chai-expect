'use strict';

const findExpectCall = require('../util/find-expect-call');

const METHOD_PROPERTIES = [
  'throw',
  'throws',
  'Throw'
];

const ruleSchema = [
  {
    type: 'object',
    properties: {
      methods: {
        type: 'array',
          items: {
            type: 'string'
          }
        },
    },
    additionalProperties: false,
  },
];

module.exports = {
  meta: {
    type: 'problem',
    schema: ruleSchema,
    fixable: 'code'
  },
  create (context) {
    let options = context.options[0] || {};
    let additionalMethods = options.methods || [];
    let validMethods = [...METHOD_PROPERTIES, ...additionalMethods];

    function checkUseAsProperty (expression) {
      if (expression.type !== 'MemberExpression')
        return;

      let {property} = expression;
      if (property.type !== 'Identifier' || !validMethods.includes(property.name))
        return;

      let expectCall = findExpectCall(expression.object);
      if (!expectCall)
        return;

      let source = context.sourceCode ?? context.getSourceCode();

      let expectText = source.getText(expectCall);
      let expressionText = source.getText(expression);
      let assertionText = expressionText.substr(expectText.length + 1);

      context.report({
        node: property,
        message: `"${assertionText}" used as property instead of method call`,
        fix(fixer) {
          return fixer.replaceText(expression, expressionText + '()');
        }
      });
    }

    return {
      ReturnStatement(node) {
        let {argument} = node;
        if (argument) {
          checkUseAsProperty(argument);
        }
      },
      ExpressionStatement (node) {
        let {expression} = node;
        checkUseAsProperty(expression);
      }
    };
  }
};
