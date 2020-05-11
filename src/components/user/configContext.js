import React, { createContext } from 'react'

const Context = createContext()

class ConfigProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userLoggedIn: true,

      pageBack: undefined,
      pageCurrent: 'metta.club',

      navBackwards: {
        visibility: false,
        destiny: undefined,
        navObject: undefined
      },

      isSeating: false,

      profile: {

        id: 0,
        username: 'Paulo Pamplona',
        bio: 'I\'m a web developer who practice Vipassana meditation and lives in Brazil.',
        image: 'https://morganfillman.space/200/200',
        meditation: {
          length: 0,
          favorites: [],
          frequency: {
            lastWeek: 7,
            lastMonth: 30,
            lastSemester: 360
          }
        },

        dating: {
          isAllowed: true,
          hasActiveMatch: false,
          reported: {
            hasBadReviews: false,
            badReviews: []
          }
        },

        places: {
          favoritePlaces: []
        },

        shopping: {
          favoriteProducts: []
        },

        veganFood: {
          favoritesRestaurants: []
        }

      },

      checkSeatingStatus: (hour, minute, second) => {
        if (hour === 0 && minute === 0 && second === 0) { this.setState({ isSeating: false }) }
      },

      toggleLogin: () => {
        const setTo = !this.state.userLoggedIn
        this.setState({ userLoggedIn: setTo })
      },

      toggleSeating: () => {
        const setTo = !this.state.isSeating
        this.setState({ isSeating: setTo })
      },

      quitSeating: () => {
        this.setState({ isSeating: false })
      },

      setMeditationLength: (value) => {
        this.setState({ profile: { meditation: { length: value } } })
      },

      getMeditationLength: () => {
        return this.state.profile.meditation.length
      },

      setPageTitle: (value) => {

        this.setState({ 
          pageBack: this.state.pageCurrent,
          pageCurrent: value,
        })

        //this.setState({ pageTitle: value })
      },

      getPageTitle: () => {
        return this.state.pageCurrent
      },

      restorePrevPageTitle: () => {
        this.setState({ 
          pageCurrent: this.state.pageBack
        })
      },

      setBackBtn: (visibility) => {
        this.setState({ navBackwards: { visibility: visibility } })
      },

      getBackBtn: () => {
        return this.state.navBackwards.visibility
      },

      setBackDestiny: (destiny) => {
        this.setState({ navBackwards: { destiny: destiny } })
      },

      getBackDestiny: () => {
        return this.state.navBackwards.destiny
      },

      getBackwardsFunc: () => {
        return this.state.navBackwards.navObject
      },

      setBackwardsFunc: (navObject) => {
        this.setState({ navBackwards: { navObject: navObject } })
      },

      setUserBio: (value) => {
        this.setState({ profile: { bio: value } })
      },

      getUserBio: () => {
        return this.state.profile.bio
      },

      isUserSeating: () => {
        return this.state.isSeating
      },

      setNavBackwards: (bool, string, obj) => {

        this.setState({ navBackwards: {
          visibility: bool,
          destiny: string,
          navObject: obj
        }})
      },

      getNavigationObj: () => {
        return this.state.navBackwards.navObject
      }
    }
  }

  render () {
    return (
      <Context.Provider
        value={{
          profile: this.state.profile,
          userLoggedIn: this.state.userLoggedIn,

          isSeating: this.state.isSeating,
          quitSeating: this.state.quitSeating,
          toggleLogin: this.state.toggleLogin,
          isUserSeating: this.state.isUserSeating,
          toggleSeating: this.state.toggleSeating,
          setMeditationLength: this.state.setMeditationLength,
          getMeditationLength: this.state.getMeditationLength,

          pageBack: this.state.pageBack,
          pageCurrent: this.state.pageCurrent,
          setPageTitle: this.state.setPageTitle,
          getPageTitle: this.state.getPageTitle,
          restorePrevPageTitle: this.state.restorePrevPageTitle,

          navBackwards: this.state.navBackwards,
          setBackBtn: this.state.setBackBtn,
          getBackBtn: this.state.getBackBtn,
          setBackDestiny: this.state.setBackDestiny,
          getBackDestiny: this.state.getBackDestiny,
          setBackwardsFunc: this.state.setBackwardsFunc,
          getBackwardsFunc: this.state.getBackwardsFunc,

          setUserBio: this.state.setUserBio,
          getUserBio: this.state.getUserBio,
          setNavBackwards: this.state.setNavBackwards,
          getNavigationObj: this.state.getNavigationObj,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export { ConfigProvider }

export default Context
