<a name="Signal"></a>

## Signal
Class representing a signal.

**Kind**: global class  

* [Signal](#Signal)
    * [new Signal(toggledSignal)](#new-Signal)
    * [connect(fn) ⇒ <code>any</code>](#connect)
    * [disconnect(fn)](#disconnect)
    * [disconnectId(id)](#disconnectId)
    * [emit()](#emit)
    * [isToggled() ⇒ <code>boolean</code>](#isToggled)
    * [setToggled(state)](#setToggled)
    * [getNumConnections() ⇒ <code>number</code>](#getNumConnections)
    * [untoggle()](#untoggle)

<a name="new_Signal_new"></a>

### new Signal
Create a signal.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| toggledSignal | <code>boolean</code> | <code>false</code> | The toggledSignal value. |

<a name="Signal+connect"></a>

### connect
The connect method.

**Kind**: instance method of [<code>Signal</code>](#Signal)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>any</code> | The fn param. |

<a name="Signal+disconnect"></a>

### disconnect
The disconnect method.

**Kind**: instance method of [<code>Signal</code>](#Signal)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>any</code> | The fn param. |

<a name="Signal+disconnectId"></a>

### disconnectId
The disconnectId method.

**Kind**: instance method of [<code>Signal</code>](#Signal)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>any</code> | The id param. |

<a name="Signal+emit"></a>

### emit
Emit the signal to all slots(observers)

**Kind**: instance method of [<code>Signal</code>](#Signal)  

| Param | Type | Description |
| --- | --- | --- |
| ......data | <code>object</code> | The ...data param. |

<a name="Signal+isToggled"></a>

### isToggled
The isToggled method.

**Kind**: instance method of [<code>Signal</code>](#Signal)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="Signal+setToggled"></a>

### setToggled
The setToggled method.

**Kind**: instance method of [<code>Signal</code>](#Signal)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>any</code> | The state param. |

<a name="Signal+getNumConnections"></a>

### getNumConnections
The getNumConnections method.

**Kind**: instance method of [<code>Signal</code>](#Signal)  
**Returns**: <code>number</code> - - The number of connections to this signal.  
<a name="Signal+untoggle"></a>

### untoggle
The untoggle method.

**Kind**: instance method of [<code>Signal</code>](#Signal)  
