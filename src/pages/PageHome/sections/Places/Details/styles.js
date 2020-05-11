import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    top: 0
  },

  title: {
    zIndex: 9,
    paddingTop: 5,
    paddingRight: 24,
    paddingLeft: 24,
    fontSize: 18,
    color: '#fff',
    width: '100%',
    position: 'absolute',
    fontWeight: 'bold'
  },

  coverImg: {
    width: '100%',
    height: 180
  },

  imgBottom: {
    marginTop: -45,
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },

  imgBottomText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },

  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },

  row: {
    flexDirection: 'row'
  },

  text: {
    fontSize: 14,
    lineHeight: 18,
    marginVertical: 6,
    color: '#737380'
  },

  widthHalf: {
    width: '50%'
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

  box: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 0
  },

  actions: {
    // marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  action: {
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  btnBig: {
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',

    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10
  },

  btnLite: {
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
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10
  },

  btnOff: {
    borderColor: '#E6F1E3',
    backgroundColor: '#fff'
  },

  btnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 15
  },

  btnTextOff: {
    color: '#ccc',
  },

  btnTextLite: {
    color: '#fff',
    fontSize: 9,
    marginTop: 3
  },

  candyPink: {
    backgroundColor: '#4b0082'
  },

  spaceCadet: {
    backgroundColor: '#ffa500'
  },

  minionYellow: {
    backgroundColor: '#4b0082'
  },

  lightGray: {
    backgroundColor: '#D1D1D1'
  },

  cadetBlue: {
    backgroundColor: '#4b0082'
  },

  whatsapp: {
    backgroundColor: '#4b0082'
  },

  facebook: {
    backgroundColor: '#4b0082'
  }

})
