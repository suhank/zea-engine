<a name="ExplodePartsOperator"></a>

## ExplodePartsOperator ⇐ <code>ParameterOwner</code>
Class representing an explode parts operator.

**Kind**: global class  
**Extends**: <code>ParameterOwner</code>  

* [ExplodePartsOperator ⇐ <code>ParameterOwner</code>](#ExplodePartsOperator)
    * [new ExplodePartsOperator(name)](#new-ExplodePartsOperator)
    * [evaluate()](#evaluate)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [destroy()](#destroy)

<a name="new_ExplodePartsOperator_new"></a>

### new ExplodePartsOperator
Create an explode parts operator.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="ExplodePartsOperator+evaluate"></a>

### evaluate
The evaluate method.

**Kind**: instance method of [<code>ExplodePartsOperator</code>](#ExplodePartsOperator)  
<a name="ExplodePartsOperator+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>ExplodePartsOperator</code>](#ExplodePartsOperator)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ExplodePartsOperator+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>ExplodePartsOperator</code>](#ExplodePartsOperator)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ExplodePartsOperator+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.Users should never need to call this method directly.

**Kind**: instance method of [<code>ExplodePartsOperator</code>](#ExplodePartsOperator)  
