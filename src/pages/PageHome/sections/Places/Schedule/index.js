import React, { useState, useEffect } from 'react'
import { Image, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'

import api from '../../../../../services/api'
import { connectSchedule, disconnect, subscribeToNewSchedules } from '../../../../../services/socket'

import { AntDesign } from '@expo/vector-icons'

import styles from './styles'

//const Schedule = (props) => {
function Schedule ({ navigation }) {

  const place = navigation.getParam('schedule')

  const [currentPlace, setCurrentPlace] = useState('')
  const [days, setDays] = useState([])  

  useEffect(() => {

    function loadCurrentPlace () {

      const place_id = place.id
      
      setCurrentPlace({
        place_id
      })
    }

    loadCurrentPlace()
  }, [place])

  useEffect(() => {
    subscribeToNewSchedules(day => setDays([...days, day]))

    if (days) {
      console.log('subscribeToNewSchedules looking for days')
      console.log(days)
    }
  }, [days])

  function setupWebsocket () {
    disconnect()

    const { place_id } = currentPlace

    connectSchedule(place_id)
  }

  async function loadSchedule () {

    const { place_id } = currentPlace

    const response = await api.get('/schedule', {
      params: {
        place_id
      }
    })
  
    setDays(response.data)
    setupWebsocket()

    if (days) {
      console.log('loadSchedule looking for days')
      console.log(days)
    }
  }  

  if (!currentPlace) {
    return null
  }

  let scrollView
  let favoriteTimes = [ false, false, false, false, false, false, false, false, false, false, false ]

  // handleScroll = () => {
  //   console.log('***** handleScroll **** apenas uma vez')    
  // }

  handleDay = (btn) => {
    btn = btn * 78
    scrollView.scrollTo({x: btn, animated: true})
  }

  toggleFavoriteTimes = (index) => {
    favoriteTimes[index] = !favoriteTimes[index]
    console.log(favoriteTimes)
  }

  loadSchedule()

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
            >Monday</Text>
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
          //ref={scroller => {myScroller = scroller}}
          /*
          ref={scroller => {
            this.scroller = scroller;
          }}
          */
        >
            <TouchableOpacity
              style={[styles.btn, styles.btnDay]}
              // onPress={handleDay}
              onPress={() => { handleDay(0) }}

            >
              <Text style={[styles.btnTextLite]} color='red'>{new Date().getDate()}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnDay]}
              onPress={() => { handleDay(1) }}
            >
              <Text style={[styles.btnTextLite]} color='#fff'>8</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnDay, styles.inative]}
              onPress={() => { handleDay(2) }}
            >
              <Text style={[styles.btnTextLite, styles.inative]} color='#fff'>9</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnDay, styles.inative]}
              onPress={() => { handleDay(3) }}
            >
              <Text style={[styles.btnTextLite, styles.inative]} color='#fff'>10</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnDay]}
              onPress={() => { handleDay(4) }}
            >
              <Text style={[styles.btnTextLite]} color='#fff'>11</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnDay, styles.inative]}
              onPress={() => { handleDay(5) }}
              >
              <Text style={[styles.btnTextLite, styles.inative]} color='#fff'>12</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnDay, styles.inative]}
              onPress={() => { handleDay(6) }}
            >
              <Text style={[styles.btnTextLite, styles.inative]} color='#fff'>13</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnDay]}
              onPress={() => { handleDay(7) }}
            >
              <Text style={[styles.btnTextLite]} color='#fff'>14</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.blockedArea}>
            </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>

      <Image
        style={styles.coverImg}
        source={{ uri: 'https://patrimonioespiritual.files.wordpress.com/2016/01/img_1565.jpg?w=1180&h=786' }}
      />


      <SafeAreaView>

        <ScrollView style={styles.stack}>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.wkndOpensAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(0) }}
            >
              <AntDesign name={favoriteTimes[0] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysOpensAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(1) }}
            >
              <AntDesign name={favoriteTimes[1] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(2) }}
            >
              <AntDesign name={favoriteTimes[2] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(3) }}
            >
              <AntDesign name={favoriteTimes[3] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(4) }}
            >
              <AntDesign name={favoriteTimes[4] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(5) }}
            >
              <AntDesign name={favoriteTimes[5] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(6) }}
            >
              <AntDesign name={favoriteTimes[6] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(7) }}
            >
              <AntDesign name={favoriteTimes[7] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(8) }}
            >
              <AntDesign name={favoriteTimes[8] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(9) }}
            >
              <AntDesign name={favoriteTimes[9] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(10) }}
            >
              <AntDesign name={favoriteTimes[10] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.hour}>{place.workingDaysClosesAt}</Text>
            <TouchableOpacity
              style={[styles.btn, styles.sessionBtn]}
              onPress={() => { toggleFavoriteTimes(11) }}
            >
              <AntDesign name={favoriteTimes[11] ? 'star' : 'staro'} size={20} color='#fff' />
            </TouchableOpacity>
            <View style={styles.sessionText}>
              <Text style={styles.name}>Meditação do Sol</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci, laboriosam quo iste maiores quisquam.</Text>
            </View>
          </View>

        </ScrollView>

      </SafeAreaView>
    </View>
  )
}

export default Schedule
