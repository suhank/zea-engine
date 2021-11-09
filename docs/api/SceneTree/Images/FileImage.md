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


**Extends**: <code>[BaseImage](api/SceneTree\BaseImage.md)</code>  

* [FileImage ⇐ <code>BaseImage</code>](#FileImage)
    * [new FileImage(name, filePath, params)](#new-FileImage)
    * [setCrossOrigin(crossOrigin)](#setCrossOrigin)
    * [load(url, format) ⇒ <code>Promise</code>](#load)
    * [setImageURL(url, format)](#setImageURL)
    * [isLoaded() ⇒ <code>any</code>](#isLoaded)
    * [getParams() ⇒ <code>any</code>](#getParams)
    * [toJSON(context)](#toJSON)
    * [fromJSON(json, context)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)

<a name="new_FileImage_new"></a>

### new FileImage
Create a file image.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| filePath | <code>string</code> | The filePath value. |
| params | <code>object</code> | The params value. |

<a name="FileImage+setCrossOrigin"></a>

### setCrossOrigin
Defines how to handle cross origin request.

**Possible values:**
* **anonymous** - CORS requests for this element will have the credentials flag set to 'same-origin'.
* **use-credentials** - CORS requests for this element will have the credentials flag set to 'include'.
* **""** - Setting the attribute name to an empty value, like crossorigin or crossorigin="", is the same as anonymous.


**Default**: <code>anonymous</code>  

| Param | Type | Description |
| --- | --- | --- |
| crossOrigin | <code>string</code> | The crossOrigin value. |

<a name="FileImage+load"></a>

### load
Uses the specify url to load an Image element and adds it to the data library.
Sets the state of the current object.


**Returns**: <code>Promise</code> - Returns a promise that resolves once the image is loaded.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The url value. |
| format | <code>string</code> | <code>&quot;RGB&quot;</code> | The format value. |

<a name="FileImage+setImageURL"></a>

### setImageURL
Loads in Image file using the given URL



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The url value. |
| format | <code>string</code> | <code>&quot;RGB&quot;</code> | The format value. Can be 'RGB' or 'RGBA' for files that contain an alpha channel. This will cause objects to be drawn using the Transparent pass. |

<a name="FileImage+isLoaded"></a>

### isLoaded
The isLoaded method.


**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+getParams"></a>

### getParams
The getParams method.


**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.



| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="FileImage+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="FileImage+readBinary"></a>

### readBinary
The readBinary method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader param. |
| context | <code>object</code> | The context param. |

<a name="FileImage2D"></a>

### FileImage2D 
Class representing a 2D file image.


**Extends**: [<code>FileImage</code>](#FileImage)  

* [FileImage2D](#FileImage2D)
    * [new FileImage2D(filePath, params)](#new-FileImage2D)
    * [setCrossOrigin(crossOrigin)](#setCrossOrigin)
    * [load(url, format) ⇒ <code>Promise</code>](#load)
    * [setImageURL(url, format)](#setImageURL)
    * [isLoaded() ⇒ <code>any</code>](#isLoaded)
    * [getParams() ⇒ <code>any</code>](#getParams)
    * [toJSON(context)](#toJSON)
    * [fromJSON(json, context)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)

<a name="new_FileImage2D_new"></a>

### new FileImage2D
Create a file image 2D.


| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>any</code> | The filePath value. |
| params | <code>any</code> | The params value. |

<a name="FileImage+setCrossOrigin"></a>

### setCrossOrigin
Defines how to handle cross origin request.

**Possible values:**
* **anonymous** - CORS requests for this element will have the credentials flag set to 'same-origin'.
* **use-credentials** - CORS requests for this element will have the credentials flag set to 'include'.
* **""** - Setting the attribute name to an empty value, like crossorigin or crossorigin="", is the same as anonymous.


**Default**: <code>anonymous</code>  
**Overrides**: [<code>setCrossOrigin</code>](#FileImage+setCrossOrigin)  

| Param | Type | Description |
| --- | --- | --- |
| crossOrigin | <code>string</code> | The crossOrigin value. |

<a name="FileImage+load"></a>

### load
Uses the specify url to load an Image element and adds it to the data library.
Sets the state of the current object.


**Overrides**: [<code>load</code>](#FileImage+load)  
**Returns**: <code>Promise</code> - Returns a promise that resolves once the image is loaded.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The url value. |
| format | <code>string</code> | <code>&quot;RGB&quot;</code> | The format value. |

<a name="FileImage+setImageURL"></a>

### setImageURL
Loads in Image file using the given URL


**Overrides**: [<code>setImageURL</code>](#FileImage+setImageURL)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The url value. |
| format | <code>string</code> | <code>&quot;RGB&quot;</code> | The format value. Can be 'RGB' or 'RGBA' for files that contain an alpha channel. This will cause objects to be drawn using the Transparent pass. |

<a name="FileImage+isLoaded"></a>

### isLoaded
The isLoaded method.


**Overrides**: [<code>isLoaded</code>](#FileImage+isLoaded)  
**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+getParams"></a>

### getParams
The getParams method.


**Overrides**: [<code>getParams</code>](#FileImage+getParams)  
**Returns**: <code>any</code> - - The return value.  
<a name="FileImage+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Overrides**: [<code>toJSON</code>](#FileImage+toJSON)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="FileImage+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.


**Overrides**: [<code>fromJSON</code>](#FileImage+fromJSON)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="FileImage+readBinary"></a>

### readBinary
The readBinary method.


**Overrides**: [<code>readBinary</code>](#FileImage+readBinary)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader param. |
| context | <code>object</code> | The context param. |

