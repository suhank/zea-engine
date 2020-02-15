
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
  addEventListener(eventName, listener) {
    if (listener == undefined)
      throw new Error('a function callback must be passed to EventEmitter.addEventListener')

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
  removeEventListener(eventName, listener) {
    if (listener == undefined)
      throw new Error('a function callback must be passed to EventEmitter.disconnect')
      
    const slots = this.__slots[eventName]
    if (!slots) {
      console.warn(
        'callback :' +
          fn.name +
          ' was not connected to this signal:' +
          this.__name
      )
      return
    }

    const ids = []
    slots.forEach(function(item, index) {
      if (item === fn) {
        ids.push(index)
      }
    })
    if (ids.length == 0) {
      console.warn(
        'callback :' +
          fn.name +
          ' was not connected to this signal:' +
          this.__name
      )
      return
    }
    for (const id of ids) {
      slots[id] = undefined
    }
  }

  /**
   * The disconnectId method.
   * @param {string} eventName - The name of the event.
   * @param {number} id - The id returned by AddEventListener
   */
  removeEventListenerById(eventName, id) {
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
   * Emit the signal to all slots(observers)
   * @param {BaseEvent} event - The event object.
   */
  emitEvent(event) {
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
