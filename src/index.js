const uniqueRandomArray = require('unique-random-array')
const damascusDistrictsNames = require('./damascus.json')

const getRandomItem = uniqueRandomArray(damascusDistrictsNames)

function random (number) {
  if (number === undefined) {
    return getRandomItem()
  }
  const randomItems = []
  for (let i = 0; i < number; i++) {
    randomItems.push(getRandomItem())
  }
  return randomItems
}

module.exports = {
  all: damascusDistrictsNames,
  random
}
