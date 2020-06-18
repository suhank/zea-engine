/**
 * Allows objects to create and handle custom events.
 * Closely similar to [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) in Node.
 */
class EventEmitter {
  /**
   * Initializes an empty `slots` map that will host all the events,
   * which implies that it doesn't allow multiple events with the same name.
   * <br>
   * Although each event can own more than one listener function.
   */
  constructor() {
    this.__slots = {}
  }

  /**
   * Adds an event with its listener function(Invoked functions when event is triggered) to the event list.
   * Each event can have more than one listener function, although no duplication is allowed.
   *
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function(callback).
   * @return {number} - Number of listener funcitons the event has.
   */
  addListener(eventName, listener) {
    if (listener == undefined) throw new Error('a function callback must be passed to EventEmitter.addListener')

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
   * Removes a listener function from the specified event.
   *
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function.
   */
  removeListener(eventName, listener) {
    if (listener == undefined) throw new Error('a function callback must be passed to EventEmitter.disconnect')

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
        'Error in removeListener. listener :' + listener.name + ' was not connected to this event emitter:' + name
      )
    } else {
      for (const id of ids) {
        slots[id] = undefined
      }
    }
  }

  /**
   * Removes a listener function from the specified event, using the specified index id.
   *
   * @param {string} eventName - The name of the event.
   * @param {number} id - The id returned by addListener
   */
  removeListenerById(eventName, id) {
    const slots = this.__slots[eventName]
    if (!slots) {
      const msg = 'callback :' + id + ' was not connected to this signal:' + eventName
      console.warn(msg)
      return
    }
    if (!slots[id]) throw new Error('Invalid ID')
    slots[id] = undefined
  }

  /**
   * Adds an event with its listener function(Invoked functions when event is triggered) to the event list.
   * Each event can have more than one listener function, although no duplication is allowed.
   *
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function(callback).
   * @return {number} - Number of listener funcitons the event has.
   */
  on(eventName, listener) {
    return this.addListener(eventName, listener)
  }

  /**
   * Initially it works the same as `addListener` and `on` methods, but the difference is that when the listener function is triggered,
   * is also removed from the event slots, meaning that it won't execute anymore.
   *
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
   * Removes a listener function from the specified event, using the either the function or the index id. Depends on what is passed in.
   *
   * @param {string} eventName - The name of the event.
   * @param {function|number} listener - The listener function or the id number.
   */
  off(eventName, listener) {
    if (typeof listener == 'number') {
      this.removeListenerById(eventName, listener)
    } else {
      this.removeListener(eventName, listener)
    }
  }

  /**
   * Triggers all listerner functions in an event.
   *
   * @param {string} eventName - The name of the event.
   * @param {object|string|any} event - The data you want to pass down to all listener functions as parameter.
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
