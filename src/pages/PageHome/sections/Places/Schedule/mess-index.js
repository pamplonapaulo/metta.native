import React, { useState, useEffect } from 'react'
import { Image, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'

import api from '../../../../../services/api'
import { connectRituals, disconnect, subscribeToNewRituals } from '../../../../../services/socket'

import { AntDesign } from '@expo/vector-icons'

import arrayBuilder from '../../../../../utils/arrayBuilder'
import hourSanitizer from '../../../../../utils/hourSanitizer'

import styles from './styles'

function Schedule ({ navigation }) {

  const place = navigation.getParam('rituals')

  //const [calendar, setCalendar] = useState(false)
  
  // const [months, setMonths] = useState(false)
  const [days, setDays] = useState(false)
  // const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const [currents, setCurrents] = useState(false)
  const [scrollView, setScrollView] = useState(false)

  let favoriteTimes = [ false, false, false, false, false, false, false, false, false, false, false ]

  let calendar = [{},{},{},{},{},{},{},{},{},{},{},{}]

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  useEffect(() => {
    loadCalendar()
  }, [place])

  useEffect(() => {

    if(currents){

      console.log('currents:' )
      console.log(currents)

      if(scrollView){

        for(let m=0; m<calendar.length;m++){

          if(calendar[m].month === new Date().getMonth()){

            for(let d=0; d<calendar[m].days.length;d++){
              if(calendar[m].days[d].day === new Date().getDate()){

                setTimeout(() => {
                  handleDay(d,calendar[m].days[d])
                }, 1000)
              }
            }
          }
        }
      }
    }
    
  }, [scrollView])

  function setupWebsocket () {
    disconnect()  
    connectRituals(place.id)
  }
  
  async function loadCalendar () {

    const res = await api.get('/rituals', {
      params: {
        place_id: place.id
      }
    })

    // for each ritual
    for (let i=0; i<res.data; i++) {
      popYear(res.data[i])
    }

    buildCalendar(res)
    //loadDays(res)
    //setDays(diasArr)
  }


  // for each month
  function popYear(ritual){

    for (let mes=0; mes<calendar.length; mes++) {

      includeRitual(ritual, calendar[mes], mes+1)
    }
  }

  function includeRitual(ritual, monthObjOnCalendarArray, monthNumber){
    
    let itsMonths = arrayBuilder(ritual.monthsOfYears)

    // for each real month
    for(let i=0; i<ritual.itsMonths; i++){

      // if month match
      if(itsMonths[i] == monthNumber){



        for(let iDay=0; i<ritual.daysOfMonths[iDay]; iDay++){

          function hasSameDay(array) {
            return array.day === ritual.daysOfMonths[iDay];
          }

          let day = {
            day: ritual.daysOfMonths[iDay],
            rituals: {
              time: ritual.time,
              title: ritual.title,
              paragraph: ritual.paragraph,
            }
          }

          if(monthObjOnCalendarArray.length === 0){

            monthObjOnCalendarArray.push(day)

          } else {

            if (monthObjOnCalendarArray.filter(hasSameDay)){
              monthObjOnCalendarArray[i].rituals.push(day.rituals)
            }
}
  
            for(let i=0; i<monthObjOnCalendarArray.length; i++){

              if(monthObjOnCalendarArray[i].day === ritual.daysOfMonths[iDay]){

                

              } else if(monthObjOnCalendarArray[i].day > ritual.daysOfMonths[iDay]){

                monthObjOnCalendarArray.push(day)

              } else if(monthObjOnCalendarArray[i].day < ritual.daysOfMonths[iDay]){

                monthObjOnCalendarArray.push(day)

              }
            }
          }
        }
      }
      
      

      day.rituals.push({
        time: hourSanitizer(ritual.time),
        title: ritual.title,
        paragraph: ritual.paragraph
      })





      // calendar[d+1]
      // if(ritual.daysOfMonths[d])
    }
  }

  function buildCalendar(response) {

    let monthsArr = []
    let indexOfCurrentMonth
    let noEventsToday = false

    

    for (let e=0; e<response.data.length; e++){

      for (let m=0; m<response.data.monthsOfYears.length; m++) {




        let month = {
          month: m,
          days: arrayBuilder(response.data.daysOfMonths)
        }
        calendar.push(month)
      }





    }




    for (let m=1; m<=12;m++){

      





      for (let e=0; e<response.data[i].monthsOfYears.length; e++) {

        if()



      }






      
      let today = new Date().getDate()
  
      for (let d=1; d<=31;d++){

        



        let dia = { month: m, day: d, rituals: [] }
        console.log(dia)

        for (let i=0; i<response.data.length; i++){


          if(response.data[i].monthsOfYears)

          console.log(response.data)

          let daysOfThisRitual = arrayBuilder(response.data[i].daysOfMonths)
              console.log(daysOfThisRitual)

          for (let x=0; x<daysOfThisRitual.length; x++){
            
            if(daysOfThisRitual[x] === d) {
  
              dia.rituals.push({
                ritual_id: response.data[i].id,
                title: response.data[i].title,
                paragraph: response.data[i].paragraph,
                time: hourSanitizer(response.data[i].hoursOfDays),
                hours: response.data[i].sessionLength,
                price: response.data[i].chargeValue
              })

              console.log(dia.rituals)

              if(d === today && m === new Date().getMonth()){
                console.log('today')
                console.log('today')
                console.log('today')

                console.log('dia.rituals: ')
                console.log(dia.rituals)
                setCurrents(dia.rituals)
              }
              //diasArr.push(dia)
              month.days.push(dia)
            }
            
            if (d === today && daysOfThisRitual[x] !== d && !noEventsToday && m === new Date().getMonth()) {
              noEventsToday = true
              //diasArr.push(dia)
              month.days.push(dia)
            }

            console.log(month.days)

          }
        }
      }

      if(month.days.length > 0){
        monthsArr.push(month)
        
        if(month.month === new Date().getMonth()){
          indexOfCurrentMonth = m - 1
        }
      }

      if(month.days.length === 0 && month.month === new Date().getMonth()){
        
        monthsArr.push(month)
        indexOfCurrentMonth = m - 1
      }
    }

    setCalendar(monthsArr)

    // for(let i=0; i<monthsArr.length; i++){
    //   if(monthsArr[])
    // }
    
    // setCurrents(monthsArr[indexOfCurrentMonth].days.rituals)

    // let arrayAllDays = []

    // for (let m=0; m<monthsArr.length; m++){

    //   for (let d=0; d<monthsArr[m].days; d++){
    //     arrayAllDays.push(monthsArr[m].days[d])
    //   }
    // }
    // setDays(arrayAllDays)

    setDays(monthsArr[indexOfCurrentMonth].days)

    setupWebsocket()

  }

  function loadDays(response) {

    let diasArr = []
    let today = new Date().getDate()
    let noEventsToday = false

    for (let d=1; d<=31;d++){

      let dia = { day: d, rituals: [] }

      for (let i=0; i<response.data.length; i++){

        let daysOfThisRitual = arrayBuilder(response.data[i].daysOfMonths)
  
        for (let x=0; x<daysOfThisRitual.length; x++){
  
          if(daysOfThisRitual[x] === d) {

            dia.rituals.push({
              ritual_id: response.data[i].id,
              title: response.data[i].title,
              paragraph: response.data[i].paragraph,
              time: hourSanitizer(response.data[i].hoursOfDays),
              hours: response.data[i].sessionLength,
              price: response.data[i].chargeValue
            })

            if(d === today){
              setCurrents(dia.rituals)
            }

            diasArr.push(dia)
          }
          
          if (d === today && daysOfThisRitual[x] !== d && !noEventsToday) {

            noEventsToday = true

            diasArr.push(dia)
            setCurrents(dia.rituals)
          }
        }
      }
    }
  }




  // handleScroll = () => {
  //   console.log('***** handleScroll **** apenas uma vez')    
  // }

  const handleDay = (btn, day, month) => {

    setCurrents(day.rituals)

    btn = btn * 78
    scrollView.scrollTo({x: btn, animated: true})
  }

  const toggleFavoriteTimes = (index) => {
    favoriteTimes[index] = !favoriteTimes[index]
  }

  if (!days) {
    return null
  }

  return (

    <View style={styles.pageContainer}>
      <View style={styles.lineMark}></View>
      <View style={styles.headerDay}>
        <View style={[styles.right, styles.widthFull]}>

          <View style={[styles.row, styles.right]}>
            <Text style={[
              styles.right,
              styles.widthFull,
              styles.textShadow,
              styles.headerDayTop
            ]}
          >{months[new Date().getMonth()]}</Text>
          </View>

          <View style={[styles.row, styles.right]}>
            <Text style={[
              styles.right,
              styles.widthFull,
              styles.textShadow,
              styles.headerDayBottom
            ]}
            >07/05/20</Text>
          </View>

        </View>
      </View>

      <SafeAreaView>
        <ScrollView
          style={styles.days}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollToOverflowEnabled={true}
          scrollEventThrottle={0}
          snapToInterval={78}
          //onMomentumScrollEnd={handleScroll}
          //ref={scrollView}

          ref={(ref) => scrollView = ref}
          ref={(ref) => setScrollView(ref)}

          //ref={scroller => {myScroller = scroller}}
          /*
          ref={scroller => {
            this.scroller = scroller;
          }}
          */
        >
            {days.map((day, index) => (

              <TouchableOpacity
                style={[styles.btn, styles.btnDay]}
                onPress={() => { handleDay(index, day, day.month) }}
                key={index}
              >
                <Text style={[styles.btnTextLite]} color='#fff'>{day.day}</Text>
              </TouchableOpacity>
              )
            )}

            <TouchableOpacity style={styles.blockedArea}></TouchableOpacity>

        </ScrollView>
      </SafeAreaView>

      <Image
        style={styles.coverImg}
        source={{ uri: 'https://patrimonioespiritual.files.wordpress.com/2016/01/img_1565.jpg?w=1180&h=786' }}
      />

      <SafeAreaView>

        <ScrollView style={styles.stack}>

          {currents.map((ritual, index) => (

            <View
              style={styles.itemRow}
              key={index}
            >
              <Text style={styles.hour}>{ritual.time}</Text>
              <TouchableOpacity
                style={[styles.btn, styles.sessionBtn]}
                onPress={() => { toggleFavoriteTimes(0) }}
              >
                <AntDesign name={favoriteTimes[0] ? 'star' : 'staro'} size={20} color='#fff' />
              </TouchableOpacity>
              <View style={styles.sessionText}>
                <Text style={styles.name}>{ritual.title}</Text>
                <Text style={styles.description}>{ritual.paragraph}</Text>
              </View>
            </View>
          ))}

        </ScrollView>

      </SafeAreaView>
    </View>
  )
}

export default Schedule

/*
Review meditation scale length: each 5 minutes, from 5 minutes to 2 hours.
Create Avatars' levels: You are a Jedi, Pai Mei, Jiraia, Doctor Strange, Vision (Marvel), Mestre dos Magos, Castanhera, 
*/