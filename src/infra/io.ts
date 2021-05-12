import Socket from 'socket.io'
import { CountDown } from '../services/CountDown'
import { Timer } from '../services/Timer'
import { server } from './server'

export { app } from './app'
export { server } from './server'

export const io = new Socket.Server(server)

const timer = new Timer({
  render: time => {
    console.log(
      `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(
        Math.floor(time % 60)
      ).padStart(2, '0')}`
    )
  }
})

const countdown = new CountDown({
  time: 60,
  render: time => {
    console.log(
      `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(
        Math.floor(time % 60)
      ).padStart(2, '0')}`
    )
  }
})

io.on('connection', socket => {
  console.log(socket.id)
  socket.emit('hello')

  // TIMER
  socket.on('admin-timer-reset', data => {
    timer.reset()
    io.emit('client-timer-reset', data)
  })
  socket.on('admin-timer-add', data => {
    timer.add(data.value)
    io.emit('client-timer-add', data)
  })
  socket.on('admin-timer-remove', data => {
    timer.remove(data.value)
    io.emit('client-timer-remove', data)
  })
  socket.on('admin-timer-start', data => {
    io.emit('client-timer-start', data)
    timer.start()
  })
  socket.on('admin-timer-pause', data => {
    io.emit('client-timer-pause', data)
    timer.pause()
  })

  // // TIMER
  // socket.on('admin-countdown-reset', data => {
  //   countdown.reset()
  //   io.emit('client-countdown-reset', data)
  // })
  // socket.on('admin-countdown-add', data => {
  //   countdown.add(data.value)
  //   io.emit('client-countdown-add', data)
  // })
  // socket.on('admin-countdown-remove', data => {
  //   countdown.remove(data.value)
  //   io.emit('client-countdown-remove', data)
  // })
  // socket.on('admin-countdown-start', data => {
  //   io.emit('client-countdown-start', data)
  //   countdown.start()
  // })
  // socket.on('admin-countdown-pause', data => {
  //   io.emit('client-countdown-pause', data)
  //   countdown.pause()
  // })
})
