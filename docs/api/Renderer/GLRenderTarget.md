<a name="GLRenderTarget"></a>

### GLRenderTarget
Class representing a GL render target.



* [GLRenderTarget](#GLRenderTarget)
    * [new GLRenderTarget(gl, params)](#new-GLRenderTarget)
    * [configure(params)](#configure)
    * [checkFramebuffer()](#checkFramebuffer)
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
| gl | <code>WebGLRenderingContext</code> | The webgl rendering context. |
| params | <code>any</code> | The params value. |

<a name="GLRenderTarget+configure"></a>

### configure
The configure method.



| Param | Type | Description |
| --- | --- | --- |
| params | <code>any</code> | The params param. |

<a name="GLRenderTarget+checkFramebuffer"></a>

### checkFramebuffer
The checkFramebuffer method.


<a name="GLRenderTarget+bindForWriting"></a>

### bindForWriting
The bindForWriting method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| renderstate | <code>object</code> |  | The object tracking the current state of the renderer |
| clear | <code>boolean</code> | <code>false</code> | The clear value. |

<a name="GLRenderTarget+unbindForWriting"></a>

### unbindForWriting
The unbindForWriting method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

<a name="GLRenderTarget+clear"></a>

### clear
The clear method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clearDepth | <code>boolean</code> | <code>true</code> | The clearDepth value. |

<a name="GLRenderTarget+bindForReading"></a>

### bindForReading
Binds the render target in preparation for 'readPixels' calls to pull data back to main memory.


<a name="GLRenderTarget+unbindForReading"></a>

### unbindForReading
The unbindForReading method.


<a name="GLRenderTarget+bindColorTexture"></a>

### bindColorTexture
The bindColorTexture method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| renderstate | <code>object</code> |  | The object tracking the current state of the renderer |
| unif | <code>any</code> |  | The unif value. |
| channelId | <code>number</code> | <code>0</code> | The channelId value. |

<a name="GLRenderTarget+bindDepthTexture"></a>

### bindDepthTexture
The bindDepthTexture method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |
| unif | <code>any</code> | The unif value. |

<a name="GLRenderTarget+unbind"></a>

### unbind
The unbind method.


<a name="GLRenderTarget+resize"></a>

### resize
The resize method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| width | <code>any</code> |  | The width value. |
| height | <code>any</code> |  | The height value. |
| preserveData | <code>boolean</code> | <code>false</code> | The preserveData value. |

<a name="GLRenderTarget+bindToUniform"></a>

### bindToUniform
The bindToUniform method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate param. |
| unif | <code>any</code> | The unif param. |
| bindings | <code>any</code> | The bindings param. |

<a name="GLRenderTarget+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


