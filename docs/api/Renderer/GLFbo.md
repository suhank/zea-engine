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

### width
Getter for width.


<a name="GLFbo+height"></a>

### height
Getter for height.


<a name="GLFbo+size"></a>

### size
Getter for size.


<a name="GLFbo+colorTexture"></a>

### colorTexture
Getter for colorTexture.


<a name="GLFbo+depthTextureGL"></a>

### depthTextureGL
Getter for depthTextureGL.


<a name="GLFbo+setClearColor"></a>

### setClearColor
The setClearColor method.



| Param | Type | Description |
| --- | --- | --- |
| clearColor | <code>any</code> | The clearColor value. |

<a name="GLFbo+getWidth"></a>

### getWidth
The getWidth method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+getHeight"></a>

### getHeight
The getHeight method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+getSize"></a>

### getSize
The getSize method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+getColorTexture"></a>

### getColorTexture
The getColorTexture method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+getDepthTextureGL"></a>

### getDepthTextureGL
The getDepthTextureGL method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLFbo+setColorTexture"></a>

### setColorTexture
The setColorTexture method.



| Param | Type | Description |
| --- | --- | --- |
| colorTexture | <code>any</code> | The colorTexture value. |

<a name="GLFbo+setup"></a>

### setup
The setup method.


<a name="GLFbo+resize"></a>

### resize
Triggered Automatically when the texture resizes.
TODO: fbos should manage the textures assigned to them
E.g. resizing and preserving data.


<a name="GLFbo+bindForWriting"></a>

### bindForWriting
The bindForWriting method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+unbindForWriting"></a>

### unbindForWriting
The unbindForWriting method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+bind"></a>

### bind
The bind method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+unbind"></a>

### unbind
The unbind method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+bindForReading"></a>

### bindForReading
The bindForReading method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+unbindForReading"></a>

### unbindForReading
The unbindForReading method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+clear"></a>

### clear
The clear method.


<a name="GLFbo+bindAndClear"></a>

### bindAndClear
The bindAndClear method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLFbo+unbind"></a>

### unbind
The unbind method.


<a name="GLFbo+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


