/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseClass } from './BaseClass'
import { BaseEvent } from './BaseEvent'
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
 *  ee.on('myEvent', (event) => {
 *    console.log('My Event was emitted:', event)
 *  })
 *
 *  ee.emit('myEvent', { data: 42 })
 * ```
 *
 *
 */
class EventEmitter extends BaseClass {
  listeners: Record<string, Array<null | ((event: BaseEvent) => void)>>

  /**
   * Initializes an empty `listeners` map that will host all the events,
   * which implies that it doesn't allow multiple events with the same name.
   * <br>
   */
  constructor() {
    super()
    this.listeners = {}
  }

  /**
   * Adds a listener function for a given event name.
   *
   * @param {string} eventName - The name of the event.
   * @param {(event: BaseEvent) => void } listener - The listener function(callback).
   * @return {number} - Id to reference the listener.
   */
  on(eventName: string, listener?: (event: BaseEvent | any) => void): number {
    if (!listener) {
      throw new Error('Missing listener.')
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }

    const listeners = this.listeners[eventName]

    if (listeners.includes(listener)) {
      throw new Error(`Listener "${listener.name}" already connected to event "${eventName}".`)
    }

    // TODO: Deprecate alongside #addListener.
    const id = listeners.length
    listeners[id] = listener

    return id
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
   * @param {string} eventName - The eventName value
   * @param {(event: BaseEvent) => void} listener - The listener value
   */
  once(eventName: string, listener: (event: BaseEvent) => void): void {
    const cb = (event: any) => {
      listener(event)
      this.off(eventName, cb)
    }

    this.on(eventName, cb)
  }

  /**
   * Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in.
   *
   * @param {string} eventName - The name of the event.
   * @param {((event: BaseEvent) => void)} listener - The listener function or the id number.
   */
  off(eventName: string, listener?: (event: BaseEvent | any) => void): void {
    if (!listener) {
      throw new Error('Missing callback function (listener).')
    }

    if (typeof listener == 'number') {
      console.warn('Deprecated. Un-register using the original listener instead.')
      this.removeListenerById(eventName, listener)
      return
    }

    const listeners = this.listeners[eventName] || []

    const ids: Array<number> = []

    listeners.forEach((e: null | ((event: BaseEvent) => void), i: number) => {
      if (e === listener) {
        ids.push(i)
      }
    })

    if (ids.length == 0) {
      throw new Error(`Listener "${listener.name}" is not connected to "${eventName}" event`)
    } else {
      // Note: do not splice the array as that would change the indexes of existing listeners.
      for (const id of ids) {
        listeners[id] = null
      }
    }
  }

  /**
   * @deprecated Use #on instead.
   *
   * @param {string} eventName - The name of the event.
   * @param {(event: BaseEvent) => void} listener - The listener function(callback).
   * @return {number} - Id to reference the listener.
   */
  addListener(eventName: string, listener: (event: BaseEvent) => void): number {
    console.warn('Deprecated. Use #on instead.')

    return this.on(eventName, listener)
  }

  /**
   * @deprecated Use #off instead.
   *
   * @param {string} eventName - The name of the event.
   * @param {(event: BaseEvent) => void} listener - The listener function.
   */
  removeListener(eventName: string, listener: (event: BaseEvent) => void): void {
    console.warn('Deprecated. Use #off instead.')

    this.off(eventName, listener)
  }

  /**
   * @deprecated Use #off, passing the listener itself instead of the id.
   *
   * @param {string} eventName - The name of the event.
   * @param {number} id - The id returned by addListener
   */
  removeListenerById(eventName: string, id: number): void {
    console.warn('Deprecated. Use #off, passing the listener itself instead of the id.')

    const listeners = this.listeners[eventName]

    if (!listeners) {
      console.warn('callback :' + id + ' was not connected to this signal:' + eventName)
      return
    }

    if (!listeners[id]) throw new Error('Invalid ID')
    // Note: do not splice the array as that would change the indexes of existing listeners.
    listeners[id] = null
  }

  /**
   * Triggers all listener functions in an event.
   *
   * @param {string} eventName - The name of the event.
   * @param {BaseEvent} [event] - The data you want to pass down to all listener functions as parameter.
   *
   */
  emit(eventName: string, event: BaseEvent = new BaseEvent()): void {
    const listeners = this.listeners[eventName] || []

    listeners.forEach((fn: null | ((event: BaseEvent) => void)) => {
      // Skip disconnected listeners.
      if (fn) {
        fn(event)
      }
    })
  }
}

export { EventEmitter }
