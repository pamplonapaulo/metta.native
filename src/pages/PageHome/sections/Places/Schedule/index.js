import React, { useState, useEffect, useRef } from 'react'
import { Image, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'

import api from '../../../../../services/api'
import { connectRituals, disconnect, subscribeToNewRituals } from '../../../../../services/socket'

import { AntDesign } from '@expo/vector-icons'

import arrayBuilder from '../../../../../utils/arrayBuilder'
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
      console.log('scrollViewYears >>>> ' + typeof scrollViewYears)
      setTimeout(() => { handleYear(currentYear) }, 500)
      //handleYear(currentYear)
    }
  }, [scrollViewYears])

  useEffect(() => {
    if(isInitialMount.current && scrollViewMonths !== undefined){
      console.log('scrollViewMonths >>>> ' + typeof scrollViewMonths)
      setTimeout(() => { handleMonth(currentMonth) }, 500)
      //handleMonth(currentMonth)
    }
  }, [scrollViewMonths])

  useEffect(() => {
    if(isInitialMount.current && scrollViewDays !== undefined){
      console.log('scrollViewDays >>>> ' + typeof scrollViewDays)
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

    // mês do ano de 0 a 11
    const monthMatch = (element) => element == currentMonth + 1

    // dia do mês de 1 a 31
    const dayMatch = (element) => element == currentDay

    // dia da semana de 0 a 6
    const dayOfWeekMatch = (element) => element == new Date(years[currentYear],currentMonth,currentDay).getDay()

    // semana do mês de 0 a 4
    const weekOfMonthMatch = (element) => element == Math.floor(new Date(years[currentYear],currentMonth,currentDay).getDate() / 7)

    let schedule = []

    for (let y=0; y<response.data.length; y++){

      // concentração ou ressureição do mestre
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
            time: hourSanitizer(response.data[y].hoursOfDays),
            hours: response.data[y].sessionLength,
            price: response.data[y].chargeValue
          })
        }
      }

      if(response.data[y].daysOfWeeks !== "[]"){
        let responseMonths = arrayBuilder(response.data[y].monthsOfYears)
        let responseWeeks = arrayBuilder(response.data[y].weeksOfMonths)
        let responseDays = arrayBuilder(response.data[y].daysOfWeeks)

        // sessão de escala ou dia das mães
        if (responseDays.some(dayOfWeekMatch) && responseWeeks.some(weekOfMonthMatch) && responseMonths.some(monthMatch)){
          isDayEmpity = false
  
          schedule.push({
            ritual_id: response.data[y].id,
            display: 'on',
            title: response.data[y].title,
            paragraph: response.data[y].paragraph,
            time: hourSanitizer(response.data[y].hoursOfDays),
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
    console.log(days)
    setupWebsocket()
    setCurrentSchedule(schedule)

    console.log('novo teste:')
    if(firstMount){
      getMounthRituals()
    }
  }

  async function getMounthRituals() {

    let newDays = []

    const response = await api.get('/rituals', {
      params: {
        place_id: place.id
      }
    })

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
    console.log(newDays)
    //setDays(newDays)
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
    console.log('ANO: ' + years[btn])

    if(!isInitialMount.current){
      setCurrentYear(btn)
      setCurrentMonth(1)
      setDays(getDaysOfDate(years[btn], 0))
      setCurrentDay(1)
      setCurrentDisplay((1) + '/' + months[0] + '/' + years[currentYear])
      handleScrollViews(scrollViewMonths, 0)
      handleScrollViews(scrollViewDays, 0)
      // getMounthRituals()
    }
    handleScrollViews(scrollViewYears, btn)
  }

  const handleMonth = (btn) => {
    console.log('MÊS: ' + months[btn])

    if(!isInitialMount.current){
      setCurrentMonth(btn)
      setDays(getDaysOfDate(years[currentYear], btn))
      setCurrentDay(1)
      setCurrentDisplay(1 + '/' + months[btn] + '/' + years[currentYear])
      handleScrollViews(scrollViewDays, 0)
      // getMounthRituals()
    }
    handleScrollViews(scrollViewMonths, btn)
  }

  const handleDay = (btn) => {
    console.log('DIA: ' + days[btn])

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
      <View style={styles.headerDay}>
        <View style={[styles.right, styles.widthFull]}>

          <View style={[styles.row, styles.right]}>
            <Text style={[
              styles.right,
              styles.widthFull,
              styles.textShadow,
              styles.headerDayTop
            ]}
          >{currentDisplay}</Text>
          </View>

        </View>
      </View>

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
                style={[styles.btn, styles.btnDay, ]}
                onPress={() => { handleYear(index) }}
                key={index}
              >
                <Text style={[styles.btnTextLite]} color='#fff'>{year}</Text>
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
                style={[styles.btn, styles.btnDay, ]}
                onPress={() => { handleMonth(index) }}
                key={index}
              >
                <Text style={[styles.btnTextLite]} color='#fff'>{month}</Text>
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
                //style={day.isWeekend === true ? [styles.btn, styles.wknd] : [styles.btn, styles.btnDay]}

                style={day.hasRitual === true ? [styles.btn, styles.busyDay] : [styles.btn, styles.freeDay]}

                //style={[styles.btn, styles.btnDay]}
                onPress={() => { handleDay(index) }}
                key={index}
              >
                <Text
                //style={[styles.btnTextLite]}
                style={day.isWeekend === true ? [styles.btnTextLiteWknd] : [styles.btnTextLite]}
                //color='#fff'
                >{day.number}</Text>
              </TouchableOpacity>
              )
            )}

            <TouchableOpacity style={styles.blockedArea}></TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
      
      {/* <Image
        style={styles.coverImg}
        source={{ uri: 'https://patrimonioespiritual.files.wordpress.com/2016/01/img_1565.jpg?w=1180&h=786' }}
      /> */}

      <View style={styles.bg}/>

      <SafeAreaView>

        <ScrollView style={styles.stack}>

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