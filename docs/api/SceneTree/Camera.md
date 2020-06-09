<a name="Camera"></a>

## Camera ⇐ <code>TreeItem</code>
Class representing a camera in the scene tree.

**Kind**: global class  
**Extends**: <code>TreeItem</code>  

* [Camera ⇐ <code>TreeItem</code>](#Camera)
    * [new Camera(name)](#new-Camera)
    * [getNear() ⇒ <code>number</code>](#getNear)
    * [setNear(value)](#setNear)
    * [getFar() ⇒ <code>number</code>](#getFar)
    * [setFar(value)](#setFar)
    * [getFov() ⇒ <code>number</code>](#getFov)
    * [setFov(value)](#setFov)
    * [setLensFocalLength(value, mode)](#setLensFocalLength)
    * [getFocalDistance() ⇒ <code>any</code>](#getFocalDistance)
    * [setFocalDistance(dist, mode)](#setFocalDistance)
    * [getIsOrthographic() ⇒ <code>any</code>](#getIsOrthographic)
    * [setIsOrthographic(value, mode)](#setIsOrthographic)
    * [setPositionAndTarget(position, target, mode)](#setPositionAndTarget)
    * [getTargetPostion() ⇒ <code>Vec3</code>](#getTargetPostion)
    * [frameView(viewport, treeItems, mode)](#frameView)
    * [updateProjectionMatrix(mat, aspect)](#updateProjectionMatrix)

<a name="new_Camera_new"></a>

### new Camera
Create a camera.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the camera. |

<a name="Camera+getNear"></a>

### getNear
The getNear method.

**Kind**: instance method of [<code>Camera</code>](#Camera)  
**Returns**: <code>number</code> - - Returns the near value.  
<a name="Camera+setNear"></a>

### setNear
The setNear method.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The near value. |

<a name="Camera+getFar"></a>

### getFar
The getFar method.

**Kind**: instance method of [<code>Camera</code>](#Camera)  
**Returns**: <code>number</code> - - Returns the far value.  
<a name="Camera+setFar"></a>

### setFar
The setFar method.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The far value. |

<a name="Camera+getFov"></a>

### getFov
Getter for the camera field of view (FOV).The FOV is how much of the scene the camera can see at once.

**Kind**: instance method of [<code>Camera</code>](#Camera)  
**Returns**: <code>number</code> - - Returns the FOV value.  
<a name="Camera+setFov"></a>

### setFov
Setter for the camera field of view (FOV).The FOV is how much of the scene the camera can see at once.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The FOV value. |

<a name="Camera+setLensFocalLength"></a>

### setLensFocalLength
Setter for the camera lens focal length.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The lens focal length value. |
| mode | <code>number</code> | The mode value. |

<a name="Camera+getFocalDistance"></a>

### getFocalDistance
Getter for the camera focal length.

**Kind**: instance method of [<code>Camera</code>](#Camera)  
**Returns**: <code>any</code> - - Returns the lens focal length value..  
<a name="Camera+setFocalDistance"></a>

### setFocalDistance
Setter for the camera focal length.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| dist | <code>number</code> | The focal distance value. |
| mode | <code>number</code> | The mode value. |

<a name="Camera+getIsOrthographic"></a>

### getIsOrthographic
The getIsOrthographic method.

**Kind**: instance method of [<code>Camera</code>](#Camera)  
**Returns**: <code>any</code> - - The return value.  
<a name="Camera+setIsOrthographic"></a>

### setIsOrthographic
The setIsOrthographic method.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |
| mode | <code>number</code> | The mode value. |

<a name="Camera+setPositionAndTarget"></a>

### setPositionAndTarget
Setter for the camera postion and target.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>Vec3</code> | The position of the camera. |
| target | <code>Vec3</code> | The target of the camera. |
| mode | <code>number</code> | The mode value. |

<a name="Camera+getTargetPostion"></a>

### getTargetPostion
Getter for the target position.

**Kind**: instance method of [<code>Camera</code>](#Camera)  
**Returns**: <code>Vec3</code> - - Returns the target position.  
<a name="Camera+frameView"></a>

### frameView
The frameView method.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| viewport | <code>any</code> | The viewport value. |
| treeItems | <code>any</code> | The treeItems value. |
| mode | <code>number</code> | The mode value. |

<a name="Camera+updateProjectionMatrix"></a>

### updateProjectionMatrix
The updateProjectionMatrix method.

**Kind**: instance method of [<code>Camera</code>](#Camera)  

| Param | Type | Description |
| --- | --- | --- |
| mat | <code>any</code> | The mat value. |
| aspect | <code>any</code> | The aspect value. |

