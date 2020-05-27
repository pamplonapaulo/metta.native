import socketio from 'socket.io-client'

// const socket = socketio('http://192.168.0.10:3000', {
//     autoConnect: false,
// })

const socket = socketio('http://localhost:3000', {
  autoConnect: false
})

function subscribeToNewPlaces (subscribeFunction) {
  socket.on('place', subscribeFunction)
}

function subscribeToNewSchedules (subscribeFunction) {
  socket.on('schedule', subscribeFunction)
}

function subscribeToNewRituals (subscribeFunction) {
  socket.on('rituals', subscribeFunction)
}

function connect (latitude, longitude, doctrine) {

  socket.io.opts.query = {
    latitude,
    longitude,
    doctrine
  }
  socket.connect()
}

// function connectSchedule (place_id) {

//   socket.io.opts.query = {
//     place_id
//   }
//   socket.connect()
// }

function connectRituals (id) {

  socket.io.opts.query = {
    place_id: id
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
  connectRituals,
  disconnect,
  subscribeToNewPlaces,
  subscribeToNewSchedules,
  subscribeToNewRituals
}
