# Damascus
[![Build Status][build-badge]][build]
[![MIT License][license-badge]][LICENSE]
[![Semantic release][semantic-release]][semantic]
[![Damascus package][npm-dm]][damascus]

Get random districts names of Damascus.

## Installation

This package is distributed via npm:
```bash
npm install damascus
```

## Usage
```javascript
var damascus = require('damascus');
var allNames = damascus.all;
var randomName = damascus.random();
var threeRandomNames = damascus.random(3);
```

## Other
This library was developed by [Abdul-hadi Hawari](https://twitter.com/@hadabo) as a PoC to learn [semantic-release](https://www.npmjs.com/package/semantic-release). 


[build-badge]: https://img.shields.io/travis/hadabo/damascus.svg?style=flat-square
[build]: https://travis-ci.org/hadabo/damascus
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/hadabo/damascus/blob/master/LICENSE
[semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic]: https://www.npmjs.com/package/semantic-release
[npm-dm]: https://img.shields.io/npm/dm/damascus.svg?style=flat-square
[damascus]: https://www.npmjs.com/package/damascus