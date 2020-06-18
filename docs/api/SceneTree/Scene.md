<a name="Scene"></a>

### Scene
Class representing a scene in a scene tree.

**Kind**: global class  

* [Scene](#Scene)
    * [new Scene(resources)](#new-Scene)
    * [getSettings() ⇒ <code>any</code>](#getSettings)
    * [getRoot() ⇒ <code>any</code>](#getRoot)
    * [getResourceLoader() ⇒ <code>any</code>](#getResourceLoader)
    * [setEnvMap(envMap)](#setEnvMap)
    * [addAsset(asset)](#addAsset)
    * [setupGrid(gridSize, resolution, gridColor) ⇒ <code>any</code>](#setupGrid)
    * [loadCommonAssetResource(resourceId) ⇒ <code>any</code>](#loadCommonAssetResource)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json, context)](#fromJSON)

<a name="new_Scene_new"></a>

### new Scene
Create a scene.


| Param | Type | Description |
| --- | --- | --- |
| resources | <code>any</code> | The resources value. |

<a name="Scene+getSettings"></a>

### getSettings
The getRoot method.

**Kind**: instance method of [<code>Scene</code>](#Scene)  
**Returns**: <code>any</code> - - The return value.  
<a name="Scene+getRoot"></a>

### getRoot
The getRoot method.

**Kind**: instance method of [<code>Scene</code>](#Scene)  
**Returns**: <code>any</code> - - The return value.  
<a name="Scene+getResourceLoader"></a>

### getResourceLoader
The getResourceLoader method.

**Kind**: instance method of [<code>Scene</code>](#Scene)  
**Returns**: <code>any</code> - - The return value.  
<a name="Scene+setEnvMap"></a>

### setEnvMap
The setEnvMap method.

**Kind**: instance method of [<code>Scene</code>](#Scene)  

| Param | Type | Description |
| --- | --- | --- |
| envMap | <code>any</code> | The envMap value. |

<a name="Scene+addAsset"></a>

### addAsset
The addAsset method.

**Kind**: instance method of [<code>Scene</code>](#Scene)  

| Param | Type | Description |
| --- | --- | --- |
| asset | <code>any</code> | The asset value. |

<a name="Scene+setupGrid"></a>

### setupGrid
Set up the scene grid.

**Kind**: instance method of [<code>Scene</code>](#Scene)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gridSize | <code>number</code> | <code>5</code> | The size of the grid. |
| resolution | <code>number</code> | <code>50</code> | The resolution of the grid. |
| gridColor | <code>Color</code> |  | The color of the grid. |

<a name="Scene+loadCommonAssetResource"></a>

### loadCommonAssetResource
The loadCommonAssetResource method.

**Kind**: instance method of [<code>Scene</code>](#Scene)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>any</code> | The resourceId value. |

<a name="Scene+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Scene</code>](#Scene)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| context | <code>object</code> |  | The context value. |
| flags | <code>number</code> | <code>0</code> | The flags value. |

<a name="Scene+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Scene</code>](#Scene)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

