### Classes

<dl>
<dt><a href="#FileImage">FileImage</a> ⇐ <code>BaseImage</code></dt>
<dd><p>Class representing a file image.</p>
</dd>
<dt><a href="#FileImage2D">FileImage2D</a> ⇐ <code><a href="#FileImage">FileImage</a></code></dt>
<dd><p>Class representing a 2D file image.</p>
</dd>
</dl>

<a name="FileImage"></a>

### FileImage 
Class representing a file image.

**Kind**: global class  
**Extends**: <code>BaseImage</code>  

* [FileImage ⇐ <code>BaseImage</code>](#FileImage)
    * [new FileImage(name, filePath, params)](#new-FileImage)
    * _instance_
        * [getFilepath() ⇒ <code>any</code>](#getFilepath)
        * [isStream() ⇒ <code>boolean</code>](#isStream)
        * [isLoaded() ⇒ <code>any</code>](#isLoaded)
        * [getParams() ⇒ <code>any</code>](#getParams)
        * [toJSON(context, flags)](#toJSON)
        * [fromJSON(json, context, flags)](#fromJSON)
        * [readBinary(reader, context)](#readBinary)
    * _static_
        * [registerLoader(exts, loaderClass)](#registerLoader)
        * [constructLoader(file, loaderName) ⇒ <code>any</code>](#constructLoader)

<a name="new_FileImage_new"></a>

### new FileImage
Create a file image.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| filePath | <code>any</code> | The filePath value. |
| params | <code>any</code> | The params value. |

<a name="FileImage+getFilepath"></a>

### getFilepath
The getFilepath method.

**Kind**: instance method of [<code>FileImage</code>](#FileImage)  
**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+isStream"></a>

### isStream
The isStream method.

**Kind**: instance method of [<code>FileImage</code>](#FileImage)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="FileImage+isLoaded"></a>

### isLoaded
The isLoaded method.

**Kind**: instance method of [<code>FileImage</code>](#FileImage)  
**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+getParams"></a>

### getParams
The getParams method.

**Kind**: instance method of [<code>FileImage</code>](#FileImage)  
**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>FileImage</code>](#FileImage)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="FileImage+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>FileImage</code>](#FileImage)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="FileImage+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>FileImage</code>](#FileImage)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader param. |
| context | <code>object</code> | The context param. |

<a name="FileImage.registerLoader"></a>

### registerLoader
The registerLoader method.

**Kind**: static method of [<code>FileImage</code>](#FileImage)  

| Param | Type | Description |
| --- | --- | --- |
| exts | <code>any</code> | The exts param. |
| loaderClass | <code>any</code> | The loaderClass param. |

<a name="FileImage.constructLoader"></a>

### constructLoader
The constructLoader method.

**Kind**: static method of [<code>FileImage</code>](#FileImage)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>any</code> | The file value. |
| loaderName | <code>any</code> | The loaderName value. |

<a name="FileImage2D"></a>

### FileImage2D 
Class representing a 2D file image.

**Kind**: global class  
**Extends**: [<code>FileImage</code>](#FileImage)  

* [FileImage2D](#FileImage2D)
    * [new FileImage2D(filePath, params)](#new-FileImage2D)
    * [getFilepath() ⇒ <code>any</code>](#getFilepath)
    * [isStream() ⇒ <code>boolean</code>](#isStream)
    * [isLoaded() ⇒ <code>any</code>](#isLoaded)
    * [getParams() ⇒ <code>any</code>](#getParams)
    * [toJSON(context, flags)](#toJSON)
    * [fromJSON(json, context, flags)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)

<a name="new_FileImage2D_new"></a>

### new FileImage2D
Create a file image 2D.


| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>any</code> | The filePath value. |
| params | <code>any</code> | The params value. |

<a name="FileImage+getFilepath"></a>

### getFilepath
The getFilepath method.

**Kind**: instance method of [<code>FileImage2D</code>](#FileImage2D)  
**Overrides**: [<code>getFilepath</code>](#FileImage+getFilepath)  
**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+isStream"></a>

### isStream
The isStream method.

**Kind**: instance method of [<code>FileImage2D</code>](#FileImage2D)  
**Overrides**: [<code>isStream</code>](#FileImage+isStream)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="FileImage+isLoaded"></a>

### isLoaded
The isLoaded method.

**Kind**: instance method of [<code>FileImage2D</code>](#FileImage2D)  
**Overrides**: [<code>isLoaded</code>](#FileImage+isLoaded)  
**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+getParams"></a>

### getParams
The getParams method.

**Kind**: instance method of [<code>FileImage2D</code>](#FileImage2D)  
**Overrides**: [<code>getParams</code>](#FileImage+getParams)  
**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>FileImage2D</code>](#FileImage2D)  
**Overrides**: [<code>toJSON</code>](#FileImage+toJSON)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="FileImage+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>FileImage2D</code>](#FileImage2D)  
**Overrides**: [<code>fromJSON</code>](#FileImage+fromJSON)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="FileImage+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>FileImage2D</code>](#FileImage2D)  
**Overrides**: [<code>readBinary</code>](#FileImage+readBinary)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader param. |
| context | <code>object</code> | The context param. |

