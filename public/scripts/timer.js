import { Timer } from './utils/timer.js'

/**
 * @type {import("socket.io-client").Socket}
 */
// eslint-disable-next-line no-undef
const socket = io()

function render(time = 0) {
  document.querySelector('span#seconds').textContent = String(
    Math.round(time % 60)
  ).padStart(2, '0')
  document.querySelector('span#minutes').textContent = String(
    Math.round(time / 60)
  ).padStart(2, '0')
}

let timer
socket.on('hello', () => {
  if (timer) {
    timer.pause()
  }
  timer = new Timer({ render })
})
socket.on('client-timer-start', () => {
  timer.start()
})
socket.on('client-timer-pause', () => {
  timer.pause()
})
socket.on('client-timer-add', data => {
  timer.add(data.value)
})
socket.on('client-timer-remove', data => {
  timer.remove(data.value)
})
socket.on('client-timer-reset', () => {
  timer.reset()
})
