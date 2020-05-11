import React from 'react'
import { WebView } from 'react-native-webview'

function Website ({ navigation }) {
  const website = navigation.getParam('website')
  console.log(website)

  // const githubUsername = navigation.getParam('github_username')
  return <WebView source={{ uri: 'https://github.com/pamplonapaulo' }} />
  // return <WebView style={{ flex: 1 }} source={{ uri: `https://www.${website}` }} />
}

export default Website
