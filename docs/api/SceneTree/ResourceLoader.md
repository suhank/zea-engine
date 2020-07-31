<a name="ResourceLoader"></a>

### ResourceLoader
Class in charge of loading file resources, holding a reference to all of them.
Manages workers, callbacks, resource tree and entities.

**Events**
* **loaded:** _todo_
* **fileUpdated:** _todo_
* **progressIncremented:** _todo_
* **allResourcesLoaded:** _todo_



* [ResourceLoader](#ResourceLoader)
    * [new ResourceLoader()](#new-ResourceLoader)
    * [getRootFolder() ⇒ <code>object</code>](#getRootFolder)
    * [registerResourceCallback(filter, fn)](#registerResourceCallback)
    * [setResources(resources)](#setResources)
    * [addResourceURL(resourcePath, url)](#addResourceURL)
    * [updateFile(file)](#updateFile)
    * [freeData(buffer)](#freeData)
    * [getFilepath(resourceId) ⇒ <code>string</code>](#getFilepath)
    * [resourceAvailable(resourceId) ⇒ <code>boolean</code>](#resourceAvailable)
    * [getFile(resourceId) ⇒ <code>object</code>](#getFile)
    * [resolveFilePathToId(filePath) ⇒ <code>string</code>](#resolveFilePathToId)
    * [resolveFilepath(filePath) ⇒ <code>object</code>](#resolveFilepath)
    * ~~[.resolveFile(filePath)](#ResourceLoader+resolveFile) ⇒ <code>object</code>~~
    * ~~[.resolveURL(filePath)](#ResourceLoader+resolveURL) ⇒ <code>string</code>~~
    * [addWork(resourceId, amount)](#addWork)
    * [addWorkDone(resourceId, amount)](#addWorkDone)
    * [loadResource(resourceId, callback, addLoadWork)](#loadResource)
    * [loadUrl(resourceId, url, callback, addLoadWork)](#loadUrl)
    * [unpackBuffer(resourceId, buffer, callback, addLoadWork) ⇒ <code>Promise</code>](#unpackBuffer)
    * [suspend()](#suspend)
    * [traverse(callback)](#traverse)

<a name="new_ResourceLoader_new"></a>

### new ResourceLoader
Create a resource loader.

<a name="ResourceLoader+getRootFolder"></a>

### getRootFolder
Returns the resources tree object.


**Returns**: <code>object</code> - - The return value.  
<a name="ResourceLoader+registerResourceCallback"></a>

### registerResourceCallback
The registerResourceCallback method.



| Param | Type | Description |
| --- | --- | --- |
| filter | <code>string</code> | The filter value. |
| fn | <code>function</code> | The fn value. |

<a name="ResourceLoader+setResources"></a>

### setResources
The setResources method.



| Param | Type | Description |
| --- | --- | --- |
| resources | <code>object</code> | The resources value. |

<a name="ResourceLoader+addResourceURL"></a>

### addResourceURL
The addResourceURL method.



| Param | Type | Description |
| --- | --- | --- |
| resourcePath | <code>string</code> | The resourcePath value. |
| url | <code>string</code> | The url value. |

<a name="ResourceLoader+updateFile"></a>

### updateFile
The updateFile method.



| Param | Type | Description |
| --- | --- | --- |
| file | <code>object</code> | The file value. |

<a name="ResourceLoader+freeData"></a>

### freeData
The freeData method.



| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>ArrayBuffer</code> | The buffer value. |

<a name="ResourceLoader+getFilepath"></a>

### getFilepath
Returns complete file path.


**Returns**: <code>string</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |

<a name="ResourceLoader+resourceAvailable"></a>

### resourceAvailable
The resourceAvailable method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |

<a name="ResourceLoader+getFile"></a>

### getFile
The getFile method.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>string</code> | The resourceId value. |

<a name="ResourceLoader+resolveFilePathToId"></a>

### resolveFilePathToId
The resolveFilePathToId method.


**Returns**: <code>string</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The filePath value. |

<a name="ResourceLoader+resolveFilepath"></a>

### resolveFilepath
The resolveFilepath method.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The filePath value. |

<a name="ResourceLoader+resolveFile"></a>

### ~~resourceLoader.resolveFile(filePath) ⇒ <code>object</code>~~
***Deprecated***

The resolveFile method.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The filePath value. |

<a name="ResourceLoader+resolveURL"></a>

### ~~resourceLoader.resolveURL(filePath) ⇒ <code>string</code>~~
***Deprecated***

The resolveURL method.


**Returns**: <code>string</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The filePath value. |

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

<a name="ResourceLoader+loadResource"></a>

### loadResource
The loadResource method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resourceId | <code>string</code> |  | The resourceId value. |
| callback | <code>function</code> |  | The callback value. |
| addLoadWork | <code>boolean</code> | <code>true</code> | The addLoadWork value. |

<a name="ResourceLoader+loadUrl"></a>

### loadUrl
The loadUrl method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resourceId | <code>string</code> |  | The resourceId value. |
| url | <code>string</code> |  | The url value. |
| callback | <code>function</code> |  | The callback value. |
| addLoadWork | <code>boolean</code> | <code>true</code> | The addLoadWork value. |

<a name="ResourceLoader+unpackBuffer"></a>

### unpackBuffer
The unpackBuffer method.


**Returns**: <code>Promise</code> - -  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resourceId | <code>string</code> |  | The resourceId value. |
| buffer | <code>Buffer</code> |  | The binary buffer to unpack. |
| callback | <code>function</code> |  | The callback value. |
| addLoadWork | <code>boolean</code> | <code>true</code> | The addLoadWork value. |

<a name="ResourceLoader+suspend"></a>

### suspend
The suspend method.


<a name="ResourceLoader+traverse"></a>

### traverse
The traverse method.



| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback value. |

