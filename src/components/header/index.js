import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons'

import { View, Text, TouchableOpacity } from 'react-native'

import BackButton from '../backButton'

import styles from './styles'

import Context from '../../components/user/configContext'

const Header = (props) => {
  const ctx = useContext(Context)

  const handleOnPress = () => {
    props.navigation.toggleDrawer()
  }

  return (

    <View style={styles.header}>
      <BackButton />
      <Text style={styles.headerTitle}>
        {ctx.getPageTitle()}
      </Text>
      <TouchableOpacity
        style={styles.touchable}
        onPress={handleOnPress}
      >

        <Ionicons
          name='ios-menu'
          style={styles.hamburguer}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header
