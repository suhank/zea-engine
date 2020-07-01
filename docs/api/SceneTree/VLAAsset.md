<a name="VLAAsset"></a>

### VLAAsset 
Class designed to load and handle `.vla` files.
Which facilitates the migration of geometries from third party applications to the Digistar planetarium dome projection.

**Parameters**
* **DataFilePath(`FilePathParameter`):** Used to specify the path to the file.
* **LightmapTint(`ColorParameter`):**

**Events**
* **loaded:** Triggered once everything is loaded.
* **geomsLoaded:** Triggered once all geometries are loaded.


**Extends**: <code>AssetItem</code>  

* [VLAAsset ⇐ <code>AssetItem</code>](#VLAAsset)
    * [new VLAAsset(name)](#new-VLAAsset)
    * [readBinary(reader, context) ⇒ <code>number</code>](#readBinary)
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
| reader | <code>BinReader</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="VLAAsset+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| onDone | <code>function</code> | The onDone value. |

