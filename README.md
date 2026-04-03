# eslint-plugin-chai-expect

[![CI](https://github.com/Turbo87/eslint-plugin-chai-expect/actions/workflows/ci.yml/badge.svg)](https://github.com/Turbo87/eslint-plugin-chai-expect/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/eslint-plugin-chai-expect.svg)](https://www.npmjs.com/package/eslint-plugin-chai-expect)

ESLint plugin that checks for common chai.js `expect()` mistakes

> [!IMPORTANT]
> The `recommended` preset is for the ESLint legacy configuration system
> (`.eslintrc.json`). The `recommended-flat` configuration is for the new flat
> configuration system.

## Requirements

- Node.js 20 or above
- ESLint 2.x to 10.x


## Installation

```
npm install --save-dev eslint-plugin-chai-expect
```


## Configuration

### Legacy ESLint Configuration Format (.eslintrc.json)

Add a `plugins` section and specify `chai-expect` as a plugin:

```json
{
  "plugins": [
    "chai-expect"
  ]
}
```

Enable the rules that you would like to use:

```json
{
  "rules": {
    "chai-expect/no-inner-compare": 2,
    "chai-expect/no-inner-literal": 2,
    "chai-expect/missing-assertion": 2,
    "chai-expect/terminating-properties": 2
  }
}
```

Or, if you just want the above defaults, you can avoid all of the above
and just extend the config:

```json
{
  "extends": ["plugin:chai-expect/recommended"]
}
```

### Flat ESLint Configuration Format (eslint.config.js)

Add a `plugins` section and specify `chai-expect` as a plugin and enable the rules that you would like to use:

```js
import chaiExpectPlugin from 'eslint-plugin-chai-expect';

export default [
  {
    "plugins": {
      "chai-expect": chaiExpectPlugin
    },
    "rules": {
      "chai-expect/no-inner-compare": 2,
      "chai-expect/no-inner-literal": 2,
      "chai-expect/missing-assertion": 2,
      "chai-expect/terminating-properties": 2,
      "chai-expect/no-uncalled-method": 2
    }
  }
];
```

Or, if you just want the above defaults, you can avoid all of the above
and just extend the config:

```js
import chaiExpectPlugin from 'eslint-plugin-chai-expect';

export default [
  chaiExpectPlugin.configs["recommended-flat"],
  {
    // ...
  },
];
```

## Rules

- `no-inner-compare` - Prevent using comparisons in the `expect()` argument
- `no-inner-literal` - Prevent using literals in the `expect()` argument
  (`undefined`, `null`, `NaN`, `(+|-)Infinity`, `this`, booleans, numbers,
  strings, and BigInt or regex literals)
- `missing-assertion` - Prevent calling `expect(...)` without an assertion
  like `.to.be.ok`
- `terminating-properties` - Prevent calling `to.be.ok` and other assertion
  properties as functions
- `no-uncalled-method` - Prevent using `to.throw` and other assertion
  methods as properties without calling them


### Additional configuration

#### terminating-properties rule

A number of extensions to chai add additional terminating properties.  For example [chai-http](https://github.com/chaijs/chai-http) adds:

 - headers
 - html
 - ip
 - json
 - redirect
 - text

The terminating-properties rule can be configured to ensure these (or other) additional properties are not used as functions:

```json
{
  "rules": {
    "chai-expect/terminating-properties": ["error", {
      "properties": ["headers", "html", "ip", "json", "redirect", "test"]
    }]
  }
}
```

#### no-uncalled-method rule

By default, this rule checks for `throw`, `throws`, and `Throw`. You can configure additional methods that should not be used as properties:

```json
{
  "rules": {
    "chai-expect/no-uncalled-method": ["error", {
      "methods": ["include", "satisfy", "respondTo"]
    }]
  }
}
```


## License

eslint-plugin-chai-expect is licensed under the [MIT License](https://opensource.org/license/mit).
