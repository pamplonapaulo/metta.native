'use strict'

const removeBraces = (hour) => {

  let finalString

  if(hour.length === 6){
    finalString = hour.slice(1,3) + hour.slice(-3, -1)
  }
  if(hour.length === 5){
    finalString = hour.slice(1,2) + hour.slice(-3, -1)
  }

  return parseInt(finalString, 10)
}

export default removeBraces
