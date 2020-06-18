<a name="CameraMouseAndKeyboard"></a>

### CameraMouseAndKeyboard 
Class representing a camera, mouse and keyboard.

**Kind**: global class  
**Extends**: <code>ParameterOwner</code>  

* [CameraMouseAndKeyboard ⇐ <code>ParameterOwner</code>](#CameraMouseAndKeyboard)
    * [new CameraMouseAndKeyboard(name)](#new-CameraMouseAndKeyboard)
    * [setDefaultManipulationMode(mode)](#setDefaultManipulationMode)
    * [look(event, dragVec)](#look)
    * [orbit(event, dragVec)](#orbit)
    * [pan(event, dragVec)](#pan)
    * [dolly(event, dragVec)](#dolly)
    * [panAndZoom(event, panDelta, dragDist)](#panAndZoom)
    * [initDrag(event)](#initDrag)
    * [endDrag(event)](#endDrag)
    * [aimFocus(event, pos)](#aimFocus)
    * [onMouseMove(event)](#onMouseMove)
    * [onDoubleClick(event)](#onDoubleClick)
    * [onMouseDown(event)](#onMouseDown)
    * [onMouseMove(event)](#onMouseMove)
    * [onMouseUp(event) ⇒ <code>boolean</code>](#onMouseUp)
    * [onWheel(event)](#onWheel)
    * [onKeyPressed(key, event) ⇒ <code>boolean</code>](#onKeyPressed)
    * [onKeyDown(key, event)](#onKeyDown)
    * [onKeyUp(key, event) ⇒ <code>boolean</code>](#onKeyUp)
    * [onTouchStart(event)](#onTouchStart)
    * [onTouchMove(event)](#onTouchMove)
    * [onTouchEnd(event)](#onTouchEnd)
    * [onTouchCancel(event)](#onTouchCancel)
    * [onDoubleTap(event)](#onDoubleTap)

<a name="new_CameraMouseAndKeyboard_new"></a>

### new CameraMouseAndKeyboard
Create a camera, mouse and keyboard


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="CameraMouseAndKeyboard+setDefaultManipulationMode"></a>

### setDefaultManipulationMode
Setter for the default manipulation mode.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>mode</code> | The mode value. |

<a name="CameraMouseAndKeyboard+look"></a>

### look
The look method.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event value. |
| dragVec | <code>any</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+orbit"></a>

### orbit
The orbit method.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event value. |
| dragVec | <code>any</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+pan"></a>

### pan
The pan method.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event value. |
| dragVec | <code>any</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+dolly"></a>

### dolly
The dolly method.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event value. |
| dragVec | <code>any</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+panAndZoom"></a>

### panAndZoom
The panAndZoom method.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event value. |
| panDelta | <code>any</code> | The pan delta value. |
| dragDist | <code>any</code> | The drag distance value. |

<a name="CameraMouseAndKeyboard+initDrag"></a>

### initDrag
The initDrag method.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event value. |

<a name="CameraMouseAndKeyboard+endDrag"></a>

### endDrag
The initDrag method.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event value. |

<a name="CameraMouseAndKeyboard+aimFocus"></a>

### aimFocus
The aimFocus method.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event value. |
| pos | <code>any</code> | The position value. |

<a name="CameraMouseAndKeyboard+onMouseMove"></a>

### onMouseMove
Causes an event to occur when the mouse pointer is moving while over an element.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onDoubleClick"></a>

### onDoubleClick
Causes an event to occur when a user double clicks a mouse button over an element.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onMouseDown"></a>

### onMouseDown
Causes an event to occur when the user starts to drag an element.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onMouseMove"></a>

### onMouseMove
Causes an event to occur when an element is being dragged.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onMouseUp"></a>

### onMouseUp
Causes an event to occur when the user has finished dragging an element.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onWheel"></a>

### onWheel
Causes an event to occur when the mouse wheel is rolled up or down over an element.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>WheelEvent</code> | The wheel event that occurs. |

<a name="CameraMouseAndKeyboard+onKeyPressed"></a>

### onKeyPressed
Causes an event to occurs when the user presses a key on the keyboard.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key the user presses. |
| event | <code>KeyboardEvent</code> | The keyboard event that occurs. |

<a name="CameraMouseAndKeyboard+onKeyDown"></a>

### onKeyDown
Causes an event to occur when the user is pressing a key on the keyboard.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key the user is pressing. |
| event | <code>KeyboardEvent</code> | The keyboard event that occurs. |

<a name="CameraMouseAndKeyboard+onKeyUp"></a>

### onKeyUp
Causes an event to occur when the user releases a key on the keyboard.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key the user releases. |
| event | <code>any</code> | The event that occurs. |

<a name="CameraMouseAndKeyboard+onTouchStart"></a>

### onTouchStart
Causes an event to occur when the user touches an element on a touch screen.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

<a name="CameraMouseAndKeyboard+onTouchMove"></a>

### onTouchMove
The event that occurs when the user moves his/her finger across a touch screen.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

<a name="CameraMouseAndKeyboard+onTouchEnd"></a>

### onTouchEnd
Causes an event to occur when the user removes his/her finger from an element.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

<a name="CameraMouseAndKeyboard+onTouchCancel"></a>

### onTouchCancel
Causes an event to occur when the touch event gets interrupted.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

<a name="CameraMouseAndKeyboard+onDoubleTap"></a>

### onDoubleTap
Causes an event to occur when the user double taps an element on a touch screen.

**Kind**: instance method of [<code>CameraMouseAndKeyboard</code>](#CameraMouseAndKeyboard)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

