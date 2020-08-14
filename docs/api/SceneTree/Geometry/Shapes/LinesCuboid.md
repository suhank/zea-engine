<a name="LinesCuboid"></a>

### LinesCuboid 
A class for generating a lines cuboid shape(Without faces).

**Parameters**
* **x(`NumberParameter`):** Length of the line cuboid along the `X` axis
* **y(`NumberParameter`):** Length of the line cuboid along the `Y` axis
* **z(`NumberParameter`):** Length of the line cuboid along the `Z` axis
* **BaseZAtZero(`NumberParameter`):** Property to start or not `Z` axis from position `0.


**Extends**: <code>Lines</code>  

* [LinesCuboid ⇐ <code>Lines</code>](#LinesCuboid)
    * [new LinesCuboid(x, y, z, baseZAtZero)](#new-LinesCuboid)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_LinesCuboid_new"></a>

### new LinesCuboid
Create a lines cuboid.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>1</code> | The length of the line cuboid along the X axis. |
| y | <code>number</code> | <code>1</code> | The length of the line cuboid along the Y axis. |
| z | <code>number</code> | <code>1</code> | The length of the line cuboid along the Z axis. |
| baseZAtZero | <code>boolean</code> | <code>false</code> | The baseZAtZero value. |

<a name="LinesCuboid+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  
