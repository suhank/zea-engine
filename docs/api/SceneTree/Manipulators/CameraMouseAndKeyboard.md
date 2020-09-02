<a name="CameraMouseAndKeyboard"></a>

### CameraMouseAndKeyboard 
Class representing the viewport manipulator with camera, mouse and keyboard events.

```
const manipulator = new CameraMouseAndKeyboard()
```

**Parameters**
* **orbitRate([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **dollySpeed([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **mouseWheelDollySpeed([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_

**Events**
* **movementFinished:** Triggered when the camera moves


**Extends**: <code>[ParameterOwner](api/SceneTree/ParameterOwner.md)</code>  

* [CameraMouseAndKeyboard ⇐ <code>ParameterOwner</code>](#CameraMouseAndKeyboard)
    * [new CameraMouseAndKeyboard(name)](#new-CameraMouseAndKeyboard)
    * _instance_
        * [setDefaultManipulationMode(manipulationMode)](#setDefaultManipulationMode)
        * [look(event, dragVec)](#look)
        * [turntable(event, dragVec)](#turntable)
        * [tumble(event, dragVec)](#tumble)
        * [trackball(event, dragVec)](#trackball)
        * [pan(event, dragVec)](#pan)
        * [dolly(event, dragVec)](#dolly)
        * [panAndZoom(event, panDelta, dragDist)](#panAndZoom)
        * [onMouseMove(event)](#onMouseMove)
        * [onDoubleClick(event)](#onDoubleClick)
        * [onMouseDown(event)](#onMouseDown)
        * [onMouseMove(event)](#onMouseMove)
        * [onMouseUp(event)](#onMouseUp)
        * [onWheel(event)](#onWheel)
        * [onTouchStart(event)](#onTouchStart)
        * [onTouchMove(event)](#onTouchMove)
        * [onTouchEnd(event)](#onTouchEnd)
        * [onTouchCancel(event)](#onTouchCancel)
        * [onDoubleTap(event)](#onDoubleTap)
    * _static_
        * [MANIPULATION_MODES](#MANIPULATION_MODES)

<a name="new_CameraMouseAndKeyboard_new"></a>

### new CameraMouseAndKeyboard
Create a camera, mouse and keyboard


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="CameraMouseAndKeyboard+setDefaultManipulationMode"></a>

### setDefaultManipulationMode
Sets default manipulation mode.
The value can be on of the keys in #CameraMouseAndKeyboard.MANIPULATION_MODES



| Param | Type | Description |
| --- | --- | --- |
| manipulationMode | <code>string</code> | The manipulation mode value. |

<a name="CameraMouseAndKeyboard+look"></a>

### look
The look method.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event value. |
| dragVec | <code>[Vec2](api/Math/Vec2.md)</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+turntable"></a>

### turntable
Rotates viewport camera about the target.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event value. |
| dragVec | <code>[Vec2](api/Math/Vec2.md)</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+tumble"></a>

### tumble
Rotates viewport camera about the target.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event value. |
| dragVec | <code>[Vec2](api/Math/Vec2.md)</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+trackball"></a>

### trackball
Rotates viewport camera about the target.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event value. |
| dragVec | <code>[Vec2](api/Math/Vec2.md)</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+pan"></a>

### pan
Rotates the camera around its own `X`,`Y` axes.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event value. |
| dragVec | <code>[Vec2](api/Math/Vec2.md)</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+dolly"></a>

### dolly
The dolly method.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event value. |
| dragVec | <code>[Vec2](api/Math/Vec2.md)</code> | The drag vector value. |

<a name="CameraMouseAndKeyboard+panAndZoom"></a>

### panAndZoom
Rotates the camera around its own `X`,`Y` axes and applies a zoom.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The event value. |
| panDelta | <code>[Vec2](api/Math/Vec2.md)</code> | The pan delta value. |
| dragDist | <code>number</code> | The drag distance value. |

<a name="CameraMouseAndKeyboard+onMouseMove"></a>

### onMouseMove
Causes an event to occur when the mouse pointer is moving while over an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onDoubleClick"></a>

### onDoubleClick
Causes an event to occur when a user double clicks a mouse button over an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onMouseDown"></a>

### onMouseDown
Causes an event to occur when the user starts to drag an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onMouseMove"></a>

### onMouseMove
Causes an event to occur when an element is being dragged.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onMouseUp"></a>

### onMouseUp
Causes an event to occur when the user has finished dragging an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The mouse event that occurs. |

<a name="CameraMouseAndKeyboard+onWheel"></a>

### onWheel
Causes an event to occur when the mouse wheel is rolled up or down over an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>WheelEvent</code> | The wheel event that occurs. |

<a name="CameraMouseAndKeyboard+onTouchStart"></a>

### onTouchStart
Causes an event to occur when the user touches an element on a touch screen.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

<a name="CameraMouseAndKeyboard+onTouchMove"></a>

### onTouchMove
The event that occurs when the user moves his/her finger across a touch screen.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

<a name="CameraMouseAndKeyboard+onTouchEnd"></a>

### onTouchEnd
Causes an event to occur when the user removes his/her finger from an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

<a name="CameraMouseAndKeyboard+onTouchCancel"></a>

### onTouchCancel
Causes an event to occur when the touch event gets interrupted.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

<a name="CameraMouseAndKeyboard+onDoubleTap"></a>

### onDoubleTap
Causes an event to occur when the user double taps an element on a touch screen.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

<a name="CameraMouseAndKeyboard.MANIPULATION_MODES"></a>

### MANIPULATION
Returns a dictionary of support manipulation modes.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>TouchEvent</code> | The touch event that occurs. |

