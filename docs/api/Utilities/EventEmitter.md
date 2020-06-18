<a name="EventEmitter"></a>

### EventEmitter
Class representing a EventEmitter.

**Kind**: global class  

* [EventEmitter](#EventEmitter)
    * [new EventEmitter()](#new-EventEmitter)
    * [addListener(eventName, listener) ⇒ <code>any</code>](#addListener)
    * [removeListener(eventName, listener)](#removeListener)
    * [removeListenerById(eventName, id)](#removeListenerById)
    * [on(eventName, listener) ⇒ <code>any</code>](#on)
    * [once(eventName, listener)](#once)
    * [off(eventName, listener)](#off)
    * [emit(event)](#emit)

<a name="new_EventEmitter_new"></a>

### new EventEmitter
Create an EventEmitter.

<a name="EventEmitter+addListener"></a>

### addListener
Add a listener function to the EventEmiiter with the given eventName.
When the given event is triggered, the listern function will be invoked.

**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> | The listener function. |

<a name="EventEmitter+removeListener"></a>

### removeListener
Remove a listener function from the EvetEmitter.

**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> | The listener function. |

<a name="EventEmitter+removeListenerById"></a>

### removeListenerById
The removeListenerById method.

**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| id | <code>number</code> | The id returned by addListener |

<a name="EventEmitter+on"></a>

### on
Add a listener function to the EventEmiiter with the given eventName.
When the given event is triggered, the listern function will be invoked.

**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> | The listener function. |

<a name="EventEmitter+once"></a>

### once
Add a listener function to the EventEmiiter with the given eventName.
When the given event is triggered, the listern function will be invoked.

**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> | The listener function. |

<a name="EventEmitter+off"></a>

### off
The off method removes an event listener.

**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The name of the event. |
| listener | <code>function</code> | The listener function. |

<a name="EventEmitter+emit"></a>

### emit
Emit the signal to all slots(observers)

**Kind**: instance method of [<code>EventEmitter</code>](#EventEmitter)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>BaseEvent</code> | The event object. |

