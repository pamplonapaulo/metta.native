import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'

import styles from './styles'

import gong from '../gong/index'

export default function SeatTimer ({ length, isRunning, startingTime, seatingSuccessful }) {
  const checkAccomplishment = (timeLeft) => {
    if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      gong.handlePlay()
      return seatingSuccessful()
    }
  }

  if (!isRunning) {
    const lengthOff = (+new Date() + 60000 * length) - +new Date()

    const reseted = {
      hours: Math.floor((lengthOff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((lengthOff / 1000 / 60) % 60),
      seconds: Math.floor((lengthOff / 1000) % 60)
    }

    return (
      <Text style={styles.counterNumber}>
        {reseted.hours > 0 ? reseted.hours + ':' : ''}
        {reseted.minutes > 9 ? reseted.minutes : '0' + reseted.minutes}
        {':'}
        {reseted.seconds > 9 ? reseted.seconds : '0' + reseted.seconds}
      </Text>
    )
  }

  const calculateTimeLeft = () => {
    const difference = (startingTime + 60000 * length) - +new Date()

    let timeLeft = {}

    timeLeft = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    setTimeout(() => {
      checkAccomplishment(timeLeft)
      setTimeLeft(calculateTimeLeft())
    }, 250)
  })

  return (
    <Text style={styles.counterNumber}>
      {timeLeft.hours > 0 ? timeLeft.hours + ':' : ''}
      {timeLeft.minutes > 9 ? timeLeft.minutes : '0' + timeLeft.minutes}
      {':'}
      {timeLeft.seconds > 9 ? timeLeft.seconds : '0' + timeLeft.seconds}
    </Text>
  )
}
