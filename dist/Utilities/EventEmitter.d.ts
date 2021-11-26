import { BaseClass } from './BaseClass';
import { BaseEvent } from './BaseEvent';
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
 *  const eventID = ee.on('myEvent', (event) => {
 *    console.log('My Event was emitted:', event)
 *  })
 *
 *  ee.emit('myEvent', { data: 42 })
 *  // We no longer want to listen to this event, so let's remove the listener.
 *  ee.removeListenerById('myEvent', eventID)
 * ```
 *
 *
 */
declare class EventEmitter extends BaseClass {
    listeners: Record<string, Array<null | ((event: BaseEvent) => void)>>;
    /**
     * Initializes an empty `listeners` map that will host all the events,
     * which implies that it doesn't allow multiple events with the same name.
     *
     */
    constructor();
    /**
     * Adds a listener function for a given event name.
     *
     * @param eventName - The name of the event.
     * @param listener - The listener function(callback).
     * @return - the id that can be used to remove the listener.
     */
    on(eventName: string, listener?: (event: BaseEvent | any) => void): number;
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
     * @param eventName - The eventName value
     * @param listener - The listener value
     * @return - the id that can be used to remove the listener.
     */
    once(eventName: string, listener: (event: BaseEvent) => void): number;
    /**
     * Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in.
     *
     * @param eventName - The name of the event.
     * @param listener - The listener function or the id number.
     */
    off(eventName: string, listener?: (event: BaseEvent | any) => void): void;
    /**
     * remove listener by ID returned from #on
     *
     * @param eventName - The name of the event.
     * @param id - The id returned by addListener
     */
    removeListenerById(eventName: string, id: number): void;
    /**
     * Triggers all listener functions in an event.
     *
     * @param eventName - The name of the event.
     * @param event - The data you want to pass down to all listener functions as parameter.
     *
     */
    emit(eventName: string, event?: BaseEvent): void;
}
export { EventEmitter };
