function ecmaVersion(version) {
  return {
    parserOptions: {
      ecmaVersion: version
    }
  }
}

module.exports = {
  ecmaVersion
};
