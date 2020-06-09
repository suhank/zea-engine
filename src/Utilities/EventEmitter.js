
import { BaseEvent } from './BaseEvent.js'

/** Class representing a EventEmitter. */
class EventEmitter {
  /**
   * Create an EventEmitter.
   */
  constructor() {
    this.__slots = {}
  }

  /**
   * Add a listener function to the EventEmiiter with the given eventName.
   * When the given event is triggered, the listern function will be invoked.
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function.
   * @return {any} - The return value.
   */
  addListener(eventName, listener) {
    if (listener == undefined)
      throw new Error('a function callback must be passed to EventEmitter.addListener')

    if (!this.__slots[eventName]) this.__slots[eventName] = []
    const slots = this.__slots[eventName]

    if (slots.indexOf(listener) != -1) {
      console.warn("listener '" + listener.name + "' already connected to EventEmitter with eventName:" + eventName)
      return
    }
    const id = slots.length
    slots[id] = listener
    return id
  }

  /**
   * Remove a listener function from the EvetEmitter.
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function.
   */
  removeListener(eventName, listener) {
    if (listener == undefined)
      throw new Error('a function callback must be passed to EventEmitter.disconnect')
      
    const slots = this.__slots[eventName]
    const ids = []
    if (slots) {
      slots.forEach((item, index) => {
        if (item === listener) {
          ids.push(index)
        }
      })
    }
    if (ids.length == 0) {
      const name = this.getName ? this.getName() : this.constructor.name
      console.warn(
        'Error in removeListener. listener :' +
          listener.name +
          ' was not connected to this event emitter:' +
          name
      )
    } else {
      for (const id of ids) {
        slots[id] = undefined
      }
    }
  }

  /**
   * The removeListenerById method.
   * @param {string} eventName - The name of the event.
   * @param {number} id - The id returned by addListener
   */
  removeListenerById(eventName, id) {
    const slots = this.__slots[eventName]
    if (!slots) {
      const msg =
        'callback :' + id + ' was not connected to this signal:' + eventName
      console.warn(msg)
      return
    }
    if (!slots[id]) throw new Error('Invalid ID')
    slots[id] = undefined
  }
  
  /**
   * Add a listener function to the EventEmiiter with the given eventName.
   * When the given event is triggered, the listern function will be invoked.
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function.
   * @return {any} - The return value.
   */
  on(eventName, listener) {
    return this.addListener(eventName, listener)
  }

  /**
   * Add a listener function to the EventEmiiter with the given eventName.
   * When the given event is triggered, the listern function will be invoked.
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function.
   */
  once(eventName, listener) {
    const id = this.addListener(eventName, (event) => {
      listener(event)
      this.removeListenerById(eventName, id)
    })
  }
  
  /**
   * The off method removes an event listener.
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function.
   */
  off(eventName, listener) {
    this.removeListener(eventName, listener)
  }

  /**
   * Emit the signal to all slots(observers)
   * @param {BaseEvent} event - The event object.
   */
  emit(eventName, event) {
    const slots = this.__slots[eventName]
    if (!slots) {
      return
    }

    const len = slots.length
    for (let i = 0; i < len; i++) {
      const fn = slots[i]
      // Skip disconnected slots.
      if (fn) {
        fn(event)
      }
    }
  }
}

export { EventEmitter }
