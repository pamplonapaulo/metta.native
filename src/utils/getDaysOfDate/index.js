'use strict'

const getDaysOfDate = (year, month) => {

  let total = new Date(year, month + 1, 0).getDate()

  let array = []

  for (let i=1; i<=total; i++){
    array.push(i)
  }
  
  return array
}

export default getDaysOfDate
