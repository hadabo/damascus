import { describe, it } from 'mocha'
import { expect } from 'chai'
import * as syria from '../src/index.js'

describe('syria-regions', () => {
  describe('getAll', () => {
    it('should be an array of objects', () => {
      const all = syria.getAll()
      expect(all).to.be.an('array')
      expect(all[0]).to.have.property('id')
      expect(all[0]).to.have.property('name')
      expect(all[0]).to.have.property('districts')
      expect(all[1]).to.have.property('districts')
    })
  })

  describe('getGovernorates', () => {
    it('should return an array of 14 governorates', () => {
      const govs = syria.getGovernorates()
      expect(govs).to.be.an('array')
      expect(govs).to.have.length(14)
      expect(govs[0]).to.have.property('id')
      expect(govs[0]).to.have.property('name')
      expect(govs[0].name).to.have.property('en')
      expect(govs[0].name).to.have.property('ar')
    })
  })

  describe('getDistricts', () => {
    it('should return all districts if no id is provided', () => {
      const districts = syria.getDistricts()
      expect(districts).to.be.an('array')
      expect(districts.length).to.be.greaterThan(13)
      expect(districts[0]).to.have.property('id')
      expect(districts[0]).to.have.property('name')
    })

    it('should return specific districts for a governorate id', () => {
      const damDistricts = syria.getDistricts('gov-damascus')
      expect(damDistricts).to.be.an('array')
      expect(damDistricts.length).to.equal(1)
      expect(damDistricts[0].id).to.equal('dist-damascus')
    })

    it('should return empty array for invalid id', () => {
      const districts = syria.getDistricts('invalid-id')
      expect(districts).to.be.an('array')
      expect(districts).to.have.length(0)
    })
  })

  describe('getMunicipalities', () => {
    it('should return municipalities for a given governorate', () => {
      const muns = syria.getMunicipalities('gov-damascus')
      expect(muns).to.be.an('array')
      expect(muns.length).to.be.greaterThan(0)
      expect(muns[0]).to.have.property('id')
      expect(muns[0]).to.have.property('name')
    })

    it('should return empty array for governorate without municipalities', () => {
      const muns = syria.getMunicipalities('invalid-id')
      expect(muns).to.be.an('array')
      expect(muns).to.have.length(0)
    })
  })

  describe('getNeighborhoods', () => {
    it('should return neighborhoods for a given municipality id', () => {
      const muns = syria.getMunicipalities()
      const neighborhoods = syria.getNeighborhoods(muns[0].id)
      expect(neighborhoods).to.be.an('array')
      expect(neighborhoods.length).to.be.greaterThan(0)
      expect(neighborhoods[0]).to.have.property('id')
      expect(neighborhoods[0]).to.have.property('name')
    })

    it('should return empty array for invalid municipality id', () => {
      const neighborhoods = syria.getNeighborhoods('invalid-id')
      expect(neighborhoods).to.be.an('array')
      expect(neighborhoods).to.have.length(0)
    })
  })

  describe('search', () => {
    it('should find results for english query', () => {
      const results = syria.search('damascus')
      expect(results).to.be.an('array')
      expect(results.length).to.be.greaterThan(0)
      expect(results[0].type).to.equal('governorate')
    })

    it('should find results for arabic query', () => {
      const results = syria.search('دمشق')
      expect(results).to.be.an('array')
      expect(results.length).to.be.greaterThan(0)
      expect(results[0].type).to.equal('governorate')
    })

    it('should find results for districts', () => {
      const results = syria.search('damascus')
      // "damascus" matches both the governorate and the district
      const hasDistrict = results.find(r => r.type === 'district')
      expect(hasDistrict).to.not.be.undefined
    })

    it('should find results for municipalities', () => {
      const results = syria.search('Areesheh')
      const hasMuni = results.find(r => r.type === 'municipality')
      expect(hasMuni).to.not.be.undefined
    })

    it('should find results for neighborhoods', () => {
      const results = syria.search('Bab Touma')
      const hasNeigh = results.find(r => r.type === 'neighborhood')
      expect(hasNeigh).to.not.be.undefined
    })

    it('should return empty array for empty query', () => {
      const results = syria.search('')
      expect(results).to.be.an('array')
      expect(results).to.have.length(0)
    })

    it('should return empty array for non-matching query', () => {
      const results = syria.search('not-in-syria')
      expect(results).to.be.an('array')
      expect(results).to.have.length(0)
    })
  })
})
