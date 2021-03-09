<a name="ArchiveUnpackerPlugin"></a>

### ArchiveUnpackerPlugin
Archive unpacker plugin.



* [ArchiveUnpackerPlugin](#ArchiveUnpackerPlugin)
    * [getType() ⇒ <code>string</code>](#getType)
    * [loadFile(url) ⇒ <code>Promise</code>](#loadFile)

<a name="ArchiveUnpackerPlugin+getType"></a>

### getType
The type of file this plugin handles.


**Returns**: <code>string</code> - The type of file.  
<a name="ArchiveUnpackerPlugin+loadFile"></a>

### loadFile
Loads an archive file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed


**Returns**: <code>Promise</code> - - The promise value.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the data to load. |

