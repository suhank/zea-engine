## Classes

<dl>
<dt><a href="#Box2">Box2</a></dt>
<dd></dd>
<dt><a href="#Box3">Box3</a></dt>
<dd></dd>
<dt><a href="#Color">Color</a></dt>
<dd></dd>
<dt><a href="#EulerAngles">EulerAngles</a></dt>
<dd></dd>
<dt><a href="#Frustum">Frustum</a></dt>
<dd></dd>
<dt><a href="#Mat3">Mat3</a></dt>
<dd></dd>
<dt><a href="#Mat4">Mat4</a></dt>
<dd></dd>
<dt><a href="#PlaneType">PlaneType</a></dt>
<dd></dd>
<dt><a href="#Quat">Quat</a></dt>
<dd></dd>
<dt><a href="#Ray">Ray</a></dt>
<dd></dd>
<dt><a href="#RGBA">RGBA</a></dt>
<dd></dd>
<dt><a href="#SphereType">SphereType</a></dt>
<dd></dd>
<dt><a href="#TypeRegistry">TypeRegistry</a></dt>
<dd></dd>
<dt><a href="#Vec2">Vec2</a></dt>
<dd></dd>
<dt><a href="#Vec3">Vec3</a></dt>
<dd></dd>
<dt><a href="#Vec4">Vec4</a></dt>
<dd></dd>
<dt><a href="#Xfo">Xfo</a></dt>
<dd><p>Class representing an Xfo transform.</p>
</dd>
</dl>

<a name="Box2"></a>

## Box2
**Kind**: global class  

* [Box2](#Box2)
    * [new Box2(p0, p1)](#new_Box2_new)
    * [.set(p0, p1)](#Box2+set)
    * [.reset()](#Box2+reset)
    * [.isValid()](#Box2+isValid) ⇒ <code>any</code>
    * [.addPoint(point)](#Box2+addPoint)
    * [.size()](#Box2+size) ⇒ [<code>Box2</code>](#Box2)
    * [.diagonal()](#Box2+diagonal) ⇒ [<code>Box2</code>](#Box2)
    * [.center()](#Box2+center) ⇒ [<code>Vec2</code>](#Vec2)
    * [.toJSON()](#Box2+toJSON) ⇒ <code>object</code>
    * [.toString()](#Box2+toString) ⇒ <code>any</code>

<a name="new_Box2_new"></a>

### new Box2(p0, p1)
Create a Box2


| Param | Type | Description |
| --- | --- | --- |
| p0 | [<code>Vec2</code>](#Vec2) | A point representing the corners of a 2D box. |
| p1 | [<code>Vec2</code>](#Vec2) | A point representing the corners of a 2D box. |

<a name="Box2+set"></a>

### box2.set(p0, p1)
The set method.

**Kind**: instance method of [<code>Box2</code>](#Box2)  

| Param | Type | Description |
| --- | --- | --- |
| p0 | [<code>Vec2</code>](#Vec2) | A point representing the corners of a 2D box. |
| p1 | [<code>Vec2</code>](#Vec2) | A point representing the corners of a 2D box. |

<a name="Box2+reset"></a>

### box2.reset()
Resets the box2 back to an uninitialized state.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
<a name="Box2+isValid"></a>

### box2.isValid() ⇒ <code>any</code>
Returns true if the box has been expanded to contain a point.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>any</code> - - The return value.  
<a name="Box2+addPoint"></a>

### box2.addPoint(point)
Expands the Box2 to contain the new point.

**Kind**: instance method of [<code>Box2</code>](#Box2)  

| Param | Type | Description |
| --- | --- | --- |
| point | [<code>Vec2</code>](#Vec2) | A point represents the corners of a 2D box. |

<a name="Box2+size"></a>

### box2.size() ⇒ [<code>Box2</code>](#Box2)
Returns the size of a Box2.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: [<code>Box2</code>](#Box2) - - Returns a Box2.  
<a name="Box2+diagonal"></a>

### box2.diagonal() ⇒ [<code>Box2</code>](#Box2)
Returns the size of a Box2 - the same as size().

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: [<code>Box2</code>](#Box2) - - Returns a Box2.  
<a name="Box2+center"></a>

### box2.center() ⇒ [<code>Vec2</code>](#Vec2)
Returns the center point of a Box2.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a Vec2.  
<a name="Box2+toJSON"></a>

### box2.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>object</code> - - The json object.  
<a name="Box2+toString"></a>

### box2.toString() ⇒ <code>any</code>
The toString method.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>any</code> - - The return value.  
<a name="Box3"></a>

## Box3
**Kind**: global class  

* [Box3](#Box3)
    * [new Box3(p0, p1)](#new_Box3_new)
    * [.min](#Box3+min) ⇒ [<code>Vec3</code>](#Vec3)
    * [.max](#Box3+max) ⇒ [<code>Vec3</code>](#Vec3)
    * [.set(p0, p1)](#Box3+set)
    * [.reset()](#Box3+reset)
    * [.isValid()](#Box3+isValid) ⇒ <code>any</code>
    * [.addPoint(point)](#Box3+addPoint)
    * [.addBox3(box3, xfo)](#Box3+addBox3)
    * [.size()](#Box3+size) ⇒ [<code>Box3</code>](#Box3)
    * [.diagonal()](#Box3+diagonal) ⇒ [<code>Box3</code>](#Box3)
    * [.center()](#Box3+center) ⇒ [<code>Vec3</code>](#Vec3)
    * [.toMat4()](#Box3+toMat4) ⇒ [<code>Mat4</code>](#Mat4)
    * [.getBoundingSphere()](#Box3+getBoundingSphere) ⇒ <code>any</code>
    * [.intersectsBox(box)](#Box3+intersectsBox) ⇒ <code>boolean</code>
    * [.intersectsSphere(sphere)](#Box3+intersectsSphere) ⇒ <code>any</code>
    * [.intersectsPlane(plane)](#Box3+intersectsPlane) ⇒ <code>any</code>
    * [.clone()](#Box3+clone) ⇒ [<code>Box3</code>](#Box3)
    * [.toJSON()](#Box3+toJSON) ⇒ <code>object</code>
    * [.fromJSON(j)](#Box3+fromJSON)
    * [.toString()](#Box3+toString) ⇒ <code>any</code>

<a name="new_Box3_new"></a>

### new Box3(p0, p1)
Create a Box3


| Param | Type | Description |
| --- | --- | --- |
| p0 | [<code>Vec3</code>](#Vec3) | A point representing the corners of a 3D box. |
| p1 | [<code>Vec3</code>](#Vec3) | A point representing the corners of a 3D box. |

<a name="Box3+min"></a>

### box3.min ⇒ [<code>Vec3</code>](#Vec3)
Getter for the lower (x, y, z) boundary of the box.

**Kind**: instance property of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the minumum Vec3.  
<a name="Box3+max"></a>

### box3.max ⇒ [<code>Vec3</code>](#Vec3)
Getter for the upper (x, y, z) boundary of the box.

**Kind**: instance property of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the minumum Vec3.  
<a name="Box3+set"></a>

### box3.set(p0, p1)
The set method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  

| Param | Type | Description |
| --- | --- | --- |
| p0 | [<code>Vec3</code>](#Vec3) | A point representing the corners of a 3D box. |
| p1 | [<code>Vec3</code>](#Vec3) | A point representing the corners of a 3D box. |

<a name="Box3+reset"></a>

### box3.reset()
The reset method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
<a name="Box3+isValid"></a>

### box3.isValid() ⇒ <code>any</code>
The isValid method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  
<a name="Box3+addPoint"></a>

### box3.addPoint(point)
Expands the Box3 to contain the new point.

**Kind**: instance method of [<code>Box3</code>](#Box3)  

| Param | Type | Description |
| --- | --- | --- |
| point | [<code>Vec3</code>](#Vec3) | A point represents the corners of a 3D box. |

<a name="Box3+addBox3"></a>

### box3.addBox3(box3, xfo)
The addBox3 method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  

| Param | Type | Description |
| --- | --- | --- |
| box3 | [<code>Box3</code>](#Box3) | A 3D box. |
| xfo | [<code>Vec3</code>](#Vec3) | A 3D transform. |

<a name="Box3+size"></a>

### box3.size() ⇒ [<code>Box3</code>](#Box3)
Returns the size of a Box3.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Box3</code>](#Box3) - - Returns a Box3.  
<a name="Box3+diagonal"></a>

### box3.diagonal() ⇒ [<code>Box3</code>](#Box3)
Returns the size of a Box3 - the same as size().

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Box3</code>](#Box3) - - Returns a Box3.  
<a name="Box3+center"></a>

### box3.center() ⇒ [<code>Vec3</code>](#Vec3)
Returns the center point of a Box3.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a Vec3.  
<a name="Box3+toMat4"></a>

### box3.toMat4() ⇒ [<code>Mat4</code>](#Mat4)
Converts this Box3 to a Mat4 (a 4x4 matrix).

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  
<a name="Box3+getBoundingSphere"></a>

### box3.getBoundingSphere() ⇒ <code>any</code>
The getBoundingSphere method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  
<a name="Box3+intersectsBox"></a>

### box3.intersectsBox(box) ⇒ <code>boolean</code>
Determines if this Box3 intersects a plane.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| box | <code>any</code> | The box to check for intersection against. |

<a name="Box3+intersectsSphere"></a>

### box3.intersectsSphere(sphere) ⇒ <code>any</code>
Determines if this Box3 intersects a sphere.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| sphere | <code>Sphere</code> | The sphere to check for intersection against. |

<a name="Box3+intersectsPlane"></a>

### box3.intersectsPlane(plane) ⇒ <code>any</code>
Determines if this Box3 intersects a plane.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| plane | <code>Plane</code> | The plane to check for intersection against. |

<a name="Box3+clone"></a>

### box3.clone() ⇒ [<code>Box3</code>](#Box3)
Clones this Box3 and returns a new Box3.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: [<code>Box3</code>](#Box3) - - Returns a new Box3.  
<a name="Box3+toJSON"></a>

### box3.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>object</code> - - The json object.  
<a name="Box3+fromJSON"></a>

### box3.fromJSON(j)
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Box3</code>](#Box3)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Box3+toString"></a>

### box3.toString() ⇒ <code>any</code>
The toString method.

**Kind**: instance method of [<code>Box3</code>](#Box3)  
**Returns**: <code>any</code> - - The return value.  
<a name="Color"></a>

## Color
**Kind**: global class  

* [Color](#Color)
    * [new Color(r, g, b, a)](#new_Color_new)
    * _instance_
        * [.r](#Color+r) ⇒ [<code>Color</code>](#Color)
        * [.r](#Color+r)
        * [.g](#Color+g) ⇒ [<code>Color</code>](#Color)
        * [.g](#Color+g)
        * [.b](#Color+b) ⇒ [<code>Color</code>](#Color)
        * [.b](#Color+b)
        * [.a](#Color+a) ⇒ [<code>Color</code>](#Color)
        * [.a](#Color+a)
        * [.set(r, g, b, a)](#Color+set)
        * [.setFromOther(other)](#Color+setFromOther)
        * [.setFromScalarArray(vals)](#Color+setFromScalarArray)
        * [.getAsRGBArray()](#Color+getAsRGBArray) ⇒ [<code>Color</code>](#Color)
        * [.getAsRGBDict()](#Color+getAsRGBDict) ⇒ [<code>Color</code>](#Color)
        * [.setFromRGB(r, g, b, a)](#Color+setFromRGB)
        * [.setFromRGBArray(vals)](#Color+setFromRGBArray)
        * [.setFromRGBDict(vals)](#Color+setFromRGBDict)
        * [.setFromHex(hex)](#Color+setFromHex)
        * [.setFromCSSColorName(name)](#Color+setFromCSSColorName)
        * [.toHex()](#Color+toHex) ⇒ <code>number</code>
        * [.equal(other)](#Color+equal) ⇒ <code>boolean</code>
        * [.notequals(other)](#Color+notequals) ⇒ <code>boolean</code>
        * [.approxEqual(other, precision)](#Color+approxEqual) ⇒ <code>boolean</code>
        * [.add(other)](#Color+add) ⇒ [<code>Color</code>](#Color)
        * [.subtract(other)](#Color+subtract) ⇒ [<code>Color</code>](#Color)
        * [.scale(scalar)](#Color+scale) ⇒ [<code>Color</code>](#Color)
        * [.scaleInPlace(scalar)](#Color+scaleInPlace)
        * [.applyGamma(gamma)](#Color+applyGamma)
        * [.toLinear(gamma)](#Color+toLinear) ⇒ [<code>Color</code>](#Color)
        * [.toGamma(gamma)](#Color+toGamma) ⇒ [<code>Color</code>](#Color)
        * [.luminance()](#Color+luminance) ⇒ <code>number</code>
        * [.lerp(other, t)](#Color+lerp) ⇒ [<code>Color</code>](#Color)
        * [.clone()](#Color+clone) ⇒ [<code>Color</code>](#Color)
        * [.asArray()](#Color+asArray) ⇒ <code>array</code>
        * [.toJSON()](#Color+toJSON) ⇒ <code>object</code>
        * [.fromJSON(j)](#Color+fromJSON)
        * [.toCSSString()](#Color+toCSSString) ⇒ <code>any</code>
    * _static_
        * [.random(gammaOffset, randomAlpha)](#Color.random) ⇒ [<code>Color</code>](#Color)

<a name="new_Color_new"></a>

### new Color(r, g, b, a)
Create a color.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> | <code>0</code> | The red channel of a color. |
| g | <code>number</code> | <code>0</code> | The green channel of a color. |
| b | <code>number</code> | <code>0</code> | The blue channel of a color. |
| a | <code>number</code> | <code>1</code> | The alpha (transparency) channel of a color. |

<a name="Color+r"></a>

### color.r ⇒ [<code>Color</code>](#Color)
Getter for red channel.

**Kind**: instance property of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns the red channel.  
<a name="Color+r"></a>

### color.r
Setter for red channel.

**Kind**: instance property of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Color+g"></a>

### color.g ⇒ [<code>Color</code>](#Color)
Getter for green channel.

**Kind**: instance property of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns the green channel.  
<a name="Color+g"></a>

### color.g
Setter for green channel.

**Kind**: instance property of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Color+b"></a>

### color.b ⇒ [<code>Color</code>](#Color)
Getter for blue channel.

**Kind**: instance property of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns the blue channel.  
<a name="Color+b"></a>

### color.b
Setter for blue channel.

**Kind**: instance property of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Color+a"></a>

### color.a ⇒ [<code>Color</code>](#Color)
Getter for alpha channel.

**Kind**: instance property of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns the alpha channel.  
<a name="Color+a"></a>

### color.a
Setter for alpha value.

**Kind**: instance property of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Color+set"></a>

### color.set(r, g, b, a)
Setter from scalar components.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> |  | The red channel. |
| g | <code>number</code> |  | The green channel. |
| b | <code>number</code> |  | The blue channel. |
| a | <code>number</code> | <code>1</code> | The alpha channel. |

<a name="Color+setFromOther"></a>

### color.setFromOther(other)
Setter from another color.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to set from. |

<a name="Color+setFromScalarArray"></a>

### color.setFromScalarArray(vals)
Setter from a scalar array.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| vals | <code>any</code> | The vals param. |

<a name="Color+getAsRGBArray"></a>

### color.getAsRGBArray() ⇒ [<code>Color</code>](#Color)
Getter from an RGB array.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - The return value.  
<a name="Color+getAsRGBDict"></a>

### color.getAsRGBDict() ⇒ [<code>Color</code>](#Color)
Getter from an RGB dict.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - The return value.  
<a name="Color+setFromRGB"></a>

### color.setFromRGB(r, g, b, a)
Setter from a RGB value.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>number</code> | The red channel. |
| g | <code>number</code> | The green channel. |
| b | <code>number</code> | The blue channel. |
| a | <code>number</code> | The alpha channel. |

<a name="Color+setFromRGBArray"></a>

### color.setFromRGBArray(vals)
Setter from an RGB array.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| vals | <code>any</code> | The vals param. |

<a name="Color+setFromRGBDict"></a>

### color.setFromRGBDict(vals)
Setter from an RGB dict.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| vals | <code>any</code> | The vals param. |

<a name="Color+setFromHex"></a>

### color.setFromHex(hex)
Setter from a hexadecimal value.E.g. #ff0000

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>number</code> | The hex value. |

<a name="Color+setFromCSSColorName"></a>

### color.setFromCSSColorName(name)
Setter from a CSS color name.E.g. "red"

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The CSS color name. |

<a name="Color+toHex"></a>

### color.toHex() ⇒ <code>number</code>
Returns the hexadecimal value of this color.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>number</code> - - Returns the hex value.  
<a name="Color+equal"></a>

### color.equal(other) ⇒ <code>boolean</code>
Returns true if this color is exactly the same as other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to compare with. |

<a name="Color+notequals"></a>

### color.notequals(other) ⇒ <code>boolean</code>
Returns true if this color is NOT exactly the same as other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to compare with. |

<a name="Color+approxEqual"></a>

### color.approxEqual(other, precision) ⇒ <code>boolean</code>
Returns true if this color is approximately the same as other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Color+add"></a>

### color.add(other) ⇒ [<code>Color</code>](#Color)
Returns a new color which is this color added to other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to add. |

<a name="Color+subtract"></a>

### color.subtract(other) ⇒ [<code>Color</code>](#Color)
Returns a new color which is this color subtracted from other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to subtract. |

<a name="Color+scale"></a>

### color.scale(scalar) ⇒ [<code>Color</code>](#Color)
Scales this color by scalar and return the result as a new Vec4.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Color+scaleInPlace"></a>

### color.scaleInPlace(scalar)
Scales this color by scalar.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Color+applyGamma"></a>

### color.applyGamma(gamma)
Apply gamma correction to this color.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| gamma | <code>number</code> | The gamma value. |

<a name="Color+toLinear"></a>

### color.toLinear(gamma) ⇒ [<code>Color</code>](#Color)
Converts to linear color space and returns a new color.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="Color+toGamma"></a>

### color.toGamma(gamma) ⇒ [<code>Color</code>](#Color)
Converts to gamma color space and returns a new color.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="Color+luminance"></a>

### color.luminance() ⇒ <code>number</code>
The luminance method.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>number</code> - - The return value.  
<a name="Color+lerp"></a>

### color.lerp(other, t) ⇒ [<code>Color</code>](#Color)
Performs a linear interpolation between this color and other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Color+clone"></a>

### color.clone() ⇒ [<code>Color</code>](#Color)
Clones this color and returns a new color.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  
<a name="Color+asArray"></a>

### color.asArray() ⇒ <code>array</code>
Returns the type as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>array</code> - - Returns as an array.  
<a name="Color+toJSON"></a>

### color.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>object</code> - - The json object.  
<a name="Color+fromJSON"></a>

### color.fromJSON(j)
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Color+toCSSString"></a>

### color.toCSSString() ⇒ <code>any</code>
The toCSSString method.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>any</code> - - The return value.  
<a name="Color.random"></a>

### Color.random(gammaOffset, randomAlpha) ⇒ [<code>Color</code>](#Color)
Creates a random color.

**Kind**: static method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new random color.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gammaOffset | <code>number</code> | <code>0</code> | The gamma offset. |
| randomAlpha | <code>boolean</code> | <code>false</code> | Determines whether the alpha channel is random. |

<a name="EulerAngles"></a>

## EulerAngles
**Kind**: global class  

* [EulerAngles](#EulerAngles)
    * [new EulerAngles(x, y, z, order)](#new_EulerAngles_new)
    * [.x](#EulerAngles+x) ⇒ <code>number</code>
    * [.x](#EulerAngles+x)
    * [.y](#EulerAngles+y) ⇒ <code>number</code>
    * [.y](#EulerAngles+y)
    * [.z](#EulerAngles+z) ⇒ <code>number</code>
    * [.z](#EulerAngles+z)
    * [.set(x, y, z)](#EulerAngles+set)

<a name="new_EulerAngles_new"></a>

### new EulerAngles(x, y, z, order)
Create a euler angle.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>0</code> | The angle of the x axis in degrees. Default is 0. |
| y | <code>number</code> | <code>0</code> | The angle of the y axis in degrees. Default is 0. |
| z | <code>number</code> | <code>0</code> | The angle of the z axis in degrees. Default is 0. |
| order | <code>number</code> | <code>0</code> | The order in which the rotations are applied. |

<a name="EulerAngles+x"></a>

### eulerAngles.x ⇒ <code>number</code>
Getter for x axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  
**Returns**: <code>number</code> - - Returns the x axis rotation.  
<a name="EulerAngles+x"></a>

### eulerAngles.x
Setter for x axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="EulerAngles+y"></a>

### eulerAngles.y ⇒ <code>number</code>
Getter for y axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  
**Returns**: <code>number</code> - - Returns the y axis rotation.  
<a name="EulerAngles+y"></a>

### eulerAngles.y
Setter for y axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="EulerAngles+z"></a>

### eulerAngles.z ⇒ <code>number</code>
Getter for z axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  
**Returns**: <code>number</code> - - Returns the z axis rotation.  
<a name="EulerAngles+z"></a>

### eulerAngles.z
Setter for z axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="EulerAngles+set"></a>

### eulerAngles.set(x, y, z)
The set method

**Kind**: instance method of [<code>EulerAngles</code>](#EulerAngles)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x axis rotation. |
| y | <code>number</code> | The y axis rotation. |
| z | <code>number</code> | The z axis rotation. |

<a name="Frustum"></a>

## Frustum
**Kind**: global class  

* [Frustum](#Frustum)
    * [new Frustum(p0, p1, p2, p3, p4, p5)](#new_Frustum_new)
    * [.setFromMatrix(mat4)](#Frustum+setFromMatrix)
    * [.intersectsBox(box3)](#Frustum+intersectsBox) ⇒ <code>boolean</code>
    * [.toJSON()](#Frustum+toJSON) ⇒ <code>object</code>
    * [.fromJSON(j)](#Frustum+fromJSON)
    * [.toString()](#Frustum+toString) ⇒ <code>any</code>

<a name="new_Frustum_new"></a>

### new Frustum(p0, p1, p2, p3, p4, p5)
Create a Frustum


| Param | Type | Description |
| --- | --- | --- |
| p0 | <code>any</code> | the p0 value. |
| p1 | <code>any</code> | the p1 value. |
| p2 | <code>any</code> | the p2 value. |
| p3 | <code>any</code> | the p3 value. |
| p4 | <code>any</code> | the p4 value. |
| p5 | <code>any</code> | the p5 value. |

<a name="Frustum+setFromMatrix"></a>

### frustum.setFromMatrix(mat4)
The setFromMatrix configures a Frustum object using a matrix.Typically the matrix is a model view projection matrix.

**Kind**: instance method of [<code>Frustum</code>](#Frustum)  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | [<code>Mat4</code>](#Mat4) | The matrix to use. |

<a name="Frustum+intersectsBox"></a>

### frustum.intersectsBox(box3) ⇒ <code>boolean</code>
Tests a box to see if it is entirely within the frustum.

**Kind**: instance method of [<code>Frustum</code>](#Frustum)  
**Returns**: <code>boolean</code> - - True if the frustum intersects the box.  

| Param | Type | Description |
| --- | --- | --- |
| box3 | [<code>Box3</code>](#Box3) | The box to test. |

<a name="Frustum+toJSON"></a>

### frustum.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Frustum</code>](#Frustum)  
**Returns**: <code>object</code> - - The json object.  
<a name="Frustum+fromJSON"></a>

### frustum.fromJSON(j)
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Frustum</code>](#Frustum)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Frustum+toString"></a>

### frustum.toString() ⇒ <code>any</code>
The toString method.

**Kind**: instance method of [<code>Frustum</code>](#Frustum)  
**Returns**: <code>any</code> - - The return value.  
<a name="Mat3"></a>

## Mat3
**Kind**: global class  

* [Mat3](#Mat3)
    * [new Mat3(m00, m01, m02, m10, m11, m12, m20, m21, m22)](#new_Mat3_new)
    * [.m00](#Mat3+m00) ⇒ <code>number</code>
    * [.m00](#Mat3+m00)
    * [.m01](#Mat3+m01) ⇒ <code>number</code>
    * [.m01](#Mat3+m01)
    * [.m02](#Mat3+m02) ⇒ <code>number</code>
    * [.m02](#Mat3+m02)
    * [.m10](#Mat3+m10) ⇒ <code>number</code>
    * [.m10](#Mat3+m10)
    * [.m11](#Mat3+m11) ⇒ <code>number</code>
    * [.m11](#Mat3+m11)
    * [.m12](#Mat3+m12) ⇒ <code>number</code>
    * [.m12](#Mat3+m12)
    * [.m20](#Mat3+m20) ⇒ <code>number</code>
    * [.m20](#Mat3+m20)
    * [.m21](#Mat3+m21) ⇒ <code>number</code>
    * [.m21](#Mat3+m21)
    * [.m22](#Mat3+m22) ⇒ <code>number</code>
    * [.m22](#Mat3+m22)
    * [.xAxis](#Mat3+xAxis) ⇒ [<code>Vec3</code>](#Vec3)
    * [.xAxis](#Mat3+xAxis)
    * [.yAxis](#Mat3+yAxis)
    * [.yAxis](#Mat3+yAxis)
    * [.zAxis](#Mat3+zAxis)
    * [.zAxis](#Mat3+zAxis)
    * [.set(m00, m01, m02, m10, m11, m12, m20, m21, m22)](#Mat3+set)
    * [.setIdentity()](#Mat3+setIdentity)
    * [.setFromMat(mat)](#Mat3+setFromMat)
    * [.setFromDirectionAndUpvector(dir, up)](#Mat3+setFromDirectionAndUpvector)
    * [.inverse()](#Mat3+inverse) ⇒ [<code>Mat3</code>](#Mat3)
    * [.invertInPlace()](#Mat3+invertInPlace) ⇒ <code>boolean</code>
    * [.transpose()](#Mat3+transpose) ⇒ [<code>Mat3</code>](#Mat3)
    * [.transposeInPlace()](#Mat3+transposeInPlace)
    * [.transformVec3(vec3)](#Mat3+transformVec3) ⇒ [<code>Vec3</code>](#Vec3)
    * [.clone()](#Mat3+clone) ⇒ [<code>Mat3</code>](#Mat3)
    * [.toJSON()](#Mat3+toJSON) ⇒ <code>object</code>
    * [.fromJSON(json)](#Mat3+fromJSON)
    * [.toString()](#Mat3+toString) ⇒ <code>any</code>

<a name="new_Mat3_new"></a>

### new Mat3(m00, m01, m02, m10, m11, m12, m20, m21, m22)
Create a Mat3.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| m00 | <code>number</code> | <code>1</code> | Row 0, column 0. |
| m01 | <code>number</code> | <code>0</code> | Row 0, column 1. |
| m02 | <code>number</code> | <code>0</code> | Row 0, column 2. |
| m10 | <code>number</code> | <code>0</code> | Row 1, column 0. |
| m11 | <code>number</code> | <code>1</code> | Row 1, column 1. |
| m12 | <code>number</code> | <code>0</code> | Row 1, column 2. |
| m20 | <code>number</code> | <code>0</code> | Row 2, column 0. |
| m21 | <code>number</code> | <code>0</code> | Row 2, column 1. |
| m22 | <code>number</code> | <code>1</code> | Row 2, column 2. |

<a name="Mat3+m00"></a>

### mat3.m00 ⇒ <code>number</code>
Getter for row 0, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m00 value.  
<a name="Mat3+m00"></a>

### mat3.m00
Setter for row 0, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m01"></a>

### mat3.m01 ⇒ <code>number</code>
Getter for row 0, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m01 value.  
<a name="Mat3+m01"></a>

### mat3.m01
Setter for row 0, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m02"></a>

### mat3.m02 ⇒ <code>number</code>
Getter for row 0, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m02 value.  
<a name="Mat3+m02"></a>

### mat3.m02
Setter for row 0, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m10"></a>

### mat3.m10 ⇒ <code>number</code>
Getter for row 1, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m10 value.  
<a name="Mat3+m10"></a>

### mat3.m10
Setter for row 1, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m11"></a>

### mat3.m11 ⇒ <code>number</code>
Getter for row 1, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m11 value.  
<a name="Mat3+m11"></a>

### mat3.m11
Setter for row 1, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m12"></a>

### mat3.m12 ⇒ <code>number</code>
Getter for row 1, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m12 value.  
<a name="Mat3+m12"></a>

### mat3.m12
Setter for row 1, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m20"></a>

### mat3.m20 ⇒ <code>number</code>
Getter for row 2, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m20 value.  
<a name="Mat3+m20"></a>

### mat3.m20
Setter for row 2, column 0.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m21"></a>

### mat3.m21 ⇒ <code>number</code>
Getter for row 2, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m21 value.  
<a name="Mat3+m21"></a>

### mat3.m21
Setter for row 2, column 1.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+m22"></a>

### mat3.m22 ⇒ <code>number</code>
Getter for row 2, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>number</code> - - Returns the m22 value.  
<a name="Mat3+m22"></a>

### mat3.m22
Setter for row 2, column 2.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat3+xAxis"></a>

### mat3.xAxis ⇒ [<code>Vec3</code>](#Vec3)
Getter for the x axis.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the x axis as a Vec3.  
<a name="Mat3+xAxis"></a>

### mat3.xAxis
Setter for the x axis.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The vec3 value. |

<a name="Mat3+yAxis"></a>

### mat3.yAxis
Getter for the y axis.* @return {Vec3} - Returns the y axis as a Vec3.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
<a name="Mat3+yAxis"></a>

### mat3.yAxis
Setter for the y axis.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The vec3 value. |

<a name="Mat3+zAxis"></a>

### mat3.zAxis
Getter for the z axis.* @return {Vec3} - Returns the z axis as a Vec3.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  
<a name="Mat3+zAxis"></a>

### mat3.zAxis
Setter for the z axis.

**Kind**: instance property of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The vec3 value. |

<a name="Mat3+set"></a>

### mat3.set(m00, m01, m02, m10, m11, m12, m20, m21, m22)
The set method.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| m00 | <code>number</code> | <code>1</code> | Row 0, column 0. |
| m01 | <code>number</code> | <code>0</code> | Row 0, column 1. |
| m02 | <code>number</code> | <code>0</code> | Row 0, column 2. |
| m10 | <code>number</code> | <code>0</code> | Row 1, column 0. |
| m11 | <code>number</code> | <code>1</code> | Row 1, column 1. |
| m12 | <code>number</code> | <code>0</code> | Row 1, column 2. |
| m20 | <code>number</code> | <code>0</code> | Row 2, column 0. |
| m21 | <code>number</code> | <code>0</code> | Row 2, column 1. |
| m22 | <code>number</code> | <code>1</code> | Row 2, column 2. |

<a name="Mat3+setIdentity"></a>

### mat3.setIdentity()
The setIdentity method.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
<a name="Mat3+setFromMat"></a>

### mat3.setFromMat(mat)
The setFromMat method.Note: works with either Mat3 or Mat4.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| mat | <code>any</code> | The mat value. |

<a name="Mat3+setFromDirectionAndUpvector"></a>

### mat3.setFromDirectionAndUpvector(dir, up)
The setFromDirectionAndUpvector method.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>any</code> | The dir value. |
| up | <code>any</code> | The up value. |

<a name="Mat3+inverse"></a>

### mat3.inverse() ⇒ [<code>Mat3</code>](#Mat3)
Inverts a Mat3 and returns the result as a new instance.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: [<code>Mat3</code>](#Mat3) - - Returns a new Mat3.  
<a name="Mat3+invertInPlace"></a>

### mat3.invertInPlace() ⇒ <code>boolean</code>
Inverts a Mat3.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="Mat3+transpose"></a>

### mat3.transpose() ⇒ [<code>Mat3</code>](#Mat3)
Transposes (exchanges columns with rows) this matrixand returns the result as a new instance.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: [<code>Mat3</code>](#Mat3) - - Return a new transposed Mat3.  
<a name="Mat3+transposeInPlace"></a>

### mat3.transposeInPlace()
Transposes (exchanges columns with rows) this matrix.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
<a name="Mat3+transformVec3"></a>

### mat3.transformVec3(vec3) ⇒ [<code>Vec3</code>](#Vec3)
Transforms the Vec3 with a Mat3.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Return the result as a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The vec3 value. |

<a name="Mat3+clone"></a>

### mat3.clone() ⇒ [<code>Mat3</code>](#Mat3)
Clones this Mat3 returning a new instance.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: [<code>Mat3</code>](#Mat3) - - Returns a new Mat3.  
<a name="Mat3+toJSON"></a>

### mat3.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>object</code> - - The json object.  
<a name="Mat3+fromJSON"></a>

### mat3.fromJSON(json)
The fromJSON method.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json param. |

<a name="Mat3+toString"></a>

### mat3.toString() ⇒ <code>any</code>
The toString method.

**Kind**: instance method of [<code>Mat3</code>](#Mat3)  
**Returns**: <code>any</code> - - The return value.  
<a name="Mat4"></a>

## Mat4
**Kind**: global class  

* [Mat4](#Mat4)
    * [new Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)](#new_Mat4_new)
    * [.m00](#Mat4+m00) ⇒ <code>number</code>
    * [.m00](#Mat4+m00)
    * [.m01](#Mat4+m01) ⇒ <code>number</code>
    * [.m01](#Mat4+m01)
    * [.m02](#Mat4+m02) ⇒ <code>number</code>
    * [.m02](#Mat4+m02)
    * [.m03](#Mat4+m03) ⇒ <code>number</code>
    * [.m03](#Mat4+m03)
    * [.m10](#Mat4+m10) ⇒ <code>number</code>
    * [.m10](#Mat4+m10)
    * [.m11](#Mat4+m11) ⇒ <code>number</code>
    * [.m11](#Mat4+m11)
    * [.m12](#Mat4+m12) ⇒ <code>number</code>
    * [.m12](#Mat4+m12)
    * [.m13](#Mat4+m13) ⇒ <code>number</code>
    * [.m13](#Mat4+m13)
    * [.m20](#Mat4+m20) ⇒ <code>number</code>
    * [.m20](#Mat4+m20)
    * [.m21](#Mat4+m21) ⇒ <code>number</code>
    * [.m21](#Mat4+m21)
    * [.m22](#Mat4+m22) ⇒ <code>number</code>
    * [.m22](#Mat4+m22)
    * [.m23](#Mat4+m23) ⇒ <code>number</code>
    * [.m23](#Mat4+m23)
    * [.m30](#Mat4+m30) ⇒ <code>number</code>
    * [.m30](#Mat4+m30)
    * [.m31](#Mat4+m31) ⇒ <code>number</code>
    * [.m31](#Mat4+m31)
    * [.m32](#Mat4+m32) ⇒ <code>number</code>
    * [.m32](#Mat4+m32)
    * [.m33](#Mat4+m33) ⇒ <code>number</code>
    * [.m33](#Mat4+m33)
    * [.xAxis](#Mat4+xAxis) ⇒ [<code>Vec3</code>](#Vec3)
    * [.xAxis](#Mat4+xAxis)
    * [.yAxis](#Mat4+yAxis) ⇒ [<code>Vec3</code>](#Vec3)
    * [.yAxis](#Mat4+yAxis)
    * [.zAxis](#Mat4+zAxis) ⇒ [<code>Vec3</code>](#Vec3)
    * [.zAxis](#Mat4+zAxis)
    * [.translation](#Mat4+translation) ⇒ [<code>Vec3</code>](#Vec3)
    * [.translation](#Mat4+translation)
    * [.set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)](#Mat4+set)
    * [.setIdentity()](#Mat4+setIdentity)
    * [.setDataArray(float32Array)](#Mat4+setDataArray)
    * [.setFromMat4(mat4)](#Mat4+setFromMat4)
    * [.toMat3(mat4)](#Mat4+toMat3) ⇒ [<code>Mat3</code>](#Mat3)
    * [.transposeInPlace()](#Mat4+transposeInPlace)
    * [.transpose()](#Mat4+transpose) ⇒ [<code>Mat4</code>](#Mat4)
    * [.inverse()](#Mat4+inverse) ⇒ <code>any</code>
    * [.invertInPlace()](#Mat4+invertInPlace) ⇒ <code>boolean</code>
    * [.setInverse(mat4)](#Mat4+setInverse) ⇒ <code>any</code>
    * [.multiply(other)](#Mat4+multiply) ⇒ [<code>Mat4</code>](#Mat4)
    * [.multiplyInPlace(other)](#Mat4+multiplyInPlace) ⇒ [<code>Mat4</code>](#Mat4)
    * [.postmultiplyInPlace(other)](#Mat4+postmultiplyInPlace) ⇒ [<code>Mat3</code>](#Mat3)
    * [.translateInPlace(v3)](#Mat4+translateInPlace) ⇒ [<code>Mat4</code>](#Mat4)
    * [.setLookAt(pos, target, up)](#Mat4+setLookAt)
    * [.setRotation(axis, rad)](#Mat4+setRotation) ⇒ [<code>Mat4</code>](#Mat4)
    * [.setXRotation(rad)](#Mat4+setXRotation) ⇒ [<code>Mat4</code>](#Mat4)
    * [.setYRotation(rad)](#Mat4+setYRotation) ⇒ [<code>Mat4</code>](#Mat4)
    * [.setZRotation(rad)](#Mat4+setZRotation) ⇒ [<code>Mat4</code>](#Mat4)
    * [.transformVec4(vec)](#Mat4+transformVec4) ⇒ [<code>Vec4</code>](#Vec4)
    * [.transformVec3(vec)](#Mat4+transformVec3) ⇒ [<code>Vec3</code>](#Vec3)
    * [.rotateVec3(vec)](#Mat4+rotateVec3) ⇒ [<code>Vec3</code>](#Vec3)
    * [.setPerspectiveMatrix(fovy, aspect, near, far)](#Mat4+setPerspectiveMatrix)
    * [.setOrthographicMatrix(left, right, bottom, top, near, far)](#Mat4+setOrthographicMatrix)
    * [.setScale(x, y, z)](#Mat4+setScale)
    * [.setFromMat3x4Array(m3x4)](#Mat4+setFromMat3x4Array)
    * [.clone()](#Mat4+clone) ⇒ [<code>Mat4</code>](#Mat4)
    * [.toJSON()](#Mat4+toJSON) ⇒ <code>object</code>
    * [.fromJSON(json)](#Mat4+fromJSON)

<a name="new_Mat4_new"></a>

### new Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
Create a Mat4.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| m00 | <code>number</code> | <code>1</code> | Row 0, column 0. |
| m01 | <code>number</code> | <code>0</code> | Row 0, column 1. |
| m02 | <code>number</code> | <code>0</code> | Row 0, column 2. |
| m03 | <code>number</code> | <code>0</code> | Row 0, column 3. |
| m10 | <code>number</code> | <code>0</code> | Row 1, column 0. |
| m11 | <code>number</code> | <code>1</code> | Row 1, column 1. |
| m12 | <code>number</code> | <code>0</code> | Row 1, column 2. |
| m13 | <code>number</code> | <code>0</code> | Row 1, column 3. |
| m20 | <code>number</code> | <code>0</code> | Row 2, column 0. |
| m21 | <code>number</code> | <code>0</code> | Row 2, column 1. |
| m22 | <code>number</code> | <code>1</code> | Row 2, column 2. |
| m23 | <code>number</code> | <code>0</code> | Row 2, column 3. |
| m30 | <code>number</code> | <code>0</code> | Row 3, column 0. |
| m31 | <code>number</code> | <code>0</code> | Row 3, column 1. |
| m32 | <code>number</code> | <code>0</code> | Row 3, column 2. |
| m33 | <code>number</code> | <code>1</code> | Row 3, column 3. |

<a name="Mat4+m00"></a>

### mat4.m00 ⇒ <code>number</code>
Getter for row 0, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m00 value.  
<a name="Mat4+m00"></a>

### mat4.m00
Setter for row 0, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m01"></a>

### mat4.m01 ⇒ <code>number</code>
Getter for row 0, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m01 value.  
<a name="Mat4+m01"></a>

### mat4.m01
Setter for row 0, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m02"></a>

### mat4.m02 ⇒ <code>number</code>
Getter for row 0, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m02 value.  
<a name="Mat4+m02"></a>

### mat4.m02
Setter for row 0, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m03"></a>

### mat4.m03 ⇒ <code>number</code>
Getter for row 0, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m03 value.  
<a name="Mat4+m03"></a>

### mat4.m03
Setter for row 0, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m10"></a>

### mat4.m10 ⇒ <code>number</code>
Getter for row 1, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m10 value.  
<a name="Mat4+m10"></a>

### mat4.m10
Setter for row 1, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m11"></a>

### mat4.m11 ⇒ <code>number</code>
Getter for row 1, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m11 value.  
<a name="Mat4+m11"></a>

### mat4.m11
Setter for row 1, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m12"></a>

### mat4.m12 ⇒ <code>number</code>
Getter for row 1, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m12 value.  
<a name="Mat4+m12"></a>

### mat4.m12
Setter for row 1, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m13"></a>

### mat4.m13 ⇒ <code>number</code>
Getter for row 1, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m13 value.  
<a name="Mat4+m13"></a>

### mat4.m13
Setter for row 1, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m20"></a>

### mat4.m20 ⇒ <code>number</code>
Getter for row 2, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m20 value.  
<a name="Mat4+m20"></a>

### mat4.m20
Setter for row 2, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m21"></a>

### mat4.m21 ⇒ <code>number</code>
Getter for row 2, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m21 value.  
<a name="Mat4+m21"></a>

### mat4.m21
Setter for row 2, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m22"></a>

### mat4.m22 ⇒ <code>number</code>
Getter for row 2, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m22 value.  
<a name="Mat4+m22"></a>

### mat4.m22
Setter for row 2, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m23"></a>

### mat4.m23 ⇒ <code>number</code>
Getter for row 2, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m23 value.  
<a name="Mat4+m23"></a>

### mat4.m23
Setter for row 2, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m30"></a>

### mat4.m30 ⇒ <code>number</code>
Getter for row 3, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m30 value.  
<a name="Mat4+m30"></a>

### mat4.m30
Setter for row 3, column 0.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m31"></a>

### mat4.m31 ⇒ <code>number</code>
Getter for row 3, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m31 value.  
<a name="Mat4+m31"></a>

### mat4.m31
Setter for row 3, column 1.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m32"></a>

### mat4.m32 ⇒ <code>number</code>
Getter for row 3, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m32 value.  
<a name="Mat4+m32"></a>

### mat4.m32
Setter for row 3, column 2.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+m33"></a>

### mat4.m33 ⇒ <code>number</code>
Getter for row 3, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>number</code> - - Returns the m33 value.  
<a name="Mat4+m33"></a>

### mat4.m33
Setter for row 3, column 3.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Mat4+xAxis"></a>

### mat4.xAxis ⇒ [<code>Vec3</code>](#Vec3)
Getter for the x axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the x axis as a Vec3.  
<a name="Mat4+xAxis"></a>

### mat4.xAxis
Setter for the x axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The vec3 value. |

<a name="Mat4+yAxis"></a>

### mat4.yAxis ⇒ [<code>Vec3</code>](#Vec3)
Getter for the y axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the y axis as a Vec3.  
<a name="Mat4+yAxis"></a>

### mat4.yAxis
Setter for the y axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The vec3 value. |

<a name="Mat4+zAxis"></a>

### mat4.zAxis ⇒ [<code>Vec3</code>](#Vec3)
Getter for the z axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the z axis as a Vec3.  
<a name="Mat4+zAxis"></a>

### mat4.zAxis
Setter for the z axis.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The vec3 value. |

<a name="Mat4+translation"></a>

### mat4.translation ⇒ [<code>Vec3</code>](#Vec3)
Getter for the translation of the matrix.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the translation.  
<a name="Mat4+translation"></a>

### mat4.translation
Setter for the translation of the matrix.

**Kind**: instance property of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The translation. |

<a name="Mat4+set"></a>

### mat4.set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33)
The set method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| m00 | <code>number</code> | <code>1</code> | Row 0, column 0. |
| m01 | <code>number</code> | <code>0</code> | Row 0, column 1. |
| m02 | <code>number</code> | <code>0</code> | Row 0, column 2. |
| m03 | <code>number</code> | <code>0</code> | Row 0, column 3. |
| m10 | <code>number</code> | <code>0</code> | Row 1, column 0. |
| m11 | <code>number</code> | <code>1</code> | Row 1, column 1. |
| m12 | <code>number</code> | <code>0</code> | Row 1, column 2. |
| m13 | <code>number</code> | <code>0</code> | Row 1, column 3. |
| m20 | <code>number</code> | <code>0</code> | Row 2, column 0. |
| m21 | <code>number</code> | <code>0</code> | Row 2, column 1. |
| m22 | <code>number</code> | <code>1</code> | Row 2, column 2. |
| m23 | <code>number</code> | <code>0</code> | Row 2, column 3. |
| m30 | <code>number</code> | <code>0</code> | Row 3, column 0. |
| m31 | <code>number</code> | <code>0</code> | Row 3, column 1. |
| m32 | <code>number</code> | <code>0</code> | Row 3, column 2. |
| m33 | <code>number</code> | <code>1</code> | Row 3, column 3. |

<a name="Mat4+setIdentity"></a>

### mat4.setIdentity()
The setIdentity method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
<a name="Mat4+setDataArray"></a>

### mat4.setDataArray(float32Array)
The setDataArray method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| float32Array | <code>any</code> | The float32Array value. |

<a name="Mat4+setFromMat4"></a>

### mat4.setFromMat4(mat4)
The setFromMat method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | [<code>Mat4</code>](#Mat4) | The mat4 value. |

<a name="Mat4+toMat3"></a>

### mat4.toMat3(mat4) ⇒ [<code>Mat3</code>](#Mat3)
Converts a Mat4 to a Mat3.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat3</code>](#Mat3) - - Returns a new Mat3.  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | [<code>Mat4</code>](#Mat4) | The Mat4 value to convert. |

<a name="Mat4+transposeInPlace"></a>

### mat4.transposeInPlace()
Transposes (exchanges columns with rows) this matrix.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
<a name="Mat4+transpose"></a>

### mat4.transpose() ⇒ [<code>Mat4</code>](#Mat4)
Transposes (exchanges columns with rows) this matrixand returns the result as a new instance.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Return a new transposed Mat4.  
<a name="Mat4+inverse"></a>

### mat4.inverse() ⇒ <code>any</code>
Inverts a Mat4 not using SIMD and returns the result as a new instance.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>any</code> - - Returns a new Mat4.  
<a name="Mat4+invertInPlace"></a>

### mat4.invertInPlace() ⇒ <code>boolean</code>
Inverts a Mat4.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="Mat4+setInverse"></a>

### mat4.setInverse(mat4) ⇒ <code>any</code>
Sets this matrix as the inverse of the given Mat4.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | [<code>Mat4</code>](#Mat4) | The mat4 value. |

<a name="Mat4+multiply"></a>

### mat4.multiply(other) ⇒ [<code>Mat4</code>](#Mat4)
Multiplies two Mat4s not using SIMD and returns the result as a new instance.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Mat4</code>](#Mat4) | The other Mat4 to multiply with. |

<a name="Mat4+multiplyInPlace"></a>

### mat4.multiplyInPlace(other) ⇒ [<code>Mat4</code>](#Mat4)
Multiplies two Mat4s in place explicitly not using SIMD.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Mat4</code>](#Mat4) | The other Mat4 to multiply with. |

<a name="Mat4+postmultiplyInPlace"></a>

### mat4.postmultiplyInPlace(other) ⇒ [<code>Mat3</code>](#Mat3)
Post multiplies two Mat4s in place explicitly not using SIMD.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat3</code>](#Mat3) - - Returns the result as a new Mat4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Mat4</code>](#Mat4) | The other Mat4 to multiply with. |

<a name="Mat4+translateInPlace"></a>

### mat4.translateInPlace(v3) ⇒ [<code>Mat4</code>](#Mat4)
Translate a Mat4 by the given vector not using SIMD.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| v3 | [<code>Vec3</code>](#Vec3) | The given vector to translate along. |

<a name="Mat4+setLookAt"></a>

### mat4.setLookAt(pos, target, up)
Generates a look-at matrix with the given position, focal point, and up axis.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| pos | [<code>Vec3</code>](#Vec3) | Position of the viewer. |
| target | [<code>Vec3</code>](#Vec3) | Point the viewer is looking at. |
| up | [<code>Vec3</code>](#Vec3) | Vec3 pointing up. |

<a name="Mat4+setRotation"></a>

### mat4.setRotation(axis, rad) ⇒ [<code>Mat4</code>](#Mat4)
Creates a matrix from a given angle around a given axis.This is equivalent to (but much faster than):    mat4.identity(dest);    mat4.rotate(dest, dest, rad, axis);

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| axis | [<code>Vec3</code>](#Vec3) | The axis to rotate around. |
| rad | <code>number</code> | The angle to rotate the matrix by. |

<a name="Mat4+setXRotation"></a>

### mat4.setXRotation(rad) ⇒ [<code>Mat4</code>](#Mat4)
Creates a matrix from the given angle around the X axis.This is equivalent to (but much faster than):    mat4.identity(dest);    mat4.rotateX(dest, dest, rad);

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | The angle to rotate the matrix by. |

<a name="Mat4+setYRotation"></a>

### mat4.setYRotation(rad) ⇒ [<code>Mat4</code>](#Mat4)
Creates a matrix from the given angle around the Y axis.This is equivalent to (but much faster than):    mat4.identity(dest);    mat4.rotateY(dest, dest, rad);

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | The angle to rotate the matrix by. |

<a name="Mat4+setZRotation"></a>

### mat4.setZRotation(rad) ⇒ [<code>Mat4</code>](#Mat4)
Creates a matrix from the given angle around the Z axis.This is equivalent to (but much faster than):    mat4.identity(dest);    mat4.rotateZ(dest, dest, rad);

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | The angle to rotate the matrix by. |

<a name="Mat4+transformVec4"></a>

### mat4.transformVec4(vec) ⇒ [<code>Vec4</code>](#Vec4)
Transforms the Vec4 with a Mat4.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Return the result as a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>any</code> | The vec value. |

<a name="Mat4+transformVec3"></a>

### mat4.transformVec3(vec) ⇒ [<code>Vec3</code>](#Vec3)
The transformVec3 method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Return the result as a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>any</code> | The vec value. |

<a name="Mat4+rotateVec3"></a>

### mat4.rotateVec3(vec) ⇒ [<code>Vec3</code>](#Vec3)
The rotateVec3 method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Return the result as a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec | <code>any</code> | The vec value. |

<a name="Mat4+setPerspectiveMatrix"></a>

### mat4.setPerspectiveMatrix(fovy, aspect, near, far)
Set the perspective from a Mat4.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| fovy | <code>any</code> | The fovy value. |
| aspect | <code>any</code> | The aspect value. |
| near | <code>any</code> | The near value. |
| far | <code>any</code> | The far value. |

<a name="Mat4+setOrthographicMatrix"></a>

### mat4.setOrthographicMatrix(left, right, bottom, top, near, far)
The setOrthographicMatrix method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| left | <code>any</code> | The left value. |
| right | <code>any</code> | The right value. |
| bottom | <code>any</code> | The bottom value. |
| top | <code>any</code> | The top value. |
| near | <code>any</code> | The near value. |
| far | <code>any</code> | The far value. |

<a name="Mat4+setScale"></a>

### mat4.setScale(x, y, z)
The setScale method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| z | <code>number</code> | The z value. |

<a name="Mat4+setFromMat3x4Array"></a>

### mat4.setFromMat3x4Array(m3x4)
The setFromMat3x4Array method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| m3x4 | <code>any</code> | The m3x4 value. |

<a name="Mat4+clone"></a>

### mat4.clone() ⇒ [<code>Mat4</code>](#Mat4)
Clones this Mat4 returning a new instance.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  
<a name="Mat4+toJSON"></a>

### mat4.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  
**Returns**: <code>object</code> - - The json object.  
<a name="Mat4+fromJSON"></a>

### mat4.fromJSON(json)
The fromJSON method.

**Kind**: instance method of [<code>Mat4</code>](#Mat4)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json param. |

<a name="PlaneType"></a>

## PlaneType
**Kind**: global class  

* [PlaneType](#PlaneType)
    * [new PlaneType(normal, w)](#new_PlaneType_new)
    * [.set(x, y, z, w)](#PlaneType+set)
    * [.divideScalar(value)](#PlaneType+divideScalar)
    * [.distanceToPoint(point)](#PlaneType+distanceToPoint) ⇒ <code>any</code>
    * [.normalizeInPlace()](#PlaneType+normalizeInPlace)
    * [.clone()](#PlaneType+clone) ⇒ <code>Plane</code>
    * [.toJSON()](#PlaneType+toJSON) ⇒ <code>object</code>
    * [.toString()](#PlaneType+toString) ⇒ <code>any</code>

<a name="new_PlaneType_new"></a>

### new PlaneType(normal, w)
Create a plane.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| normal | [<code>Vec3</code>](#Vec3) |  | The normal of the plane. |
| w | <code>number</code> | <code>0</code> | The w value. |

<a name="PlaneType+set"></a>

### planeType.set(x, y, z, w)
Thet set method

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| z | <code>number</code> | The z value. |
| w | <code>number</code> | The w value. |

<a name="PlaneType+divideScalar"></a>

### planeType.divideScalar(value)
Thet divideScalar method

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value value. |

<a name="PlaneType+distanceToPoint"></a>

### planeType.distanceToPoint(point) ⇒ <code>any</code>
Thet distanceToPoint method

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
**Returns**: <code>any</code> - - The rreturn value.  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>any</code> | The point value. |

<a name="PlaneType+normalizeInPlace"></a>

### planeType.normalizeInPlace()
Normalize this plane in place modifying its values.

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
<a name="PlaneType+clone"></a>

### planeType.clone() ⇒ <code>Plane</code>
Clones this plane and returns a new plane.

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
**Returns**: <code>Plane</code> - - Returns a new plane.  
<a name="PlaneType+toJSON"></a>

### planeType.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
**Returns**: <code>object</code> - - The json object.  
<a name="PlaneType+toString"></a>

### planeType.toString() ⇒ <code>any</code>
The toString method.

**Kind**: instance method of [<code>PlaneType</code>](#PlaneType)  
**Returns**: <code>any</code> - - The return value.  
<a name="Quat"></a>

## Quat
**Kind**: global class  

* [Quat](#Quat)
    * [new Quat(x, y, z, w)](#new_Quat_new)
    * [.x](#Quat+x) ⇒ <code>number</code>
    * [.x](#Quat+x)
    * [.y](#Quat+y) ⇒ <code>number</code>
    * [.y](#Quat+y)
    * [.z](#Quat+z) ⇒ <code>number</code>
    * [.z](#Quat+z)
    * [.w](#Quat+w) ⇒ <code>number</code>
    * [.w](#Quat+w)
    * [.set(x, y, z, w)](#Quat+set)
    * [.setDataArray(float32Array)](#Quat+setDataArray)
    * [.setFromOther(other)](#Quat+setFromOther)
    * [.setFromEulerAngles(eulerAngles)](#Quat+setFromEulerAngles)
    * [.toEulerAngles(rotationOrder)](#Quat+toEulerAngles) ⇒ <code>any</code>
    * [.setFromAxisAndAngle(axis, angle)](#Quat+setFromAxisAndAngle)
    * [.setFromDirectionAndUpvector(dir, up)](#Quat+setFromDirectionAndUpvector)
    * [.setFrom2Vectors(v0, v1)](#Quat+setFrom2Vectors)
    * [.setFromMat3(mat3)](#Quat+setFromMat3)
    * [.setFromMat4(mat4)](#Quat+setFromMat4)
    * [.isIdentity()](#Quat+isIdentity) ⇒ <code>boolean</code>
    * [.getAngle()](#Quat+getAngle) ⇒ <code>any</code>
    * [.equal(other)](#Quat+equal) ⇒ <code>boolean</code>
    * [.notequals(other)](#Quat+notequals) ⇒ <code>boolean</code>
    * [.approxEqual(other, precision)](#Quat+approxEqual) ⇒ <code>boolean</code>
    * [.add(other)](#Quat+add) ⇒ [<code>Quat</code>](#Quat)
    * [.addInPlace(other)](#Quat+addInPlace)
    * [.subtract(other)](#Quat+subtract) ⇒ [<code>Quat</code>](#Quat)
    * [.scale(scalar)](#Quat+scale) ⇒ [<code>Quat</code>](#Quat)
    * [.scaleInPlace(scalar)](#Quat+scaleInPlace)
    * [.length()](#Quat+length) ⇒ <code>number</code>
    * [.lengthSquared()](#Quat+lengthSquared) ⇒ <code>number</code>
    * [.normalize()](#Quat+normalize) ⇒ [<code>Quat</code>](#Quat)
    * [.normalizeInPlace()](#Quat+normalizeInPlace)
    * [.dot(other)](#Quat+dot) ⇒ <code>number</code>
    * [.cross(other)](#Quat+cross) ⇒ [<code>Quat</code>](#Quat)
    * [.conjugate()](#Quat+conjugate) ⇒ <code>any</code>
    * [.inverse()](#Quat+inverse) ⇒ [<code>Quat</code>](#Quat)
    * [.alignWith(other)](#Quat+alignWith)
    * [.multiply(other)](#Quat+multiply) ⇒ [<code>Quat</code>](#Quat)
    * [.multiplyInPlace(other)](#Quat+multiplyInPlace)
    * [.rotateVec3(vec3)](#Quat+rotateVec3) ⇒ [<code>Vec3</code>](#Vec3)
    * [.rotateX(rad)](#Quat+rotateX)
    * [.rotateY(rad)](#Quat+rotateY)
    * [.rotateZ(rad)](#Quat+rotateZ)
    * [.toMat3()](#Quat+toMat3) ⇒ [<code>Mat3</code>](#Mat3)
    * [.getXaxis()](#Quat+getXaxis) ⇒ [<code>Vec3</code>](#Vec3)
    * [.getYaxis()](#Quat+getYaxis) ⇒ [<code>Vec3</code>](#Vec3)
    * [.getZaxis()](#Quat+getZaxis) ⇒ [<code>Vec3</code>](#Vec3)
    * [.mirror(axisIndex)](#Quat+mirror) ⇒ [<code>Quat</code>](#Quat)
    * [.toMat4()](#Quat+toMat4) ⇒ [<code>Mat4</code>](#Mat4)
    * [.lerp(other, t)](#Quat+lerp) ⇒ [<code>Quat</code>](#Quat)
    * [.clone()](#Quat+clone) ⇒ [<code>Quat</code>](#Quat)
    * [.toJSON()](#Quat+toJSON) ⇒ <code>object</code>
    * [.fromJSON(j)](#Quat+fromJSON)

<a name="new_Quat_new"></a>

### new Quat(x, y, z, w)
Create a quaternion.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>0</code> | The angle of the x axis. Default is 0. |
| y | <code>number</code> | <code>0</code> | The angle of the y axis. Default is 0. |
| z | <code>number</code> | <code>0</code> | The angle of the z axis. Default is 0. |
| w | <code>number</code> | <code>1</code> | The w value. Default is 1. |

<a name="Quat+x"></a>

### quat.x ⇒ <code>number</code>
Getter for x axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the x axis rotation.  
<a name="Quat+x"></a>

### quat.x
Setter for x axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Quat+y"></a>

### quat.y ⇒ <code>number</code>
Getter for y axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the y axis rotation.  
<a name="Quat+y"></a>

### quat.y
Setter for y axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Quat+z"></a>

### quat.z ⇒ <code>number</code>
Getter for z axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the z axis rotation.  
<a name="Quat+z"></a>

### quat.z
Setter for z axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Quat+w"></a>

### quat.w ⇒ <code>number</code>
Getter for w value.

**Kind**: instance property of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the w value.  
<a name="Quat+w"></a>

### quat.w
Setter for w.

**Kind**: instance property of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Quat+set"></a>

### quat.set(x, y, z, w)
Setter from scalar components.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x axis rotation. |
| y | <code>number</code> | The y axis rotation. |
| z | <code>number</code> | The z axis rotation. |
| w | <code>number</code> | The w value. |

<a name="Quat+setDataArray"></a>

### quat.setDataArray(float32Array)
The setDataArray method.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| float32Array | <code>any</code> | The float32Array value. |

<a name="Quat+setFromOther"></a>

### quat.setFromOther(other)
Setter from another vector.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>any</code> | The other vector to set from. |

<a name="Quat+setFromEulerAngles"></a>

### quat.setFromEulerAngles(eulerAngles)
Set this quat from a euler rotation.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| eulerAngles | <code>any</code> | The euler angles rotation. |

<a name="Quat+toEulerAngles"></a>

### quat.toEulerAngles(rotationOrder) ⇒ <code>any</code>
The toEulerAngles method.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| rotationOrder | <code>number</code> | The order in which the rotations are applied. |

<a name="Quat+setFromAxisAndAngle"></a>

### quat.setFromAxisAndAngle(axis, angle)
Set this quat to a rotation defined by an axis and an angle (in radians).

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| axis | <code>any</code> | The axis value. |
| angle | <code>number</code> | The axis angle. |

<a name="Quat+setFromDirectionAndUpvector"></a>

### quat.setFromDirectionAndUpvector(dir, up)
The setFromDirectionAndUpvector method.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>any</code> | The direction value. |
| up | <code>any</code> | The up angle. |

<a name="Quat+setFrom2Vectors"></a>

### quat.setFrom2Vectors(v0, v1)
The setFrom2Vectors method.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| v0 | <code>any</code> | The v0 vector. |
| v1 | <code>any</code> | The v1 vector. |

<a name="Quat+setFromMat3"></a>

### quat.setFromMat3(mat3)
Set the quat from a Mat3.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| mat3 | [<code>Mat3</code>](#Mat3) | The mat3 value. |

<a name="Quat+setFromMat4"></a>

### quat.setFromMat4(mat4)
Set the quat from a Mat4.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | [<code>Mat4</code>](#Mat4) | The mat4 value. |

<a name="Quat+isIdentity"></a>

### quat.isIdentity() ⇒ <code>boolean</code>
The isIdentity method.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>boolean</code> - - Returns true or false.  
<a name="Quat+getAngle"></a>

### quat.getAngle() ⇒ <code>any</code>
The getAngle method.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>any</code> - - The return value.  
<a name="Quat+equal"></a>

### quat.equal(other) ⇒ <code>boolean</code>
Returns true if this Quat is exactly the same as other.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to compare with. |

<a name="Quat+notequals"></a>

### quat.notequals(other) ⇒ <code>boolean</code>
Returns true if this Quat is NOT exactly the same other.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to compare with. |

<a name="Quat+approxEqual"></a>

### quat.approxEqual(other, precision) ⇒ <code>boolean</code>
Returns true if this Quat is approximately the same as other.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Quat+add"></a>

### quat.add(other) ⇒ [<code>Quat</code>](#Quat)
Adds other to this Quat and return the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to add. |

<a name="Quat+addInPlace"></a>

### quat.addInPlace(other)
Adds other to this Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to add. |

<a name="Quat+subtract"></a>

### quat.subtract(other) ⇒ [<code>Quat</code>](#Quat)
Subtracts other from this Quat and returns the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to subtract. |

<a name="Quat+scale"></a>

### quat.scale(scalar) ⇒ [<code>Quat</code>](#Quat)
Scales this Quat by scalar and returns the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Quat+scaleInPlace"></a>

### quat.scaleInPlace(scalar)
Scales this Quat by scalar.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Quat+length"></a>

### quat.length() ⇒ <code>number</code>
Calculates the length of this Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Quat+lengthSquared"></a>

### quat.lengthSquared() ⇒ <code>number</code>
Calculates the squared length of this Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Quat+normalize"></a>

### quat.normalize() ⇒ [<code>Quat</code>](#Quat)
Normalizes the Quat and returns it as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns the Quat normalized.  
<a name="Quat+normalizeInPlace"></a>

### quat.normalizeInPlace()
Normalizes the Quat, modifying it and returning it normalized.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
<a name="Quat+dot"></a>

### quat.dot(other) ⇒ <code>number</code>
Calculates the dot product of two Quats.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the dot product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to compare with. |

<a name="Quat+cross"></a>

### quat.cross(other) ⇒ [<code>Quat</code>](#Quat)
Calculates the cross product of two Quats and returns the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns the cross product as a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to calculate with. |

<a name="Quat+conjugate"></a>

### quat.conjugate() ⇒ <code>any</code>
Returns the rotational conjugate of this Quat.Conjugation represents the same rotation of the Quat butin the opposite direction around the rotational axis.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>any</code> - - the return value.  
<a name="Quat+inverse"></a>

### quat.inverse() ⇒ [<code>Quat</code>](#Quat)
The inverse method.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  
<a name="Quat+alignWith"></a>

### quat.alignWith(other)
Aligns this quaternion with another one ensuring that the delta betweenthe Quat values is the shortest path over the hypersphere.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to divide by. |

<a name="Quat+multiply"></a>

### quat.multiply(other) ⇒ [<code>Quat</code>](#Quat)
Multiplies two Quats and returns the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to multiply. |

<a name="Quat+multiplyInPlace"></a>

### quat.multiplyInPlace(other)
Multiplies two Quats.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to multiply. |

<a name="Quat+rotateVec3"></a>

### quat.rotateVec3(vec3) ⇒ [<code>Vec3</code>](#Vec3)
Rotates a vector by this quaterion.Don't forget to normalize the quaternion unlessyou want axial translation as well as rotation.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The vec3 value. |

<a name="Quat+rotateX"></a>

### quat.rotateX(rad)
Rotates a quaternion by the given angle about the X axis.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | Angle (in radians) to rotate. |

<a name="Quat+rotateY"></a>

### quat.rotateY(rad)
Rotates a quaternion by the given angle about the Y axis.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | Angle (in radians) to rotate. |

<a name="Quat+rotateZ"></a>

### quat.rotateZ(rad)
Rotates a quaternion by the given angle about the Z axis.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | Angle (in radians) to rotate. |

<a name="Quat+toMat3"></a>

### quat.toMat3() ⇒ [<code>Mat3</code>](#Mat3)
Converts this Quat to a Mat3 (a 3x3 matrix).

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Mat3</code>](#Mat3) - - TReturns a new Mat3.  
<a name="Quat+getXaxis"></a>

### quat.getXaxis() ⇒ [<code>Vec3</code>](#Vec3)
Returns the X axis of this quaternion.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the X axis as a Vec3.  
<a name="Quat+getYaxis"></a>

### quat.getYaxis() ⇒ [<code>Vec3</code>](#Vec3)
Returns the Y axis of this quaternion.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the Y axis as a Vec3.  
<a name="Quat+getZaxis"></a>

### quat.getZaxis() ⇒ [<code>Vec3</code>](#Vec3)
Returns the Z axis of this quaternion.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the Z axis as a Vec3.  
<a name="Quat+mirror"></a>

### quat.mirror(axisIndex) ⇒ [<code>Quat</code>](#Quat)
Reflects this quaternion according to the axis provided.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| axisIndex | <code>number</code> | An integer with value of 0 for the X axis, 1 for the Y axis, and 2 for the Z axis. |

<a name="Quat+toMat4"></a>

### quat.toMat4() ⇒ [<code>Mat4</code>](#Mat4)
Converts this Quat to a Mat4 (a 4x4 matrix).

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  
<a name="Quat+lerp"></a>

### quat.lerp(other, t) ⇒ [<code>Quat</code>](#Quat)
Performs a linear interpolation between two Quats.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Quat+clone"></a>

### quat.clone() ⇒ [<code>Quat</code>](#Quat)
Clones this Quat and returns a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  
<a name="Quat+toJSON"></a>

### quat.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>object</code> - - The json object.  
<a name="Quat+fromJSON"></a>

### quat.fromJSON(j)
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Ray"></a>

## Ray
**Kind**: global class  

* [Ray](#Ray)
    * [new Ray(start, dir)](#new_Ray_new)
    * [.closestPoint(point)](#Ray+closestPoint) ⇒ [<code>Ray</code>](#Ray)
    * [.pointAtDist(dist)](#Ray+pointAtDist) ⇒ [<code>Ray</code>](#Ray)
    * [.intersectRayVector(ray)](#Ray+intersectRayVector) ⇒ [<code>Ray</code>](#Ray)
    * [.intersectRayPlane(plane)](#Ray+intersectRayPlane) ⇒ <code>any</code>
    * [.clone()](#Ray+clone) ⇒ [<code>Ray</code>](#Ray)
    * [.toJSON()](#Ray+toJSON) ⇒ <code>object</code>
    * [.fromJSON(j)](#Ray+fromJSON)
    * [.toString()](#Ray+toString) ⇒ <code>any</code>

<a name="new_Ray_new"></a>

### new Ray(start, dir)
Create a ray.


| Param | Type | Description |
| --- | --- | --- |
| start | [<code>Vec3</code>](#Vec3) | The origin of the ray. |
| dir | [<code>Vec3</code>](#Vec3) | The direction of the ray. |

<a name="Ray+closestPoint"></a>

### ray.closestPoint(point) ⇒ [<code>Ray</code>](#Ray)
Get the closest point.

**Kind**: instance method of [<code>Ray</code>](#Ray)  
**Returns**: [<code>Ray</code>](#Ray) - - Returns a Ray.  

| Param | Type | Description |
| --- | --- | --- |
| point | [<code>Vec3</code>](#Vec3) | The point in 3D space. |

<a name="Ray+pointAtDist"></a>

### ray.pointAtDist(dist) ⇒ [<code>Ray</code>](#Ray)
Get the closest point at a distance.

**Kind**: instance method of [<code>Ray</code>](#Ray)  
**Returns**: [<code>Ray</code>](#Ray) - - Returns a Ray.  

| Param | Type | Description |
| --- | --- | --- |
| dist | [<code>Vec3</code>](#Vec3) | The distance value. |

<a name="Ray+intersectRayVector"></a>

### ray.intersectRayVector(ray) ⇒ [<code>Ray</code>](#Ray)
Returns the two ray params that represent the closest point between the two rays.

**Kind**: instance method of [<code>Ray</code>](#Ray)  
**Returns**: [<code>Ray</code>](#Ray) - - Returns a Ray.  

| Param | Type | Description |
| --- | --- | --- |
| ray | [<code>Ray</code>](#Ray) | The ray value. |

<a name="Ray+intersectRayPlane"></a>

### ray.intersectRayPlane(plane) ⇒ <code>any</code>
Returns one ray param representing the intersectionof this ray against the plane defined by the given ray.

**Kind**: instance method of [<code>Ray</code>](#Ray)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| plane | <code>any</code> | The plane to intersect with. |

<a name="Ray+clone"></a>

### ray.clone() ⇒ [<code>Ray</code>](#Ray)
Clones this Ray and returns a new Ray.

**Kind**: instance method of [<code>Ray</code>](#Ray)  
**Returns**: [<code>Ray</code>](#Ray) - - Returns a new Ray.  
<a name="Ray+toJSON"></a>

### ray.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Ray</code>](#Ray)  
**Returns**: <code>object</code> - - The json object.  
<a name="Ray+fromJSON"></a>

### ray.fromJSON(j)
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Ray</code>](#Ray)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Ray+toString"></a>

### ray.toString() ⇒ <code>any</code>
The toString method.

**Kind**: instance method of [<code>Ray</code>](#Ray)  
**Returns**: <code>any</code> - - The return value.  
<a name="RGBA"></a>

## RGBA
**Kind**: global class  

* [RGBA](#RGBA)
    * [new RGBA(r, g, b, a)](#new_RGBA_new)
    * _instance_
        * [.r](#RGBA+r) ⇒ [<code>RGBA</code>](#RGBA)
        * [.r](#RGBA+r)
        * [.g](#RGBA+g) ⇒ [<code>RGBA</code>](#RGBA)
        * [.g](#RGBA+g)
        * [.b](#RGBA+b) ⇒ [<code>RGBA</code>](#RGBA)
        * [.b](#RGBA+b)
        * [.a](#RGBA+a) ⇒ [<code>RGBA</code>](#RGBA)
        * [.a](#RGBA+a)
        * [.set(r, g, b, a)](#RGBA+set)
        * [.setFromOther(other)](#RGBA+setFromOther)
        * [.setFromArray(vals)](#RGBA+setFromArray)
        * [.setFromHex(hex)](#RGBA+setFromHex)
        * [.setFromCSSColorName(name)](#RGBA+setFromCSSColorName)
        * [.toHex()](#RGBA+toHex) ⇒ <code>number</code>
        * [.equal(other)](#RGBA+equal) ⇒ <code>boolean</code>
        * [.notequals(other)](#RGBA+notequals) ⇒ <code>boolean</code>
        * [.approxEqual(other, precision)](#RGBA+approxEqual) ⇒ <code>boolean</code>
        * [.add(other)](#RGBA+add) ⇒ [<code>RGBA</code>](#RGBA)
        * [.subtract(other)](#RGBA+subtract) ⇒ [<code>RGBA</code>](#RGBA)
        * [.scale(scalar)](#RGBA+scale) ⇒ [<code>RGBA</code>](#RGBA)
        * [.scaleInPlace(scalar)](#RGBA+scaleInPlace)
        * [.applyGamma(gamma)](#RGBA+applyGamma)
        * [.toLinear(gamma)](#RGBA+toLinear) ⇒ [<code>Color</code>](#Color)
        * [.toGamma(gamma)](#RGBA+toGamma) ⇒ [<code>RGBA</code>](#RGBA)
        * [.luminance()](#RGBA+luminance) ⇒ <code>number</code>
        * [.lerp(other, t)](#RGBA+lerp) ⇒ [<code>RGBA</code>](#RGBA)
        * [.clone()](#RGBA+clone) ⇒ [<code>RGBA</code>](#RGBA)
        * [.asArray()](#RGBA+asArray) ⇒ <code>array</code>
        * [.as3ComponentArray()](#RGBA+as3ComponentArray) ⇒ <code>array</code>
        * [.toJSON()](#RGBA+toJSON) ⇒ <code>object</code>
        * [.fromJSON(j)](#RGBA+fromJSON)
        * [.toCSSString()](#RGBA+toCSSString) ⇒ <code>any</code>
    * _static_
        * [.random(gammaOffset, randomAlpha)](#RGBA.random) ⇒ [<code>RGBA</code>](#RGBA)

<a name="new_RGBA_new"></a>

### new RGBA(r, g, b, a)
Create a RGBA.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> | <code>0</code> | The red channel of a color. |
| g | <code>number</code> | <code>0</code> | The green channel of a color. |
| b | <code>number</code> | <code>0</code> | The blue channel of a color. |
| a | <code>number</code> | <code>255</code> | The alpha (transparency) channel of a color. |

<a name="RGBA+r"></a>

### rgbA.r ⇒ [<code>RGBA</code>](#RGBA)
Getter for red channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the red channel.  
<a name="RGBA+r"></a>

### rgbA.r
Setter for red channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+g"></a>

### rgbA.g ⇒ [<code>RGBA</code>](#RGBA)
Getter for green channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the green channel.  
<a name="RGBA+g"></a>

### rgbA.g
Setter for green channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+b"></a>

### rgbA.b ⇒ [<code>RGBA</code>](#RGBA)
Getter for blue channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the blue channel.  
<a name="RGBA+b"></a>

### rgbA.b
Setter for blue channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+a"></a>

### rgbA.a ⇒ [<code>RGBA</code>](#RGBA)
Getter for alpha channel.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns the alpha channel.  
<a name="RGBA+a"></a>

### rgbA.a
Setter for alpha value.

**Kind**: instance property of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="RGBA+set"></a>

### rgbA.set(r, g, b, a)
Setter from scalar components.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> |  | The red channel. |
| g | <code>number</code> |  | The green channel. |
| b | <code>number</code> |  | The blue channel. |
| a | <code>number</code> | <code>255</code> | The alpha channel. |

<a name="RGBA+setFromOther"></a>

### rgbA.setFromOther(other)
Setter from another RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to set from. |

<a name="RGBA+setFromArray"></a>

### rgbA.setFromArray(vals)
Setter from a scalar array.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| vals | <code>any</code> | The vals param. |

<a name="RGBA+setFromHex"></a>

### rgbA.setFromHex(hex)
Setter from a hexadecimal value.E.g. #ff0000

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>number</code> | The hex value. |

<a name="RGBA+setFromCSSColorName"></a>

### rgbA.setFromCSSColorName(name)
Setter from a CSS color name.E.g. "red"

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The CSS color name. |

<a name="RGBA+toHex"></a>

### rgbA.toHex() ⇒ <code>number</code>
Returns the hexadecimal value of this RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>number</code> - - Returns the hex value.  
<a name="RGBA+equal"></a>

### rgbA.equal(other) ⇒ <code>boolean</code>
Returns true if this RGBA color is exactly the same as other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to compare with. |

<a name="RGBA+notequals"></a>

### rgbA.notequals(other) ⇒ <code>boolean</code>
Returns true if this RGBA color is NOT exactly the same as other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to compare with. |

<a name="RGBA+approxEqual"></a>

### rgbA.approxEqual(other, precision) ⇒ <code>boolean</code>
Returns true if this RGBA color is approximately the same as other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="RGBA+add"></a>

### rgbA.add(other) ⇒ [<code>RGBA</code>](#RGBA)
Returns a new RGBA color which is this RGBA color added to other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to add. |

<a name="RGBA+subtract"></a>

### rgbA.subtract(other) ⇒ [<code>RGBA</code>](#RGBA)
Returns a new RGBA color which is this RGBA color subtracted from other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to subtract. |

<a name="RGBA+scale"></a>

### rgbA.scale(scalar) ⇒ [<code>RGBA</code>](#RGBA)
Returns a new RGBA color which is this vector scaled by scalar.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="RGBA+scaleInPlace"></a>

### rgbA.scaleInPlace(scalar)
Scales this RGBA color by scalar.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="RGBA+applyGamma"></a>

### rgbA.applyGamma(gamma)
Apply gamma correction to this RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| gamma | <code>number</code> | The gamma value. |

<a name="RGBA+toLinear"></a>

### rgbA.toLinear(gamma) ⇒ [<code>Color</code>](#Color)
Converts to linear color space and returns a new color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new RGBA.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="RGBA+toGamma"></a>

### rgbA.toGamma(gamma) ⇒ [<code>RGBA</code>](#RGBA)
Converts to gamma color space and returns a new RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="RGBA+luminance"></a>

### rgbA.luminance() ⇒ <code>number</code>
The luminance method.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>number</code> - - The return value.  
<a name="RGBA+lerp"></a>

### rgbA.lerp(other, t) ⇒ [<code>RGBA</code>](#RGBA)
Performs a linear interpolation between this RGBA color and other.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>RGBA</code>](#RGBA) | The other RGBA to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="RGBA+clone"></a>

### rgbA.clone() ⇒ [<code>RGBA</code>](#RGBA)
Clones this RGBA color and returns a new RGBA color.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new RGBA.  
<a name="RGBA+asArray"></a>

### rgbA.asArray() ⇒ <code>array</code>
Returns the type as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>array</code> - - Returns as an array.  
<a name="RGBA+as3ComponentArray"></a>

### rgbA.as3ComponentArray() ⇒ <code>array</code>
Returns the type as a 3 component array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>array</code> - - Returns as a 3 component array.  
<a name="RGBA+toJSON"></a>

### rgbA.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>object</code> - - The json object.  
<a name="RGBA+fromJSON"></a>

### rgbA.fromJSON(j)
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="RGBA+toCSSString"></a>

### rgbA.toCSSString() ⇒ <code>any</code>
The toCSSString method.

**Kind**: instance method of [<code>RGBA</code>](#RGBA)  
**Returns**: <code>any</code> - - The return value.  
<a name="RGBA.random"></a>

### RGBA.random(gammaOffset, randomAlpha) ⇒ [<code>RGBA</code>](#RGBA)
Creates a random RGBA.

**Kind**: static method of [<code>RGBA</code>](#RGBA)  
**Returns**: [<code>RGBA</code>](#RGBA) - - Returns a new random RGBA.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gammaOffset | <code>number</code> | <code>0</code> | The gamma offset. |
| randomAlpha | <code>boolean</code> | <code>false</code> | Determines whether the alpha channel is random. |

<a name="SphereType"></a>

## SphereType
**Kind**: global class  

* [SphereType](#SphereType)
    * [new SphereType(pos, radius)](#new_SphereType_new)
    * [.clone()](#SphereType+clone) ⇒ <code>Sphere</code>
    * [.intersectsBox(box)](#SphereType+intersectsBox) ⇒ <code>any</code>
    * [.toJSON()](#SphereType+toJSON) ⇒ <code>object</code>
    * [.toString()](#SphereType+toString) ⇒ <code>any</code>

<a name="new_SphereType_new"></a>

### new SphereType(pos, radius)
Create a sphere.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pos | [<code>Vec3</code>](#Vec3) |  | The position of the sphere. |
| radius | <code>number</code> | <code>0</code> | The radius of the sphere. |

<a name="SphereType+clone"></a>

### sphereType.clone() ⇒ <code>Sphere</code>
Clones this sphere and returns a new sphere.

**Kind**: instance method of [<code>SphereType</code>](#SphereType)  
**Returns**: <code>Sphere</code> - - Returns a new sphere.  
<a name="SphereType+intersectsBox"></a>

### sphereType.intersectsBox(box) ⇒ <code>any</code>
Checks if this spehere intersects a box.

**Kind**: instance method of [<code>SphereType</code>](#SphereType)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| box | <code>any</code> | The box value. |

<a name="SphereType+toJSON"></a>

### sphereType.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>SphereType</code>](#SphereType)  
**Returns**: <code>object</code> - - The json object.  
<a name="SphereType+toString"></a>

### sphereType.toString() ⇒ <code>any</code>
The toString method.

**Kind**: instance method of [<code>SphereType</code>](#SphereType)  
**Returns**: <code>any</code> - - The return value.  
<a name="TypeRegistry"></a>

## TypeRegistry
**Kind**: global class  

* [TypeRegistry](#TypeRegistry)
    * [new TypeRegistry()](#new_TypeRegistry_new)
    * [.registerType(key, type)](#TypeRegistry+registerType)
    * [.getType(key)](#TypeRegistry+getType) ⇒ <code>any</code>
    * [.getTypeName(type)](#TypeRegistry+getTypeName) ⇒ <code>any</code>

<a name="new_TypeRegistry_new"></a>

### new TypeRegistry()
Create a a type registry.

<a name="TypeRegistry+registerType"></a>

### typeRegistry.registerType(key, type)
The registerType method.

**Kind**: instance method of [<code>TypeRegistry</code>](#TypeRegistry)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |
| type | <code>any</code> | The type value. |

<a name="TypeRegistry+getType"></a>

### typeRegistry.getType(key) ⇒ <code>any</code>
The getType method.

**Kind**: instance method of [<code>TypeRegistry</code>](#TypeRegistry)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |

<a name="TypeRegistry+getTypeName"></a>

### typeRegistry.getTypeName(type) ⇒ <code>any</code>
The getTypeName method.

**Kind**: instance method of [<code>TypeRegistry</code>](#TypeRegistry)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>any</code> | The type value. |

<a name="Vec2"></a>

## Vec2
**Kind**: global class  

* [Vec2](#Vec2)
    * [new Vec2(x, y)](#new_Vec2_new)
    * [.x](#Vec2+x) ⇒ <code>number</code>
    * [.x](#Vec2+x)
    * [.y](#Vec2+y) ⇒ <code>number</code>
    * [.y](#Vec2+y)
    * [.set(x, y)](#Vec2+set)
    * [.setFromOther(other)](#Vec2+setFromOther)
    * [.equal(other)](#Vec2+equal) ⇒ <code>boolean</code>
    * [.notEquals(other)](#Vec2+notEquals) ⇒ <code>boolean</code>
    * [.approxEqual(other, precision)](#Vec2+approxEqual) ⇒ <code>boolean</code>
    * [.add(other)](#Vec2+add) ⇒ [<code>Vec2</code>](#Vec2)
    * [.addInPlace(other)](#Vec2+addInPlace)
    * [.subtract(other)](#Vec2+subtract) ⇒ [<code>Vec2</code>](#Vec2)
    * [.subtractInPlace(other)](#Vec2+subtractInPlace) ⇒ [<code>Vec2</code>](#Vec2)
    * [.scale(scalar)](#Vec2+scale) ⇒ [<code>Vec2</code>](#Vec2)
    * [.scaleInPlace(scalar)](#Vec2+scaleInPlace)
    * [.invert()](#Vec2+invert) ⇒ [<code>Vec2</code>](#Vec2)
    * [.invertInPlace()](#Vec2+invertInPlace) ⇒ [<code>Vec2</code>](#Vec2)
    * [.multiply(other)](#Vec2+multiply) ⇒ [<code>Vec2</code>](#Vec2)
    * [.multiplyInPlace(other)](#Vec2+multiplyInPlace)
    * [.lengthSquared()](#Vec2+lengthSquared) ⇒ <code>number</code>
    * [.length()](#Vec2+length) ⇒ <code>number</code>
    * [.distanceTo(other)](#Vec2+distanceTo) ⇒ <code>number</code>
    * [.normalize()](#Vec2+normalize) ⇒ [<code>Vec2</code>](#Vec2)
    * [.normalizeInPlace()](#Vec2+normalizeInPlace)
    * [.dot(other)](#Vec2+dot) ⇒ <code>number</code>
    * [.cross(other)](#Vec2+cross) ⇒ <code>number</code>
    * [.angleTo(other)](#Vec2+angleTo) ⇒ <code>number</code>
    * [.signedAngleTo(other)](#Vec2+signedAngleTo) ⇒ <code>number</code>
    * [.rotate(angle)](#Vec2+rotate) ⇒ [<code>Vec2</code>](#Vec2)
    * [.lerp(other, t)](#Vec2+lerp) ⇒ [<code>Vec2</code>](#Vec2)
    * [.setRandomDir(scale)](#Vec2+setRandomDir) ⇒ [<code>Vec2</code>](#Vec2)
    * [.setRandom(scale)](#Vec2+setRandom) ⇒ <code>any</code>
    * [.clone()](#Vec2+clone) ⇒ [<code>Vec2</code>](#Vec2)
    * [.asArray()](#Vec2+asArray) ⇒ <code>array</code>
    * [.toJSON()](#Vec2+toJSON) ⇒ <code>object</code>
    * [.fromJSON(j)](#Vec2+fromJSON)

<a name="new_Vec2_new"></a>

### new Vec2(x, y)
Create a Vec2.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>0</code> | The x value. Default is 0. |
| y | <code>number</code> | <code>0</code> | The y value. Default is 0. |

<a name="Vec2+x"></a>

### vec2.x ⇒ <code>number</code>
Getter for x value.

**Kind**: instance property of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the x value.  
<a name="Vec2+x"></a>

### vec2.x
Setter for x value.

**Kind**: instance property of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec2+y"></a>

### vec2.y ⇒ <code>number</code>
Getter for y value.

**Kind**: instance property of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the y value.  
<a name="Vec2+y"></a>

### vec2.y
Setter for y value.

**Kind**: instance property of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec2+set"></a>

### vec2.set(x, y)
Setter from scalar components.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |

<a name="Vec2+setFromOther"></a>

### vec2.setFromOther(other)
Setter from another Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to set from. |

<a name="Vec2+equal"></a>

### vec2.equal(other) ⇒ <code>boolean</code>
Returns true if this Vec2 is exactly the same as other.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+notEquals"></a>

### vec2.notEquals(other) ⇒ <code>boolean</code>
Returns true if this vector is NOT exactly the same as other.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+approxEqual"></a>

### vec2.approxEqual(other, precision) ⇒ <code>boolean</code>
Returns true if this Vec2 is approximately the same as other.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Vec2+add"></a>

### vec2.add(other) ⇒ [<code>Vec2</code>](#Vec2)
Adds other to this Vec2 and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to add. |

<a name="Vec2+addInPlace"></a>

### vec2.addInPlace(other)
Adds other to this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to add. |

<a name="Vec2+subtract"></a>

### vec2.subtract(other) ⇒ [<code>Vec2</code>](#Vec2)
Subtracts other from this Vec2 and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to subtract. |

<a name="Vec2+subtractInPlace"></a>

### vec2.subtractInPlace(other) ⇒ [<code>Vec2</code>](#Vec2)
Subtracts other from this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to subtract. |

<a name="Vec2+scale"></a>

### vec2.scale(scalar) ⇒ [<code>Vec2</code>](#Vec2)
Scales this Vec2 by scalar and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec2+scaleInPlace"></a>

### vec2.scaleInPlace(scalar)
Scales this Vec2 by scalar.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec2+invert"></a>

### vec2.invert() ⇒ [<code>Vec2</code>](#Vec2)
Inverts this Vec2 and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  
<a name="Vec2+invertInPlace"></a>

### vec2.invertInPlace() ⇒ [<code>Vec2</code>](#Vec2)
Inverts this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - The return value.  
<a name="Vec2+multiply"></a>

### vec2.multiply(other) ⇒ [<code>Vec2</code>](#Vec2)
Multiplies two Vec2s and returns the result as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to multiply with. |

<a name="Vec2+multiplyInPlace"></a>

### vec2.multiplyInPlace(other)
Multiplies two Vec2s.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to multiply with. |

<a name="Vec2+lengthSquared"></a>

### vec2.lengthSquared() ⇒ <code>number</code>
Calculates the squared length of this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the length squared.  
<a name="Vec2+length"></a>

### vec2.length() ⇒ <code>number</code>
Calculates the length of this Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec2+distanceTo"></a>

### vec2.distanceTo(other) ⇒ <code>number</code>
Calculates the distance to another vector.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the distance between vectors.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other value. |

<a name="Vec2+normalize"></a>

### vec2.normalize() ⇒ [<code>Vec2</code>](#Vec2)
Normalizes the Vec2 and returns it as a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns the Vec2 normalized.  
<a name="Vec2+normalizeInPlace"></a>

### vec2.normalizeInPlace()
Normalizes the Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
<a name="Vec2+dot"></a>

### vec2.dot(other) ⇒ <code>number</code>
Calculates the dot product of this Vec2 against another Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the dot product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+cross"></a>

### vec2.cross(other) ⇒ <code>number</code>
Calculates the cross product of this Vec2 against another Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the cross product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+angleTo"></a>

### vec2.angleTo(other) ⇒ <code>number</code>
Gets the angle between this Vec2 and other assuming both are normalized vectors.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+signedAngleTo"></a>

### vec2.signedAngleTo(other) ⇒ <code>number</code>
Gets the angle between this Vec2 and other.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>number</code> - - Returns the angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to compare with. |

<a name="Vec2+rotate"></a>

### vec2.rotate(angle) ⇒ [<code>Vec2</code>](#Vec2)
Rotates a Vec2 in a clockwise direction and returns a new rotated Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns the rotated vect  or.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | The angle of rotation. |

<a name="Vec2+lerp"></a>

### vec2.lerp(other, t) ⇒ [<code>Vec2</code>](#Vec2)
Performs a linear interpolation between this Vec2 and other.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec2</code>](#Vec2) | The other Vec2 to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Vec2+setRandomDir"></a>

### vec2.setRandomDir(scale) ⇒ [<code>Vec2</code>](#Vec2)
Generates a random vector with the given scale.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | Length of the resulting vector. If ommitted, a unit vector will be returned. |

<a name="Vec2+setRandom"></a>

### vec2.setRandom(scale) ⇒ <code>any</code>
The setRandom method.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | The scale value. |

<a name="Vec2+clone"></a>

### vec2.clone() ⇒ [<code>Vec2</code>](#Vec2)
Clones this Vec2 and returns a new Vec2.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: [<code>Vec2</code>](#Vec2) - - Returns a new Vec2.  
<a name="Vec2+asArray"></a>

### vec2.asArray() ⇒ <code>array</code>
Returns the tpye as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>array</code> - - Returns as an array.  
<a name="Vec2+toJSON"></a>

### vec2.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistence.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  
**Returns**: <code>object</code> - - The json object.  
<a name="Vec2+fromJSON"></a>

### vec2.fromJSON(j)
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Vec2</code>](#Vec2)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Vec3"></a>

## Vec3
**Kind**: global class  

* [Vec3](#Vec3)
    * [new Vec3(x, y, z)](#new_Vec3_new)
    * [.x](#Vec3+x) ⇒ <code>number</code>
    * [.x](#Vec3+x)
    * [.y](#Vec3+y) ⇒ <code>number</code>
    * [.y](#Vec3+y)
    * [.z](#Vec3+z) ⇒ <code>number</code>
    * [.z](#Vec3+z)
    * [.xy](#Vec3+xy) ⇒ <code>number</code>
    * [.yz](#Vec3+yz) ⇒ <code>number</code>
    * [.set(x, y, z)](#Vec3+set)
    * [.setDataArray(float32Array)](#Vec3+setDataArray)
    * [.setFromOther(other)](#Vec3+setFromOther)
    * [.isNull()](#Vec3+isNull) ⇒ <code>boolean</code>
    * [.is111()](#Vec3+is111) ⇒ <code>boolean</code>
    * [.equal(other)](#Vec3+equal) ⇒ <code>boolean</code>
    * [.notEquals(other)](#Vec3+notEquals) ⇒ <code>boolean</code>
    * [.approxEqual(other, precision)](#Vec3+approxEqual) ⇒ <code>boolean</code>
    * [.add(other)](#Vec3+add) ⇒ [<code>Vec3</code>](#Vec3)
    * [.addInPlace(other)](#Vec3+addInPlace)
    * [.subtract(other)](#Vec3+subtract) ⇒ [<code>Vec3</code>](#Vec3)
    * [.subtractInPlace(other)](#Vec3+subtractInPlace)
    * [.multiply(other)](#Vec3+multiply) ⇒ [<code>Vec3</code>](#Vec3)
    * [.multiplyInPlace(other)](#Vec3+multiplyInPlace)
    * [.divide(vec3)](#Vec3+divide) ⇒ [<code>Vec3</code>](#Vec3)
    * [.divideInPlace(vec3)](#Vec3+divideInPlace)
    * [.scale(scalar)](#Vec3+scale) ⇒ [<code>Vec3</code>](#Vec3)
    * [.scaleInPlace(scalar)](#Vec3+scaleInPlace)
    * [.negate()](#Vec3+negate) ⇒ [<code>Vec3</code>](#Vec3)
    * [.inverse()](#Vec3+inverse) ⇒ [<code>Vec3</code>](#Vec3)
    * [.lengthSquared()](#Vec3+lengthSquared) ⇒ <code>number</code>
    * [.length()](#Vec3+length) ⇒ <code>number</code>
    * [.distanceTo(other)](#Vec3+distanceTo) ⇒ <code>number</code>
    * [.normalize()](#Vec3+normalize) ⇒ [<code>Vec3</code>](#Vec3)
    * [.normalizeInPlace()](#Vec3+normalizeInPlace) ⇒ <code>any</code>
    * [.resize(length)](#Vec3+resize) ⇒ [<code>Vec3</code>](#Vec3)
    * [.resizeInPlace(length)](#Vec3+resizeInPlace)
    * [.dot(other)](#Vec3+dot) ⇒ <code>number</code>
    * [.cross(other)](#Vec3+cross) ⇒ [<code>Vec3</code>](#Vec3)
    * [.angleTo(other)](#Vec3+angleTo) ⇒ <code>number</code>
    * [.lerp(other, t)](#Vec3+lerp) ⇒ [<code>Vec3</code>](#Vec3)
    * [.abs()](#Vec3+abs) ⇒ [<code>Vec3</code>](#Vec3)
    * [.setRandomDir(scale)](#Vec3+setRandomDir) ⇒ [<code>Vec3</code>](#Vec3)
    * [.setRandom(scale)](#Vec3+setRandom) ⇒ [<code>Vec3</code>](#Vec3)
    * [.clone()](#Vec3+clone) ⇒ [<code>Vec3</code>](#Vec3)
    * [.asArray()](#Vec3+asArray) ⇒ <code>array</code>
    * [.toJSON()](#Vec3+toJSON) ⇒ <code>object</code>
    * [.fromJSON(j)](#Vec3+fromJSON)

<a name="new_Vec3_new"></a>

### new Vec3(x, y, z)
Create a Vec3.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>0</code> | The x value. Default is 0. |
| y | <code>number</code> | <code>0</code> | The y value. Default is 0. |
| z | <code>number</code> | <code>0</code> | The z value. Default is 0. |

<a name="Vec3+x"></a>

### vec3.x ⇒ <code>number</code>
Getter for x value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the x value.  
<a name="Vec3+x"></a>

### vec3.x
Setter for x value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec3+y"></a>

### vec3.y ⇒ <code>number</code>
Getter for y value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the y value.  
<a name="Vec3+y"></a>

### vec3.y
Setter for y value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec3+z"></a>

### vec3.z ⇒ <code>number</code>
Getter for z value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the z value.  
<a name="Vec3+z"></a>

### vec3.z
Setter for z value.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec3+xy"></a>

### vec3.xy ⇒ <code>number</code>
Getter for xy swizzel.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the z value.  
<a name="Vec3+yz"></a>

### vec3.yz ⇒ <code>number</code>
Getter for yz swizzel.

**Kind**: instance property of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the z value.  
<a name="Vec3+set"></a>

### vec3.set(x, y, z)
Setter from scalar components.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| z | <code>number</code> | The y value. |

<a name="Vec3+setDataArray"></a>

### vec3.setDataArray(float32Array)
The setDataArray method.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| float32Array | <code>any</code> | The float32Array value. |

<a name="Vec3+setFromOther"></a>

### vec3.setFromOther(other)
Setter from another Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to set from. |

<a name="Vec3+isNull"></a>

### vec3.isNull() ⇒ <code>boolean</code>
Returns true if the Vec3 contains 0 0 0.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - Returns true or false.  
<a name="Vec3+is111"></a>

### vec3.is111() ⇒ <code>boolean</code>
The is111 method returns true if the Vec3 contains 1 1 1.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="Vec3+equal"></a>

### vec3.equal(other) ⇒ <code>boolean</code>
Returns true if this Vec3 is exactly the same as other.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |

<a name="Vec3+notEquals"></a>

### vec3.notEquals(other) ⇒ <code>boolean</code>
Returns true if this vector is NOT exactly the same other.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |

<a name="Vec3+approxEqual"></a>

### vec3.approxEqual(other, precision) ⇒ <code>boolean</code>
Returns true if this Vec3 is approximately the same as other.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Vec3+add"></a>

### vec3.add(other) ⇒ [<code>Vec3</code>](#Vec3)
Adds other to this Vec3 and return the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to add. |

<a name="Vec3+addInPlace"></a>

### vec3.addInPlace(other)
Adds other to this Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to add. |

<a name="Vec3+subtract"></a>

### vec3.subtract(other) ⇒ [<code>Vec3</code>](#Vec3)
Subtracts other from this Vec3 and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to subtract. |

<a name="Vec3+subtractInPlace"></a>

### vec3.subtractInPlace(other)
Subtracts other from this Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to subtract. |

<a name="Vec3+multiply"></a>

### vec3.multiply(other) ⇒ [<code>Vec3</code>](#Vec3)
Multiplies two Vec3s and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to multiply with. |

<a name="Vec3+multiplyInPlace"></a>

### vec3.multiplyInPlace(other)
Multiplies two Vec3s.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to multiply with. |

<a name="Vec3+divide"></a>

### vec3.divide(vec3) ⇒ [<code>Vec3</code>](#Vec3)
Divides two Vec3s and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The other Vec3 to divide by. |

<a name="Vec3+divideInPlace"></a>

### vec3.divideInPlace(vec3)
Divides two Vec3s.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The other Vec3 to divide by. |

<a name="Vec3+scale"></a>

### vec3.scale(scalar) ⇒ [<code>Vec3</code>](#Vec3)
Scales this Vec3 by scalar and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec3+scaleInPlace"></a>

### vec3.scaleInPlace(scalar)
Scales this Vec3 by scalar.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec3+negate"></a>

### vec3.negate() ⇒ [<code>Vec3</code>](#Vec3)
Negates this Vec3 (x = -x, y = -y and z = -z)and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  
<a name="Vec3+inverse"></a>

### vec3.inverse() ⇒ [<code>Vec3</code>](#Vec3)
The inverse method.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  
<a name="Vec3+lengthSquared"></a>

### vec3.lengthSquared() ⇒ <code>number</code>
Calculates the squared length of this Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec3+length"></a>

### vec3.length() ⇒ <code>number</code>
Calculates the length of this Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec3+distanceTo"></a>

### vec3.distanceTo(other) ⇒ <code>number</code>
Calculates the distance to another Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the distance between vectors.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to calculate the distance to. |

<a name="Vec3+normalize"></a>

### vec3.normalize() ⇒ [<code>Vec3</code>](#Vec3)
Normalizes the Vec3 and returns it as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the Vec3 normalized.  
<a name="Vec3+normalizeInPlace"></a>

### vec3.normalizeInPlace() ⇒ <code>any</code>
Normalizes the vector, modifying it and returning its original length.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>any</code> - - The return value.  
<a name="Vec3+resize"></a>

### vec3.resize(length) ⇒ [<code>Vec3</code>](#Vec3)
The resize method returns a new Vec3 with the given length.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | The length value. |

<a name="Vec3+resizeInPlace"></a>

### vec3.resizeInPlace(length)
The resizeInPlace method.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | The length value. |

<a name="Vec3+dot"></a>

### vec3.dot(other) ⇒ <code>number</code>
Calculates the dot product of this Vec3 against another Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the dot product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |

<a name="Vec3+cross"></a>

### vec3.cross(other) ⇒ [<code>Vec3</code>](#Vec3)
Calculates the cross product of two Vec3s and returns the result as a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the cross product as a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to calculate with. |

<a name="Vec3+angleTo"></a>

### vec3.angleTo(other) ⇒ <code>number</code>
Gets the angle between this Vec3 and b.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>number</code> - - Returns the angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to compare with. |

<a name="Vec3+lerp"></a>

### vec3.lerp(other, t) ⇒ [<code>Vec3</code>](#Vec3)
Performs a linear interpolation between this Vec3 and other.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec3</code>](#Vec3) | The other Vec3 to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Vec3+abs"></a>

### vec3.abs() ⇒ [<code>Vec3</code>](#Vec3)
Returns a new Vec3 whose component values are the abs of this Vec3s component values.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  
<a name="Vec3+setRandomDir"></a>

### vec3.setRandomDir(scale) ⇒ [<code>Vec3</code>](#Vec3)
Sets the vector a random vector on the surface of a sphere with the radius of the givenn scale value.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - The random Vec3.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | The radius of the surface sphere. |

<a name="Vec3+setRandom"></a>

### vec3.setRandom(scale) ⇒ [<code>Vec3</code>](#Vec3)
Generates a randome vector anywhere in the sphere defined by the provided scale value.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - The random Vec3.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | The radius of the bounding sphere. |

<a name="Vec3+clone"></a>

### vec3.clone() ⇒ [<code>Vec3</code>](#Vec3)
Clones this Vec3 and returns a new Vec3.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns a new Vec3.  
<a name="Vec3+asArray"></a>

### vec3.asArray() ⇒ <code>array</code>
Returns the type as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>array</code> - - Returns as an array.  
<a name="Vec3+toJSON"></a>

### vec3.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  
**Returns**: <code>object</code> - - The json object.  
<a name="Vec3+fromJSON"></a>

### vec3.fromJSON(j)
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Vec3</code>](#Vec3)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Vec4"></a>

## Vec4
**Kind**: global class  

* [Vec4](#Vec4)
    * [new Vec4(x, y, z, t)](#new_Vec4_new)
    * [.x](#Vec4+x) ⇒ <code>number</code>
    * [.x](#Vec4+x)
    * [.y](#Vec4+y) ⇒ <code>number</code>
    * [.y](#Vec4+y)
    * [.z](#Vec4+z)
    * [.z](#Vec4+z)
    * [.t](#Vec4+t)
    * [.t](#Vec4+t)
    * [.xyz](#Vec4+xyz) ⇒ <code>number</code>
    * [.set(x, y, z, t)](#Vec4+set)
    * [.setFromOther(other)](#Vec4+setFromOther)
    * [.equal(other)](#Vec4+equal) ⇒ <code>boolean</code>
    * [.notEquals(other)](#Vec4+notEquals) ⇒ <code>boolean</code>
    * [.approxEqual(other, precision)](#Vec4+approxEqual) ⇒ <code>boolean</code>
    * [.add(other)](#Vec4+add) ⇒ [<code>Vec4</code>](#Vec4)
    * [.addInPlace(other)](#Vec4+addInPlace)
    * [.subtract(other)](#Vec4+subtract) ⇒ [<code>Vec4</code>](#Vec4)
    * [.subtractInPlace(other)](#Vec4+subtractInPlace)
    * [.multiply(other)](#Vec4+multiply) ⇒ [<code>Vec4</code>](#Vec4)
    * [.multiplyInPlace(other)](#Vec4+multiplyInPlace)
    * [.divide(other)](#Vec4+divide) ⇒ [<code>Vec4</code>](#Vec4)
    * [.divideInPlace(other)](#Vec4+divideInPlace)
    * [.scale(scalar)](#Vec4+scale) ⇒ [<code>Vec4</code>](#Vec4)
    * [.scaleInPlace(scalar)](#Vec4+scaleInPlace)
    * [.length()](#Vec4+length) ⇒ <code>number</code>
    * [.lengthSquared()](#Vec4+lengthSquared) ⇒ <code>number</code>
    * [.normalize()](#Vec4+normalize) ⇒ [<code>Vec4</code>](#Vec4)
    * [.normalizeInPlace()](#Vec4+normalizeInPlace)
    * [.dot(other)](#Vec4+dot) ⇒ <code>number</code>
    * [.cross(other)](#Vec4+cross) ⇒ [<code>Vec4</code>](#Vec4)
    * [.angleTo(other)](#Vec4+angleTo) ⇒ <code>number</code>
    * [.lerp(other, t)](#Vec4+lerp) ⇒ [<code>Vec4</code>](#Vec4)
    * [.random(scale)](#Vec4+random) ⇒ [<code>Vec4</code>](#Vec4)
    * [.clone()](#Vec4+clone) ⇒ [<code>Vec4</code>](#Vec4)
    * [.toVec3()](#Vec4+toVec3) ⇒ [<code>Vec3</code>](#Vec3)
    * [.asArray()](#Vec4+asArray) ⇒ <code>any</code>
    * [.toJSON()](#Vec4+toJSON) ⇒ <code>object</code>

<a name="new_Vec4_new"></a>

### new Vec4(x, y, z, t)
Create a Vec4.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>0</code> | The x value. Default is 0. |
| y | <code>number</code> | <code>0</code> | The y value. Default is 0. |
| z | <code>number</code> | <code>0</code> | The y value. Default is 0. |
| t | <code>number</code> | <code>0</code> | The t value. Default is 0. |

<a name="Vec4+x"></a>

### vec4.x ⇒ <code>number</code>
Getter for x value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the x value.  
<a name="Vec4+x"></a>

### vec4.x
Setter for x value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+y"></a>

### vec4.y ⇒ <code>number</code>
Getter for y value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the y value.  
<a name="Vec4+y"></a>

### vec4.y
Setter for y value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+z"></a>

### vec4.z
Getter for z value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+z"></a>

### vec4.z
Setter for z value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+t"></a>

### vec4.t
Getter for t value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+t"></a>

### vec4.t
Setter for t value.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Vec4+xyz"></a>

### vec4.xyz ⇒ <code>number</code>
Getter for xy swizzel.

**Kind**: instance property of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the z value.  
<a name="Vec4+set"></a>

### vec4.set(x, y, z, t)
Setter from scalar components.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x value. |
| y | <code>number</code> | The y value. |
| z | <code>number</code> | The y value. |
| t | <code>number</code> | The t value. |

<a name="Vec4+setFromOther"></a>

### vec4.setFromOther(other)
Setter from another Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to set from. |

<a name="Vec4+equal"></a>

### vec4.equal(other) ⇒ <code>boolean</code>
Returns true if this Vec4 is exactly the same as other.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |

<a name="Vec4+notEquals"></a>

### vec4.notEquals(other) ⇒ <code>boolean</code>
Returns true if this Vec4 is NOT exactly the same as other.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |

<a name="Vec4+approxEqual"></a>

### vec4.approxEqual(other, precision) ⇒ <code>boolean</code>
Returns true if this Vec4 is approximately the same as other.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Vec4+add"></a>

### vec4.add(other) ⇒ [<code>Vec4</code>](#Vec4)
Adds other to this Vec4 and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to add. |

<a name="Vec4+addInPlace"></a>

### vec4.addInPlace(other)
Adds other to this Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to add. |

<a name="Vec4+subtract"></a>

### vec4.subtract(other) ⇒ [<code>Vec4</code>](#Vec4)
Subtracts other from this Vec4 and returns then result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to subtract. |

<a name="Vec4+subtractInPlace"></a>

### vec4.subtractInPlace(other)
Subtracts other from this Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to subtract. |

<a name="Vec4+multiply"></a>

### vec4.multiply(other) ⇒ [<code>Vec4</code>](#Vec4)
Multiplies two Vec4s and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to multiply with. |

<a name="Vec4+multiplyInPlace"></a>

### vec4.multiplyInPlace(other)
Multiplies two Vec4s.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to multiply with. |

<a name="Vec4+divide"></a>

### vec4.divide(other) ⇒ [<code>Vec4</code>](#Vec4)
Divides two Vec4s and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to divide by. |

<a name="Vec4+divideInPlace"></a>

### vec4.divideInPlace(other)
Divides two Vec4s.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to divide by. |

<a name="Vec4+scale"></a>

### vec4.scale(scalar) ⇒ [<code>Vec4</code>](#Vec4)
Scales this Vec4 by scalar and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec4+scaleInPlace"></a>

### vec4.scaleInPlace(scalar)
Scales this Vec4 by scalar.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Vec4+length"></a>

### vec4.length() ⇒ <code>number</code>
Calculates the length of this Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec4+lengthSquared"></a>

### vec4.lengthSquared() ⇒ <code>number</code>
Calculates the squared length of this Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Vec4+normalize"></a>

### vec4.normalize() ⇒ [<code>Vec4</code>](#Vec4)
Normalizes the Vec4 and returns it as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns the Vec4 normalized.  
<a name="Vec4+normalizeInPlace"></a>

### vec4.normalizeInPlace()
Normalizes the Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
<a name="Vec4+dot"></a>

### vec4.dot(other) ⇒ <code>number</code>
Calculates the dot product of this Vec4 against another Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the dot product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |

<a name="Vec4+cross"></a>

### vec4.cross(other) ⇒ [<code>Vec4</code>](#Vec4)
Calculates the cross product of two Vec4s and returns the result as a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns the cross product as a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to calculate with. |

<a name="Vec4+angleTo"></a>

### vec4.angleTo(other) ⇒ <code>number</code>
Gets the angle between this Vec4 and b.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>number</code> - - Returns the angle in radians.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to compare with. |

<a name="Vec4+lerp"></a>

### vec4.lerp(other, t) ⇒ [<code>Vec4</code>](#Vec4)
Performs a linear interpolation between this Vec4 and other.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Vec4</code>](#Vec4) | The other Vec4 to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Vec4+random"></a>

### vec4.random(scale) ⇒ [<code>Vec4</code>](#Vec4)
Generates a random vector with the given scale.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| scale | <code>number</code> | <code>1</code> | Length of the resulting vector. If ommitted, a unit vector will be returned. |

<a name="Vec4+clone"></a>

### vec4.clone() ⇒ [<code>Vec4</code>](#Vec4)
Clones this Vec4 and returns a new Vec4.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec4</code>](#Vec4) - - Returns a new Vec4.  
<a name="Vec4+toVec3"></a>

### vec4.toVec3() ⇒ [<code>Vec3</code>](#Vec3)
Converts this Vec4 into a Vec3.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: [<code>Vec3</code>](#Vec3) - - Returns the value as a new Vec3.  
<a name="Vec4+asArray"></a>

### vec4.asArray() ⇒ <code>any</code>
Returns the type as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>any</code> - - Returns as an array.  
<a name="Vec4+toJSON"></a>

### vec4.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Vec4</code>](#Vec4)  
**Returns**: <code>object</code> - - The json object.  
<a name="Xfo"></a>

## Xfo
Class representing an Xfo transform.

**Kind**: global class  

* [Xfo](#Xfo)
    * [new Xfo(tr, ori, sc)](#new_Xfo_new)
    * [.set(tr, ori, sc)](#Xfo+set)
    * [.setFromOther(other)](#Xfo+setFromOther)
    * [.isIdentity()](#Xfo+isIdentity) ⇒ <code>any</code>
    * [.setLookAt(pos, target, up)](#Xfo+setLookAt)
    * [.multiply(xfo)](#Xfo+multiply) ⇒ [<code>Xfo</code>](#Xfo)
    * [.inverse()](#Xfo+inverse) ⇒ [<code>Xfo</code>](#Xfo)
    * [.transformVec3(vec3)](#Xfo+transformVec3) ⇒ <code>any</code>
    * [.toMat4()](#Xfo+toMat4) ⇒ [<code>Mat4</code>](#Mat4)
    * [.fromMat4(mat4)](#Xfo+fromMat4)
    * [.setFromFloat32Array(float32array)](#Xfo+setFromFloat32Array)
    * [.clone()](#Xfo+clone) ⇒ [<code>Xfo</code>](#Xfo)
    * [.toJSON()](#Xfo+toJSON) ⇒ <code>object</code>
    * [.fromJSON(j)](#Xfo+fromJSON)
    * [.toString()](#Xfo+toString) ⇒ <code>any</code>

<a name="new_Xfo_new"></a>

### new Xfo(tr, ori, sc)
Create a Xfo.


| Param | Type | Description |
| --- | --- | --- |
| tr | <code>any</code> | The translation value. |
| ori | <code>any</code> | The orientation value. |
| sc | <code>any</code> | The scaling value. |

<a name="Xfo+set"></a>

### xfo.set(tr, ori, sc)
The set method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| tr | <code>any</code> | The translation value. |
| ori | <code>any</code> | The orientation value. |
| sc | <code>any</code> | The scaling value. |

<a name="Xfo+setFromOther"></a>

### xfo.setFromOther(other)
Setter from another Xfo.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Xfo</code>](#Xfo) | The other Xfo to set from. |

<a name="Xfo+isIdentity"></a>

### xfo.isIdentity() ⇒ <code>any</code>
The isIdentity method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: <code>any</code> - - The return value.  
<a name="Xfo+setLookAt"></a>

### xfo.setLookAt(pos, target, up)
The setLookAt method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| pos | <code>any</code> | The position value. |
| target | <code>any</code> | The target value. |
| up | <code>any</code> | The up value. |

<a name="Xfo+multiply"></a>

### xfo.multiply(xfo) ⇒ [<code>Xfo</code>](#Xfo)
Multiplies two Xfo transforms.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: [<code>Xfo</code>](#Xfo) - - Returns an Xfo.  

| Param | Type | Description |
| --- | --- | --- |
| xfo | [<code>Xfo</code>](#Xfo) | The xfo to multiply with. |

<a name="Xfo+inverse"></a>

### xfo.inverse() ⇒ [<code>Xfo</code>](#Xfo)
The inverse method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: [<code>Xfo</code>](#Xfo) - - Returns a new Xfo.  
<a name="Xfo+transformVec3"></a>

### xfo.transformVec3(vec3) ⇒ <code>any</code>
The transformVec3 method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | [<code>Vec3</code>](#Vec3) | The vec3 value. |

<a name="Xfo+toMat4"></a>

### xfo.toMat4() ⇒ [<code>Mat4</code>](#Mat4)
Converts this Xfo to a Mat4 (a 4x4 matrix).

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: [<code>Mat4</code>](#Mat4) - - Returns a new Mat4.  
<a name="Xfo+fromMat4"></a>

### xfo.fromMat4(mat4)
The fromMat4 method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | [<code>Mat4</code>](#Mat4) | The mat4 value. |

<a name="Xfo+setFromFloat32Array"></a>

### xfo.setFromFloat32Array(float32array)
The setFromFloat32Array method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| float32array | <code>array</code> | The float32array value. |

<a name="Xfo+clone"></a>

### xfo.clone() ⇒ [<code>Xfo</code>](#Xfo)
Clones this Xfo and returns a new Xfo.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: [<code>Xfo</code>](#Xfo) - - Returns a new Xfo.  
<a name="Xfo+toJSON"></a>

### xfo.toJSON() ⇒ <code>object</code>
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: <code>object</code> - - The json object.  
<a name="Xfo+fromJSON"></a>

### xfo.fromJSON(j)
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Xfo+toString"></a>

### xfo.toString() ⇒ <code>any</code>
The toString method.

**Kind**: instance method of [<code>Xfo</code>](#Xfo)  
**Returns**: <code>any</code> - - The return value.  
