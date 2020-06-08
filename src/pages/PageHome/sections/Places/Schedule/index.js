import React, { useState, useEffect, useRef } from 'react'
import { Image, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'

import api from '../../../../../services/api'
import { connectRituals, disconnect, subscribeToNewRituals } from '../../../../../services/socket'

import { AntDesign, FontAwesome5 } from '@expo/vector-icons'

import arrayBuilder from '../../../../../utils/arrayBuilder'
import removeBraces from '../../../../../utils/removeBraces'
import hourSanitizer from '../../../../../utils/hourSanitizer'
import getDaysOfDate from '../../../../../utils/getDaysOfDate'

import styles from './styles'

function Schedule ({ navigation }) {

  const place = navigation.getParam('rituals')

  const years = [(new Date().getFullYear() - 1), new Date().getFullYear(), (new Date().getFullYear() + 1)]

  const [currentYear, setCurrentYear] = useState(1)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [days, setDays] = useState(getDaysOfDate(new Date().getFullYear(), new Date().getMonth()))
  const [currentDay, setCurrentDay] = useState(new Date().getDate())
  const [currentSchedule, setCurrentSchedule] = useState(false)

  const [scrollViewYears, setScrollViewYears] = useState()
  const [scrollViewMonths, setScrollViewMonths] = useState()
  const [scrollViewDays, setScrollViewDays] = useState()

  const [ritualDays, setRitualDays] = useState([])

  const isInitialMount = useRef(true)

  let favoriteTimes = [ false, false, false, false, false, false, false, false, false, false, false ]

  let firstMount = true
  
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const [currentDisplay, setCurrentDisplay] = useState(new Date().getDate() + '/' + months[new Date().getMonth()] + '/' + years[1])

  useEffect(() => {

    if(!firstMount){
      getCurrentSchedule()
    }

  }, [days])

  useEffect(() => {

    getCurrentSchedule()

  }, [currentDisplay])

  // useEffect(() => {
  //   subscribeToNewPlaces(place => setPlaces([...places, place]))
  // }, [places])

  useEffect(() => {
    if(isInitialMount.current && scrollViewYears !== undefined){
      setTimeout(() => { handleYear(currentYear) }, 500)
    }
  }, [scrollViewYears])

  useEffect(() => {
    if(isInitialMount.current && scrollViewMonths !== undefined){
      setTimeout(() => { handleMonth(currentMonth) }, 500)
    }
  }, [scrollViewMonths])

  useEffect(() => {
    if(isInitialMount.current && scrollViewDays !== undefined){
      setTimeout(() => { handleDay(currentDay - 1) }, 500)
      setTimeout(() => { isInitialMount.current = false }, 750)
    }
  }, [scrollViewDays])

  function setupWebsocket () {
    disconnect()  
    connectRituals(place.id)
  }

  async function getCurrentSchedule() {

    let isDayEmpity = true
    
    const response = await api.get('/rituals', {
      params: {
        place_id: place.id
      }
    })

    const monthMatch = (element) => element == currentMonth + 1
    const dayMatch = (element) => element == currentDay
    const dayOfWeekMatch = (element) => element == new Date(years[currentYear],currentMonth,currentDay).getDay()
    const weekOfMonthMatch = (element) => element == Math.floor(new Date(years[currentYear],currentMonth,currentDay).getDate() / 7)

    let schedule = []

    for (let y=0; y<response.data.length; y++){

      if(response.data[y].daysOfWeeks === "[]"){
        let responseMonths = arrayBuilder(response.data[y].monthsOfYears)
        let responseDays = arrayBuilder(response.data[y].daysOfMonths)
  
        if (responseMonths.some(monthMatch) && responseDays.some(dayMatch)){
          isDayEmpity = false
  
          schedule.push({
            ritual_id: response.data[y].id,
            display: 'on',
            title: response.data[y].title,
            paragraph: response.data[y].paragraph,
            time: removeBraces(response.data[y].hoursOfDays),
            hours: response.data[y].sessionLength,
            price: response.data[y].chargeValue
          })
        }
      }

      if(response.data[y].daysOfWeeks !== "[]"){
        let responseMonths = arrayBuilder(response.data[y].monthsOfYears)
        let responseWeeks = arrayBuilder(response.data[y].weeksOfMonths)
        let responseDays = arrayBuilder(response.data[y].daysOfWeeks)

        if (responseDays.some(dayOfWeekMatch) && responseWeeks.some(weekOfMonthMatch) && responseMonths.some(monthMatch)){
          isDayEmpity = false
  
          schedule.push({
            ritual_id: response.data[y].id,
            display: 'on',
            title: response.data[y].title,
            paragraph: response.data[y].paragraph,
            time: removeBraces(response.data[y].hoursOfDays),
            hours: response.data[y].sessionLength,
            price: response.data[y].chargeValue
          })
        }
      }
    }

    if(isDayEmpity){
      schedule.push({
        ritual_id: 'fake',
        display: 'off',
        title: 'Sem sessões',
        paragraph: 'Dia ' + currentDay + ' de ' + months[currentMonth] + ' não contém eventos.',
        time: '',
        hours: '',
        price: ''    
      })
    }
    setupWebsocket()

    let orderedRituals = schedule.sort((a, b) => (a.time > b.time) ? 1 : (a.time === b.time) ? ((a.ritual_id > b.ritual_id) ? 1 : -1) : -1 )

    let final = []

    for(let i=0; i<orderedRituals.length; i++){
      let el = {
        ritual_id: orderedRituals[i].id,
        display: 'on',
        title: orderedRituals[i].title,
        paragraph: orderedRituals[i].paragraph,
        time: hourSanitizer(orderedRituals[i].time),
        hours: orderedRituals[i].sessionLength,
        price: orderedRituals[i].chargeValue
      }
      final.push(el)
    }

    setCurrentSchedule(final)

    if(firstMount){
      getMounthRituals(response)
    }
  }

  async function getMounthRituals(response) {

    let newDays = []

    if(!firstMount){
    
      const response = await api.get('/rituals', {
        params: {
          place_id: place.id
        }
      })
    }

    const monthMatch = (element) => element == currentMonth + 1

    for(let i=0; i<days.length; i++){

      let newDay = {
        number: days[i].number,
        hasRitual: false,
        isWeekend: days[i].isWeekend,
        dayOfWeek: days[i].dayOfWeek,
        weekOfMonth: days[i].weekOfMonth
      }

      const dayMatch = (element) => element == newDay.number
      const weekDayMatch = (element) => element == newDay.dayOfWeek
      const weeksOfMonthMatch = (element) => element == newDay.weekOfMonth 

      newDays.push(newDay)

      for (let y=0; y<response.data.length; y++){

        let responseMonths = arrayBuilder(response.data[y].monthsOfYears)
        let responseDaysOfMonth = arrayBuilder(response.data[y].daysOfMonths)
        let responseDaysOfWeek = arrayBuilder(response.data[y].daysOfWeeks)
        let responseWeeksOfMonth = arrayBuilder(response.data[y].weeksOfMonths)
  
        if (responseMonths.some(monthMatch)){

          if (responseDaysOfMonth.some(dayMatch)){
            newDays[i].hasRitual = true
          }

          if (responseDaysOfWeek.some(weekDayMatch) && responseWeeksOfMonth.some(weeksOfMonthMatch)){
            newDays[i].hasRitual = true
          }
        }
      }
    }
    firstMount = false
    setRitualDays(newDays)
    setupWebsocket()
  }

  const handleScrolling = (scroll, type) => {

    let index = scroll.nativeEvent.contentOffset.x / 78

    if(type === 'years')
      handleYear(index)

    if(type === 'months')
      handleMonth(index)

    if(type === 'days')
      handleDay(index)
  }

  const handleYear = (btn) => {

    if(!isInitialMount.current){
      setCurrentYear(btn)
      setCurrentMonth(1)
      setDays(getDaysOfDate(years[btn], 0))
      setCurrentDay(1)
      setCurrentDisplay((1) + '/' + months[0] + '/' + years[currentYear])
      handleScrollViews(scrollViewMonths, 0)
      handleScrollViews(scrollViewDays, 0)
    }
    handleScrollViews(scrollViewYears, btn)
  }

  const handleMonth = (btn) => {

    if(!isInitialMount.current){
      setCurrentMonth(btn)
      setDays(getDaysOfDate(years[currentYear], btn))
      setCurrentDay(1)
      setCurrentDisplay(1 + '/' + months[btn] + '/' + years[currentYear])
      handleScrollViews(scrollViewDays, 0)
    }
    handleScrollViews(scrollViewMonths, btn)
  }

  const handleDay = (btn) => {

    if(!isInitialMount.current){
      setCurrentDay(btn + 1)
      setCurrentDisplay((btn + 1) + '/' + months[currentMonth] + '/' + years[currentYear])
    }
    handleScrollViews(scrollViewDays, btn)
  }

  const handleScrollViews = (scrollViewElement, index) => {

    index = index * 78
    scrollViewElement.scrollTo({x: index, animated: true})
  }

  const toggleFavoriteTimes = (index) => {
    favoriteTimes[index] = !favoriteTimes[index]
  }

  if (!currentSchedule) {
    return null
  }

  return (

    <View style={styles.pageContainer}>

      <View style={styles.lineMark}></View>

      <SafeAreaView>
        <ScrollView
          style={styles.years}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollToOverflowEnabled={true}
          scrollEventThrottle={0}
          snapToInterval={78}
          onMomentumScrollEnd={(obj) => { handleScrolling(obj, 'years') }}
          ref={(ref) => setScrollViewYears(ref)}
        >
            {years.map((year, index) => (

              <TouchableOpacity
                style={[styles.btn, styles.btnYear ]}
                onPress={() => { handleYear(index) }}
                key={index}
              >
                <Text style={[styles.btnTextLite]}>{year}</Text>
              </TouchableOpacity>
              )
            )}

            <TouchableOpacity style={styles.blockedArea}></TouchableOpacity>

        </ScrollView>
      </SafeAreaView>

      <SafeAreaView>
        <ScrollView
          style={styles.months}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollToOverflowEnabled={true}
          scrollEventThrottle={0}
          snapToInterval={78}
          onMomentumScrollEnd={(obj) => { handleScrolling(obj, 'months') }}
          ref={(ref) => setScrollViewMonths(ref)}
        >
            {months.map((month, index) => (

              <TouchableOpacity
                style={[styles.btn, styles.btnMonth ]}
                onPress={() => { handleMonth(index) }}
                key={index}
              >
                <Text style={[styles.btnTextLite]}>{month}</Text>
              </TouchableOpacity>
              )
            )}

            <TouchableOpacity style={styles.blockedArea}></TouchableOpacity>

        </ScrollView>
      </SafeAreaView>

      <SafeAreaView>
        <ScrollView
          style={styles.days}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollToOverflowEnabled={true}
          scrollEventThrottle={0}
          snapToInterval={78}
          onMomentumScrollEnd={(obj) => { handleScrolling(obj, 'days') }}
          ref={(ref) => setScrollViewDays(ref)}
        >
            {ritualDays.map((day, index) => (

              <TouchableOpacity
                style={day.isWeekend === true ? [styles.btn, styles.btnWknd] : [styles.btn]}
                onPress={() => { handleDay(index) }}
                key={index}
              >

                <FontAwesome5
                  style={day.hasRitual === true ? [styles.ritualMarker] : [styles.ritualMarkerOff]}
                  name={'star-of-life'}
                />

                <Text
                  style={[styles.btnTextLite]}
                >{day.number}</Text>
              </TouchableOpacity>
              )
            )}

            <TouchableOpacity style={styles.blockedArea}></TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
      
      <View style={styles.bg}/>

      <View style={styles.currentDisplayWrapper}>
        <Text style={[styles.currentDisplay]}>{currentDisplay}</Text>
      </View>

      <SafeAreaView>

        <ScrollView
          style={styles.stack}
        >

          {currentSchedule.map((ritual, index) => (

            <View
              style={styles.itemRow}
              key={index}
            >
              <Text style={styles.hour}>{ritual.time}</Text>
              <TouchableOpacity
                style={ritual.display === 'off' ? [styles.btnOff] : [styles.btn, styles.sessionBtn]}
                onPress={() => { toggleFavoriteTimes(0) }}
              >
                <AntDesign
                  name={favoriteTimes[0] ? 'star' : 'staro'}
                  size={20}
                  color={ritual.display === 'on' ? '#fff' : 'transparent'}
                />
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
Create Avatars' levels: You are a Jedi, Pai Mei, Jiraia, Doctor Strange, Vision (Marvel), Mestre dos Magos, Castanhera, ...

Section "Be a guru":
Like a social media news feed, but strict to share just audio guided meditations. So anyone can pick any shared meditation and set it to use on the next sitting.
This meditation object may include:
  Title
  Short text presentation
  Length: how long last the session
  Doctrines related: which possible tradition beliefs a user may be in touch while guided by this audio.
  Guru link, so you can follow
  Audio file itself

Social media section might include some sub-sections (or sub-tags):

  Guided Meditations:
    explained above.

  No fake:
    contents with this tag will be sujbected to verification and users may report if looks like fake.
    a source from external media broadcast should be provided to endorce the post.

  Social warnings (also always 'No Fake'):
    possible negative contents that users feel like everyone must acknowledge of it.
    also no fake warnings, so same criteria for 'No Fake' tag: source must be provided and users may contest it's truth by reporting to review.

  Free belief:
    spiritual contents not subjected to fact checking.









*/