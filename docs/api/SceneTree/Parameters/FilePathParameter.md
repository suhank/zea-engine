<a name="FilePathParameter"></a>

### FilePathParameter 
Represents a specific type of parameter, that only stores file data values.

**Events**
* **valueChanged:** Triggered when setting file's URL.
* **fileUpdated:** Triggered when parameter's value is updated.


**Extends**: <code>[Parameter](api/SceneTree\Parameters\Parameter.md)</code>  

* [FilePathParameter ⇐ <code>Parameter</code>](#FilePathParameter)
    * [new FilePathParameter(name, exts)](#new-FilePathParameter)
    * [getFilepath() ⇒ <code>string</code>](#getFilepath)
    * [setFilepath(filePath)](#setFilepath)
    * [getFilename() ⇒ <code>string</code>](#getFilename)
    * [getExt() ⇒ <code>string</code>](#getExt)
    * [getStem() ⇒ <code>string</code>](#getStem)
    * [getFileDesc() ⇒ <code>object</code>](#getFileDesc)
    * [getFile() ⇒ <code>object</code>](#getFile)
    * [setUrl(url, name)](#setUrl)
    * [getUrl() ⇒ <code>string</code>](#getUrl)
    * [setValue(value)](#setValue)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)
    * [clone()](#clone)

<a name="new_FilePathParameter_new"></a>

### new FilePathParameter
Create a file path parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the file path parameter. |
| exts | <code>string</code> | The exts value. |

<a name="FilePathParameter+getFilepath"></a>

### getFilepath
Returns complete file path.


**Returns**: <code>string</code> - - The return value.  
<a name="FilePathParameter+setFilepath"></a>

### setFilepath
Resolves resourceId using the specified path and sets its value to the parameter.



| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | The filePath value. |

<a name="FilePathParameter+getFilename"></a>

### getFilename
Returns parameter's file name


**Returns**: <code>string</code> - - The return value.  
<a name="FilePathParameter+getExt"></a>

### getExt
Returns parameter's file extension


**Returns**: <code>string</code> - - The return value.  
<a name="FilePathParameter+getStem"></a>

### getStem
Returns parameter's file name without extension


**Returns**: <code>string</code> - - The return value.  
<a name="FilePathParameter+getFileDesc"></a>

### getFileDesc
Returns file object, which contains the url, resourceId and the name.


**Returns**: <code>object</code> - - The return value.  
<a name="FilePathParameter+getFile"></a>

### getFile
Returns file object, which contains the url, resourceId and the name.


**Returns**: <code>object</code> - - The return value.  
<a name="FilePathParameter+setUrl"></a>

### setUrl
Sets file data.



| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | the url value of the |
| name | <code>string</code> | (optional) the name of the file that the Url points to. |

<a name="FilePathParameter+getUrl"></a>

### getUrl
Returns the file url string.


**Returns**: <code>string</code> - - The return value.  
<a name="FilePathParameter+setValue"></a>

### setValue
Sets file parameter value



| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value param. |

<a name="FilePathParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="FilePathParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="FilePathParameter+clone"></a>

### clone
The clone method constructs a new file path parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>FilePathParameter</code>](#FilePathParameter) - - Returns a new cloned file path parameter.  


### [Class Tests](api/SceneTree\Parameters/FilePathParameter.test)