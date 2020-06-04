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

  const [days, setDays] = useState(false)
  const [currents, setCurrents] = useState(false)
  const [scrollView, setScrollView] = useState(false)

  let favoriteTimes = [ false, false, false, false, false, false, false, false, false, false, false ]
  
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
    loadDays()
  }, [place])

  useEffect(() => {

    if(currents){
      if(scrollView){
        for(let i=0; i<days.length;i++){
          if(days[i].day === new Date().getDate()){

            setTimeout(() => {
              handleDay(i,days[i])
            }, 1000)
          }
        }
      }
    }
    
  }, [scrollView])

  function setupWebsocket () {
    disconnect()  
    connectRituals(place.id)
  }
  
  async function loadDays () {

    const response = await api.get('/rituals', {
      params: {
        place_id: place.id
      }
    })

    let diasArr = []
    let today = new Date().getDate()
    let noEventsToday = false

    for (let d=1; d<=31;d++){

      let dia = { day: d, isToday: false, rituals: [] }

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
              dia.isToday = true
              setCurrents(dia.rituals)
            }

            diasArr.push(dia)
          }
          
          if (d === today && daysOfThisRitual[x] !== d && !noEventsToday) {

            noEventsToday = true

            dia.isToday = true
            diasArr.push(dia)
            setCurrents(dia.rituals)
          }
        }
      }
    }
    setDays(diasArr)

    setupWebsocket()
  }

  // handleScroll = () => {
  //   console.log('***** handleScroll **** apenas uma vez')    
  // }

  const handleDay = (btn, day) => {
    console.log('btn:')
    console.log(btn)
    console.log('day:')
    console.log(day)
    console.log('scrollView:')
    console.log(scrollView)


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
                onPress={() => { handleDay(index, day) }}
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