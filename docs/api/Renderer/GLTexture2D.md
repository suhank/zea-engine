<a name="GLTexture2D"></a>

## GLTexture2D ⇐ <code>RefCounted</code>
Class representing a GL texture 2D.

**Kind**: global class  
**Extends**: <code>RefCounted</code>  

* [GLTexture2D ⇐ <code>RefCounted</code>](#GLTexture2D)
    * [new GLTexture2D(gl, params)](#new-GLTexture2D)
    * [glTex ⇒ <code>any</code>](#glTex)
    * [isLoaded() ⇒ <code>boolean</code>](#isLoaded)
    * [getTexture() ⇒ <code>any</code>](#getTexture)
    * [getInternalFormat() ⇒ <code>any</code>](#getInternalFormat)
    * [getType() ⇒ <code>any</code>](#getType)
    * [getTypeID() ⇒ <code>any</code>](#getTypeID)
    * [getFormat() ⇒ <code>any</code>](#getFormat)
    * [getFormatID() ⇒ <code>any</code>](#getFormatID)
    * [getFilter() ⇒ <code>any</code>](#getFilter)
    * [getWrap() ⇒ <code>any</code>](#getWrap)
    * [getMipMapped() ⇒ <code>any</code>](#getMipMapped)
    * [configure(params, emit)](#configure)
    * [bufferData(data, width, height, bind, emit)](#bufferData)
    * [clear()](#clear)
    * [resize(width, height, preserveData, emit)](#resize)
    * [getSize() ⇒ <code>any</code>](#getSize)
    * [getTexHdl() ⇒ <code>any</code>](#getTexHdl)
    * [bind(renderstate, unif) ⇒ <code>any</code>](#bind)
    * [preBind(unif, unifs) ⇒ <code>any</code>](#preBind)
    * [bindToUniform(renderstate, unif, bindings) ⇒ <code>any</code>](#bindToUniform)
    * [destroy()](#destroy)

<a name="new_GLTexture2D_new"></a>

### new GLTexture2D
Create a GL texture 2D.


| Param | Type | Description |
| --- | --- | --- |
| gl | <code>any</code> | The gl value. |
| params | <code>any</code> | The params value. |

<a name="GLTexture2D+glTex"></a>

### glTex 
The glTex method.

**Kind**: instance property of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+isLoaded"></a>

### isLoaded
The isLoaded method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="GLTexture2D+getTexture"></a>

### getTexture
The getTexture method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+getInternalFormat"></a>

### getInternalFormat
The getInternalFormat method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+getType"></a>

### getType
The getType method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+getTypeID"></a>

### getTypeID
The getTypeID method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+getFormat"></a>

### getFormat
The getFormat method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+getFormatID"></a>

### getFormatID
The getFormatID method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+getFilter"></a>

### getFilter
The getFilter method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+getWrap"></a>

### getWrap
The getWrap method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+getMipMapped"></a>

### getMipMapped
The getMipMapped method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+configure"></a>

### configure
The configure method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>any</code> |  | The params value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="GLTexture2D+bufferData"></a>

### bufferData
The bufferData method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>any</code> |  | The data value. |
| width | <code>number</code> |  | The width value. |
| height | <code>number</code> |  | The height value. |
| bind | <code>boolean</code> | <code>true</code> | The bind value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="GLTexture2D+clear"></a>

### clear
The clear method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
<a name="GLTexture2D+resize"></a>

### resize
The resize method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>number</code> |  | The width value. |
| height | <code>number</code> |  | The height value. |
| preserveData | <code>boolean</code> | <code>false</code> | The preserveData value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="GLTexture2D+getSize"></a>

### getSize
The getSize method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+getTexHdl"></a>

### getTexHdl
The getTexHdl method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLTexture2D+bind"></a>

### bind
The bind method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |
| unif | <code>any</code> | The unif value. |

<a name="GLTexture2D+preBind"></a>

### preBind
The preBind method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| unif | <code>any</code> | The unif value. |
| unifs | <code>any</code> | The unifs value. |

<a name="GLTexture2D+bindToUniform"></a>

### bindToUniform
The bindToUniform method.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |
| unif | <code>any</code> | The unif value. |
| bindings | <code>any</code> | The bindings value. |

<a name="GLTexture2D+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.Users should never need to call this method directly.

**Kind**: instance method of [<code>GLTexture2D</code>](#GLTexture2D)  
