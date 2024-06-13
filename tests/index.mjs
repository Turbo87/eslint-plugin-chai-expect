/* eslint-env mocha */
'use strict';

import plugin from '../index.js';

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
