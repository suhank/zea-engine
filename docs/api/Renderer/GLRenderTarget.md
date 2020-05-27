<a name="GLRenderTarget"></a>

## GLRenderTarget
Class representing a GL render target.

**Kind**: global class  

* [GLRenderTarget](#GLRenderTarget)
    * [new GLRenderTarget(gl, params)](#new-GLRenderTarget)
    * [configure(params)](#configure)
    * [bindForWriting(renderstate, clear)](#bindForWriting)
    * [unbindForWriting(renderstate)](#unbindForWriting)
    * [clear(clearDepth)](#clear)
    * [bindForReading()](#bindForReading)
    * [unbindForReading()](#unbindForReading)
    * [bindColorTexture(renderstate, unif, channelId) ⇒ <code>boolean</code>](#bindColorTexture)
    * [bindDepthTexture(renderstate, unif) ⇒ <code>boolean</code>](#bindDepthTexture)
    * [unbind()](#unbind)
    * [resize(width, height, preserveData)](#resize)
    * [bindToUniform(renderstate, unif, bindings) ⇒ <code>any</code>](#bindToUniform)
    * [destroy()](#destroy)

<a name="new_GLRenderTarget_new"></a>

### new GLRenderTarget
Create a GL render target.


| Param | Type | Description |
| --- | --- | --- |
| gl | <code>any</code> | The gl value. |
| params | <code>any</code> | The params value. |

<a name="GLRenderTarget+configure"></a>

### configure
The configure method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>any</code> | The params param. |

<a name="GLRenderTarget+bindForWriting"></a>

### bindForWriting
The bindForWriting method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| renderstate | <code>any</code> |  | The renderstate value. |
| clear | <code>boolean</code> | <code>false</code> | The clear value. |

<a name="GLRenderTarget+unbindForWriting"></a>

### unbindForWriting
The unbindForWriting method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLRenderTarget+clear"></a>

### clear
The clear method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clearDepth | <code>boolean</code> | <code>true</code> | The clearDepth value. |

<a name="GLRenderTarget+bindForReading"></a>

### bindForReading
The bindForReading method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  
<a name="GLRenderTarget+unbindForReading"></a>

### unbindForReading
The unbindForReading method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  
<a name="GLRenderTarget+bindColorTexture"></a>

### bindColorTexture
The bindColorTexture method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| renderstate | <code>any</code> |  | The renderstate value. |
| unif | <code>any</code> |  | The unif value. |
| channelId | <code>number</code> | <code>0</code> | The channelId value. |

<a name="GLRenderTarget+bindDepthTexture"></a>

### bindDepthTexture
The bindDepthTexture method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |
| unif | <code>any</code> | The unif value. |

<a name="GLRenderTarget+unbind"></a>

### unbind
The unbind method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  
<a name="GLRenderTarget+resize"></a>

### resize
The resize method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>any</code> |  | The width value. |
| height | <code>any</code> |  | The height value. |
| preserveData | <code>boolean</code> | <code>false</code> | The preserveData value. |

<a name="GLRenderTarget+bindToUniform"></a>

### bindToUniform
The bindToUniform method.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate param. |
| unif | <code>any</code> | The unif param. |
| bindings | <code>any</code> | The bindings param. |

<a name="GLRenderTarget+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.Users should never need to call this method directly.

**Kind**: instance method of [<code>GLRenderTarget</code>](#GLRenderTarget)  
