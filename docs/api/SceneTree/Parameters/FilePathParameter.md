<a name="FilePathParameter"></a>

### FilePathParameter 
Class representing a file path parameter.


**Extends**: <code>Parameter</code>  

* [FilePathParameter ⇐ <code>Parameter</code>](#FilePathParameter)
    * [new FilePathParameter(name, exts)](#new-FilePathParameter)
    * [setSupportedExts(exts)](#setSupportedExts)
    * [getFilepath() ⇒ <code>any</code>](#getFilepath)
    * [setFilepath(filePath, mode)](#setFilepath)
    * [getFilename() ⇒ <code>any</code>](#getFilename)
    * [getExt() ⇒ <code>any</code>](#getExt)
    * [getStem() ⇒ <code>any</code>](#getStem)
    * [getFileFolder() ⇒ <code>any</code>](#getFileFolder)
    * [getFileFolderPath() ⇒ <code>any</code>](#getFileFolderPath)
    * [getFile() ⇒ <code>any</code>](#getFile)
    * [getFileDesc() ⇒ <code>any</code>](#getFileDesc)
    * [setUrl(url, mode)](#setUrl)
    * [getUrl() ⇒ <code>any</code>](#getUrl)
    * [setDirty(cleanerFn)](#setDirty)
    * [setValue(value, mode) ⇒ <code>boolean</code>](#setValue)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [clone(flags)](#clone)
    * [destroy()](#destroy)

<a name="new_FilePathParameter_new"></a>

### new FilePathParameter
Create a file path parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the file path parameter. |
| exts | <code>any</code> | The exts value. |

<a name="FilePathParameter+setSupportedExts"></a>

### setSupportedExts
The setSupportedExts method.



| Param | Type | Description |
| --- | --- | --- |
| exts | <code>any</code> | The exts value. |

<a name="FilePathParameter+getFilepath"></a>

### getFilepath
The getFilepath method.


**Returns**: <code>any</code> - - The return value.  
<a name="FilePathParameter+setFilepath"></a>

### setFilepath
The setFilepath method.



| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>any</code> | The filePath value. |
| mode | <code>number</code> | The mode value. |

<a name="FilePathParameter+getFilename"></a>

### getFilename
The getFilename method.


**Returns**: <code>any</code> - - The return value.  
<a name="FilePathParameter+getExt"></a>

### getExt
The getExt method.


**Returns**: <code>any</code> - - The return value.  
<a name="FilePathParameter+getStem"></a>

### getStem
The getStem method.


**Returns**: <code>any</code> - - The return value.  
<a name="FilePathParameter+getFileFolder"></a>

### getFileFolder
The getFileFolder method.


**Returns**: <code>any</code> - - The return value.  
<a name="FilePathParameter+getFileFolderPath"></a>

### getFileFolderPath
The getFileFolderPath method.


**Returns**: <code>any</code> - - The return value.  
<a name="FilePathParameter+getFile"></a>

### getFile
The getFile method.


**Returns**: <code>any</code> - - The return value.  
<a name="FilePathParameter+getFileDesc"></a>

### getFileDesc
The getFileDesc method.


**Returns**: <code>any</code> - - The return value.  
<a name="FilePathParameter+setUrl"></a>

### setUrl
The setUrl method.



| Param | Type | Description |
| --- | --- | --- |
| url | <code>any</code> | The url value. |
| mode | <code>number</code> | The mode value. |

<a name="FilePathParameter+getUrl"></a>

### getUrl
The getUrl method.


**Returns**: <code>any</code> - - The return value.  
<a name="FilePathParameter+setDirty"></a>

### setDirty
The setDirty method.



| Param | Type | Description |
| --- | --- | --- |
| cleanerFn | <code>any</code> | The cleanerFn value. |

<a name="FilePathParameter+setValue"></a>

### setValue
The setValue method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |
| mode | <code>number</code> | The mode value. |

<a name="FilePathParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="FilePathParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="FilePathParameter+clone"></a>

### clone
The clone method constructs a new file path parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>FilePathParameter</code>](#FilePathParameter) - - Returns a new cloned file path parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="FilePathParameter+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


