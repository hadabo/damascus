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
      // Damascus has municipalities, others have districts
      expect(all[0]).to.have.property('municipalities')
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
      expect(govs[0]).to.not.have.property('districts')
      expect(govs[0]).to.not.have.property('municipalities')
      expect(govs[0].name).to.have.property('en')
      expect(govs[0].name).to.have.property('ar')
    })
  })

  describe('getDistricts', () => {
    it('should return all districts if no id is provided', () => {
      const districts = syria.getDistricts()
      expect(districts).to.be.an('array')
      expect(districts.length).to.be.greaterThan(14)
      expect(districts[0]).to.have.property('id')
      expect(districts[0]).to.have.property('name')
    })

    it('should return specific districts for a governorate id', () => {
      const damDistricts = syria.getDistricts('dam')
      expect(damDistricts).to.be.an('array')
      expect(damDistricts.length).to.be.greaterThan(0)
      expect(damDistricts[0].id).to.include('dam-')
    })

    it('should return empty array for invalid id', () => {
      const districts = syria.getDistricts('invalid-id')
      expect(districts).to.be.an('array')
      expect(districts).to.have.length(0)
    })
  })

  describe('getMunicipalities', () => {
    it('should return municipalities for damascus by default', () => {
      const muns = syria.getMunicipalities()
      expect(muns).to.be.an('array')
      expect(muns.length).to.be.greaterThan(0)
      expect(muns[0]).to.have.property('id')
      expect(muns[0]).to.have.property('name')
    })

    it('should return empty array for governorate without municipalities', () => {
      const muns = syria.getMunicipalities('ale')
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
