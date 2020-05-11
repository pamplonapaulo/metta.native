import socketio from 'socket.io-client'

// const socket = socketio('http://192.168.0.10:3000', {
//     autoConnect: false,
// })

const socket = socketio('http://localhost:3000', {
  autoConnect: false
})

function subscribeToNewPlaces (subscribeFunction) {
  socket.on('new-place', subscribeFunction)
}

function connect (latitude, longitude, doctrine) {
  socket.io.opts.query = {
    latitude,
    longitude,
    doctrine
  }
  socket.connect()
}

function disconnect () {
  if (socket.connected) {
    socket.disconnect()
  }
}

export {
  connect,
  disconnect,
  subscribeToNewPlaces
}
