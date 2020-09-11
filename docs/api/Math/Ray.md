<a name="Ray"></a>

### Ray
Class representing a ray that emits from an origin in a specified direction.



* [Ray](#Ray)
    * [new Ray(start, dir)](#new-Ray)
    * [closestPoint(point)](#closestPoint)
    * [pointAtDist(dist)](#pointAtDist)
    * [intersectRayVector(ray)](#intersectRayVector)
    * [intersectRayPlane(plane) ⇒ <code>number</code>](#intersectRayPlane)
    * [clone()](#clone)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j)](#fromJSON)
    * [toString() ⇒ <code>string</code>](#toString)

<a name="new_Ray_new"></a>

### new Ray
Create a ray.


| Param | Type | Description |
| --- | --- | --- |
| start | <code>[Vec3](api/Math/Vec3.md)</code> | The origin of the ray. |
| dir | <code>[Vec3](api/Math/Vec3.md)</code> | The direction of the ray. |

<a name="Ray+closestPoint"></a>

### closestPoint
Get the closest point.


**Returns**: [<code>Ray</code>](#Ray) - - Returns a Ray.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>[Vec3](api/Math/Vec3.md)</code> | The point in 3D space. |

<a name="Ray+pointAtDist"></a>

### pointAtDist
Get the closest point at a distance.


**Returns**: [<code>Ray</code>](#Ray) - - Returns a Ray.  

| Param | Type | Description |
| --- | --- | --- |
| dist | <code>[Vec3](api/Math/Vec3.md)</code> | The distance value. |

<a name="Ray+intersectRayVector"></a>

### intersectRayVector
Returns the two ray params that represent the closest point between the two rays.


**Returns**: [<code>Ray</code>](#Ray) - - Returns a Ray.  

| Param | Type | Description |
| --- | --- | --- |
| ray | [<code>Ray</code>](#Ray) | The ray value. |

<a name="Ray+intersectRayPlane"></a>

### intersectRayPlane
Returns one ray param representing the intersection
of this ray against the plane defined by the given ray.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| plane | <code>[Vec3](api/Math/Vec3.md)</code> | The plane to intersect with. |

<a name="Ray+clone"></a>

### clone
Clones this Ray and returns a new Ray.


**Returns**: [<code>Ray</code>](#Ray) - - Returns a new Ray.  
<a name="Ray+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - The json object.  
<a name="Ray+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Ray+toString"></a>

### toString
Calls `toJSON` method and stringifies it.


**Returns**: <code>string</code> - - The return value.  


### [Class Tests](api/Math/Ray.test)