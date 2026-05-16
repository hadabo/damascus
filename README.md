# Syria Regions (focusing on Damascus)

[![Snyk Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/hadabo/damascus.svg?style=flat-square)](https://snyk.io/test/github/hadabo/damascus)
[![Build Status][build-badge]][build]
[![MIT License][license-badge]][LICENSE]
[![Semantic release][semantic-release]][semantic]
[![Damascus package][npm-dm]][damascus]
[![Coverage Status][coveralls-badge]][coveralls]

Get standardized, structured data for the governorates, districts, municipalities, and neighborhoods of Syria, with a **deep-dive into Damascus**. The data is bilingual (Arabic and English) and structured to align with UN OCHA Common Operational Datasets (COD), making it the perfect source of truth for cascading dropdowns and autocompletes in applications like real estate listings, directories, and delivery platforms.

## Installation

This package is distributed via npm:
```bash
npm install damascus
```

## Usage (ES Modules & TypeScript)

Modern projects should import the package via ES Modules. Full TypeScript definitions (`.d.ts`) are included natively for excellent IDE support.

```typescript
import { search, getAll, getGovernorates, getMunicipalities, getNeighborhoods, SearchResult } from 'damascus';

// 1. Search API (Perfect for Autocomplete)
const result: SearchResult[] = search('دمشق');

// 2. Get all structured data
const allData = getAll();

// 3. Get an array of the 14 Syrian governorates
const governorates = getGovernorates();
/* 
[
  { id: 'dam', name: { en: 'Damascus', ar: 'دمشق' } },
  { id: 'ale', name: { en: 'Aleppo', ar: 'حلب' } },
  ...
]
*/

// 4. Damascus Specific APIs (Hierarchical)
const damascusMunicipalities = getMunicipalities('dam'); 
/*
[
  { id: 'dam-municipality-ancient-city-old-city', name: { en: 'Ancient City (Old City)', ar: 'المدينة القديمة' } },
  ...
]
*/

const oldCityNeighborhoods = getNeighborhoods('dam-municipality-ancient-city-old-city');
/*
[
  { id: 'dam-districts-bab-tuma', name: { en: 'Bab Tuma', ar: 'باب توما' } },
  ...
]
*/
```

### Legacy CommonJS Usage
If you are still using CommonJS:
```javascript
const syria = require('damascus');
const searchResults = syria.search('Bab Tuma'); 
```

## Features

- **Hierarchical Damascus Data**: Perfect for UI components (Select Governorate -> Select Municipality -> Select Neighborhood).
- **Search Utility**: Built-in search function to easily query the data for autocompletes.
- **Bilingual**: All items include English (`en`) and Arabic (`ar`) names.
- **TypeScript Support**: Includes type definitions (`.d.ts`) out of the box for excellent IDE support.
- **Backward Compatible**: Maintains support for legacy `getDistricts()` API.

## Other
This library was developed by [Abdul-hadi Hawari](https://twitter.com/@hadabo) as a PoC to learn [semantic-release](https://www.npmjs.com/package/semantic-release), and expanded to be a robust source of truth for Syrian regional data.

[build-badge]: https://img.shields.io/github/actions/workflow/status/hadabo/damascus/ci.yml?style=flat-square
[build]: https://github.com/hadabo/damascus/actions
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/hadabo/damascus/blob/master/LICENSE
[semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic]: https://www.npmjs.com/package/semantic-release
[npm-dm]: https://img.shields.io/npm/dm/damascus.svg?style=flat-square
[damascus]: https://www.npmjs.com/package/damascus
[coveralls]: https://coveralls.io/github/hadabo/damascus?branch=master
[coveralls-badge]: https://coveralls.io/repos/github/hadabo/damascus/badge.svg?branch=master
