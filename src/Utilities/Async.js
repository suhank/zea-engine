import { EventEmitter } from './EventEmitter.js'

/** Class representing an Async. */
class Async extends EventEmitter {
  /**
   * Create a Async.
   * @param {number} asyncCount - The asyncCount value.
   */
  constructor(asyncCount = 0) {
    super()
    this.__asyncCount = asyncCount
    this.ready = false

    this.incAsyncCount = (count = 1) => {
      this.__asyncCount += count
      this.ready = false
    }

    this.decAsyncCount = () => {
      if (this.__asyncCount > 0) {
        this.__asyncCount--
        if (this.__asyncCount == 0) {
          this.__asyncsCompleted()
        }
      }
    }

    this.__asyncsCompleted = () => {
      this.emitEvent('ready', {})
    }
  }

  /**
   * Getter for count.
   */
  get count() {
    return this.__asyncCount
  }
}

export { Async }
