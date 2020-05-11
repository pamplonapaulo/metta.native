import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  wrap: {
    position: 'absolute',
    flex: 1,
    zIndex: 999,
    paddingHorizontal: 0,
    left: 10,
    height: '100%',
    justifyContent: 'center'
  },

  button: {
    borderRadius: 20,
    width: 45,
    height: 40,
    justifyContent: 'center'
  },

  text: {
    textAlign: 'center',
    color: '#4b0082',
    fontSize: 30,
    textTransform: 'uppercase'
  }

})
