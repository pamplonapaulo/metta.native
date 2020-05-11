import React, { useState, useContext } from 'react'

import { useIsDrawerOpen } from '@react-navigation/drawer'

import { View, Text, TouchableOpacity } from 'react-native'

import styles from './styles'

import Context from '../../../../components/user/configContext'

import SeatTimer from '../../../../components/seatTimer'

const meditationLevels = [30, 60, 90, 120]

const Seat = () => {
  const [initialTime, setInitialTime] = useState(false)

  const ctx = useContext(Context)

  function setSuccessfulSeating () {
    return ctx.quitSeating()
  }

  const isDrawerOpen = useIsDrawerOpen()

  if (isDrawerOpen && ctx.isUserSeating()) {
    ctx.quitSeating()
  }

  return (
    <View style={styles.pageContainer}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setInitialTime(+new Date())
          ctx.toggleSeating()
        }}
      >
        <Text style={styles.buttonText}>
          {ctx.isUserSeating() ? 'Quit' : 'Start Again'}
        </Text>

      </TouchableOpacity>

      <View style={styles.counterContainer}>
        <SeatTimer
          length={meditationLevels[ctx.getMeditationLength()]}
          isRunning={ctx.isUserSeating()}
          startingTime={ctx.isUserSeating() ? initialTime : null}
          seatingSuccessful={setSuccessfulSeating}
        />
      </View>

    </View>
  )
}

export default Seat
