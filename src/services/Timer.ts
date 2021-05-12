export class Timer {
  private now: number
  private paused: boolean
  public render: (time: number) => unknown
  public interval: NodeJS.Timeout | null

  constructor(data: {
    now?: number
    paused?: boolean
    render: (time: number) => unknown
  }) {
    this.now = data.now || 0
    this.paused = data.paused || true
    this.interval = null
    this.render = data.render || console.log
    if (!this.paused) {
      this.start()
    }
  }

  /**
   * @returns {void}
   */
  start(): void {
    try {
      this.interval = setInterval(() => {
        this.now = this.now + 1
        this.render(this.now)
      }, 1000)
    } catch (e) {
      console.log(e)
      // if (this.paused === false) this.start()
    }
  }

  /**
   * @returns {void}
   */
  pause(): void {
    this.paused = true
    this.interval && clearInterval(this.interval)
    this.interval = null
  }

  add(time: number): void {
    this.now = this.now + time
  }

  remove(time: number): void {
    this.now = this.now - time
  }

  reset(): void {
    if (!this.paused) return
    this.now = 0
    this.render(this.now)
  }

  getData(): { now: number; paused: boolean } {
    return {
      now: this.now,
      paused: this.paused
    }
  }
}
