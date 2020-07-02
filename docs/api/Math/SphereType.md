<a name="SphereType"></a>

### SphereType 
Class representing a sphere.


**Extends**: <code>AttrValue</code>  

* [SphereType ⇐ <code>AttrValue</code>](#SphereType)
    * [new SphereType(pos, radius)](#new-SphereType)
    * [clone() ⇒ <code>Sphere</code>](#clone)
    * [intersectsBox(box) ⇒ <code>boolean</code>](#intersectsBox)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [toString() ⇒ <code>string</code>](#toString)

<a name="new_SphereType_new"></a>

### new SphereType
Create a sphere.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pos | <code>Vec3</code> |  | The position of the sphere. |
| radius | <code>number</code> | <code>0</code> | The radius of the sphere. |

<a name="SphereType+clone"></a>

### clone
Clones this sphere and returns a new sphere.


**Returns**: <code>Sphere</code> - - Returns a new sphere.  
<a name="SphereType+intersectsBox"></a>

### intersectsBox
Checks if this sphere intersects a box.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| box | <code>Box3</code> | The box value. |

<a name="SphereType+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - The json object.  
<a name="SphereType+toString"></a>

### toString
Calls `toJSON` method and stringifies it.


**Returns**: <code>string</code> - - The return value.  
