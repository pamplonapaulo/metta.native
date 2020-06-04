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
    borderColor: '#4b0082',
    borderRightWidth: 1,
    width: 84,
    position: 'absolute',
    zIndex: 2
  },

  coverImg: {
    width: '100%',
    // height: 180,
    height: 225,
    zIndex: 1,
    opacity: 0.5
  },

  bg: {
    width: '100%',
    // height: 180,
    height: 225,
    //backgroundColor: '#ccc',
    backgroundColor: '#ffa500',
    backgroundColor: '#fff',

    zIndex: 1,
    opacity: 1

  },

  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },

  inative: {
    color: '#ccc'
  },


  widthFull: {
    width: '100%'
  },

  centered: {
    textAlign: 'center'
  },

  left: {
    paddingLeft: 24,
    textAlign: 'left'
  },

  right: {
    textAlign: 'right'
    // width: '100%'
  },

  topPadding: {
    paddingTop: 24
  },

  rightPadding: {
    paddingRight: 24
  },

  verticalBottom: {
    justifyContent: 'flex-end'
  },

  headerDayTop: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold'
  },

  headerDayBottom: {
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold'
  },

  headerDay: {
    paddingHorizontal: 6,
    marginBottom: -40,
    paddingTop: 5,
    width: '100%',
    height: 40,
    zIndex: 99,
    flexDirection: 'row'    
  },

  days: {
    paddingLeft: 55,
    paddingBottom: 75,
    //backgroundColor: 'orange',
    top: 150,
    zIndex: 99,
    position: 'absolute',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    
    //transform: [{ translateX: (-78 * 2) }]
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
    backgroundColor: '#E6F1E3',
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    // shadowColor: 'grey',
    shadowColor: 'red',
    //shadowOpacity: 0.5,
    shadowOpacity: 1,
    shadowRadius: 10
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

  btnDay: {
    marginRight: 20
  },

  blockedArea: {
    width: 282,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  hiddenBtnDay: {
    marginRight: 0,
    width: 0,
    borderWidth: 0
  },

  btnTextLite: {
    color: '#000',
    fontSize: 19,
    marginTop: 3
  },

  row: {
    flexDirection: 'row'
  },

  stack: {
    paddingTop: 80,
    paddingBottom: 130,
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
    zIndex: 99
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
