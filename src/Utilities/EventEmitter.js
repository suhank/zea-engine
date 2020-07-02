/**
 * Provides an interface for emitting events under given names, and registering listeners to those events.
 * This is a base class for most classes in the Scene Tree and Renderer, enabling observers to listen to changes throughout the system.
 * The interface exposed is similar to [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) in Node.
 *
 * Similar to how the DOM event system in the browser works, events are registered by name.
 * Example: Registering a listener for a custom event, and then emitting that event.
 * ```javascript
 *  const ee = new EventEmitter()
 * 
 *  ee.addListener('myEvent', (event) => {
 *    console.log('My Event was emitted:', event)
 *  })
 * 
 *  ee.emit('myEvent', { data: 42 })
 * ```
 * 
 * 
 */
class EventEmitter {
  /**
   * Initializes the EventEmitter in preparation for registering listeners.
   * <br>
   */
  constructor() {
    this.__slots = {}
  }

  /**
   * Adds a listener function for a given event name.
   * @private
   *
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function(callback).
   * @return {number} - Id to reference the listener.
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
   * @private
   *
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function.
   */
  removeListener(eventName, listener) {
    if (listener == undefined) throw new Error('a function callback must be passed to EventEmitter.removeListener')

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
   * @private
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
   * Adds a listener function for a given event name.
   * This function is simply an alias for 'addListener'. 
   *
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function(callback).
   * @return {number} - Id to reference the listener.
   */
  on(eventName, listener) {
    return this.addListener(eventName, listener)
  }

  /**
   * Similar to the `on` method with the difference that when the event is triggered,
   * it is automatically unregistered meaning that the event listener will be triggered at most one time.
   *
   * Useful for events that we expect to trigger one time, such as when assets load.
   * ```javascript
   * const asset = new Asset();
   * asset.once('loaded', () => {
   *   console.log("Yay! the asset is loaded")
   * })
   * ```
   *
   * @param {string} eventName - The name of the event.
   * @param {function} listener - The listener function.
   */
  once(eventName, listener) {
    // const id = this.addListener(eventName, (event) => {
    //   listener(event)
    //   this.removeListenerById(eventName, id)
    // })
    const tmp = (event) => {
      listener(event)
      this.removeListener(eventName, tmp)
    }
    this.addListener(eventName, tmp)
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
   * Triggers all listener functions in an event.
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
