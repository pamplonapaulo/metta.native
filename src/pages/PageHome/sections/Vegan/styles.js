import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#2C3458',
    top: 0
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    color: '#13131a',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold'
  }

})
