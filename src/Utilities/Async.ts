import { EventEmitter } from './EventEmitter'

// Note: this class will be deprecated soon.
// Please avoid using it in your code.
class Async extends EventEmitter {
  __asyncCount: number
  ready: boolean
  incAsyncCount: (count?: number) => void
  decAsyncCount: () => void
  __asyncsCompleted: () => void

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
      this.emit('ready', {})
    }
  }

  get count(): number {
    return this.__asyncCount
  }
}

export { Async }
