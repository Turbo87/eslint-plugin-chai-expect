# Changelog

## [4.0.0](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v3.1.0...v4.0.0) (2026-03-11)


### ⚠ BREAKING CHANGES

* drop support for Node.js < 20

### Features

* add ESLint 10 support ([#560](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/560)) ([@PKief](https://github.com/PKief))


## [3.1.0](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v3.0.0...v3.1.0) (2024-06-13)


### Features

* add ESLint flat config support ([#378](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/378)) ([@BePo65](https://github.com/BePo65))
* rules/terminating-properties: add `schema` field ([#387](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/387)) ([@Turbo87](https://github.com/Turbo87))
* detect missing assertions in an arrow body ([#248](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/248)) ([@jonathanperret](https://github.com/jonathanperret))


## [3.0.0](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v2.2.0...v3.0.0) (2021-10-20)


### ⚠ BREAKING CHANGES

* drop support for Node 6 and 8 ([#125](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/125))

### Features

* declare ESLint v8 support ([#173](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/173)) ([@ewanharris](https://github.com/ewanharris))


## [2.2.0](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v2.1.0...v2.2.0) (2020-07-08)


### Features

* add support for ESLint@7 as a peerDependency ([#106](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/106)) ([@epmatsw](https://github.com/epmatsw))


## [2.1.0](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v2.0.1...v2.1.0) (2019-12-07)


### Features

* add `no-inner-literal` rule ([#84](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/84)) ([@brettz9](https://github.com/brettz9))
* add ESLint peer dependency ([#76](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/76)) ([@brettz9](https://github.com/brettz9))
* add `recommended` config ([#71](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/71)) ([@brettz9](https://github.com/brettz9))
* no-inner-compare: add support for `expect(a != b).to.equal(true)` ([#81](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/81)) ([@brettz9](https://github.com/brettz9))


### Bug Fixes

* allow `terminating-properties` with `ReturnStatement` ([#88](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/88)) ([@brettz9](https://github.com/brettz9))
* allow `return` with `no-inner-compare` ([#87](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/87)) ([@brettz9](https://github.com/brettz9))


## [2.0.1](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v2.0.0...v2.0.1) (2018-10-13)


### Features

* add `.npmignore` file ([#35](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/35)) ([@Turbo87](https://github.com/Turbo87))


## [2.0.0](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v1.2.0...v2.0.0) (2018-10-13)


### ⚠ BREAKING CHANGES

* drop support for Node.js 4 and below ([#27](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/27))

### Features

* CI: add ESLint 5 to the test matrix ([#32](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/32)) ([@Turbo87](https://github.com/Turbo87))


## [1.2.0](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v1.1.1...v1.2.0) (2018-10-13)


### Features

* allow additional terminating properties to be configured ([#19](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/19)) ([@whamondg](https://github.com/whamondg))
* test against ESLint version 4 ([#21](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/21)) ([@thughes](https://github.com/thughes))


### Bug Fixes

* fix expect finder utility ([#26](https://github.com/Turbo87/eslint-plugin-chai-expect/pull/26)) ([@brokentone](https://github.com/brokentone))


## [1.1.1](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v1.1.0...v1.1.1)


### Bug Fixes

* `terminating-properties`: fix condition


## [1.1.0](https://github.com/Turbo87/eslint-plugin-chai-expect/compare/v1.0.0...v1.1.0)


### Features

* add `no-inner-compare` rule
* add `terminating-properties` rule


## 1.0.0


### Features

* add `missing-assertion` rule
