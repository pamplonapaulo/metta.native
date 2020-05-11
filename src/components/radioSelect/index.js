import React from 'react'
import { View, Text } from 'react-native'

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'

import styles from './styles'

const RadioSelect = (props) => {
  function handleSet (index) {
    return props.setter(index)
  }

  function handleGet () {
    return props.getter()
  }

  return (

    <View
      style={styles.container}
    >

      <RadioForm
        style={styles.wrapper}
        formHorizontal
        animation
      >
        {

          props.array.map((obj, i) => (
            <RadioButton labelHorizontal={false} key={i}>

              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={handleGet() === i}
                onPress={(value) => { handleSet(i) }}
                borderWidth={2}
                buttonInnerColor='#2C3458'
                buttonOuterColor={handleGet() === i ? '#2C3458' : '#2C3458'}
                buttonSize={15}
                buttonOuterSize={30}
                buttonStyle={{}}
                buttonWrapStyle={{ height: 40, justifyContent: 'center' }}
              />

              <RadioButtonLabel
                style={styles.labels}
                obj={obj}
                index={i}
                labelHorizontal={false}
                onPress={(value) => { handleSet(i) }}
                labelStyle={{ fontSize: 15, color: '#2C3458', textAlign: 'center' }}
                labelWrapStyle={{ width: 45, justifyContent: 'center' }}
              />

            </RadioButton>
          ))
        }
      </RadioForm>

      <Text>Meditation: {props.array[handleGet()].label} minutes</Text>

    </View>
  )
}

export default RadioSelect
