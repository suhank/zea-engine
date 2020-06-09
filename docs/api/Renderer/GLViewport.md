<a name="GLViewport"></a>

## GLViewport ⇐ <code>GLBaseViewport</code>
Class representing a GL viewport.

**Kind**: global class  
**Extends**: <code>GLBaseViewport</code>  

* [GLViewport ⇐ <code>GLBaseViewport</code>](#GLViewport)
    * [new GLViewport(renderer, name, width, height)](#new-GLViewport)
    * [resize(width, height)](#resize)
    * [getCamera() ⇒ <code>any</code>](#getCamera)
    * [setCamera(camera)](#setCamera)
    * [getManipulator() ⇒ <code>any</code>](#getManipulator)
    * [setManipulator(manipulator)](#setManipulator)
    * [getProjectionMatrix() ⇒ <code>Mat4</code>](#getProjectionMatrix)
    * [getViewMatrix() ⇒ <code>Mat4</code>](#getViewMatrix)
    * [setActive(state)](#setActive)
    * [frameView(treeItems)](#frameView)
    * [calcRayFromScreenPos(screenPos) ⇒ <code>Ray</code>](#calcRayFromScreenPos)
    * [createGeomDataFbo(floatGeomBuffer)](#createGeomDataFbo)
    * [getGeomDataFbo() ⇒ <code>GLFbo</code>](#getGeomDataFbo)
    * [renderGeomDataFbo()](#renderGeomDataFbo)
    * [invalidateGeomDataBuffer()](#invalidateGeomDataBuffer)
    * [getGeomDataAtPos(screenPos, mouseRay) ⇒ <code>object</code>](#getGeomDataAtPos)
    * [getGeomItemsInRect(tl, br) ⇒ <code>Set</code>](#getGeomItemsInRect)
    * [getCapture() ⇒ <code>any</code>](#getCapture)
    * [releaseCapture()](#releaseCapture)
    * [onMouseDown(event) ⇒ <code>any</code>](#onMouseDown)
    * [onMouseMove(event)](#onMouseMove)
    * [onMouseUp(event)](#onMouseUp)
    * [onMouseLeave(event)](#onMouseLeave)
    * [onKeyPressed(key, event)](#onKeyPressed)
    * [onKeyDown(key, event)](#onKeyDown)
    * [onKeyUp(key, event)](#onKeyUp)
    * [onWheel(event)](#onWheel)
    * [onTouchStart(event)](#onTouchStart)
    * [onTouchMove(event)](#onTouchMove)
    * [onTouchEnd(event)](#onTouchEnd)
    * [onTouchCancel(event)](#onTouchCancel)
    * [draw()](#draw)

<a name="new_GLViewport_new"></a>

### new GLViewport
Create a GL viewport.


| Param | Type | Description |
| --- | --- | --- |
| renderer | <code>any</code> | The renderer value. |
| name | <code>string</code> | The name value. |
| width | <code>any</code> | The width of the viewport |
| height | <code>any</code> | The height of the viewport |

<a name="GLViewport+resize"></a>

### resize
The resize method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | The width value. |
| height | <code>number</code> | The height value. |

<a name="GLViewport+getCamera"></a>

### getCamera
The getCamera method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLViewport+setCamera"></a>

### setCamera
The setCamera method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| camera | <code>any</code> | The camera value. |

<a name="GLViewport+getManipulator"></a>

### getManipulator
The getManipulator method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLViewport+setManipulator"></a>

### setManipulator
The setManipulator method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| manipulator | <code>any</code> | The manipulator value. |

<a name="GLViewport+getProjectionMatrix"></a>

### getProjectionMatrix
The getProjectionMatrix method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>Mat4</code> - - The return projection matrix for the viewport.  
<a name="GLViewport+getViewMatrix"></a>

### getViewMatrix
The getProjectionMatrix method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>Mat4</code> - - The return projection matrix for the viewport.  
<a name="GLViewport+setActive"></a>

### setActive
The setActive method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>boolean</code> | The state value. |

<a name="GLViewport+frameView"></a>

### frameView
The frameView method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| treeItems | <code>array</code> | The treeItems value. |

<a name="GLViewport+calcRayFromScreenPos"></a>

### calcRayFromScreenPos
Compute a ray into the scene based on a mouse coordinate.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>Ray</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| screenPos | <code>Vec2</code> | The screen position. |

<a name="GLViewport+createGeomDataFbo"></a>

### createGeomDataFbo
The createGeomDataFbo method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| floatGeomBuffer | <code>boolean</code> | true if the GPU supports rendering to floating point textures. |

<a name="GLViewport+getGeomDataFbo"></a>

### getGeomDataFbo
The getGeomDataFbo method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>GLFbo</code> - - The return value.  
<a name="GLViewport+renderGeomDataFbo"></a>

### renderGeomDataFbo
Renders the scene geometry to the viewports geom data bufferin preparation for mouse picking.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
<a name="GLViewport+invalidateGeomDataBuffer"></a>

### invalidateGeomDataBuffer
The invalidateGeomDataBuffer method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
<a name="GLViewport+getGeomDataAtPos"></a>

### getGeomDataAtPos
The getGeomDataAtPos method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| screenPos | <code>Vec2</code> | The screen position. |
| mouseRay | <code>Ray</code> | The mouseRay value. |

<a name="GLViewport+getGeomItemsInRect"></a>

### getGeomItemsInRect
getGeomItemsInRectGathers all the geoms renders in a given rectangle of the viewport.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>Set</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| tl | <code>Vec2</code> | The top left value of the rectangle. |
| br | <code>Vec2</code> | The bottom right corner of the rectangle. |

<a name="GLViewport+getCapture"></a>

### getCapture
The getCapture method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLViewport+releaseCapture"></a>

### releaseCapture
The releaseCapture method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
<a name="GLViewport+onMouseDown"></a>

### onMouseDown
Causes an event to occur when a user presses a mouse button over an element.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event that occurs. |

<a name="GLViewport+onMouseMove"></a>

### onMouseMove
Causes an event to occur when the mouse pointer is moving while over an element.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event that occurs. |

<a name="GLViewport+onMouseUp"></a>

### onMouseUp
Causes an event to occur when a user releases a mouse button over a element.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event that occurs. |

<a name="GLViewport+onMouseLeave"></a>

### onMouseLeave
Causes an event to occur when the mouse pointer is moved out of an element.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event that occurs. |

<a name="GLViewport+onKeyPressed"></a>

### onKeyPressed
Causes an event to occurs when the user presses a key on the keyboard.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key the user presses. |
| event | <code>KeyboardEvent</code> | The event that occurs. |

<a name="GLViewport+onKeyDown"></a>

### onKeyDown
Causes an event to occur when the user is pressing a key on the keyboard.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key the user is pressing. |
| event | <code>KeyboardEvent</code> | The event that occurs. |

<a name="GLViewport+onKeyUp"></a>

### onKeyUp
Causes an event to occur  when the user releases a key on the keyboard.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key the user releases |
| event | <code>KeyboardEvent</code> | The event that occurs. |

<a name="GLViewport+onWheel"></a>

### onWheel
Causes an event to occur when the mouse wheel is rolled up or down over an element.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouoseWheelEvent</code> | The event that occurs. |

<a name="GLViewport+onTouchStart"></a>

### onTouchStart
Causes an event to occur when the user touches an element on a touch screen.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The event that occurs. |

<a name="GLViewport+onTouchMove"></a>

### onTouchMove
The event that occurs when the user moves his/her finger across a touch screen.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The event that occurs. |

<a name="GLViewport+onTouchEnd"></a>

### onTouchEnd
Causes an event to occur when the user removes his/her finger from an element.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The event that occurs. |

<a name="GLViewport+onTouchCancel"></a>

### onTouchCancel
Causes an event to occur when the touch event gets interrupted.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The event that occurs. |

<a name="GLViewport+draw"></a>

### draw
The draw method.

**Kind**: instance method of [<code>GLViewport</code>](#GLViewport)  
