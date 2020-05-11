import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#078BAC',
    top: 0
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    color: '#13131a',
    textAlign: 'center',
    width: '100%',
    fontWeight: 'bold'
  },

  emoji: {
    fontSize: 120,
    textAlign: 'center',
    justifyContent: 'center',
    height: '100%'
  },

  map: {
    flex: 1
  },

  marker: {
    flex: 1
  },

  avatar: {
    width: 34,
    height: 34,
    // backgroundColor: 'yellow',
    // borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc'
  },

  callout: {
    width: 260
  },

  textWrapper: {
    // transform: [{ translateX: -100 }],
    // backgroundColor: '#fff',
    // padding: 4,
    // borderWidth: 1,
    // borderColor: '#ccc'
  },

  name: {
    color: '#2B8BAC',
    fontSize: 10,
    width: '100%',
    textAlign: 'center'
  },

  doctrine: {
    color: '#2C3458',
    marginTop: 5,
    fontSize: 10,
    width: '100%',
    textAlign: 'center'
  },

  pin: {
    color: '#2B8BAC',
    width: '100%',
    textAlign: 'center'
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    display: 'flex',
    flexDirection: 'row'
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },

  loadButton: {
    height: 50,
    width: 50,
    backgroundColor: '#3D74AC',
    borderColor: '#38454F',
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }

})
