import { StyleSheet } from 'react-native'
// import Constants from 'expo-constants';

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 0,
    // paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#fff',
    top: 0,
    flexDirection: 'column'
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    color: '#13131a',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold'
  },

  button: {
    marginTop: 100,
    position: 'absolute',
    zIndex: 19,
    alignSelf: 'center',
    flexDirection: 'column',
    flex: 1,
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

  buttonText: {
    fontSize: 20,
    color: '#4b0082',
    textAlign: 'center',
    textTransform: 'uppercase'
  },

  // circleWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   backgroundColor: '#666A44',
  //   width: '100%',
  //   width: 250,
  //   height: '100%'
  // },
  counterContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%'
  },

  counterNumber: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 50,
    width: '100%',
    textAlign: 'center'
  }

})
