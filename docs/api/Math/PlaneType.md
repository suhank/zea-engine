<a name="PlaneType"></a>

### PlaneType 
Class representing a plane.


**Extends**: <code>AttrValue</code>  

* [PlaneType ⇐ <code>AttrValue</code>](#PlaneType)
    * [new PlaneType(normal, w)](#new-PlaneType)
    * [set(x, y, z, w)](#set)
    * [divideScalar(value)](#divideScalar)
    * [distanceToPoint(point) ⇒ <code>number</code>](#distanceToPoint)
    * [normalizeInPlace()](#normalizeInPlace)
    * [clone() ⇒ <code>Plane</code>](#clone)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [toString() ⇒ <code>string</code>](#toString)

<a name="new_PlaneType_new"></a>

### new PlaneType
Create a plane.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| normal | <code>Vec3</code> |  | The normal of the plane. |
| w | <code>number</code> | <code>0</code> | The w value. |

<a name="PlaneType+set"></a>

### set
Setter from scalar components.



| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| z | <code>number</code> | The z value. |
| w | <code>number</code> | The w value. |

<a name="PlaneType+divideScalar"></a>

### divideScalar
Thet divideScalar method



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value value. |

<a name="PlaneType+distanceToPoint"></a>

### distanceToPoint
Calculates the distance from a point to this place.


**Returns**: <code>number</code> - - The rreturn value.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Vec3</code> | The point value. |

<a name="PlaneType+normalizeInPlace"></a>

### normalizeInPlace
Normalize this plane in place modifying its values.


<a name="PlaneType+clone"></a>

### clone
Clones this plane and returns a new plane.


**Returns**: <code>Plane</code> - - Returns a new plane.  
<a name="PlaneType+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - The json object.  
<a name="PlaneType+toString"></a>

### toString
Calls `toJSON` method and stringifies it.


**Returns**: <code>string</code> - - The return value.  
