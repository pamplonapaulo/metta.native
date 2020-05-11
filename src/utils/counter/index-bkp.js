'use strict'

const counter = (minutes, isRunning) => {
  minutes--
  let seconds = 60
  let paddingMinute = ''
  let paddingSecond = ''
  let output = minutes.toString() + ':00'

  var timer = setInterval(function () {
    if (isRunning) { runCounter(minutes) }

    return output
  }, 1000)

  function clearCounter () {
    clearInterval(timer)
    output = '00:00'
  }

  function runCounter (minutes) {
    console.log('estou rodando...')

    if (minutes <= 0 && seconds <= 0) {
      clearCounter()
    } else if (minutes !== 0 && seconds === 0) {
      minutes--
      seconds = 60
    }
    seconds--

    paddingMinute = minutes < 10 ? '0' : ''
    paddingSecond = seconds < 10 ? '0' : ''

    output = paddingMinute + minutes.toString() + ':' + paddingSecond + seconds.toString()
    // return paddingMinute + minutes.toString() + ':' + paddingSecond + seconds.toString()
  }
}

export default counter
