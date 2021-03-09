<a name="ObjAsset"></a>

### ObjAsset 
Class designed to load and handle `.obj` files.
Which define the geometry and other properties for objects.

**Parameters**
* **splitObjects([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** _todo_
* **splitGroupsIntoObjects([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** _todo_
* **loadMtlFile([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** _todo_
* **unitsConversion([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** _todo_
* **defaultShader([`StringParameter`](api/SceneTree\Parameters\StringParameter.md)):** _todo_
* **ObjFilePath([`FilePathParameter`](api/SceneTree\Parameters\FilePathParameter.md)):** Used to specify the path to the file.

**Events**
* **loaded:** Triggered once everything is loaded.
* **geomsLoaded:** Triggered once all geometries are loaded.


**Extends**: <code>[AssetItem](api/SceneTree\AssetItem.md)</code>  

* [ObjAsset ⇐ <code>AssetItem</code>](#ObjAsset)
    * [new ObjAsset(name)](#new-ObjAsset)
    * [load(url) ⇒ <code>Promise</code>](#load)

<a name="new_ObjAsset_new"></a>

### new ObjAsset
Create an obj asset.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the object asset. |

<a name="ObjAsset+load"></a>

### load
Loads all the geometries and metadata from the Obj file.


**Returns**: <code>Promise</code> - - Returns a promise that resolves once the initial load is complete  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL of the asset to load |

