import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  header: {
    marginTop: 40,
    zIndex: 2,
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#ffa500',

    borderColor: '#4b0082',
    borderBottomWidth: 1,


    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 }, // change this for more shadow
    shadowOpacity: .2,
    shadowRadius: 6 
  },

  headerTitle: {
    position: 'absolute',
    width: '100%',
    fontSize: 12,
    color: '#4b0082',
    textAlign: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase'
  },

  touchable: {
    margin: 15,
    right: 0
  },

  hamburguer: {
    color: '#4b0082',
    fontSize: 40
  }

})
