<a name="Camera"></a>

### Camera 
Represents a view of the scene vertex coordinates. Since it is a `TreeItem`,
translation modifiers are supported, so you can move the camera around.

**Parameters**
* **isOrthographic([`BooleanParameter`](api/SceneTree/Parameters/BooleanParameter.md)):** Special type of view that represents 3D objects in two dimensions; `true` to enable.
* **fov([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **near([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **far([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **focalDistance([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_

**Events**
* **projectionParamChanged:** _todo_
* **movementFinished:** Triggered when framing all the objects.


**Extends**: <code>[TreeItem](api/SceneTree/TreeItem.md)</code>  

* [Camera ⇐ <code>TreeItem</code>](#Camera)
    * [new Camera(name)](#new-Camera)
    * [getNear() ⇒ <code>number</code>](#getNear)
    * [setNear(value)](#setNear)
    * [getFar() ⇒ <code>number</code>](#getFar)
    * [setFar(value)](#setFar)
    * [getFov() ⇒ <code>number</code>](#getFov)
    * [setFov(value)](#setFov)
    * [setLensFocalLength(value)](#setLensFocalLength)
    * [getFocalDistance() ⇒ <code>number</code>](#getFocalDistance)
    * [setFocalDistance(dist)](#setFocalDistance)
    * [getIsOrthographic() ⇒ <code>boolean</code>](#getIsOrthographic)
    * [setIsOrthographic(value)](#setIsOrthographic)
    * [setPositionAndTarget(position, target)](#setPositionAndTarget)
    * [getTargetPostion() ⇒ <code>Vec3</code>](#getTargetPostion)
    * [frameView(viewport, treeItems)](#frameView)
    * [updateProjectionMatrix(mat, aspect)](#updateProjectionMatrix)

<a name="new_Camera_new"></a>

### new Camera
Instantiates a camera object, setting default configuration like zoom, target and positioning.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the camera. |

<a name="Camera+getNear"></a>

### getNear
Returns `near` parameter value.


**Returns**: <code>number</code> - - Returns the near value.  
<a name="Camera+setNear"></a>

### setNear
Sets `near` parameter value



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The near value. |

<a name="Camera+getFar"></a>

### getFar
Returns `far` parameter value.


**Returns**: <code>number</code> - - Returns the far value.  
<a name="Camera+setFar"></a>

### setFar
Sets `far` parameter value



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The far value. |

<a name="Camera+getFov"></a>

### getFov
Getter for the camera field of view (FOV).
The FOV is how much of the scene the camera can see at once.


**Returns**: <code>number</code> - - Returns the FOV value.  
<a name="Camera+setFov"></a>

### setFov
Setter for the camera field of view (FOV).
The FOV is how much of the scene the camera can see at once.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The FOV value. |

<a name="Camera+setLensFocalLength"></a>

### setLensFocalLength
Setter for the camera lens focal length. Updates `fov` parameter value after a small math procedure.

**Focal Lenth accepted values:** 10mm, 11mm, 12mm, 14mm, 15mm, 17mm, 18mm,
19mm, 20mm, 24mm, 28mm, 30mm, 35mm, 45mm, 50mm, 55mm, 60mm, 70mm, 75mm, 80mm,
85mm, 90mm, 100mm, 105mm, 120mm, 125mm, 135mm, 150mm, 170mm, 180mm, 210mm, 300mm,
400mm, 500mm, 600mm, 800mm



| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The lens focal length value. |

<a name="Camera+getFocalDistance"></a>

### getFocalDistance
Returns `focalDistance` parameter value.


**Returns**: <code>number</code> - - Returns the lens focal length value..  
<a name="Camera+setFocalDistance"></a>

### setFocalDistance
Sets `focalDistance` parameter value.


**Errors**: on dist value lower or less than zero.  

| Param | Type | Description |
| --- | --- | --- |
| dist | <code>number</code> | The focal distance value. |

<a name="Camera+getIsOrthographic"></a>

### getIsOrthographic
Returns `isOrthographic` parameter value.


**Returns**: <code>boolean</code> - - The return value.  
<a name="Camera+setIsOrthographic"></a>

### setIsOrthographic
Sets `focalDistance` parameter value.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>boolean</code> | The value param. |

<a name="Camera+setPositionAndTarget"></a>

### setPositionAndTarget
Setter for the camera postion and target.
As described at the start of the class, this is a `TreeItem`,
which means we can move it around using translation modifiers.
You can do it this way or using the changing `TreeItem` parameters,
although we recommend this one because it also changes focal distance.



| Param | Type | Description |
| --- | --- | --- |
| position | <code>[Vec3](api/Math/Vec3.md)</code> | The position of the camera. |
| target | <code>[Vec3](api/Math/Vec3.md)</code> | The target of the camera. |

<a name="Camera+getTargetPostion"></a>

### getTargetPostion
Getter for the target position.


**Returns**: <code>[Vec3](api/Math/Vec3.md)</code> - - Returns the target position.  
<a name="Camera+frameView"></a>

### frameView
Calculates a new bounding box for all the items passed in `treeItems` array
and moves the camera to a point where we can see all of them, preserving parameters configurations.



| Param | Type | Description |
| --- | --- | --- |
| viewport | <code>[GLBaseViewport](api/Renderer/GLBaseViewport.md)</code> | The viewport value. |
| treeItems | <code>array</code> | The treeItems value. |

<a name="Camera+updateProjectionMatrix"></a>

### updateProjectionMatrix
Sets camera perspective from a Mat4 object.



| Param | Type | Description |
| --- | --- | --- |
| mat | <code>[Mat4](api/Math/Mat4.md)</code> | The mat value. |
| aspect | <code>number</code> | The aspect value. |

