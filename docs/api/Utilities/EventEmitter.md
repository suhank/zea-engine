<a name="EventEmitter"></a>

### EventEmitter
Allows objects to create and handle custom events.
Closely similar to [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) in Node.



* [EventEmitter](#EventEmitter)
    * [new EventEmitter()](#new-EventEmitter)
    * [addListener(eventName, listener) ⇒ <code>number</code>](#addListener)
    * [removeListener(eventName, listener)](#removeListener)
    * [removeListenerById(eventName, id)](#removeListenerById)
    * [on(eventName, listener) ⇒ <code>number</code>](#on)
    * [once(eventName, listener)](#once)
    * [off(eventName, listener)](#off)
    * [emit(eventName, event)](#emit)

<a name="new_EventEmitter_new"></a>

### new EventEmitter
Initializes an empty `slots` map that will host all the events,
which implies that it doesn't allow multiple events with the same name.
<br>
Although each event can own more than one listener function.

<a name="EventEmitter+addListener"></a>

### addListener
Adds an event with its listener function(Invoked functions when event is triggered) to the event list.
Each event can have more than one listener function, although no duplication is allowed.


**Returns**: <code>number</code> - - Number of listener funcitons the event has.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> | The listener function(callback). |

<a name="EventEmitter+removeListener"></a>

### removeListener
Removes a listener function from the specified event.



| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> | The listener function. |

<a name="EventEmitter+removeListenerById"></a>

### removeListenerById
Removes a listener function from the specified event, using the specified index id.



| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| id | <code>number</code> | The id returned by addListener |

<a name="EventEmitter+on"></a>

### on
Adds an event with its listener function(Invoked functions when event is triggered) to the event list.
Each event can have more than one listener function, although no duplication is allowed.


**Returns**: <code>number</code> - - Number of listener funcitons the event has.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> | The listener function(callback). |

<a name="EventEmitter+once"></a>

### once
Initially it works the same as `addListener` and `on` methods, but the difference is that when the listener function is triggered,
is also removed from the event slots, meaning that it won't execute anymore.



| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> | The listener function. |

<a name="EventEmitter+off"></a>

### off
Removes a listener function from the specified event, using the either the function or the index id. Depends on what is passed in.



| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> \| <code>number</code> | The listener function or the id number. |

<a name="EventEmitter+emit"></a>

### emit
Triggers all listerner functions in an event.



| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| event | <code>object</code> \| <code>string</code> \| <code>any</code> | The data you want to pass down to all listener functions as parameter. |

