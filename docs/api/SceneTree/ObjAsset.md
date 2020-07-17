<a name="ObjAsset"></a>

### ObjAsset 
Class designed to load and handle `.obj` files.
Which define the grometry and other properties for objects.

**Parameters**
* **splitObjects(`BooleanParameter`):** _todo_
* **splitGroupsIntoObjects(`BooleanParameter`):** _todo_
* **loadMtlFile(`BooleanParameter`):** _todo_
* **unitsConversion(`NumberParameter`):** _todo_
* **defaultShader(`StringParameter`):** _todo_
* **ObjFilePath(`FilePathParameter`):** Used to specify the path to the file.

**Events**
* **loaded:** Triggered once everything is loaded.
* **geomsLoaded:** Triggered once all geometries are loaded.


**Extends**: <code>AssetItem</code>  

* [ObjAsset ⇐ <code>AssetItem</code>](#ObjAsset)
    * [new ObjAsset(name)](#new-ObjAsset)
    * [getGeometryLibrary() ⇒ <code>GeomLibrary</code>](#getGeometryLibrary)
    * [getMaterialLibrary() ⇒ <code>MaterialLibrary</code>](#getMaterialLibrary)

<a name="new_ObjAsset_new"></a>

### new ObjAsset
Create an obj asset.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the object asset. |

<a name="ObjAsset+getGeometryLibrary"></a>

### getGeometryLibrary
Returns `GeomLibrary` object which hosts workers, buffers, streams and geometry objects.


**Returns**: <code>GeomLibrary</code> - - The return value.  
<a name="ObjAsset+getMaterialLibrary"></a>

### getMaterialLibrary
Returns `MaterialLibrary` object wich hosts images and `Material` objects.


**Returns**: <code>MaterialLibrary</code> - - The return value.  
