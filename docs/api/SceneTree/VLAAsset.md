<a name="VLAAsset"></a>

### VLAAsset 
Class representing a VLA asset.


**Extends**: <code>AssetItem</code>  

* [VLAAsset ⇐ <code>AssetItem</code>](#VLAAsset)
    * [new VLAAsset(name)](#new-VLAAsset)
    * [readBinary(reader, context) ⇒ <code>any</code>](#readBinary)
    * [loadDataFile(onDone, onGeomsDone)](#loadDataFile)
    * [fromJSON(j, context, onDone)](#fromJSON)

<a name="new_VLAAsset_new"></a>

### new VLAAsset
Create a VLA asset.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="VLAAsset+readBinary"></a>

### readBinary
The readBinary method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="VLAAsset+loadDataFile"></a>

### loadDataFile
The loadDataFile method.



| Param | Type | Description |
| --- | --- | --- |
| onDone | <code>any</code> | The onDone value. |
| onGeomsDone | <code>any</code> | The onGeomsDone value. |

<a name="VLAAsset+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| onDone | <code>any</code> | The onDone value. |

