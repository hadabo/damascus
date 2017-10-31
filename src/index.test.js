const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const damascus = require('./index')

describe('syria-districts', () => {
  describe('all', () => {
    it('should be an array of strings', () => {
      function isArrayOfStrings (array) {
        return array.every(item => typeof item === 'string')
      }

      expect(damascus.all).to.satisfy(isArrayOfStrings)
    })

    it('should contain `Municipality - Al-Midan`', () => {
      expect(damascus.all).to.include('Municipality - Al-Midan')
    })
  })

  describe('random', () => {
    it('should return a random item from the damascus.all', () => {
      const randomItem = damascus.random()
      expect(damascus.all).to.include(randomItem)
    })

    it('should return an array of random items if passed a number', () => {
      const randomItems = damascus.random(3)
      expect(randomItems).to.have.length(3)

      randomItems.forEach((randomItem) => {
        expect(damascus.all).to.include(randomItem)
      })
    })
  })
})
