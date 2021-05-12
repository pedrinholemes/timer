/**
 * @private {interval}
 * @private {now}
 * @private {paused}
 *
 * @description Create a timer
 */
export class Timer {
  /**
   * @param {object} data
   * @param {number} [data.now]
   * @param {boolean} [data.paused]
   * @param {(time: number) => unknown} data.render
   */
  constructor(data) {
    if (!data.render) throw new TypeError('render has be a Function')
    this.now = data.now || 0
    this.paused = data.paused || true
    this.interval = null
    this.render = data.render || console.log
    this.render(this.now)
    if (!this.paused) {
      this.start()
    }
  }

  /**
   * @returns {void}
   */
  start() {
    this.interval = setInterval(() => {
      this.now = this.now + 1
      this.render(this.now)
    }, 1000)
  }

  /**
   * @returns {void}
   */
  pause() {
    this.paused = true
    clearInterval(this.interval)
    this.interval = null
  }

  /**
   * @param {number} time
   * @returns {void}
   */
  add(time = 0) {
    this.now = this.now + time
  }

  /**
   * @param {number} time
   * @returns {void}
   */
  remove(time = 0) {
    this.now = this.now - time
  }

  reset() {
    if (!this.paused) return
    this.now = 0
    this.render(this.now)
  }
}
