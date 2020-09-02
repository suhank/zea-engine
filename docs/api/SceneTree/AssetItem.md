<a name="AssetItem"></a>

### AssetItem 
Represents a TreeItem with rendering and material capabilities.


**Extends**: <code>[TreeItem](api/SceneTree/TreeItem.md)</code>  

* [AssetItem ⇐ <code>TreeItem</code>](#AssetItem)
    * [new AssetItem(name)](#new-AssetItem)
    * [isLoaded() ⇒ <code>boolean</code>](#isLoaded)
    * [getEngineDataVersion() ⇒ <code>array</code>](#getEngineDataVersion)
    * [getGeometryLibrary() ⇒ <code>GeomLibrary</code>](#getGeometryLibrary)
    * [getMaterialLibrary() ⇒ <code>MaterialLibrary</code>](#getMaterialLibrary)
    * [getUnitsConversion() ⇒ <code>number</code>](#getUnitsConversion)
    * [readBinary(reader, context)](#readBinary)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, onDone)](#fromJSON)

<a name="new_AssetItem_new"></a>

### new AssetItem
Create an asset item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the asset item. |

<a name="AssetItem+isLoaded"></a>

### isLoaded
Returns the loaded status of current item.


**Returns**: <code>boolean</code> - - Returns true if the asset has already loaded its data.  
<a name="AssetItem+getEngineDataVersion"></a>

### getEngineDataVersion
Returns the zea engine version as an array with major, minor, patch order.


**Returns**: <code>array</code> - - The return value.  
<a name="AssetItem+getGeometryLibrary"></a>

### getGeometryLibrary
Returns asset `GeomLibrary` that is in charge of rendering geometry data using workers.


**Returns**: <code>[GeomLibrary](api/SceneTree/GeomLibrary.md)</code> - - The return value.  
<a name="AssetItem+getMaterialLibrary"></a>

### getMaterialLibrary
Returns `MaterialLibrary` that is in charge of storing all materials of current Item.


**Returns**: <code>[MaterialLibrary](api/SceneTree/MaterialLibrary.md)</code> - - The return value.  
<a name="AssetItem+getUnitsConversion"></a>

### getUnitsConversion
Returns the scale factor of current item.


**Returns**: <code>number</code> - - The return value.  
<a name="AssetItem+readBinary"></a>

### readBinary
The readBinary method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="AssetItem+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="AssetItem+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| onDone | <code>function</code> | Callback function executed when everything is done. |

