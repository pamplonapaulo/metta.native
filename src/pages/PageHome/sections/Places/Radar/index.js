import React, { useState, useEffect, useContext } from 'react'
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../../../../../services/api'
import { connect, disconnect, subscribeToNewPlaces } from '../../../../../services/socket'

import smallImg from '../../../../../assets/xamanism.jpg'

import styles from './styles'

import Context from '../../../../../components/user/configContext'

function Radar ({ navigation }) {
  const [places, setPlaces] = useState([])
  const [currentRegion, setCurrentRegion] = useState(null)
  const [doctrine, setDoctrine] = useState('')

  const ctx = useContext(Context)

  useEffect(() => {

    async function loadInitialPosition () {
      const { granted } = await requestPermissionsAsync()

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        })

        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }

    loadInitialPosition()
  }, [requestPermissionsAsync, getCurrentPositionAsync])

  useEffect(() => {
    subscribeToNewPlaces(place => setPlaces([...places, place]))
  }, [places])

  function setupWebsocket () {
    disconnect()

    const { latitude, longitude } = currentRegion

    connect(
      latitude,
      longitude,
      doctrine
    )
  }

  async function loadPlaces () {
    const { latitude, longitude } = currentRegion

    const response = await api.get('/places', {
      params: {
        latitude,
        longitude,
        doctrine
      }
    })

    setPlaces(response.data)
    setupWebsocket()
  }

  function handleRegionChange (region) {
    setCurrentRegion(region)
  }

  if (!currentRegion) {
    return null
  }
  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChange}
        initialRegion={currentRegion}
        style={styles.map}
      >
        {places.map(place => { // console.log(Number(place.geoLongitude));
          return (
            <Marker
              style={styles.marker}
              key={place.id}
              coordinate={{
                longitude: Number(place.geoLongitude),
                latitude: Number(place.geoLatitude)
              }}
            >

              <Image
                style={styles.avatar}
                source={smallImg}
                // source={{ uri: place.avatar_url }}
              />

              <Callout onPress={() => {

                ctx.setNavBackwards(true, 'Radar', navigation)
                ctx.setPageTitle(place.name)

                navigation.navigate('Details', { details: place })

              }}
              >
                <Text style={styles.name}>{place.name}</Text>
                <Text style={styles.doctrine}>{place.doctrine}</Text>

              </Callout>

            </Marker>
          )
        })}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search by doctrine'
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false}
          value={doctrine}
          onChangeText={setDoctrine}
        />

        <TouchableOpacity onPress={loadPlaces} style={styles.loadButton}>
          <MaterialIcons name='my-location' size={20} color='#FFF' />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Radar
