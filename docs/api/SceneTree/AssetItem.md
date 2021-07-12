### Classes

<dl>
<dt><a href="#AssetLoadContext">AssetLoadContext</a></dt>
<dd><p>Provides a context for loading assets. This context can provide the units of the loading scene.
E.g. you can specify the scene units as &#39;millimeters&#39; in the context object.
To load external references, you can also provide a dictionary that maps filenames to URLs that are used
to resolve the URL of an external reference that a given asset is expecting to find.</p>
</dd>
<dt><a href="#AssetItem">AssetItem</a> ⇐ <code>TreeItem</code></dt>
<dd><p>Represents a TreeItem with rendering and material capabilities.</p>
</dd>
</dl>

### Functions

<dl>
<dt><a href="#getUnitsFactor">getUnitsFactor(units)</a> ⇒ <code>number</code></dt>
<dd><p>Given a units string, load returns a factor relative to meters
e.g. for Millimeters, returns 0.001, for Meters, returns 1.0
Given 2 different units, the factors are combined together to calculate the conversion between the 2 units.</p>
</dd>
</dl>

<a name="AssetLoadContext"></a>

### AssetLoadContext
Provides a context for loading assets. This context can provide the units of the loading scene.
E.g. you can specify the scene units as 'millimeters' in the context object.
To load external references, you can also provide a dictionary that maps filenames to URLs that are used
to resolve the URL of an external reference that a given asset is expecting to find.



* [AssetLoadContext](#AssetLoadContext)
    * [new AssetLoadContext(context)](#new-AssetLoadContext)
    * [incrementAsync()](#incrementAsync)
    * [decrementAsync()](#decrementAsync)
    * [resolvePath(path, onSucceed, onFail)](#resolvePath)
    * [addPLCB(postLoadCallback)](#addPLCB)

<a name="new_AssetLoadContext_new"></a>

### new AssetLoadContext
Create a AssetLoadContext


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>AssetLoadContext</code>](#AssetLoadContext) | The source context to base this context on. |

<a name="AssetLoadContext+incrementAsync"></a>

### incrementAsync
During loading, asynchronous processes may be launched, and subsequently completed.
These method helps the Asset track how many asynchronous loading operations may be
occurring with the tree during load.
As each external reference starts to load, it increments this counter, letting the owning
Asset know to wait till the children are loaded before emitting its own 'loaded' event.


<a name="AssetLoadContext+decrementAsync"></a>

### decrementAsync
As each external reference completes loading, it decrements this counter allowing the owning
asset to know that the subtrees are loaded.


<a name="AssetLoadContext+resolvePath"></a>

### resolvePath
Resolves a path within the loading asset. This is used to connect
items within the tree to other items. e.g. a Group can find its members.
or an instance can find its source tree.



| Param | Type | Description |
| --- | --- | --- |
| path | <code>array</code> | the path within the tree relative to the loading asset |
| onSucceed | <code>function</code> | called with the successful result of the path resolution. |
| onFail | <code>function</code> | called when the path resolution fails. |

<a name="AssetLoadContext+addPLCB"></a>

### addPLCB
Adds a function to be called back once the main load call stack exists.
This is used to connect parts of the tree together after loading.
e.g. an instance will



| Param | Type |
| --- | --- |
| postLoadCallback | <code>function</code> | 

<a name="AssetItem"></a>

### AssetItem 
Represents a TreeItem with rendering and material capabilities.


**Extends**: <code>[TreeItem](api/SceneTree\TreeItem.md)</code>  

* [AssetItem ⇐ <code>TreeItem</code>](#AssetItem)
    * [new AssetItem(name)](#new-AssetItem)
    * [load(url) ⇒ <code>Promise</code>](#load)
    * [isLoaded() ⇒ <code>boolean</code>](#isLoaded)
    * [getEngineDataVersion() ⇒ <code>array</code>](#getEngineDataVersion)
    * [getGeometryLibrary() ⇒ <code>GeomLibrary</code>](#getGeometryLibrary)
    * [getMaterialLibrary() ⇒ <code>MaterialLibrary</code>](#getMaterialLibrary)
    * [getUnitsConversion() ⇒ <code>number</code>](#getUnitsConversion)
    * [readBinary(reader, context)](#readBinary)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, onDone)](#fromJSON)
    * [clone(context) ⇒ <code>TreeItem</code>](#clone)
    * [copyFrom(src, context)](#copyFrom)

<a name="new_AssetItem_new"></a>

### new AssetItem
Create an asset item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the asset item. |

<a name="AssetItem+load"></a>

### load
Loads all the geometries and metadata from the asset file.


**Returns**: <code>Promise</code> - - Returns a promise that resolves once the initial load is complete  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL of the asset to load |

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


**Returns**: <code>[GeomLibrary](api/SceneTree\GeomLibrary.md)</code> - - The return value.  
<a name="AssetItem+getMaterialLibrary"></a>

### getMaterialLibrary
Returns `MaterialLibrary` that is in charge of storing all materials of current Item.


**Returns**: <code>[MaterialLibrary](api/SceneTree\MaterialLibrary.md)</code> - - The return value.  
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
| context | [<code>AssetLoadContext</code>](#AssetLoadContext) | The context value. |

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

<a name="AssetItem+clone"></a>

### clone
The clone method constructs a new tree item, copies its values
from this item and returns it.


**Returns**: <code>[TreeItem](api/SceneTree\TreeItem.md)</code> - - Returns a new cloned tree item.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="AssetItem+copyFrom"></a>

### copyFrom
Copies current TreeItem with all its children.



| Param | Type | Description |
| --- | --- | --- |
| src | <code>[TreeItem](api/SceneTree\TreeItem.md)</code> | The tree item to copy from. |
| context | <code>object</code> | The context value. |

<a name="getUnitsFactor"></a>

### getUnitsFactor
Given a units string, load returns a factor relative to meters
e.g. for Millimeters, returns 0.001, for Meters, returns 1.0
Given 2 different units, the factors are combined together to calculate the conversion between the 2 units.


**Returns**: <code>number</code> - Returns the factor relative to meters.  

| Param | Type | Description |
| --- | --- | --- |
| units | <code>string</code> | the name of the units value for the load context. Supports: ['millimeters', 'centimeters', 'decimeters', 'meters', 'kilometers', 'inches', 'feet', 'miles'] |

