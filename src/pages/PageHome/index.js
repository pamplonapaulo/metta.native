import React, { useContext, useEffect } from 'react'
import { View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

import Seat from './sections/Seat'
import Places from './sections/Places'
import Dating from './sections/Dating'
import Shopping from './sections/Shopping'
import Vegan from './sections/Vegan'

import iconSeatInactive from '../../../assets/bottom-menu/_meditations/icon-seat-inactive.png'
import iconSeatActive from '../../../assets/bottom-menu/_meditations/icon-seat-active.png'

import styles from './styles'

import Context from '../../components/user/configContext'

function SeatPage ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setPageTitle('Meditation')
    }
    navigation.addListener('focus', handleFocus)

    function handleBlur () {
      ctx.quitSeating()
    }
    navigation.addListener('blur', handleBlur)

    return () => {
      navigation.removeListener('focus', handleFocus)
      navigation.removeListener('blur', handleBlur)
    }
  }, [ctx.setPageTitle, ctx.quitSeating])

  return (
    <Seat title='Meditation' />
  )
}

function PlacesPage ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setPageTitle('Spiritual Places')
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setPageTitle])

  return (
    <Places title='Spiritual Places' />
  )
}

function DatingPage ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setPageTitle('Soul Match')
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setPageTitle])

  return (
    <Dating title='Soul Match' />
  )
}

function ShoppingPage ({ navigation, navDrawer }) {
  // console.log('..... ShoppingPage navDrawer')
  // console.log(navDrawer)

  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setPageTitle('Zen Shopping')
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setPageTitle])

  return (
    <Shopping title='Zen Shopping' />
  )
}

function VeganPage ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setPageTitle('Go Vegan')
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setPageTitle])

  return (
    <Vegan title='Go Vegan' />
  )
}

const Tab = createBottomTabNavigator()

const Home = () => {
  return (

    <NavigationContainer independent>

      <View style={styles.screen}>

        <Tab.Navigator

          style={styles.screenInside}

          screenOptions={({ route }) => ({

            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              if (route.name === 'Meditate') {
                iconName = focused
                  ? iconSeatActive
                  : iconSeatInactive

                return <Image
                  source={iconName}
                  style={styles.menuIconImg}
                />
              } else if (route.name === 'Places') {
                return <FontAwesome5
                  name='place-of-worship'
                  size={size}
                  color={color}
                />
              } else if (route.name === 'Soulmate') {
                iconName = focused
                  ? 'ios-heart'
                  : 'ios-heart-empty'

                return <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                />
              } else if (route.name === 'Shop') {
                iconName = focused
                  ? 'cart'
                  : 'cart-outline'

                return <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              } else if (route.name === 'Food') {
                return <MaterialCommunityIcons
                  name='silverware-fork-knife'
                  size={size}
                  color={color}
                />
              }
            }
          })}
          tabBarOptions={{
            activeTintColor: '#0000ff',
            inactiveTintColor: '#4b0082',

            style: {
              backgroundColor: '#ffa500'
            }
          }}
        >

          <Tab.Screen
            name='Meditate'
            component={SeatPage}
          />
          <Tab.Screen
            name='Places'
            component={PlacesPage}
          />
          <Tab.Screen
            name='Soulmate'
            component={DatingPage}
          />
          <Tab.Screen
            name='Shop'
            component={ShoppingPage}
          />
          <Tab.Screen
            name='Food'
            component={VeganPage}
          />

        </Tab.Navigator>

      </View>

    </NavigationContainer>
  )
}

export default Home
