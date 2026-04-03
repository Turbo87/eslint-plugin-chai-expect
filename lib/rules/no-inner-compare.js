'use strict';

const findExpectCall = require('../util/find-expect-call');

const HINTS = {
  '==': 'to.equal',
  '!=': 'to.not.equal',
  '===': 'to.equal',
  '!==': 'to.not.equal',
  '>': 'to.be.above',
  '>=': 'to.be.at.least',
  '<': 'to.be.below',
  '<=': 'to.be.at.most'
};

module.exports = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true
  },
  create(context) {
    let source = context.sourceCode ?? context.getSourceCode?.();

    let checkMemberOrCallExpression = (expression) => {
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

      let suggest = [];
      if (source) {
        let leftText = source.getText(firstArgument.left);
        let rightText = source.getText(firstArgument.right);
        suggest.push({
          desc: `Replace with expect(${leftText}).${hint}(${rightText})`,
          fix(fixer) {
            return fixer.replaceText(expression, `expect(${leftText}).${hint}(${rightText})`);
          }
        });
      }

      context.report({
        node: firstArgument,
        message: `operator "${firstArgument.operator}" used in expect(), use "${hint}()" instead`,
        suggest
      });
    };
    return {
      ReturnStatement(node) {
        if (
          node.argument && node.argument.type === 'CallExpression' &&
          node.argument.callee
        ) {
          checkMemberOrCallExpression(node.argument);
        } else if (node.argument && node.argument.type === 'MemberExpression') {
          checkMemberOrCallExpression(node.argument);
        }
      },
      ExpressionStatement(node) {
        let {expression} = node;
        checkMemberOrCallExpression(expression);
      }
    };
  }
};
