import React from 'react'

import { View, Text } from 'react-native'

import styles from '../../styles'

const Dating = ({ title }) => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.pageContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

export default Dating
