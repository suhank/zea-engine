<a name="GLTexture2D"></a>

### GLTexture2D 
Represents a texture that contains 2-dimensional images.
<br>
Images have width and height, but no depth.


**Extends**: <code>[RefCounted](api/SceneTree/RefCounted.md)</code>  

* [GLTexture2D ⇐ <code>RefCounted</code>](#GLTexture2D)
    * [new GLTexture2D(gl, params)](#new-GLTexture2D)
    * [glTex ⇒ <code>WebGLTexture</code>](#glTex)
    * [isLoaded() ⇒ <code>boolean</code>](#isLoaded)
    * [getTexture() ⇒ <code>BaseImage</code>](#getTexture)
    * [getInternalFormat() ⇒ <code>GLenum</code> \| <code>enum</code>](#getInternalFormat)
    * [getType() ⇒ <code>GLenum</code> \| <code>enum</code>](#getType)
    * [getTypeID() ⇒ <code>GLenum</code> \| <code>enum</code>](#getTypeID)
    * [getFormat() ⇒ <code>GLenum</code> \| <code>enum</code>](#getFormat)
    * [getFormatID() ⇒ <code>GLenum</code> \| <code>enum</code>](#getFormatID)
    * [getWrap() ⇒ <code>GLenum</code> \| <code>enum</code>](#getWrap)
    * [getMipMapped() ⇒ <code>GLenum</code> \| <code>enum</code>](#getMipMapped)
    * [configure(params, emit)](#configure)
    * [bufferData(data, width, height, bind, emit)](#bufferData)
    * [clear()](#clear)
    * [resize(width, height, preserveData, emit)](#resize)
    * [populate(dataArray, width, height, offsetX, offsetY, bind)](#populate)
    * [getSize() ⇒ <code>array</code>](#getSize)
    * [getTexHdl() ⇒ <code>WebGLTexture</code>](#getTexHdl)
    * ~~[.bind(renderstate, unif)](#GLTexture2D+bind) ⇒ <code>any</code>~~
    * [preBind(unif, unifs) ⇒ <code>object</code>](#preBind)
    * [bindToUniform(renderstate, unif, bindings) ⇒ <code>boolean</code>](#bindToUniform)
    * [destroy()](#destroy)

<a name="new_GLTexture2D_new"></a>

### new GLTexture2D
Create a GL texture 2D.


| Param | Type | Description |
| --- | --- | --- |
| gl | <code>WebGLRenderingContext</code> \| <code>WebGL2RenderingContext</code> \| <code>undefined</code> | The gl value. |
| params | <code>BaseImage</code> \| <code>object</code> | The params value. |

<a name="GLTexture2D+glTex"></a>

### glTex 
Returns the value of the WebGLTexture value


**Returns**: <code>WebGLTexture</code> - - The return value.  
<a name="GLTexture2D+isLoaded"></a>

### isLoaded
Returns the loaded status of the 2D Texture


**Returns**: <code>boolean</code> - - The return value.  
<a name="GLTexture2D+getTexture"></a>

### getTexture
Returns the `BaseImage` of the GL Texture


**Returns**: <code>[BaseImage](api/SceneTree/BaseImage.md)</code> - - The return value.  
<a name="GLTexture2D+getInternalFormat"></a>

### getInternalFormat
Returns the specified value of the color components in the texture.


**Returns**: <code>GLenum</code> \| <code>enum</code> - - The return value.  
<a name="GLTexture2D+getType"></a>

### getType
Returns the value of the specified data type of the texel data.


**Returns**: <code>GLenum</code> \| <code>enum</code> - - The return value.  
<a name="GLTexture2D+getTypeID"></a>

### getTypeID
Returns the value of the specified data type of the texel data.


**Returns**: <code>GLenum</code> \| <code>enum</code> - - The return value.  
<a name="GLTexture2D+getFormat"></a>

### getFormat
Returns the value of the specified texel data. It must be the same as the `internalFormat`


**Returns**: <code>GLenum</code> \| <code>enum</code> - - The return value.  
<a name="GLTexture2D+getFormatID"></a>

### getFormatID
Returns the value of the specified texel data. It must be the same as the `internalFormat`


**Returns**: <code>GLenum</code> \| <code>enum</code> - - The return value.  
<a name="GLTexture2D+getWrap"></a>

### getWrap
Returns the value of the specified wrapping function for texture coordinate


**Returns**: <code>GLenum</code> \| <code>enum</code> - - The return value.  
<a name="GLTexture2D+getMipMapped"></a>

### getMipMapped
Returns the value of the specified binding point.


**Returns**: <code>GLenum</code> \| <code>enum</code> - - The return value.  
<a name="GLTexture2D+configure"></a>

### configure
Builds the GLTexture2D using the specified parameters object.
Parameters must have the `BaseImage` properties structure.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>object</code> |  | The params value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="GLTexture2D+bufferData"></a>

### bufferData
Initializes and creates the buffer of the object's data store.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Image</code> \| <code>ImageData</code> \| <code>HTMLCanvasElement</code> \| <code>HTMLImageElement</code> \| <code>HTMLVideoElement</code> \| <code>object</code> |  | The data value. |
| width | <code>number</code> |  | The width value. |
| height | <code>number</code> |  | The height value. |
| bind | <code>boolean</code> | <code>true</code> | The bind value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="GLTexture2D+clear"></a>

### clear
Clears the buffers to preset values


<a name="GLTexture2D+resize"></a>

### resize
The resize method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>number</code> |  | The width value. |
| height | <code>number</code> |  | The height value. |
| preserveData | <code>boolean</code> | <code>false</code> | The preserveData value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="GLTexture2D+populate"></a>

### populate
Upload data for the image to the GPU.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataArray | <code>Uint16Array</code> |  | The dataArray value. |
| width | <code>number</code> |  | The width value |
| height | <code>number</code> |  | The height value |
| offsetX | <code>number</code> | <code>0</code> | The offsetX value |
| offsetY | <code>number</code> | <code>0</code> | The offsetY value |
| bind | <code>boolean</code> | <code>true</code> | The bind value |

<a name="GLTexture2D+getSize"></a>

### getSize
Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.


**Returns**: <code>array</code> - - The return value.  
<a name="GLTexture2D+getTexHdl"></a>

### getTexHdl
Returns the value of the WebGLTexture value


**Returns**: <code>WebGLTexture</code> - - The return value.  
<a name="GLTexture2D+bind"></a>

### ~~glTexture2D.bind(renderstate, unif) ⇒ <code>any</code>~~
***Deprecated***

The bind method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |
| unif | <code>WebGLUniformLocation</code> | The WebGL uniform |

<a name="GLTexture2D+preBind"></a>

### preBind
The preBind method.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| unif | <code>object</code> | The unif value. |
| unifs | <code>object</code> | The unifs value. |

<a name="GLTexture2D+bindToUniform"></a>

### bindToUniform
Binds Texture to the Uniform attribute.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The renderstate value. |
| unif | <code>object</code> | The unif value. |
| bindings | <code>object</code> | The bindings value. |

<a name="GLTexture2D+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


