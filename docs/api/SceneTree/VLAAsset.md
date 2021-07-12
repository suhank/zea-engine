<a name="VLAAsset"></a>

### VLAAsset 
Class designed to load and handle `.vla` files.

**Parameters**
* **DataFilePath([`FilePathParameter`](api/SceneTree\Parameters\FilePathParameter.md)):** Used to specify the path to the file.

**Events**
* **loaded:** Triggered once the tree is loaded. Note: the tree bounding box is valid once the tree is loaded.
* **geomsLoaded:** Triggered once all geometries are loaded.


**Extends**: <code>[AssetItem](api/SceneTree\AssetItem.md)</code>  

* [VLAAsset ⇐ <code>AssetItem</code>](#VLAAsset)
    * [new VLAAsset(name)](#new-VLAAsset)
    * [readBinary(reader, context) ⇒ <code>number</code>](#readBinary)
    * [load(url, context) ⇒ <code>Promise</code>](#load)
    * [fromJSON(j, context, onDone)](#fromJSON)

<a name="new_VLAAsset_new"></a>

### new VLAAsset
Create a VLA asset.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="VLAAsset+readBinary"></a>

### readBinary
Sets state of current asset using a binary reader object.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree\BinReader.md)</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="VLAAsset+load"></a>

### load
Loads all the geometries and metadata from the asset file.


**Returns**: <code>Promise</code> - - Returns a promise that resolves once the initial load is complete  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The URL of the asset to load |
| context | <code>AssetLoadContext</code> | The load context object that provides additional data such as the units of the scene we are loading into. |

<a name="VLAAsset+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>AssetLoadContext</code> | The load context object that provides additional data such as the units of the scene we are loading into. |
| onDone | <code>function</code> | The onDone value. |

