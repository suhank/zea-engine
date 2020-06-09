<a name="GLFbo"></a>

## GLFbo
This class abstracts the rendering of a collection of geometries to screen.

**Kind**: global class  

* [GLFbo](#GLFbo)
    * [new GLFbo(gl, colorTexture, createDepthTexture)](#new-GLFbo)
    * [width](#width)
    * [height](#height)
    * [size](#size)
    * [colorTexture](#colorTexture)
    * [depthTextureGL](#depthTextureGL)
    * [setClearColor(clearColor)](#setClearColor)
    * [getWidth() ⇒ <code>any</code>](#getWidth)
    * [getHeight() ⇒ <code>any</code>](#getHeight)
    * [getSize() ⇒ <code>any</code>](#getSize)
    * [getColorTexture() ⇒ <code>any</code>](#getColorTexture)
    * [getDepthTextureGL() ⇒ <code>any</code>](#getDepthTextureGL)
    * [setColorTexture(colorTexture)](#setColorTexture)
    * [setup()](#setup)
    * [resize()](#resize)
    * [bindForWriting(renderstate)](#bindForWriting)
    * [unbindForWriting(renderstate)](#unbindForWriting)
    * [bind(renderstate)](#bind)
    * [unbind(renderstate)](#unbind)
    * [bindForReading(renderstate)](#bindForReading)
    * [unbindForReading(renderstate)](#unbindForReading)
    * [clear()](#clear)
    * [bindAndClear(renderstate)](#bindAndClear)
    * [unbind()](#unbind)
    * [destroy()](#destroy)

<a name="new_GLFbo_new"></a>

### new GLFbo
Create a GLFbo.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gl | <code>any</code> |  | The gl value. |
| colorTexture | <code>any</code> |  | The colorTexture value. |
| createDepthTexture | <code>boolean</code> | <code>false</code> | The createDepthTexture value. |

<a name="GLFbo+width"></a>

### widt
Getter for width.

**Kind**: instance property of [<code>GLFbo</code>](#GLFbo)  
<a name="GLFbo+height"></a>

### heigh
Getter for height.

**Kind**: instance property of [<code>GLFbo</code>](#GLFbo)  
<a name="GLFbo+size"></a>

### siz
Getter for size.

**Kind**: instance property of [<code>GLFbo</code>](#GLFbo)  
<a name="GLFbo+colorTexture"></a>

### colorTextur
Getter for colorTexture.

**Kind**: instance property of [<code>GLFbo</code>](#GLFbo)  
<a name="GLFbo+depthTextureGL"></a>

### depthTextureG
Getter for depthTextureGL.

**Kind**: instance property of [<code>GLFbo</code>](#GLFbo)  
<a name="GLFbo+setClearColor"></a>

### setClearColor
The setClearColor method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  

| Param | Type | Description |
| --- | --- | --- |
| clearColor | <code>any</code> | The clearColor value. |

<a name="GLFbo+getWidth"></a>

### getWidth
The getWidth method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+getHeight"></a>

### getHeight
The getHeight method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+getSize"></a>

### getSize
The getSize method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+getColorTexture"></a>

### getColorTexture
The getColorTexture method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+getDepthTextureGL"></a>

### getDepthTextureGL
The getDepthTextureGL method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+setColorTexture"></a>

### setColorTexture
The setColorTexture method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  

| Param | Type | Description |
| --- | --- | --- |
| colorTexture | <code>any</code> | The colorTexture value. |

<a name="GLFbo+setup"></a>

### setup
The setup method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  
<a name="GLFbo+resize"></a>

### resize
Triggered Automatically when the texture resizes.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  
<a name="GLFbo+bindForWriting"></a>

### bindForWriting
The bindForWriting method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+unbindForWriting"></a>

### unbindForWriting
The unbindForWriting method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+bind"></a>

### bind
The bind method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+unbind"></a>

### unbind
The unbind method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+bindForReading"></a>

### bindForReading
The bindForReading method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+unbindForReading"></a>

### unbindForReading
The unbindForReading method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+clear"></a>

### clear
The clear method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  
<a name="GLFbo+bindAndClear"></a>

### bindAndClear
The bindAndClear method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+unbind"></a>

### unbind
The unbind method.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  
<a name="GLFbo+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.

**Kind**: instance method of [<code>GLFbo</code>](#GLFbo)  