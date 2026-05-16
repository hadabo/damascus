import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const syriaData = JSON.parse(readFileSync(join(__dirname, 'syria.json'), 'utf8'));

function getAll () {
  return syriaData
}

function getGovernorates () {
  return syriaData.map(gov => ({
    id: gov.id,
    name: gov.name
  }))
}

function getDistricts (governorateId) {
  if (governorateId) {
    const gov = syriaData.find(g => g.id === governorateId)
    if (!gov) return []
    // Backward compatibility for Damascus
    if (gov.municipalities) {
      return gov.municipalities.reduce((acc, mun) => {
        acc.push({ id: mun.id, name: mun.name })
        return acc.concat(mun.neighborhoods)
      }, [])
    }
    return gov.districts || []
  }

  return syriaData.reduce((allDistricts, gov) => {
    if (gov.municipalities) {
      const flatDamascus = gov.municipalities.reduce((acc, mun) => {
        acc.push({ id: mun.id, name: mun.name })
        return acc.concat(mun.neighborhoods || [])
      }, [])
      return allDistricts.concat(flatDamascus)
    }
    return allDistricts.concat(gov.districts || [])
  }, [])
}

function getMunicipalities (governorateId = 'dam') {
  const gov = syriaData.find(g => g.id === governorateId)
  if (!gov || !gov.municipalities) return []
  return gov.municipalities.map(m => ({ id: m.id, name: m.name }))
}

function getNeighborhoods (municipalityId) {
  for (const gov of syriaData) {
    if (gov.municipalities) {
      const mun = gov.municipalities.find(m => m.id === municipalityId)
      if (mun) return mun.neighborhoods || []
    }
  }
  return []
}

function search (query) {
  if (!query || typeof query !== 'string') return []
  const q = query.toLowerCase()
  const results = []

  syriaData.forEach(gov => {
    if (gov.name.en.toLowerCase().includes(q) || gov.name.ar.includes(q)) {
      results.push({ type: 'governorate', item: { id: gov.id, name: gov.name } })
    }

    if (gov.districts) {
      gov.districts.forEach(dist => {
        if (dist.name.en.toLowerCase().includes(q) || dist.name.ar.includes(q)) {
          results.push({ type: 'district', item: dist })
        }
      })
    }

    if (gov.municipalities) {
      gov.municipalities.forEach(mun => {
        if (mun.name.en.toLowerCase().includes(q) || mun.name.ar.includes(q)) {
          results.push({ type: 'municipality', item: { id: mun.id, name: mun.name } })
        }
        if (mun.neighborhoods) {
          mun.neighborhoods.forEach(neigh => {
            if (neigh.name.en.toLowerCase().includes(q) || neigh.name.ar.includes(q)) {
              results.push({ type: 'neighborhood', item: neigh, municipalityId: mun.id })
            }
          })
        }
      })
    }
  })

  return results
}

export {
  getAll,
  getGovernorates,
  getDistricts,
  getMunicipalities,
  getNeighborhoods,
  search
}
