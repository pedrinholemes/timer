import { Timer } from './utils/timer.js'

/**
 * @type {import("socket.io-client").Socket}
 */
// eslint-disable-next-line no-undef
const socket = io()
function render(time = 0) {
  document.querySelector('span#seconds').textContent = String(
    Math.floor(time % 60)
  ).padStart(2, '0')
  document.querySelector('span#minutes').textContent = String(
    Math.floor(time / 60)
  ).padStart(2, '0')
}
let timer
socket.on('hello', () => {
  timer?.pause()
  timer = new Timer({ render })
})

socket.on('data', data => {
  timer = new Timer({ ...data, render })
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

const addSecondsInput = document.querySelector('input#add-sec')
const removeSecondsInput = document.querySelector('input#remove-sec')
const addButton = document.querySelector('a#add')
const removeButton = document.querySelector('a#remove')
const startButton = document.querySelector('a#start')
const resetButton = document.querySelector('a#reset')
const pauseButton = document.querySelector('a#pause')

addButton.addEventListener('click', () =>
  socket.emit('admin-timer-add', { value: Number(addSecondsInput.value) })
)
removeButton.addEventListener('click', () =>
  socket.emit('admin-timer-remove', { value: Number(removeSecondsInput.value) })
)
startButton.addEventListener('click', () => socket.emit('admin-timer-start'))
pauseButton.addEventListener('click', () => socket.emit('admin-timer-pause'))
resetButton.addEventListener('click', () => socket.emit('admin-timer-reset'))
