<a name="Ray"></a>

### Ray
Class representing a ray that starts from an origin in a specified direction.



* [Ray](#Ray)
    * [new Ray(start, dir)](#new-Ray)
    * [closestPoint(point)](#closestPoint)
    * [closestPointOnLineSegment(p0, p1) ⇒ <code>array</code>](#closestPointOnLineSegment)
    * [pointAtDist(dist)](#pointAtDist)
    * [intersectRayVector(ray) ⇒ <code>array</code>](#intersectRayVector)
    * [intersectRayPlane(plane) ⇒ <code>number</code>](#intersectRayPlane)
    * [intersectRayBox3(box3, tolerance) ⇒ <code>boolean</code>](#intersectRayBox3)
    * [clone()](#clone)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j)](#fromJSON)
    * [toString() ⇒ <code>string</code>](#toString)

<a name="new_Ray_new"></a>

### new Ray
Create a ray.


| Param | Type | Description |
| --- | --- | --- |
| start | <code>[Vec3](api/Math\Vec3.md)</code> | The origin of the ray. |
| dir | <code>[Vec3](api/Math\Vec3.md)</code> | The direction of the ray. |

<a name="Ray+closestPoint"></a>

### closestPoint
Get the closest point on the ray to the given point.


**Returns**: [<code>Ray</code>](#Ray) - - Returns the distance along the ray where the closest point occurs.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>[Vec3](api/Math\Vec3.md)</code> | The point in 3D space. |

<a name="Ray+closestPointOnLineSegment"></a>

### closestPointOnLineSegment
Get the closest point between the ray and the given line segment made of the 2 points.


**Returns**: <code>array</code> - - Returns an array containing 2 scalar values indicating 0: the fraction of the line segment, 1: distance along the Ray  

| Param | Type | Description |
| --- | --- | --- |
| p0 | <code>[Vec3](api/Math\Vec3.md)</code> | The point in 3D space. |
| p1 | <code>[Vec3](api/Math\Vec3.md)</code> | The point in 3D space. |

<a name="Ray+pointAtDist"></a>

### pointAtDist
Get the closest point at a distance.


**Returns**: [<code>Ray</code>](#Ray) - - Returns a Ray.  

| Param | Type | Description |
| --- | --- | --- |
| dist | <code>[Vec3](api/Math\Vec3.md)</code> | The distance value. |

<a name="Ray+intersectRayVector"></a>

### intersectRayVector
Returns the two ray params that represent the closest point between the two rays.


**Returns**: <code>array</code> - - Returns an array containing 2 scalar values indicating 0: the fraction of the line segment, 1: distance along the Ray  

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
| plane | <code>[Vec3](api/Math\Vec3.md)</code> | The plane to intersect with. |

<a name="Ray+intersectRayBox3"></a>

### intersectRayBox3
Determines if this Box3 intersects a ray.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| box3 | <code>[Box3](api/Math\Box3.md)</code> |  | The box to check for intersection against. |
| tolerance | <code>number</code> | <code>0</code> | The tolerance of the test. |

<a name="Ray+clone"></a>

### clone
Clones this Ray and returns a new Ray.


**Returns**: [<code>Ray</code>](#Ray) - - Returns a new Ray.  
<a name="Ray+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


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