/* eslint-env mocha */
'use strict';

const plugin = require('..');

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let rules = fs.readdirSync(path.resolve(__dirname, '../lib/rules/'))
  .map((f) => {
    return path.basename(f, '.js');
  });

describe('all rule files should be exported by the plugin', function() {
  rules.forEach(function(ruleName) {
    it('should export ' + ruleName, function() {
      assert.equal(
        plugin.rules[ruleName],
        require(path.join('../lib/rules', ruleName))
      );
    });
  });
});
