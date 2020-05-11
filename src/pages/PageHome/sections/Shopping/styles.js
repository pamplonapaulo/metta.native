import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    //flexDirection: 'column',
    paddingHorizontal: 0,
    paddingTop: Constants.statusBarHeight + 20,
    // backgroundColor: '#38454E',
    //height: '100%',
    top: 0
  },

  smallContainer: {
    flex: 1,
    paddingHorizontal: 10,
    top: '50%'

    //height: '100%',
  },

  buttonText: {
    fontSize: 20,
    color: '#4b0082',
    textAlign: 'center',
    textTransform: 'uppercase'
  },

  button: {
    marginTop: 100,
    position: 'absolute',
    zIndex: 19,
    alignSelf: 'center',
    // flexDirection: 'column',
    // flex: 1,
    backgroundColor: '#ffa500',
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1
    },
    elevation: 1,
  },

  textNetwork: {
    color: '#4b0082',
    alignSelf: 'center',
    fontSize: 50,
    width: '100%',
    textAlign: 'center'
  }

})
