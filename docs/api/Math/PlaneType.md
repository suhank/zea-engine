<a name="PlaneType"></a>

## PlaneType ⇐ <code>AttrValue</code>
Class representing a plane.

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

* [PlaneType ⇐ <code>AttrValue</code>](#PlaneType)
    * [new PlaneType(normal, w)](#new-PlaneType)
    * [set(x, y, z, w)](#set)
    * [divideScalar(value)](#divideScalar)
    * [distanceToPoint(point) ⇒ <code>any</code>](#distanceToPoint)
    * [normalizeInPlace()](#normalizeInPlace)
    * [clone() ⇒ <code>Plane</code>](#clone)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [toString() ⇒ <code>any</code>](#toString)

<a name="new_PlaneType_new"></a>

### new PlaneType
Create a plane.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| normal | <code>Vec3</code> |  | The normal of the plane. |
| w | <code>number</code> | <code>0</code> | The w value. |

<a name="PlaneType+set"></a>

### set
Thet set method

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| z | <code>number</code> | The z value. |
| w | <code>number</code> | The w value. |

<a name="PlaneType+divideScalar"></a>

### divideScalar
Thet divideScalar method

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value value. |

<a name="PlaneType+distanceToPoint"></a>

### distanceToPoint
Thet distanceToPoint method

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
**Returns**: <code>any</code> - - The rreturn value.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>any</code> | The point value. |

<a name="PlaneType+normalizeInPlace"></a>

### normalizeInPlace
Normalize this plane in place modifying its values.

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
<a name="PlaneType+clone"></a>

### clone
Clones this plane and returns a new plane.

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
**Returns**: <code>Plane</code> - - Returns a new plane.  
<a name="PlaneType+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
**Returns**: <code>object</code> - - The json object.  
<a name="PlaneType+toString"></a>

### toString
The toString method.

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
**Returns**: <code>any</code> - - The return value.  
