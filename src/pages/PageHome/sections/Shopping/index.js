import React, { useEffect, useState } from 'react';
//import SystemSetting from 'react-native-system-setting'
import * as Network from 'expo-network';

import { View, Text, TouchableOpacity } from 'react-native'

import styles from './styles'

function Shopping(title) {

  const [response, setResponse] = useState()
  useEffect(() => {
    handleNetwork()
  }, [])

  async function handleNetwork() {

    const { type } = await Network.getNetworkStateAsync();

    if(type !== 'NONE')
      console.log('Make sure nothing will disturb your meditation, so shut down all network connections')
    /*

    https://docs.expo.io/versions/v37.0.0/sdk/network/#networknetworkstatetype

    NONE -- no active network connection detected.
    UNKNOWN -- the connection type could not be determined.
    CELLULAR -- active network connection over mobile data or DUN-specific mobile connection when setting an upstream connection for tethering.
    WIFI -- active network connection over Wifi.
    BLUETOOTH -- active network connection over Bluetooth.
    ETHERNET -- active network connection over Ethernet.
    WIMAX -- active network connection over Wimax.
    VPN -- active network connection over VPN.
    OTHER -- active network connection over other network connection types.

    */
    setResponse(type)
  }

  return (
    <View style={styles.pageContainer}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {handleNetwork()}}
      >
        <Text style={styles.buttonText}>
          check
        </Text>
      </TouchableOpacity>

      <View style={styles.smallContainer}>
        <Text style={styles.textNetwork}>
          {JSON.stringify(response)}
        </Text>
      </View>

    </View>
  );
}

export default Shopping
