
import React from 'react'

import Routes from './src/routes'

import { ConfigProvider } from './src/components/user/configContext'

function App () {
  return <ConfigProvider>
    <Routes />
  </ConfigProvider>
}

export default App
