<a name="GLViewport"></a>

### GLViewport 
Class representing a GL viewport.

**Events**
* **resized:** Emitted when the GLViewport resizes
* **updated:** Emitted when the GLViewport needs updating. The Renderer will trigger a redraw when this occurs.
* **viewChanged:** Emitted when the view changes. Usually caused by the camera moving.
* **pointerDoublePressed:** Emitted when the user double clicks with the mouse, or double taps in the viewport.
* **pointerDown:** Emitted when the user presses a pointer
* **pointerUp:** Emitted when the user releases a pointer
* **pointerOverGeom:** Emitted when the pointer is moved over a geometry
* **pointerLeaveGeom:** Emitted when the pointer is moved off a geometry
* **pointerMove:** Emitted when the pointer is moved
* **pointerEnter:** Emitted when the pointer is moved into thg viewport
* **pointerLeave:** Emitted when the mouse leaves the viewport.
* **keyDown:** Emitted when the user presses a key on the keyboard
* **keyUp:** Emitted when the user releases a key on the keyboard
* **touchCancel:** Emitted when the user cancels a touch interaction


**Extends**: <code>[GLBaseViewport](api/Renderer\GLBaseViewport.md)</code>  

* [GLViewport ⇐ <code>GLBaseViewport</code>](#GLViewport)
    * [new GLViewport(renderer, name, width, height)](#new-GLViewport)
    * [resize(width, height)](#resize)
    * [getCamera() ⇒ <code>Camera</code>](#getCamera)
    * [setCamera(camera)](#setCamera)
    * [getProjectionMatrix() ⇒ <code>Mat4</code>](#getProjectionMatrix)
    * [getViewMatrix() ⇒ <code>Mat4</code>](#getViewMatrix)
    * [setActive(state)](#setActive)
    * [frameView(treeItems)](#frameView)
    * [calcRayFromScreenPos(screenPos) ⇒ <code>Ray</code>](#calcRayFromScreenPos)
    * [createGeomDataFbo(floatGeomBuffer)](#createGeomDataFbo)
    * [getGeomDataFbo() ⇒ <code>GLFbo</code>](#getGeomDataFbo)
    * [renderGeomDataFbo()](#renderGeomDataFbo)
    * [invalidateGeomDataBuffer()](#invalidateGeomDataBuffer)
    * [getGeomDataAtPos(screenPos, pointerRay) ⇒ <code>object</code>](#getGeomDataAtPos)
    * [getGeomItemsInRect(tl, br) ⇒ <code>Set</code>](#getGeomItemsInRect)
    * [getCapture() ⇒ <code>BaseItem</code>](#getCapture)
    * [releaseCapture()](#releaseCapture)
    * [onPointerDown(event)](#onPointerDown)
    * [onPointerUp(event)](#onPointerUp)
    * [onPointerMove(event)](#onPointerMove)
    * [onPointerEnter(event)](#onPointerEnter)
    * [onPointerLeave(event)](#onPointerLeave)
    * [onKeyDown(event)](#onKeyDown)
    * [onKeyUp(event)](#onKeyUp)
    * [onWheel(event)](#onWheel)
    * [onTouchCancel(event)](#onTouchCancel)
    * [draw()](#draw)

<a name="new_GLViewport_new"></a>

### new GLViewport
Create a GL viewport.


| Param | Type | Description |
| --- | --- | --- |
| renderer | <code>[GLRenderer](api/Renderer\GLRenderer.md)</code> | The renderer value. |
| name | <code>string</code> | The name value. |
| width | <code>number</code> | The width of the viewport |
| height | <code>number</code> | The height of the viewport |

<a name="GLViewport+resize"></a>

### resize
Dynamically resizes viewport.



| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | The width value. |
| height | <code>number</code> | The height value. |

<a name="GLViewport+getCamera"></a>

### getCamera
Returns current camera object


**Returns**: <code>[Camera](api/SceneTree\Camera.md)</code> - - The return value.  
<a name="GLViewport+setCamera"></a>

### setCamera
Sets current camera object



| Param | Type | Description |
| --- | --- | --- |
| camera | <code>[Camera](api/SceneTree\Camera.md)</code> | The camera value. |

<a name="GLViewport+getProjectionMatrix"></a>

### getProjectionMatrix
The getProjectionMatrix method.


**Returns**: <code>[Mat4](api/Math\Mat4.md)</code> - - The return projection matrix for the viewport.  
<a name="GLViewport+getViewMatrix"></a>

### getViewMatrix
The getProjectionMatrix method.


**Returns**: <code>[Mat4](api/Math\Mat4.md)</code> - - The return projection matrix for the viewport.  
<a name="GLViewport+setActive"></a>

### setActive
The setActive method.



| Param | Type | Description |
| --- | --- | --- |
| state | <code>boolean</code> | The state value. |

<a name="GLViewport+frameView"></a>

### frameView
The frameView method.



| Param | Type | Description |
| --- | --- | --- |
| treeItems | <code>array</code> | The treeItems value. |

<a name="GLViewport+calcRayFromScreenPos"></a>

### calcRayFromScreenPos
Compute a ray into the scene based on a mouse coordinate.


**Returns**: <code>[Ray](api/Math\Ray.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| screenPos | <code>[Vec2](api/Math\Vec2.md)</code> | The screen position. |

<a name="GLViewport+createGeomDataFbo"></a>

### createGeomDataFbo
The createGeomDataFbo method.



| Param | Type | Description |
| --- | --- | --- |
| floatGeomBuffer | <code>boolean</code> | true if the GPU supports rendering to floating point textures. |

<a name="GLViewport+getGeomDataFbo"></a>

### getGeomDataFbo
The getGeomDataFbo method.


**Returns**: <code>[GLFbo](api/Renderer\GLFbo.md)</code> - - The return value.  
<a name="GLViewport+renderGeomDataFbo"></a>

### renderGeomDataFbo
Renders the scene geometry to the viewports geom data buffer
in preparation for mouse picking.


<a name="GLViewport+invalidateGeomDataBuffer"></a>

### invalidateGeomDataBuffer
The invalidateGeomDataBuffer method.


<a name="GLViewport+getGeomDataAtPos"></a>

### getGeomDataAtPos
The getGeomDataAtPos method.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| screenPos | <code>[Vec2](api/Math\Vec2.md)</code> | The screen position. |
| pointerRay | <code>[Ray](api/Math\Ray.md)</code> | The pointerRay value. |

<a name="GLViewport+getGeomItemsInRect"></a>

### getGeomItemsInRect
getGeomItemsInRect
Gathers all the geoms renders in a given rectangle of the viewport.


**Returns**: <code>Set</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| tl | <code>[Vec2](api/Math\Vec2.md)</code> | The top left value of the rectangle. |
| br | <code>[Vec2](api/Math\Vec2.md)</code> | The bottom right corner of the rectangle. |

<a name="GLViewport+getCapture"></a>

### getCapture
The getCapture method.


**Returns**: <code>[BaseItem](api/SceneTree\BaseItem.md)</code> - - The return value.  
<a name="GLViewport+releaseCapture"></a>

### releaseCapture
The releaseCapture method.


<a name="GLViewport+onPointerDown"></a>

### onPointerDown
Handler of the `pointerdown` event fired when the pointer device is initially pressed.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> \| <code>TouchEvent</code> | The DOM event produced by a pointer |

<a name="GLViewport+onPointerUp"></a>

### onPointerUp
Causes an event to occur when a user releases a mouse button over a element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> \| <code>TouchEvent</code> | The event that occurs. |

<a name="GLViewport+onPointerMove"></a>

### onPointerMove
Causes an event to occur when the pointer device is moving.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> \| <code>TouchEvent</code> | The event that occurs. |

<a name="GLViewport+onPointerEnter"></a>

### onPointerEnter
Causes an event to occur when the mouse pointer is moved into this viewport



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> \| <code>TouchEvent</code> | The event that occurs. |

<a name="GLViewport+onPointerLeave"></a>

### onPointerLeave
Causes an event to occur when the mouse pointer is moved out of this viewport



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> \| <code>TouchEvent</code> | The event that occurs. |

<a name="GLViewport+onKeyDown"></a>

### onKeyDown
Causes an event to occur when the user is pressing a key on the keyboard.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>KeyboardEvent</code> | The event that occurs. |

<a name="GLViewport+onKeyUp"></a>

### onKeyUp
Causes an event to occur  when the user releases a key on the keyboard.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>KeyboardEvent</code> | The event that occurs. |

<a name="GLViewport+onWheel"></a>

### onWheel
Causes an event to occur when the mouse wheel is rolled up or down over an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouoseWheelEvent</code> | The event that occurs. |

<a name="GLViewport+onTouchCancel"></a>

### onTouchCancel
Causes an event to occur when the touch event gets interrupted.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The event that occurs. |

<a name="GLViewport+draw"></a>

### draw
The draw method.


