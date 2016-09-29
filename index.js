'use strict';

module.exports = {
  rules: {
    'no-inner-compare': require('./lib/rules/no-inner-compare'),
    'missing-assertion': require('./lib/rules/missing-assertion'),
    'terminating-properties': require('./lib/rules/terminating-properties'),
    'no-exclusive-parallel': require('./lib/rules/no-exclusive-parallel')
  }
};
