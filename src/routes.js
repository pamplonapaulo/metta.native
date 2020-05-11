import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import Home from './pages/PageHome'
import UserProfile from './pages/PageUserProfile'
import UserProgress from './pages/PageUserProgress'
import GlobalProgress from './pages/PageGlobalScores'
import UserSettings from './pages/PageUserSettings'
import News from './pages/PageNews'

import { FontAwesome, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import Header from './components/header'

import Context from '../src/components/user/configContext'

import styles from './pages/styles'

function ScreenHome ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setBackBtn(false)
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setBackBtn])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Home />
    </View>
  )
}

function ScreenUserProfile ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setBackBtn(false)
      ctx.setPageTitle('Profile')
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setPageTitle, ctx.setBackBtn])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <UserProfile />
    </View>
  )
}

function ScreenUserProgress ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setBackBtn(false)
      ctx.setPageTitle('My Progress')
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setPageTitle, ctx.setBackBtn])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <UserProgress />
    </View>
  )
}

function ScreenGlobalProgress ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setBackBtn(false)
      ctx.setPageTitle('Global Progress')
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setPageTitle, ctx.setBackBtn])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <GlobalProgress />
    </View>
  )
}

function ScreenUserSettings ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setBackBtn(false)
      ctx.setPageTitle('Settings')
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setPageTitle, ctx.setBackBtn])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <UserSettings />
    </View>
  )
}

function ScreenNews ({ navigation }) {
  const ctx = useContext(Context)

  useEffect(() => {
    function handleFocus () {
      ctx.setBackBtn(false)
      ctx.setPageTitle('News')
    }
    navigation.addListener('focus', handleFocus)

    return () => {
      navigation.removeListener('focus', handleFocus)
    }
  }, [ctx.setPageTitle, ctx.setBackBtn])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <News />
    </View>
  )
}

const Drawer = createDrawerNavigator()

function MyDrawer () {
  return (
    <Drawer.Navigator

      drawerLockMode='locked-open'

      screenOptions={({ route }) => ({

        drawerIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <MaterialCommunityIcons
              name='home-circle'
              size={size}
              color={color}
            />
          } else if (route.name === 'Profile') {
            return <EvilIcons
              name='user'
              size={size}
              color={color}
            />
          } else if (route.name === 'My Progress') {
            return <MaterialCommunityIcons
              name='chart-bar'
              size={size}
              color={color}
            />
          } else if (route.name === 'Global Progress') {
            return <FontAwesome
              name='globe'
              size={size}
              color={color}
            />
          } else if (route.name === 'Settings') {
            return <MaterialCommunityIcons
              name='settings'
              size={size}
              color={color}
            />
          } else if (route.name === 'News') {
            return <MaterialCommunityIcons
              name='newspaper'
              size={size}
              color={color}
            />
          }
        }
      })}
      tabBarOptions={
        {
          activeTintColor: '#ffa500',
          inactiveTintColor: '#4b0082',

          style: {
            backgroundColor: 'red'
          }
      }
      }
    >
      <Drawer.Screen
        name='Home'
        component={ScreenHome}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen name='Profile' component={ScreenUserProfile} />
      <Drawer.Screen name='My Progress' component={ScreenUserProgress} />
      <Drawer.Screen name='Global Progress' component={ScreenGlobalProgress} />
      <Drawer.Screen name='Settings' component={ScreenUserSettings} />
      <Drawer.Screen name='News' component={ScreenNews} />

    </Drawer.Navigator>
  )
}

export default function Routes () {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  )
}
