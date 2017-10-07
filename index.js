'use strict';

module.exports = {
  rules: {
    'no-inner-compare': require('./lib/rules/no-inner-compare'),
    'missing-assertion': require('./lib/rules/missing-assertion'),
    'terminating-properties': require('./lib/rules/terminating-properties'),
    'no-invalid-terminating-properties': require('./lib/rules/no-invalid-terminating-properties')
  }
};
