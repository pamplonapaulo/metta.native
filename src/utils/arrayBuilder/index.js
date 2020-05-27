'use strict'

const arrayBuilder = (stringArray) => {

  let removeBrackets = stringArray.slice(1, -1)

  return JSON.parse("[" + removeBrackets + "]")
}

export default arrayBuilder
