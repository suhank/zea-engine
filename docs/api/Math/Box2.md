<a name="Box2"></a>

## Box2
Class representing a box in 2D space.

**Kind**: global class  

* [Box2](#Box2)
    * [new Box2(p0, p1)](#new-Box2)
    * [set(p0, p1)](#set)
    * [reset()](#reset)
    * [isValid() ⇒ <code>any</code>](#isValid)
    * [addPoint(point)](#addPoint)
    * [size()](#size)
    * [diagonal()](#diagonal)
    * [center() ⇒ <code>Vec2</code>](#center)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [toString() ⇒ <code>any</code>](#toString)

<a name="new_Box2_new"></a>

### new Box2
Create a Box2


| Param | Type | Description |
| --- | --- | --- |
| p0 | <code>Vec2</code> | A point representing the corners of a 2D box. |
| p1 | <code>Vec2</code> | A point representing the corners of a 2D box. |

<a name="Box2+set"></a>

### set
The set method.

**Kind**: instance method of [<code>Box2</code>](#Box2)  

| Param | Type | Description |
| --- | --- | --- |
| p0 | <code>Vec2</code> | A point representing the corners of a 2D box. |
| p1 | <code>Vec2</code> | A point representing the corners of a 2D box. |

<a name="Box2+reset"></a>

### reset
Resets the box2 back to an uninitialized state.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
<a name="Box2+isValid"></a>

### isValid
Returns true if the box has been expanded to contain a point.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>any</code> - - The return value.  
<a name="Box2+addPoint"></a>

### addPoint
Expands the Box2 to contain the new point.

**Kind**: instance method of [<code>Box2</code>](#Box2)  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Vec2</code> | A point represents the corners of a 2D box. |

<a name="Box2+size"></a>

### size
Returns the size of a Box2.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: [<code>Box2</code>](#Box2) - - Returns a Box2.  
<a name="Box2+diagonal"></a>

### diagonal
Returns the size of a Box2 - the same as size().

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: [<code>Box2</code>](#Box2) - - Returns a Box2.  
<a name="Box2+center"></a>

### center
Returns the center point of a Box2.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>Vec2</code> - - Returns a Vec2.  
<a name="Box2+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>object</code> - - The json object.  
<a name="Box2+toString"></a>

### toString
The toString method.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>any</code> - - The return value.  
