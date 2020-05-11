import React, { useContext } from 'react'

import { View, Text } from 'react-native'

import RadioSelect from '../../components/radioSelect'

import styles from './styles'

import Context from '../../components/user/configContext'

const UserSettings = (props) => {
  const ctx = useContext(Context)

  const meditationLevels = [
    { label: '30', value: 30 },
    { label: '60', value: 60 },
    { label: '90', value: 90 },
    { label: '120', value: 120 }
  ]

  function getMeditationLength () {
    return ctx.getMeditationLength()
  }

  function setMeditationLength (index) {
    return ctx.setMeditationLength(index)
  }

  return (
    <View style={styles.pageContainer}>

      <View style={styles.section}>
        <Text style={styles.titleBtns}>Meditation lenght (in minutes):</Text>
        <View style={styles.rowOfBtns}>
          <RadioSelect
            getter={getMeditationLength}
            setter={setMeditationLength}
            array={meditationLevels}
          />
        </View>
      </View>

    </View>
  )
}

export default UserSettings
