<a name="MaterialParameter"></a>

## MaterialParameter ⇐ <code>Parameter</code>
Class representing a material parameter.

**Kind**: global class  
**Extends**: <code>Parameter</code>  

* [MaterialParameter ⇐ <code>Parameter</code>](#MaterialParameter)
    * [new MaterialParameter(name, value)](#new-MaterialParameter)
    * [setValue(material, mode)](#setValue)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [clone(flags)](#clone)
    * [destroy()](#destroy)

<a name="new_MaterialParameter_new"></a>

### new MaterialParameter
Create a material parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the material parameter. |
| value | <code>any</code> | The value of the parameter. |

<a name="MaterialParameter+setValue"></a>

### setValue
The setValue method.

**Kind**: instance method of [<code>MaterialParameter</code>](#MaterialParameter)  

| Param | Type | Description |
| --- | --- | --- |
| material | <code>any</code> | The material param. |
| mode | <code>number</code> | The mode param. |

<a name="MaterialParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>MaterialParameter</code>](#MaterialParameter)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="MaterialParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>MaterialParameter</code>](#MaterialParameter)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="MaterialParameter+clone"></a>

### clone
The clone method constructs a new material parameter, copies its valuesfrom this parameter and returns it.

**Kind**: instance method of [<code>MaterialParameter</code>](#MaterialParameter)  
**Returns**: [<code>MaterialParameter</code>](#MaterialParameter) - - Returns a new material parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="MaterialParameter+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.Users should never need to call this method directly.

**Kind**: instance method of [<code>MaterialParameter</code>](#MaterialParameter)  
