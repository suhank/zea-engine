<a name="Cuboid"></a>

## Cuboid ⇐ <code>Mesh</code>
A class for generating a cuboid geometry.

**Kind**: global class  
**Extends**: <code>Mesh</code>  

* [Cuboid ⇐ <code>Mesh</code>](#Cuboid)
    * [new Cuboid(x, y, z, baseZAtZero)](#new-Cuboid)
    * [setSize(x, y, z)](#setSize)
    * [setBaseSize(x, y)](#setBaseSize)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_Cuboid_new"></a>

### new Cuboid
Create a cuboid.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>1</code> | The length of the cuboid along the X axis. |
| y | <code>number</code> | <code>1</code> | The length of the cuboid along the Y axis. |
| z | <code>number</code> | <code>1</code> | The length of the cuboid along the Z axis. |
| baseZAtZero | <code>boolean</code> | <code>false</code> | The baseZAtZero value. |

<a name="Cuboid+setSize"></a>

### setSize
Setter for the size of the cuboid.

**Kind**: instance method of [<code>Cuboid</code>](#Cuboid)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The length of the edges along the X axis. |
| y | <code>number</code> | The length of the edges along the Y axis. |
| z | <code>number</code> | The length of the edges along the Z axis. |

<a name="Cuboid+setBaseSize"></a>

### setBaseSize
Setter for the base size of the cuboid.

**Kind**: instance method of [<code>Cuboid</code>](#Cuboid)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The length of the edges along the X axis. |
| y | <code>number</code> | The length of the edges along the Y axis. |

<a name="Cuboid+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Cuboid</code>](#Cuboid)  
**Returns**: <code>object</code> - - Returns the json object.  