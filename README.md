# Damascus (Syrian Regional Data API)

[![Snyk Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/hadabo/damascus.svg?style=flat-square)](https://snyk.io/test/github/hadabo/damascus)
[![Build Status][build-badge]][build]
[![MIT License][license-badge]][LICENSE]
[![Semantic release][semantic-release]][semantic]
[![Damascus package][npm-dm]][damascus]
[![Coverage Status][coveralls-badge]][coveralls]

The ultimate **environment-agnostic source of truth** for Syrian administrative data. 

This package provides a meticulously standardized, deeply hierarchical dataset covering all of Syria (Governorates ➔ Districts ➔ Municipalities ➔ Neighborhoods/Populated Places). 

It is completely aligned with **UN OCHA Common Operational Datasets (COD)**, featuring official P-Codes and geo-spatial coordinates. It's the perfect backbone for cascading dropdowns, map plots, and autocompletes in applications like real estate listings, directories, and delivery platforms.

## Installation

This package is distributed via npm:
```bash
npm install damascus
```

## Usage (Core API)

Modern projects should import the package via ES Modules. Full TypeScript definitions (`.d.ts`) are included natively for excellent IDE support.

```typescript
import { search, getAll, getGovernorates, getDistricts, getMunicipalities, getNeighborhoods } from 'damascus';

// 1. Search API (Perfect for Autocomplete)
const result = search('دمشق');

// 2. Get the 14 Syrian governorates
const governorates = getGovernorates();
/* 
[
  { 
    id: 'dam', 
    pcode: 'SY01', 
    coordinates: { lat: 33.5138, lng: 36.2765 },
    name: { en: 'Damascus', ar: 'دمشق' } 
  },
  ...
]
*/

// 3. Drill down into the unified hierarchy
const damascusDistricts = getDistricts('dam'); 
const municipalities = getMunicipalities('dam-damascus'); 
const neighborhoods = getNeighborhoods('dam-municipality-ancient-city-old-city');
```

## Usage (React Hooks)

To eliminate boilerplate when building cascading dropdowns, we provide highly-optimized React hooks out of the box!

```typescript
import { useGovernorates, useDistricts, useMunicipalities } from 'damascus/react';
import { useState } from 'react';

function LocationSelector() {
  const [govId, setGovId] = useState('dam');
  const [distId, setDistId] = useState('dam-damascus');

  const governorates = useGovernorates();
  const districts = useDistricts(govId); // Automatically reacts to govId changes!
  const municipalities = useMunicipalities(distId);

  return (
    // Render your dropdowns...
  )
}
```

## Features

- **Whole of Syria Coverage**: Includes massive generated datasets for all 14 governorates down to populated places.
- **UN OCHA P-Codes**: Built-in standard `pcode` identifiers for reliable cross-dataset interoperability.
- **Geo-Spatial Coordinates**: Every level includes precise `{ lat, lng }` coordinates.
- **React Hooks included**: Exported via `damascus/react` for instant UI integration.
- **Search Utility**: Built-in search function to easily query the deep data tree.
- **Bilingual**: All items include English (`en`) and Arabic (`ar`) names.
- **TypeScript Support**: First-class types mapping the entire hierarchy.

## Other
This library was developed by [Abdulhadi Hawari](https://twitter.com/@hadabo) as a PoC to learn [semantic-release](https://www.npmjs.com/package/semantic-release), and expanded to be a robust source of truth for Syrian regional data.

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
