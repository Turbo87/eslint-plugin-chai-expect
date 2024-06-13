const eslintPkg = require('eslint/package.json');

const USE_LANGUAGE_OPTIONS = eslintPkg.version.startsWith('9.');

function ecmaVersion(version) {
  if (USE_LANGUAGE_OPTIONS) {
    return {
      languageOptions: {
        ecmaVersion: version
      }
    };
  }

  return {
    parserOptions: {
      ecmaVersion: version
    }
  }
}

module.exports = {
  ecmaVersion
};
