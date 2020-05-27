<a name="Box3"></a>

## Box3
Class representing a box in 3D space.

**Kind**: global class  

* [Box3](#Box3)
    * [new Box3(p0, p1)](#new-Box3)
    * [min ⇒ <code>Vec3</code>](#min)
    * [max ⇒ <code>Vec3</code>](#max)
    * [set(p0, p1)](#set)
    * [reset()](#reset)
    * [isValid() ⇒ <code>any</code>](#isValid)
    * [addPoint(point)](#addPoint)
    * [addBox3(box3, xfo)](#addBox3)
    * [size()](#size)
    * [diagonal()](#diagonal)
    * [center() ⇒ <code>Vec3</code>](#center)
    * [toMat4() ⇒ <code>Mat4</code>](#toMat4)
    * [getBoundingSphere() ⇒ <code>any</code>](#getBoundingSphere)
    * [intersectsBox(box) ⇒ <code>boolean</code>](#intersectsBox)
    * [intersectsSphere(sphere) ⇒ <code>any</code>](#intersectsSphere)
    * [intersectsPlane(plane) ⇒ <code>any</code>](#intersectsPlane)
    * [clone()](#clone)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j)](#fromJSON)
    * [toString() ⇒ <code>any</code>](#toString)

<a name="new_Box3_new"></a>

### new Box3
Create a Box3


| Param | Type | Description |
| --- | --- | --- |
| p0 | <code>Vec3</code> | A point representing the corners of a 3D box. |
| p1 | <code>Vec3</code> | A point representing the corners of a 3D box. |

<a name="Box3+min"></a>

### min 
Getter for the lower (x, y, z) boundary of the box.

**Kind**: instance property of [<code>Box3</code>](#Box3)  
**Returns**: <code>Vec3</code> - - Returns the minumum Vec3.  
<a name="Box3+max"></a>

### max 
Getter for the upper (x, y, z) boundary of the box.

**Kind**: instance property of [<code>Box3</code>](#Box3)  
**Returns**: <code>Vec3</code> - - Returns the minumum Vec3.  
<a name="Box3+set"></a>

### set
The set method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  

| Param | Type | Description |
| --- | --- | --- |
| p0 | <code>Vec3</code> | A point representing the corners of a 3D box. |
| p1 | <code>Vec3</code> | A point representing the corners of a 3D box. |

<a name="Box3+reset"></a>

### reset
The reset method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
<a name="Box3+isValid"></a>

### isValid
The isValid method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  
<a name="Box3+addPoint"></a>

### addPoint
Expands the Box3 to contain the new point.

**Kind**: instance method of [<code>Box3</code>](#Box3)  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Vec3</code> | A point represents the corners of a 3D box. |

<a name="Box3+addBox3"></a>

### addBox3
The addBox3 method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  

| Param | Type | Description |
| --- | --- | --- |
| box3 | [<code>Box3</code>](#Box3) | A 3D box. |
| xfo | <code>Vec3</code> | A 3D transform. |

<a name="Box3+size"></a>

### size
Returns the size of a Box3.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Box3</code>](#Box3) - - Returns a Box3.  
<a name="Box3+diagonal"></a>

### diagonal
Returns the size of a Box3 - the same as size().

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Box3</code>](#Box3) - - Returns a Box3.  
<a name="Box3+center"></a>

### center
Returns the center point of a Box3.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>Vec3</code> - - Returns a Vec3.  
<a name="Box3+toMat4"></a>

### toMat4
Converts this Box3 to a Mat4 (a 4x4 matrix).

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>Mat4</code> - - Returns a new Mat4.  
<a name="Box3+getBoundingSphere"></a>

### getBoundingSphere
The getBoundingSphere method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  
<a name="Box3+intersectsBox"></a>

### intersectsBox
Determines if this Box3 intersects a plane.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| box | <code>any</code> | The box to check for intersection against. |

<a name="Box3+intersectsSphere"></a>

### intersectsSphere
Determines if this Box3 intersects a sphere.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| sphere | <code>Sphere</code> | The sphere to check for intersection against. |

<a name="Box3+intersectsPlane"></a>

### intersectsPlane
Determines if this Box3 intersects a plane.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| plane | <code>Plane</code> | The plane to check for intersection against. |

<a name="Box3+clone"></a>

### clone
Clones this Box3 and returns a new Box3.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Box3</code>](#Box3) - - Returns a new Box3.  
<a name="Box3+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>object</code> - - The json object.  
<a name="Box3+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Box3</code>](#Box3)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Box3+toString"></a>

### toString
The toString method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  
