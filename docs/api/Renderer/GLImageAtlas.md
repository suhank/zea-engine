### Classes

<dl>
<dt><a href="#AtlasLayoutShader">AtlasLayoutShader</a></dt>
<dd></dd>
<dt><a href="#GLImageAtlas">GLImageAtlas</a></dt>
<dd></dd>
</dl>

<a name="AtlasLayoutShader"></a>

### AtlasLayoutShader
**Kind**: global class  
<a name="new_AtlasLayoutShader_new"></a>

### new AtlasLayoutShader
Create an atlas layout shader.


| Param | Type | Description |
| --- | --- | --- |
| gl | <code>any</code> | The gl value. |

<a name="GLImageAtlas"></a>

### GLImageAtlas
**Kind**: global class  

* [GLImageAtlas](#GLImageAtlas)
    * [new GLImageAtlas(gl, name, format, type, clearColor)](#new-GLImageAtlas)
    * [isLoaded() ⇒ <code>any</code>](#isLoaded)
    * [getMainImage() ⇒ <code>any</code>](#getMainImage)
    * [addSubImage(subImage) ⇒ <code>any</code>](#addSubImage)
    * [removeSubImage(subImage)](#removeSubImage)
    * [getSubImage(index) ⇒ <code>any</code>](#getSubImage)
    * [numSubImages() ⇒ <code>any</code>](#numSubImages)
    * [generateAtlasLayout()](#generateAtlasLayout)
    * [getLayoutData(index) ⇒ <code>any</code>](#getLayoutData)
    * [renderAtlas(cleanup, off)](#renderAtlas)
    * [isReady() ⇒ <code>any</code>](#isReady)
    * [bindToUniform(renderstate, unif) ⇒ <code>any</code>](#bindToUniform)
    * [cleanup()](#cleanup)
    * [destroy()](#destroy)

<a name="new_GLImageAtlas_new"></a>

### new GLImageAtlas
Create an image atlas..


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gl | <code>any</code> |  | The gl value. |
| name | <code>string</code> |  | The name value. |
| format | <code>any</code> | <code>RGBA</code> | The format value. |
| type | <code>any</code> | <code>FLOAT</code> | The type value. |
| clearColor | <code>any</code> |  | The clearColor value. |

<a name="GLImageAtlas+isLoaded"></a>

### isLoaded
The isLoaded method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLImageAtlas+getMainImage"></a>

### getMainImage
The getMainImage method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLImageAtlas+addSubImage"></a>

### addSubImage
The addSubImage method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| subImage | <code>any</code> | The subImage value. |

<a name="GLImageAtlas+removeSubImage"></a>

### removeSubImage
The removeSubImage method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  

| Param | Type | Description |
| --- | --- | --- |
| subImage | <code>any</code> | The subImage value. |

<a name="GLImageAtlas+getSubImage"></a>

### getSubImage
The getSubImage method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="GLImageAtlas+numSubImages"></a>

### numSubImages
The numSubImages method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLImageAtlas+generateAtlasLayout"></a>

### generateAtlasLayout
The generateAtlasLayout method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
<a name="GLImageAtlas+getLayoutData"></a>

### getLayoutData
The getLayoutData method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="GLImageAtlas+renderAtlas"></a>

### renderAtlas
The renderAtlas method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cleanup | <code>boolean</code> | <code>false</code> | The cleanup value. |
| off | <code>number</code> | <code>0</code> | The off value. |

<a name="GLImageAtlas+isReady"></a>

### isReady
The isReady method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLImageAtlas+bindToUniform"></a>

### bindToUniform
The bindToUniform method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |
| unif | <code>any</code> | The unif value. |

<a name="GLImageAtlas+cleanup"></a>

### cleanup
The cleanup method.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
<a name="GLImageAtlas+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

**Kind**: instance method of [<code>GLImageAtlas</code>](#GLImageAtlas)  
