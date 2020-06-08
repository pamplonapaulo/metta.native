import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  pageContainer: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    top: 0
  },

  lineMark: {
    height: '100%',
    // borderColor: '#737380',
    borderColor: '#000',
    borderRightWidth: 2,
    width: 84,
    position: 'absolute',
    zIndex: 2,
    transform: [{ translateX: 1 }]
  },

  bg: {
    width: '100%',
    height: 220,
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#D3CDD7',
  },

  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },

  currentDisplayWrapper: {
    textAlign: 'center',
    width: '100%',
    height: 20,
    zIndex: 999,
    display: 'flex',
    alignItems: 'flex-end',
    flex: 1,
    backgroundColor: 'blue',
    transform: [{ translateY: -1 }]
  },

  currentDisplay: {
    fontSize: 13,
    backgroundColor: '#D3CDD7',
    paddingHorizontal: 10
  },

  days: {
    paddingLeft: 55,
    paddingBottom: 75,
    top: 150,
    zIndex: 99,
    position: 'absolute',
  },

  months: {
    paddingLeft: 55,
    paddingBottom: 75,
    top: 80,
    zIndex: 99,
    position: 'absolute'
  },

  years: {
    paddingLeft: 55,
    paddingBottom: 75,
    top: 10,
    zIndex: 99,
    position: 'absolute'
  },

  btn: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#9400D3',
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'red',
    shadowOpacity: 1,
    shadowRadius: 10,
    marginRight: 20
  },

  btnWknd: {
    backgroundColor: '#000',
  },

  btnOff: {
    borderWidth: 1,
    borderColor: 'transparent',
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },

  btnMonth: {
    backgroundColor: '#4b0082'
  },

  btnYear: {
    backgroundColor: '#0000ff'
  },

  ritualMarker: {
    position: 'absolute',
    display: 'flex',
    flex: 1,
    color: 'red',
    fontSize: 15,
    transform: [
      { translateY: -22 },
      { translateX: 19 }
    ]
  },

  ritualMarkerOff: {
    display: 'none',
    color: 'transparent',
    opacity: 0
  },

  btnTextLite: {
    color: '#ccc',
    fontSize: 19
  },

  blockedArea: {
    width: 282,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  stack: {
    paddingTop: 30,
    marginBottom: 220,
    flexDirection: 'column',
    zIndex: 99
  },

  itemRow: {
    flexDirection: 'row',
    marginBottom: 30,
    zIndex: 2
  },

  hour: {
    width: 55,
    height: 58,
    lineHeight: 58,
    textAlign: 'center'
  },

  sessionBtn: {
    backgroundColor: '#ccc',
    zIndex: 99,
    marginRight: 0
  },

  sessionText: {
    flex: 1,
    paddingHorizontal: 6,
  },

  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000'
  },

  description: {
    fontSize: 14,
    color: '#627264'
  }

})
