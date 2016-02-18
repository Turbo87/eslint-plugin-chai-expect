'use strict';

module.exports = {
  rules: {
    'missing-assertion': require('./lib/rules/missing-assertion'),
    'terminating-properties': require('./lib/rules/terminating-properties')
  }
};
