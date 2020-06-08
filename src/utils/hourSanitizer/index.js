'use strict'

const hourSanitizer = (hour) => {

  let finalString = hour.toString()

  if(finalString.length === 4){
    finalString = finalString.slice(0,2) + ':' + finalString.slice(-2)
  }
  if(finalString.length === 3){
    finalString = finalString.slice(0,1) + ':' + finalString.slice(-2)
  }

  return finalString
}

export default hourSanitizer
