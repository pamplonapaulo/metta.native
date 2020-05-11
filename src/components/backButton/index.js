import React, { useContext } from 'react'

import { StyleSheet, View, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import Context from '../user/configContext'

const BackButton = () => {

  const ctx = useContext(Context)

  let btnVisibility = 'transparent'

  if(ctx.getBackBtn()){
    btnVisibility = '#4b0082'
  } else {
    btnVisibility = 'transparent'
  }

  const handleOnPress = () => {

    if(ctx.getBackBtn()){
      let nav = ctx.getNavigationObj()
      let destiny = ctx.getBackDestiny()

      ctx.setBackBtn(false)
      ctx.restorePrevPageTitle()
      nav.navigate(destiny)
    }
  }

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOnPress}
      >
        <Ionicons
          name='md-arrow-back'
          style={styles.text}
          color={btnVisibility}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  wrap: {
    position: 'absolute',
    flex: 1,
    zIndex: 999,
    paddingHorizontal: 0,
    left: 10,
    height: '100%',
    justifyContent: 'center',
    display: 'none'
  },

  button: {
    borderRadius: 20,
    width: 45,
    height: 40,
    justifyContent: 'center'
  },

  text: {
    textAlign: 'center',
    fontSize: 30,
    textTransform: 'uppercase'
  }

})

export default BackButton
