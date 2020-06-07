'use strict'

const getDaysOfDate = (year, month) => {

  let total = new Date(year, (month+1), 0).getDate()

  let array = []

  for (let i=1; i<=total; i++){

    let day = {
      number: i,
      hasRitual: false,
      isWeekend: false,
      dayOfWeek: new Date(year,month,i).getDay(),
      weekOfMonth: Math.floor(new Date(year, month, i).getDate() / 7)
    }

    if(day.dayOfWeek === 0 || day.dayOfWeek === 6){
      day.isWeekend = true
    }
    array.push(day)
  }
  
  return array
}

export default getDaysOfDate
