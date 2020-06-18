<a name="Operator"></a>

### Operator 
Class representing an operator.

**Kind**: global class  
**Extends**: <code>BaseItem</code>  

* [Operator ⇐ <code>BaseItem</code>](#Operator)
    * [new Operator(name)](#new-Operator)
    * [addOutput(output) ⇒ <code>any</code>](#addOutput)
    * [removeOutput(output)](#removeOutput)
    * [getNumOutputs() ⇒ <code>number</code>](#getNumOutputs)
    * [getOutputByIndex(index) ⇒ <code>object</code>](#getOutputByIndex)
    * [getOutput(name) ⇒ <code>any</code>](#getOutput)
    * [evaluate()](#evaluate)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [detach()](#detach)
    * [reattach()](#reattach)
    * [destroy()](#destroy)

<a name="new_Operator_new"></a>

### new Operator
Create an operator.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="Operator+addOutput"></a>

### addOutput
The addOutput method.

**Kind**: instance method of [<code>Operator</code>](#Operator)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| output | <code>any</code> | The output value. |

<a name="Operator+removeOutput"></a>

### removeOutput
The removeOutput method.

**Kind**: instance method of [<code>Operator</code>](#Operator)  

| Param | Type | Description |
| --- | --- | --- |
| output | <code>any</code> | The output value. |

<a name="Operator+getNumOutputs"></a>

### getNumOutputs
Getter for the number of outputs in this operator.

**Kind**: instance method of [<code>Operator</code>](#Operator)  
**Returns**: <code>number</code> - - Returns the number of outputs.  
<a name="Operator+getOutputByIndex"></a>

### getOutputByIndex
The getOutputByIndex method.

**Kind**: instance method of [<code>Operator</code>](#Operator)  
**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="Operator+getOutput"></a>

### getOutput
The getOutput method.

**Kind**: instance method of [<code>Operator</code>](#Operator)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="Operator+evaluate"></a>

### evaluate
The evaluate method.

**Kind**: instance method of [<code>Operator</code>](#Operator)  
<a name="Operator+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Operator</code>](#Operator)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Operator+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Operator</code>](#Operator)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Operator+detach"></a>

### detach
The detach method.

**Kind**: instance method of [<code>Operator</code>](#Operator)  
<a name="Operator+reattach"></a>

### reattach
The reattach method.

**Kind**: instance method of [<code>Operator</code>](#Operator)  
<a name="Operator+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

**Kind**: instance method of [<code>Operator</code>](#Operator)  
