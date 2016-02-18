module.exports = function findExpectCall(node) {
  if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'expect') {
    return node;
  }

  if (node.type === 'MemberExpression') {
    return findExpectCall(node.object);
  }
};
