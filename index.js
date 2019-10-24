'use strict';

module.exports = {
  configs: {
    recommended: {
      plugins: ['chai-expect'],
      rules: {
        'chai-expect/no-inner-compare': 'error',
        'chai-expect/missing-assertion': 'error',
        'chai-expect/terminating-properties': 'error'
      }
    }
  },
  rules: {
    'no-inner-compare': require('./lib/rules/no-inner-compare'),
    'missing-assertion': require('./lib/rules/missing-assertion'),
    'terminating-properties': require('./lib/rules/terminating-properties')
  }
};
