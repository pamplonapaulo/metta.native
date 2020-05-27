import React, { useState, useEffect } from 'react'
import { Image, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'

import api from '../../../../../services/api'
import { connectRituals, disconnect, subscribeToNewRituals } from '../../../../../services/socket'

import { AntDesign } from '@expo/vector-icons'

import arrayBuilder from '../../../../../utils/arrayBuilder'

import styles from './styles'

function Schedule ({ navigation }) {

  const place = navigation.getParam('rituals')

  const [days, setDays] = useState(false)

  useEffect(() => {
    console.log('uuuuuuuuuuuuuuuseee effect..........')
    loadRituals()
    
  }, [place])


  function setupWebsocket () {
    disconnect()  
    connectRituals(place.id)
  }
  
  async function loadRituals () {

    console.log('entrar aqui apenas quando abre a página - certo?')

    const response = await api.get('/rituals', {
      params: {
        place_id: place.id
      }
    })

    let diasArr = []
    let today = new Date().getDate()
    let noEventsToday = false

    for (let d=1; d<=31;d++){

      let dia = { ofMonth: false, isToday: false, rituals: [] }

      for (let i=0; i<response.data.length; i++){

        let daysOfThisRitual = arrayBuilder(response.data[i].daysOfMonths)
  
        for (let x=0; x<daysOfThisRitual.length; x++){
  
          if(daysOfThisRitual[x] === d) {

            if(d === today){
              dia.isToday = true
            }
            dia.ofMonth = d
            dia.rituals.push({
              ritual_id: response.data[i].id,
              title: response.data[i].title,
              paragraph: response.data[i].paragraph,
              time: response.data[i].hoursOfDays,
              hours: response.data[i].sessionLength,
              price: response.data[i].chargeValue
            })

            diasArr.push(dia)
          }
          
          if (d === today && daysOfThisRitual[x] !== d && !noEventsToday) {

            noEventsToday = true

            dia.ofMonth = d
            dia.isToday = true
            diasArr.push(dia)
          }
        }
      }
    }
    setDays(diasArr)
    setupWebsocket()
  }
  
  

  let scrollView
  let favoriteTimes = [ false, false, false, false, false, false, false, false, false, false, false ]

  // handleScroll = () => {
  //   console.log('***** handleScroll **** apenas uma vez')    
  // }

  const handleDay = (btn) => {

    btn = btn * 78
    scrollView.scrollTo({x: btn, animated: true})
  }

  const toggleFavoriteTimes = (index) => {
    favoriteTimes[index] = !favoriteTimes[index]
  }

  if (!days) {
    console.log('render blocked')
    return null
  }
  console.log('now rendering')

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
            {days.map((day, index) => (

              <TouchableOpacity
                style={[styles.btn, styles.btnDay]}
                onPress={() => { handleDay(index) }}
                key={index}
              >
                <Text style={[styles.btnTextLite]} color='#fff'>{day.ofMonth}</Text>
              </TouchableOpacity>

            ))}

            <TouchableOpacity style={styles.blockedArea}></TouchableOpacity>

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
