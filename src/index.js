import syriaData from './syria.js'

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
    return gov.districts || []
  }

  return syriaData.reduce((allDistricts, gov) => {
    return allDistricts.concat(gov.districts || [])
  }, [])
}

function getMunicipalities (governorateId = 'gov-damascus') {
  const gov = syriaData.find(g => g.id === governorateId)
  if (!gov || !gov.districts) return []
  return gov.districts.reduce((acc, dist) => {
    return acc.concat(dist.municipalities || [])
  }, []).map(m => ({ id: m.id, name: m.name, pcode: m.pcode, coordinates: m.coordinates }))
}

function getNeighborhoods (municipalityId) {
  for (const gov of syriaData) {
    if (gov.districts) {
      for (const dist of gov.districts) {
        if (dist.municipalities) {
          const mun = dist.municipalities.find(m => m.id === municipalityId)
          if (mun) return mun.neighborhoods || []
        }
      }
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
      results.push({ type: 'governorate', item: { id: gov.id, name: gov.name, pcode: gov.pcode, coordinates: gov.coordinates } })
    }

    if (gov.districts) {
      gov.districts.forEach(dist => {
        if (dist.name.en.toLowerCase().includes(q) || dist.name.ar.includes(q)) {
          results.push({ type: 'district', item: dist })
        }
        
        if (dist.municipalities) {
          dist.municipalities.forEach(mun => {
            if (mun.name.en.toLowerCase().includes(q) || mun.name.ar.includes(q)) {
              results.push({ type: 'municipality', item: { id: mun.id, name: mun.name, pcode: mun.pcode, coordinates: mun.coordinates } })
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
