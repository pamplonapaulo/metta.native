import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Radar from './Radar'
import Details from './Details'
import Website from './Website'
import Schedule from './Schedule'

const Places = createAppContainer(
  createStackNavigator({
    Radar: {
      screen: Radar,
      navigationOptions: {
        title: 'Radar'
      }
    },
    Details: {
      screen: Details,
      navigationOptions: {
        title: 'Details'
      }
    },
    Schedule: {
      screen: Schedule,
      navigationOptions: {
        title: 'Schedule'
      }
    },
    Website: {
      screen: Website,
      navigationOptions: {
        title: 'Website'
      }
    }
  }, {
    defaultNavigationOptions: {
      headerShown: false
    }
  })
)

export default Places
