<a name="ResourceLoader"></a>

### ResourceLoader
Class for delegating resource loading, enabling an abstraction of a cloud file system to be implemented.

**Events**
* **loaded:** emitted when a file has finished loading
* **progressIncremented:** emitted when a loading of processing task has been incremented
* **allResourcesLoaded:** emitted when all outstanding resources are loaded. This event can be used to signal the completion of load.



* [ResourceLoader](#ResourceLoader)
    * [new ResourceLoader()](#new-ResourceLoader)
    * [setAdapter(adapter)](#setAdapter)
    * [getAdapter() ⇒ <code>object</code>](#getAdapter)
    * [resolveFileId(value) ⇒ <code>string</code>](#resolveFileId)
    * ~~[.resolveFilename(value)](#ResourceLoader+resolveFilename) ⇒ <code>string</code>~~
    * ~~[.resolveURL(value)](#ResourceLoader+resolveURL) ⇒ <code>string</code>~~
    * [loadUrl(resourceId, url, callback, addLoadWork)](#loadUrl)
    * [loadJSON(url) ⇒ <code>Promise</code>](#loadJSON)
    * [loadText(url) ⇒ <code>Promise</code>](#loadText)
    * [loadArchive(url) ⇒ <code>Promise</code>](#loadArchive)
    * [loadCommonAssetResource(resourceId) ⇒ <code>VLAAsset</code>](#loadCommonAssetResource)
    * [addWork(resourceId, amount)](#addWork)
    * [addWorkDone(resourceId, amount)](#addWorkDone)

<a name="new_ResourceLoader_new"></a>

### new ResourceLoader
Create a resource loader.

<a name="ResourceLoader+setAdapter"></a>

### setAdapter
The setAdapter method.



| Param | Type | Description |
| --- | --- | --- |
| adapter | <code>object</code> | The adapter object. |

<a name="ResourceLoader+getAdapter"></a>

### getAdapter
The getAdapter method.


**Returns**: <code>object</code> - - The adapter object.  
<a name="ResourceLoader+resolveFileId"></a>

### resolveFileId
Given some value, which could be an IR or a path, return the unique identifier.


**Returns**: <code>string</code> - - The resolved fileId if an adapter is installed, else the original value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The file value. |

<a name="ResourceLoader+resolveFilename"></a>

### ~~resourceLoader.resolveFilename(value) ⇒ <code>string</code>~~
***Deprecated***

The resolveFilename method.


**Returns**: <code>string</code> - - The resolved URL if an adapter is installed, else the original value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The file value. |

<a name="ResourceLoader+resolveURL"></a>

### ~~resourceLoader.resolveURL(value) ⇒ <code>string</code>~~
***Deprecated***

The resolveURL method.


**Returns**: <code>string</code> - - The resolved URL if an adapter is installed, else the original value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The file value. |

<a name="ResourceLoader+loadUrl"></a>

### loadUrl
The loadUrl method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resourceId | <code>string</code> |  | The resourceId value. |
| url | <code>string</code> |  | The url value. |
| callback | <code>function</code> |  | The callback value. |
| addLoadWork | <code>boolean</code> | <code>true</code> | The addLoadWork value. |

<a name="ResourceLoader+loadJSON"></a>

### loadJSON
Loads a JSON file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed


**Returns**: <code>Promise</code> - - The promise value.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the data to load. |

<a name="ResourceLoader+loadText"></a>

### loadText
Loads a text file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed


**Returns**: <code>Promise</code> - - The promise value.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the data to load. |

<a name="ResourceLoader+loadArchive"></a>

### loadArchive
Loads an archive file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed


**Returns**: <code>Promise</code> - - The promise value.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the data to load. |

<a name="ResourceLoader+loadCommonAssetResource"></a>

### loadCommonAssetResource
Loads and return a file resource using the specified path.


**Returns**: <code>[VLAAsset](api/SceneTree/VLAAsset.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |

<a name="ResourceLoader+addWork"></a>

### addWork
Add work to the total work pile.. We never know how big the pile will get.



| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |
| amount | <code>number</code> | The amount value. |

<a name="ResourceLoader+addWorkDone"></a>

### addWorkDone
Add work to the 'done' pile. The done pile should eventually match the total pile.



| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |
| amount | <code>number</code> | The amount value. |

