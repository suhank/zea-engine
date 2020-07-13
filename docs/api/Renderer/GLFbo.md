<a name="GLFbo"></a>

### GLFbo
This class abstracts the rendering of a collection of geometries to screen.



* [GLFbo](#GLFbo)
    * [new GLFbo(gl, colorTexture, createDepthTexture)](#new-GLFbo)
    * [width](#width)
    * [height](#height)
    * [size](#size)
    * [colorTexture](#colorTexture)
    * [depthTextureGL](#depthTextureGL)
    * [setClearColor(clearColor)](#setClearColor)
    * [getWidth() ⇒ <code>number</code>](#getWidth)
    * [getHeight() ⇒ <code>number</code>](#getHeight)
    * [getSize() ⇒ <code>array</code>](#getSize)
    * [getColorTexture() ⇒ <code>GLTexture2D</code>](#getColorTexture)
    * [getDepthTextureGL() ⇒ <code>boolean</code>](#getDepthTextureGL)
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
Creates a GL Framebuffer Object


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gl | <code>WebGLRenderingContext</code> \| <code>WebGL2RenderingContext</code> \| <code>undefined</code> |  | The Canvas 3D Context. |
| colorTexture | <code>GLTexture2D</code> |  | Represents 2D Texture in GL. |
| createDepthTexture | <code>boolean</code> | <code>false</code> | The createDepthTexture value. |

<a name="GLFbo+width"></a>

### width
Returns the `width` of the GL Texture


<a name="GLFbo+height"></a>

### height
Returns the `height` of the GL Texture


<a name="GLFbo+size"></a>

### size
Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.


<a name="GLFbo+colorTexture"></a>

### colorTexture
Returns the ColorTexture of the Fbo


<a name="GLFbo+depthTextureGL"></a>

### depthTextureGL
Returns the value of the deptTexture property.


<a name="GLFbo+setClearColor"></a>

### setClearColor
Sets FBO clear color using RGBA array structure.



| Param | Type | Description |
| --- | --- | --- |
| clearColor | <code>array</code> | The clearColor value. |

<a name="GLFbo+getWidth"></a>

### getWidth
Returns the `width` of the GL Texture


**Returns**: <code>number</code> - - The return value.  
<a name="GLFbo+getHeight"></a>

### getHeight
Returns the `height` of the GL Texture


**Returns**: <code>number</code> - - The return value.  
<a name="GLFbo+getSize"></a>

### getSize
Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.


**Returns**: <code>array</code> - - The return value.  
<a name="GLFbo+getColorTexture"></a>

### getColorTexture
Returns the ColorTexture of the Fbo


**Returns**: <code>GLTexture2D</code> - - The return value.  
<a name="GLFbo+getDepthTextureGL"></a>

### getDepthTextureGL
Returns the value of the deptTexture property.


**Returns**: <code>boolean</code> - - The return value.  
<a name="GLFbo+setColorTexture"></a>

### setColorTexture
Sets ColorTexture of the Fbo.



| Param | Type | Description |
| --- | --- | --- |
| colorTexture | <code>GLTexture2D</code> | The colorTexture value. |

<a name="GLFbo+setup"></a>

### setup
The setup method.


<a name="GLFbo+resize"></a>

### resize
Triggered Automatically when the texture resizes.


**Todo:**: Fbos should manage the textures assigned to them.
E.g. resizing and preserving data.  
<a name="GLFbo+bindForWriting"></a>

### bindForWriting
Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The renderstate value. |

<a name="GLFbo+unbindForWriting"></a>

### unbindForWriting
Unbinds the Fbo to the canvas context for WRITE operations.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The renderstate value. |

<a name="GLFbo+bind"></a>

### bind
Binds the Fbo to the canvas context, meaning that all WRITE operations will affect the current Fbo.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The renderstate value. |

<a name="GLFbo+unbind"></a>

### unbind
Unbinds the Fbo to the canvas context for WRITE operations.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The renderstate value. |

<a name="GLFbo+bindForReading"></a>

### bindForReading
Binds the Fbo to the canvas context, meaning that all READ operations will affect the current Fbo.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The renderstate value. |

<a name="GLFbo+unbindForReading"></a>

### unbindForReading
Unbinds the Fbo to the canvas context for READ operations.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The renderstate value. |

<a name="GLFbo+clear"></a>

### clear
Enables all color components of the rendering context of the Fbo,
specifying the default color values when clearing color buffers and clears the buffers to preset values.


<a name="GLFbo+bindAndClear"></a>

### bindAndClear
Runs [`bind`](#bind) then [`clear`](#clear) methods.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The renderstate value. |

<a name="GLFbo+unbind"></a>

### unbind
Unbinds the Fbo to the canvas context.


<a name="GLFbo+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


