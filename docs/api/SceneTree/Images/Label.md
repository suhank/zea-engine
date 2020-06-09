<a name="Label"></a>

## Label ⇐ <code>DataImage</code>
Class representing a label.

**Kind**: global class  
**Extends**: <code>DataImage</code>  

* [Label ⇐ <code>DataImage</code>](#Label)
    * [new Label(name, library)](#new-Label)
    * [loadLabelData()](#loadLabelData)
    * [renderLabelToImage()](#renderLabelToImage)
    * [getParams() ⇒ <code>any</code>](#getParams)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)

<a name="new_Label_new"></a>

### new Label
Create a label.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| library | <code>any</code> | The library value. |

<a name="Label+loadLabelData"></a>

### loadLabelData
The loadLabelData method.

**Kind**: instance method of [<code>Label</code>](#Label)  
<a name="Label+renderLabelToImage"></a>

### renderLabelToImage
Renders the label text to a canvas element ready to display,

**Kind**: instance method of [<code>Label</code>](#Label)  
<a name="Label+getParams"></a>

### getParams
The getParams method.

**Kind**: instance method of [<code>Label</code>](#Label)  
**Returns**: <code>any</code> - - The return value.  
<a name="Label+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Label</code>](#Label)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Label+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Label</code>](#Label)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

