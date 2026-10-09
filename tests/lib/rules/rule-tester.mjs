import { createRequire } from 'node:module';
import { describe, it } from 'node:test';

const require = createRequire(import.meta.url);
const { RuleTester } = require('eslint');

RuleTester.describe = describe;
RuleTester.it = it;

export { RuleTester };
