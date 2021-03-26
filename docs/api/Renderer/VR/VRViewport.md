<a name="VRViewport"></a>

### VRViewport 
This Viewport class is used for rendering stereoscopic views to VR controllers using the WebXR api.
 When the GLRenderer class detects a valid WebXF capable device is plugged in, this class is automatically
 instantiated ready for XR sessions

**Events**
* **presentingChanged:** Emitted when presenting is started or stopped
* **controllerAdded:** Emitted when a new XR controller is detected.
* **viewChanged:** Emitted during presentation each time the frame is rendered.
* **pointerDoublePressed:** Emitted when the user double clicks with an XR pointer.
* **pointerDown:** Emitted when the user presses an XR pointer
* **pointerUp:** Emitted when the user releases an XR pointer


**Extends**: <code>[GLBaseViewport](api/Renderer\GLBaseViewport.md)</code>  

* [VRViewport ⇐ <code>GLBaseViewport</code>](#VRViewport)
    * [new VRViewport(renderer)](#new-VRViewport)
    * [getVRDisplay() ⇒ <code>any</code>](#getVRDisplay)
    * [getAsset() ⇒ <code>any</code>](#getAsset)
    * [getTreeItem() ⇒ <code>any</code>](#getTreeItem)
    * [getVRHead() ⇒ <code>any</code>](#getVRHead)
    * [getXfo() ⇒ <code>Xfo</code>](#getXfo)
    * [setXfo(xfo)](#setXfo)
    * [getControllers() ⇒ <code>any</code>](#getControllers)
    * [canPresent() ⇒ <code>any</code>](#canPresent)
    * [isPresenting() ⇒ <code>boolean</code>](#isPresenting)
    * [setSpectatorMode(state)](#setSpectatorMode)
    * [loadHMDResources() ⇒ <code>any</code>](#loadHMDResources)
    * [startPresenting()](#startPresenting)
    * [stopPresenting()](#stopPresenting)
    * [togglePresenting()](#togglePresenting)
    * [getHMDCanvasSize() ⇒ <code>any</code>](#getHMDCanvasSize)
    * [updateControllers(xrFrame)](#updateControllers)
    * [draw(xrFrame)](#draw)
    * [onPointerDown(event)](#onPointerDown)
    * [onPointerUp(event)](#onPointerUp)

<a name="new_VRViewport_new"></a>

### new VRViewport
Create a VR viewport.


| Param | Type | Description |
| --- | --- | --- |
| renderer | <code>[GLBaseRenderer](api/Renderer\GLBaseRenderer.md)</code> | The renderer value. |

<a name="VRViewport+getVRDisplay"></a>

### getVRDisplay
The getVRDisplay method.


**Returns**: <code>any</code> - - The return value.  
<a name="VRViewport+getAsset"></a>

### getAsset
The getAsset method.


**Returns**: <code>any</code> - - The return value.  
<a name="VRViewport+getTreeItem"></a>

### getTreeItem
The getTreeItem method.


**Returns**: <code>any</code> - - The return value.  
<a name="VRViewport+getVRHead"></a>

### getVRHead
The getVRHead method.


**Returns**: <code>any</code> - - The return value.  
<a name="VRViewport+getXfo"></a>

### getXfo
The getXfo method.


**Returns**: <code>[Xfo](api/Math\Xfo.md)</code> - - The return value.  
<a name="VRViewport+setXfo"></a>

### setXfo
The setXfo method.



| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>[Xfo](api/Math\Xfo.md)</code> | The xfo value. |

<a name="VRViewport+getControllers"></a>

### getControllers
The getControllers method.


**Returns**: <code>any</code> - - The return value.  
<a name="VRViewport+canPresent"></a>

### canPresent
The canPresent method.


**Returns**: <code>any</code> - - The return value.  
<a name="VRViewport+isPresenting"></a>

### isPresenting
The isPresenting method.


**Returns**: <code>boolean</code> - - The return value.  
<a name="VRViewport+setSpectatorMode"></a>

### setSpectatorMode
Turns on and off the spectator mode.
Note: specator mode renders the scene an extra time to our regular viewport.



| Param | Type | Description |
| --- | --- | --- |
| state | <code>boolean</code> | true for enabling spectator mode, else false |

<a name="VRViewport+loadHMDResources"></a>

### loadHMDResources
The loadHMDResources method.


**Returns**: <code>any</code> - - The return value.  
<a name="VRViewport+startPresenting"></a>

### startPresenting
The startPresenting method.


<a name="VRViewport+stopPresenting"></a>

### stopPresenting
The stopPresenting method.


<a name="VRViewport+togglePresenting"></a>

### togglePresenting
The togglePresenting method.


<a name="VRViewport+getHMDCanvasSize"></a>

### getHMDCanvasSize
The getHMDCanvasSize method.


**Returns**: <code>any</code> - - The return value.  
<a name="VRViewport+updateControllers"></a>

### updateControllers
The updateControllers method.



| Param | Type | Description |
| --- | --- | --- |
| xrFrame | <code>any</code> | The xrFrame value. |

<a name="VRViewport+draw"></a>

### draw
The draw method.



| Param | Type | Description |
| --- | --- | --- |
| xrFrame | <code>any</code> | The xrFrame value. |

<a name="VRViewport+onPointerDown"></a>

### onPointerDown
Handler of the `pointerdown` event fired when the pointer device is initially pressed.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> \| <code>TouchEvent</code> | The DOM event produced by a pointer |

<a name="VRViewport+onPointerUp"></a>

### onPointerUp
Causes an event to occur when a user releases a mouse button over a element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> \| <code>TouchEvent</code> | The event that occurs. |

