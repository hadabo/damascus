import { writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import xlsx from 'xlsx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const syriaFile = join(__dirname, '../src/syria.js');
const xlsxFile = join(__dirname, 'syr_admin_boundaries.xlsx');

if (!existsSync(xlsxFile)) {
  console.error('🚨 Error: syr_admin_boundaries.xlsx not found in the tools directory.');
  process.exit(1);
}

const workbook = xlsx.readFile(xlsxFile);

const parseCoord = (val) => {
  if (!val) return undefined;
  const num = parseFloat(val);
  return isNaN(num) ? undefined : num;
};

const getCoords = (lat, lng) => {
  const cLat = parseCoord(lat);
  const cLng = parseCoord(lng);
  if (cLat !== undefined && cLng !== undefined) return { lat: cLat, lng: cLng };
  return undefined;
};

const makeId = (prefix, enName) => {
  const cleanName = enName ? enName.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : 'unknown';
  return `${prefix}-${cleanName}`;
};

// Data stores
const governorates = new Map(); // pcode -> gov object
const districts = new Map(); // pcode -> dist object
const municipalities = new Map(); // pcode -> muni object

let stats = { govs: 0, dists: 0, munis: 0, neighs: 0 };

// 1. Governorates (syr_admin1)
if (workbook.Sheets['syr_admin1']) {
  xlsx.utils.sheet_to_json(workbook.Sheets['syr_admin1']).forEach(row => {
    const id = makeId('gov', row.adm1_name);
    const coords = getCoords(row.center_lat, row.center_lon);
    const gov = {
      id,
      name: { en: row.adm1_name || '', ar: row.adm1_name1 || '' },
      pcode: row.adm1_pcode,
    };
    if (coords) gov.coordinates = coords;
    gov.districts = [];
    
    governorates.set(row.adm1_pcode, gov);
    stats.govs++;
  });
}

// 2. Districts (syr_admin2)
if (workbook.Sheets['syr_admin2']) {
  xlsx.utils.sheet_to_json(workbook.Sheets['syr_admin2']).forEach(row => {
    const gov = governorates.get(row.adm1_pcode);
    if (!gov) return;

    const id = makeId('dist', row.adm2_name);
    const coords = getCoords(row.center_lat, row.center_lon);
    const dist = {
      id,
      name: { en: row.adm2_name || '', ar: row.adm2_name1 || '' },
      pcode: row.adm2_pcode,
    };
    if (coords) dist.coordinates = coords;
    dist.municipalities = [];
    
    districts.set(row.adm2_pcode, dist);
    gov.districts.push(dist);
    stats.dists++;
  });
}

// 3. Municipalities (syr_admin3)
if (workbook.Sheets['syr_admin3']) {
  xlsx.utils.sheet_to_json(workbook.Sheets['syr_admin3']).forEach(row => {
    const dist = districts.get(row.adm2_pcode);
    if (!dist) return;

    const id = makeId('muni', row.adm3_name);
    const coords = getCoords(row.center_lat, row.center_lon);
    const muni = {
      id,
      name: { en: row.adm3_name || '', ar: row.adm3_name1 || '' },
      pcode: row.adm3_pcode,
    };
    if (coords) muni.coordinates = coords;
    muni.neighborhoods = [];
    
    municipalities.set(row.adm3_pcode, muni);
    dist.municipalities.push(muni);
    stats.munis++;
  });
}

// 4. Neighborhoods (syr_populatedplaces)
if (workbook.Sheets['syr_populatedplaces']) {
  xlsx.utils.sheet_to_json(workbook.Sheets['syr_populatedplaces']).forEach(row => {
    const muni = municipalities.get(row.adm3_pcode);
    if (!muni) return;

    const id = makeId('neigh', row.featurename_en || row.featurename_ar);
    const coords = getCoords(row.point_y, row.point_x);
    const neigh = {
      id,
      name: { en: row.featurename_en || '', ar: row.featurename_ar || '' },
      pcode: row.pcode,
    };
    if (coords) neigh.coordinates = coords;
    
    // Ensure no duplicates by pcode
    if (!muni.neighborhoods.find(n => n.pcode === neigh.pcode)) {
      muni.neighborhoods.push(neigh);
      stats.neighs++;
    }
  });
}

// 5. Supplement Neighborhoods (syr_neighborhoods)
if (workbook.Sheets['syr_neighborhoods']) {
  xlsx.utils.sheet_to_json(workbook.Sheets['syr_neighborhoods']).forEach(row => {
    const muni = municipalities.get(row.adm3_pcode);
    if (!muni) return;

    const pcode = row.neighborhoodpcode;
    const exists = muni.neighborhoods.find(n => n.pcode === pcode);
    if (!exists) {
      const id = makeId('neigh', row.neighborhoodname_en || row.neighborhoodname_ar);
      const neigh = {
        id,
        name: { en: row.neighborhoodname_en || '', ar: row.neighborhoodname_ar || '' },
        pcode
      };
      muni.neighborhoods.push(neigh);
      stats.neighs++;
    }
  });
}

// Format the data array
const finalData = Array.from(governorates.values());

writeFileSync(syriaFile, `export default ${JSON.stringify(finalData, null, 2)}\n`);
console.log(`✅ Success! syria.js rebuilt completely from scratch!`);
console.log(`- Governorates: ${stats.govs}`);
console.log(`- Districts: ${stats.dists}`);
console.log(`- Municipalities: ${stats.munis}`);
console.log(`- Neighborhoods: ${stats.neighs}`);
