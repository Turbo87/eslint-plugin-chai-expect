'use strict';

const plugin = {
  meta: {
    name: "eslint-plugin-chai-export",
    version: "3.0.0"
},
  configs: {
    'recommended-legacy': {
      plugins: ['chai-expect'],
      rules: {
        'chai-expect/no-inner-compare': 'error',
        'chai-expect/no-inner-literal': 'error',
        'chai-expect/missing-assertion': 'error',
        'chai-expect/terminating-properties': 'error'
      }
    }
  },
  rules: {
    'no-inner-compare': require('./lib/rules/no-inner-compare'),
    'no-inner-literal': require('./lib/rules/no-inner-literal'),
    'missing-assertion': require('./lib/rules/missing-assertion'),
    'terminating-properties': require('./lib/rules/terminating-properties')
  },
  processors: {}
};

Object.assign(plugin.configs, {
  recommended: {
      plugins: {
        'chai-expect': plugin
      },
      rules: {
        'chai-expect/no-inner-compare': 'error',
        'chai-expect/no-inner-literal': 'error',
        'chai-expect/missing-assertion': 'error',
        'chai-expect/terminating-properties': 'error'
      }
  }
})

module.exports = plugin;
