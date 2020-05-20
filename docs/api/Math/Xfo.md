<a name="Xfo"></a>

## Xfo
Class representing an Xfo transform.

**Kind**: global class  

* [Xfo](#Xfo)
    * [new Xfo(tr, ori, sc)](#new-Xfo)
    * [set(tr, ori, sc)](#set)
    * [setFromOther(other)](#setFromOther)
    * [isIdentity() ⇒ <code>any</code>](#isIdentity)
    * [setLookAt(pos, target, up)](#setLookAt)
    * [multiply(xfo)](#multiply)
    * [inverse()](#inverse)
    * [transformVec3(vec3) ⇒ <code>any</code>](#transformVec3)
    * [toMat4() ⇒ <code>Mat4</code>](#toMat4)
    * [fromMat4(mat4)](#fromMat4)
    * [setFromFloat32Array(float32array)](#setFromFloat32Array)
    * [clone()](#clone)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j)](#fromJSON)
    * [toString() ⇒ <code>any</code>](#toString)

<a name="new_Xfo_new"></a>

### new Xfo
Create a Xfo.


| Param | Type | Description |
| --- | --- | --- |
| tr | <code>any</code> | The translation value. |
| ori | <code>any</code> | The orientation value. |
| sc | <code>any</code> | The scaling value. |

<a name="Xfo+set"></a>

### set
The set method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| tr | <code>any</code> | The translation value. |
| ori | <code>any</code> | The orientation value. |
| sc | <code>any</code> | The scaling value. |

<a name="Xfo+setFromOther"></a>

### setFromOther
Setter from another Xfo.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Xfo</code>](#Xfo) | The other Xfo to set from. |

<a name="Xfo+isIdentity"></a>

### isIdentity
The isIdentity method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: <code>any</code> - - The return value.  
<a name="Xfo+setLookAt"></a>

### setLookAt
The setLookAt method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| pos | <code>any</code> | The position value. |
| target | <code>any</code> | The target value. |
| up | <code>any</code> | The up value. |

<a name="Xfo+multiply"></a>

### multiply
Multiplies two Xfo transforms.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: [<code>Xfo</code>](#Xfo) - - Returns an Xfo.  

| Param | Type | Description |
| --- | --- | --- |
| xfo | [<code>Xfo</code>](#Xfo) | The xfo to multiply with. |

<a name="Xfo+inverse"></a>

### inverse
The inverse method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: [<code>Xfo</code>](#Xfo) - - Returns a new Xfo.  
<a name="Xfo+transformVec3"></a>

### transformVec3
The transformVec3 method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="Xfo+toMat4"></a>

### toMat4
Converts this Xfo to a Mat4 (a 4x4 matrix).

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: <code>Mat4</code> - - Returns a new Mat4.  
<a name="Xfo+fromMat4"></a>

### fromMat4
The fromMat4 method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | <code>Mat4</code> | The mat4 value. |

<a name="Xfo+setFromFloat32Array"></a>

### setFromFloat32Array
The setFromFloat32Array method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| float32array | <code>array</code> | The float32array value. |

<a name="Xfo+clone"></a>

### clone
Clones this Xfo and returns a new Xfo.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: [<code>Xfo</code>](#Xfo) - - Returns a new Xfo.  
<a name="Xfo+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: <code>object</code> - - The json object.  
<a name="Xfo+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Xfo+toString"></a>

### toString
The toString method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: <code>any</code> - - The return value.  
