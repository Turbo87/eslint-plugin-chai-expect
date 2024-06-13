'use strict';

const pkg = require('./package.json');

let recommendedRules = {
  'chai-expect/no-inner-compare': 'error',
  'chai-expect/no-inner-literal': 'error',
  'chai-expect/missing-assertion': 'error',
  'chai-expect/terminating-properties': 'error',
};

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  configs: {},
  rules: {
    'no-inner-compare': require('./lib/rules/no-inner-compare'),
    'no-inner-literal': require('./lib/rules/no-inner-literal'),
    'missing-assertion': require('./lib/rules/missing-assertion'),
    'terminating-properties': require('./lib/rules/terminating-properties')
  },
  processors: {}
};

plugin.configs['recommended'] = {
  plugins: ['chai-expect'],
  rules: recommendedRules,
};

plugin.configs['recommended-flat'] = {
  plugins: {
    'chai-expect': plugin,
  },
  rules: recommendedRules,
};

module.exports = plugin;
