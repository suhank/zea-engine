<a name="StructParameter"></a>

## StructParameter ⇐ <code>Parameter</code>
Class representing a struct parameter.

**Kind**: global class  
**Extends**: <code>Parameter</code>  

* [StructParameter ⇐ <code>Parameter</code>](#StructParameter)
    * [new StructParameter(name)](#new-StructParameter)
    * [getParameter(name) ⇒ <code>any</code>](#getParameter)
    * [getMember(name) ⇒ <code>any</code>](#getMember)
    * [getMemberNames() ⇒ <code>any</code>](#getMemberNames)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [destroy()](#destroy)

<a name="new_StructParameter_new"></a>

### new StructParameter
Create a struct parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the struct parameter. |

<a name="StructParameter+getParameter"></a>

### getParameter
The getParameter method.

**Kind**: instance method of [<code>StructParameter</code>](#StructParameter)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The parameter name. |

<a name="StructParameter+getMember"></a>

### getMember
The getMember method.

**Kind**: instance method of [<code>StructParameter</code>](#StructParameter)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The parameter name. |

<a name="StructParameter+getMemberNames"></a>

### getMemberNames
The getMemberNames method.

**Kind**: instance method of [<code>StructParameter</code>](#StructParameter)  
**Returns**: <code>any</code> - - The return value.  
<a name="StructParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>StructParameter</code>](#StructParameter)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="StructParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>StructParameter</code>](#StructParameter)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="StructParameter+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.Users should never need to call this method directly.

**Kind**: instance method of [<code>StructParameter</code>](#StructParameter)  
