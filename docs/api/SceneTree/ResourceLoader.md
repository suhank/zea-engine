<a name="ResourceLoader"></a>

### ResourceLoader
Class for delegating resource loading, enabling an abstraction of a cloud file system to be implemented.

The resource loader can be used to load data, where it provides central tracking of loading progress and functionality to load various file types, including compressed archives.
The plugins script must be loaded along with the engine

```html
 <script crossorigin src="libs/zea-engine/dist/plugins.umd.js"></script>
```

To load a 'text' file.
```javascript
  resourceLoader.loadFile('text', url).then((txt) =>{
     console.log(txt)
  })
```

To load a 'JSON' file.
```javascript
  resourceLoader.loadFile('json', url).then((txt) =>{
     console.log(json)
  })
```

To load a 'binary' file.
```javascript
  resourceLoader.loadFile('binary', url).then((arrayBuffer) =>{
     console.log(arrayBuffer.length)
  })
```

To load an 'archive' file that is a compressed archive containing multiple sub-files.
```javascript
  resourceLoader.loadFile('archive', url).then((entries) =>{
     console.log(entries)
  })
```

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
    * [resolveURL(value) ⇒ <code>string</code>](#resolveURL)
    * [loadUrl(resourceId, url, callback, addLoadWork)](#loadUrl)
    * [loadArchive(url) ⇒ <code>Promise</code>](#loadArchive)
    * [loadJSON(url) ⇒ <code>Promise</code>](#loadJSON)
    * [loadText(url) ⇒ <code>Promise</code>](#loadText)
    * [getCommonResource(resourceId) ⇒ <code>TreeItem</code> \| <code>null</code>](#getCommonResource)
    * [setCommonResource(resourceId, resource)](#setCommonResource)
    * ~~[.loadCommonAssetResource(resourceId)](#ResourceLoader+loadCommonAssetResource) ⇒ <code>VLAAsset</code>~~
    * ~~[.addWork(resourceId, amount)](#ResourceLoader+addWork)~~
    * ~~[.addWorkDone(resourceId, amount)](#ResourceLoader+addWorkDone)~~
    * [incrementWorkload(amount)](#incrementWorkload)
    * [incrementWorkDone(amount)](#incrementWorkDone)

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

### resolveURL
Given a file ID, returns a URL. The adaptor that is assigned is responsible for resolving the URL within the file system.


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

<a name="ResourceLoader+loadArchive"></a>

### loadArchive
Load an archive file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed


**Returns**: <code>Promise</code> - - The promise value.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the data to load. |

<a name="ResourceLoader+loadJSON"></a>

### loadJSON
Load a JSON file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed


**Returns**: <code>Promise</code> - - The promise value.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the data to load. |

<a name="ResourceLoader+loadText"></a>

### loadText
Load a text file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed


**Returns**: <code>Promise</code> - - The promise value.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url of the data to load. |

<a name="ResourceLoader+getCommonResource"></a>

### getCommonResource
Returns a previously stored common resource. Typically this would be a VR asset.


**Returns**: <code>TreeItem</code> \| <code>null</code> - - The common resource if it exists  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |

<a name="ResourceLoader+setCommonResource"></a>

### setCommonResource
Saves a common resource for reuse by other tools. Typically this would be a VR asset.



| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |
| resource | <code>[TreeItem](api/SceneTree\TreeItem.md)</code> | The common resource to store |

<a name="ResourceLoader+loadCommonAssetResource"></a>

### ~~resourceLoader.loadCommonAssetResource(resourceId) ⇒ <code>VLAAsset</code>~~
***Deprecated***

Load and return a file resource using the specified path.


**Returns**: <code>[VLAAsset](api/SceneTree\VLAAsset.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |

<a name="ResourceLoader+addWork"></a>

### ~~resourceLoader.addWork(resourceId, amount)~~
***Deprecated***

Add work to the total work pile.. We never know how big the pile will get.



| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |
| amount | <code>number</code> | The amount value. |

<a name="ResourceLoader+addWorkDone"></a>

### ~~resourceLoader.addWorkDone(resourceId, amount)~~
***Deprecated***

Add work to the 'done' pile. The done pile should eventually match the total pile.



| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |
| amount | <code>number</code> | The amount value. |

<a name="ResourceLoader+incrementWorkload"></a>

### incrementWorkload
Increments the amount of work to be done causing a 'progressIncremented' event to be emitted
As the workload is incremented, the progress might retract as a lower proportion of the work
is then considered done. Only once this work is completed, and the 'incrementWorkDone', the
progress will increment.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| amount | <code>number</code> | <code>1</code> | The amount value. |

<a name="ResourceLoader+incrementWorkDone"></a>

### incrementWorkDone
Increments the amount of work done causing a 'progressIncremented' event to be emitted.
If 5 items of work have been added using #incrementWorkload, and subsequently 3 items have
been completed and #incrementWorkDone called. The progress will be at 3/5, or 60%



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| amount | <code>number</code> | <code>1</code> | The amount value. |

