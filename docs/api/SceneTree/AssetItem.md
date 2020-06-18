<a name="AssetItem"></a>

### AssetItem 
Class representing an asset item in a scene tree.

**Kind**: global class  
**Extends**: <code>TreeItem</code>  

* [AssetItem ⇐ <code>TreeItem</code>](#AssetItem)
    * [new AssetItem(name)](#new-AssetItem)
    * [isLoaded() ⇒ <code>boolean</code>](#isLoaded)
    * [getEngineDataVersion() ⇒ <code>any</code>](#getEngineDataVersion)
    * [getGeometryLibrary() ⇒ <code>any</code>](#getGeometryLibrary)
    * [getMaterialLibrary() ⇒ <code>any</code>](#getMaterialLibrary)
    * [getUnitsConversion() ⇒ <code>any</code>](#getUnitsConversion)
    * [readBinary(reader, context)](#readBinary)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags, onDone)](#fromJSON)

<a name="new_AssetItem_new"></a>

### new AssetItem
Create an asset item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the asset item. |

<a name="AssetItem+isLoaded"></a>

### isLoaded
The isLoaded method.

**Kind**: instance method of [<code>AssetItem</code>](#AssetItem)  
**Returns**: <code>boolean</code> - - Returns true if the asset has already loaded its data.  
<a name="AssetItem+getEngineDataVersion"></a>

### getEngineDataVersion
The getGeometryLibrary method.

**Kind**: instance method of [<code>AssetItem</code>](#AssetItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="AssetItem+getGeometryLibrary"></a>

### getGeometryLibrary
The getGeometryLibrary method.

**Kind**: instance method of [<code>AssetItem</code>](#AssetItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="AssetItem+getMaterialLibrary"></a>

### getMaterialLibrary
The getMaterialLibrary method.

**Kind**: instance method of [<code>AssetItem</code>](#AssetItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="AssetItem+getUnitsConversion"></a>

### getUnitsConversion
The getUnitsConversion method.

**Kind**: instance method of [<code>AssetItem</code>](#AssetItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="AssetItem+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>AssetItem</code>](#AssetItem)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="AssetItem+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>AssetItem</code>](#AssetItem)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>object</code> |  | The context value. |
| flags | <code>number</code> | <code>0</code> | The flags value. |

<a name="AssetItem+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>AssetItem</code>](#AssetItem)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| j | <code>object</code> |  | The json object this item must decode. |
| context | <code>object</code> |  | The context value. |
| flags | <code>number</code> | <code>0</code> | The flags value. |
| onDone | <code>any</code> |  | The onDone value. |

