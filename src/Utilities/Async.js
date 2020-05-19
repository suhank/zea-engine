/* eslint-disable require-jsdoc */
import { Signal } from './Signal.js'


// Note: this class will be deprecated soon. 
// Please avoid using it in your code.
class Async {
  constructor(asyncCount = 0) {
    this.__asyncCount = asyncCount
    this.ready = new Signal(true)

    this.incAsyncCount = function(count = 1) {
      this.__asyncCount += count
      this.ready.setToggled(false)
    }.bind(this)

    this.decAsyncCount = function() {
      if (this.__asyncCount > 0) {
        this.__asyncCount--
        if (this.__asyncCount == 0) {
          this.__asyncsCompleted()
        }
      }
    }.bind(this)

    this.__asyncsCompleted = function() {
      this.ready.emit()
    }.bind(this)
  }

  get count() {
    return this.__asyncCount
  }
}

export { Async }
