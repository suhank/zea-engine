<a name="ResourceLoader"></a>

### ResourceLoader
Class representing a resource loader.

**Kind**: global class  

* [ResourceLoader](#ResourceLoader)
    * [new ResourceLoader()](#new-ResourceLoader)
    * [getRootFolder() ⇒ <code>any</code>](#getRootFolder)
    * [registerResourceCallback(filter, fn)](#registerResourceCallback)
    * [setResources(resources)](#setResources)
    * [addResourceURL(resourcePath, url)](#addResourceURL)
    * [updateFile(file)](#updateFile)
    * [freeData(buffer)](#freeData)
    * [getFilepath(resourceId) ⇒ <code>any</code>](#getFilepath)
    * [resourceAvailable(resourceId) ⇒ <code>any</code>](#resourceAvailable)
    * [getFile(resourceId) ⇒ <code>any</code>](#getFile)
    * [resolveFilePathToId(filePath) ⇒ <code>any</code>](#resolveFilePathToId)
    * [resolveFilepath(filePath) ⇒ <code>any</code>](#resolveFilepath)
    * [resolveFile(filePath) ⇒ <code>any</code>](#resolveFile)
    * [resolveURL(filePath) ⇒ <code>any</code>](#resolveURL)
    * [addWork(resourceId, amount)](#addWork)
    * [addWorkDone(resourceId, amount)](#addWorkDone)
    * [loadResource(resourceId, callback, addLoadWork)](#loadResource)
    * [loadURL(resourceId, url, callback, addLoadWork) ⇒ <code>any</code>](#loadURL)
    * [loadUrl(resourceId, url, callback, addLoadWork)](#loadUrl)
    * [unpackBuffer(resourceId, buffer, callback, addLoadWork)](#unpackBuffer)
    * [suspend()](#suspend)
    * [traverse(callback)](#traverse)

<a name="new_ResourceLoader_new"></a>

### new ResourceLoader
Create a resource loader.

<a name="ResourceLoader+getRootFolder"></a>

### getRootFolder
The getRootFolder method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
**Returns**: <code>any</code> - - The return value.  
<a name="ResourceLoader+registerResourceCallback"></a>

### registerResourceCallback
The registerResourceCallback method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>any</code> | The filter value. |
| fn | <code>any</code> | The fn value. |

<a name="ResourceLoader+setResources"></a>

### setResources
The setResources method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Description |
| --- | --- | --- |
| resources | <code>any</code> | The resources value. |

<a name="ResourceLoader+addResourceURL"></a>

### addResourceURL
The addResourceURL method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Description |
| --- | --- | --- |
| resourcePath | <code>any</code> | The resourcePath value. |
| url | <code>any</code> | The url value. |

<a name="ResourceLoader+updateFile"></a>

### updateFile
The updateFile method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>any</code> | The file value. |

<a name="ResourceLoader+freeData"></a>

### freeData
The freeData method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>ArrayBuffer</code> | The buffer value. |

<a name="ResourceLoader+getFilepath"></a>

### getFilepath
The getFilepath method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>any</code> | The resourceId value. |

<a name="ResourceLoader+resourceAvailable"></a>

### resourceAvailable
The resourceAvailable method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>any</code> | The resourceId value. |

<a name="ResourceLoader+getFile"></a>

### getFile
The getFile method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>any</code> | The resourceId value. |

<a name="ResourceLoader+resolveFilePathToId"></a>

### resolveFilePathToId
The resolveFilePathToId method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>any</code> | The filePath value. |

<a name="ResourceLoader+resolveFilepath"></a>

### resolveFilepath
The resolveFilepath method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>any</code> | The filePath value. |

<a name="ResourceLoader+resolveFile"></a>

### resolveFile
The resolveFile method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>any</code> | The filePath value. |

<a name="ResourceLoader+resolveURL"></a>

### resolveURL
The resolveURL method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>any</code> | The filePath value. |

<a name="ResourceLoader+addWork"></a>

### addWork
Add work to the total work pile.. We never know how big the pile will get.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>any</code> | The resourceId value. |
| amount | <code>any</code> | The amount value. |

<a name="ResourceLoader+addWorkDone"></a>

### addWorkDone
Add work to the 'done' pile. The done pile should eventually match the total pile.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Description |
| --- | --- | --- |
| resourceId | <code>any</code> | The resourceId value. |
| amount | <code>any</code> | The amount value. |

<a name="ResourceLoader+loadResource"></a>

### loadResource
The loadResource method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resourceId | <code>any</code> |  | The resourceId value. |
| callback | <code>any</code> |  | The callback value. |
| addLoadWork | <code>boolean</code> | <code>true</code> | The addLoadWork value. |

<a name="ResourceLoader+loadURL"></a>

### loadURL
The loadURL method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resourceId | <code>any</code> |  | The resourceId value. |
| url | <code>any</code> |  | The url value. |
| callback | <code>any</code> |  | The callback value. |
| addLoadWork | <code>boolean</code> | <code>true</code> | The addLoadWork value. |

<a name="ResourceLoader+loadUrl"></a>

### loadUrl
The loadUrl method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resourceId | <code>any</code> |  | The resourceId value. |
| url | <code>any</code> |  | The url value. |
| callback | <code>any</code> |  | The callback value. |
| addLoadWork | <code>boolean</code> | <code>true</code> | The addLoadWork value. |

<a name="ResourceLoader+unpackBuffer"></a>

### unpackBuffer
The unpackBuffer method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resourceId | <code>any</code> |  | The resourceId value. |
| buffer | <code>Buffer</code> |  | The binary buffer to unpack. |
| callback | <code>any</code> |  | The callback value. |
| addLoadWork | <code>boolean</code> | <code>true</code> | The addLoadWork value. |

<a name="ResourceLoader+suspend"></a>

### suspend
The suspend method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  
<a name="ResourceLoader+traverse"></a>

### traverse
The traverse method.

**Kind**: instance method of [<code>ResourceLoader</code>](#ResourceLoader)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>any</code> | The callback value. |

