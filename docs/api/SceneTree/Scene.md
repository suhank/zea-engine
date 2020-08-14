<a name="Scene"></a>

### Scene
Class representing the environment where all the displayed assets live.



* [Scene](#Scene)
    * [new Scene(resources)](#new-Scene)
    * [getSettings() ⇒ <code>BaseItem</code>](#getSettings)
    * [getRoot() ⇒ <code>TreeItem</code>](#getRoot)
    * [getResourceLoader() ⇒ <code>ResourceLoader</code>](#getResourceLoader)
    * ~~[.setEnvMap(envMap)](#Scene+setEnvMap)~~
    * ~~[.addAsset(asset)](#Scene+addAsset)~~
    * [setupGrid(gridSize, resolution, gridColor) ⇒ <code>GridTreeItem</code>](#setupGrid)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json, context)](#fromJSON)

<a name="new_Scene_new"></a>

### new Scene
Create a scene.


| Param | Type | Description |
| --- | --- | --- |
| resources | <code>object</code> | The resources value. |

<a name="Scene+getSettings"></a>

### getSettings
The getRoot method.


**Returns**: <code>BaseItem</code> - - The return value.  
<a name="Scene+getRoot"></a>

### getRoot
Returns the scene's root item(`TreeItem`) that owns every item in the scene.


**Returns**: <code>TreeItem</code> - - The return value.  
<a name="Scene+getResourceLoader"></a>

### getResourceLoader
Returns resourceLoader object set on class initialization.


**Returns**: <code>ResourceLoader</code> - - The return value.  
<a name="Scene+setEnvMap"></a>

### ~~scene.setEnvMap(envMap)~~
***Deprecated***

Sets Environment Map with the BaseImage you'd like to display in your scene background.



| Param | Type | Description |
| --- | --- | --- |
| envMap | <code>EnvMap</code> | The envMap value. |

<a name="Scene+addAsset"></a>

### ~~scene.addAsset(asset)~~
***Deprecated***

Adds a child item to the scene root item.



| Param | Type | Description |
| --- | --- | --- |
| asset | <code>AssetItem</code> | The asset value. |

<a name="Scene+setupGrid"></a>

### setupGrid
Sets up and displays the scene grid of a given size and resolution. The Grid is oriented on the XY plane
and highlights the X and Y axes with Red and Green lines. Grids are useful in displaying scene scale and coordinate system.
The Grid geometry does not return a bounding box and so does not effect the bounding of the scene.
The GridTreeItem display a grid of a given size and resolution. The Grid is oriented on the XY plane
and highlights the X and Y axes with Red and Green lines.


**Returns**: <code>GridTreeItem</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gridSize | <code>number</code> | <code>5</code> | The size of the grid. |
| resolution | <code>number</code> | <code>50</code> | The resolution of the grid. |
| gridColor | <code>Color</code> |  | The color of the grid. |

<a name="Scene+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="Scene+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

