<a name="ImageParameter"></a>

## ImageParameter ⇐ <code>Parameter</code>
Class representing an image parameter.

**Kind**: global class  
**Extends**: <code>Parameter</code>  

* [ImageParameter ⇐ <code>Parameter</code>](#ImageParameter)
    * [new ImageParameter(name, value)](#new-ImageParameter)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags) ⇒ <code>object</code>](#fromJSON)
    * [clone(flags)](#clone)

<a name="new_ImageParameter_new"></a>

### new ImageParameter
Create an image parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the image parameter. |
| value | <code>any</code> | The value of the parameter. |

<a name="ImageParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>ImageParameter</code>](#ImageParameter)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ImageParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>ImageParameter</code>](#ImageParameter)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ImageParameter+clone"></a>

### clone
The clone method constructs a new image parameter,copies its values from this parameter and returns it.

**Kind**: instance method of [<code>ImageParameter</code>](#ImageParameter)  
**Returns**: [<code>ImageParameter</code>](#ImageParameter) - - Returns a new cloned image parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

