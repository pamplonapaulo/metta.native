import { Audio } from 'expo-av'

const gong = {

  handlePlay: async function () {
    const soundObject = new Audio.Sound()

    try {
      await soundObject.loadAsync(require('./gongs.wav'))
      await soundObject.playAsync()
    } catch (error) {
      console.log('An error occurred')
    }

    setTimeout(() => {
      soundObject.stopAsync()
      soundObject.unloadAsync()
    }, 10000)
  }
}

export default gong
