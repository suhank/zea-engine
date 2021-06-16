<a name="Cuboid"></a>

### Cuboid 
A class for generating a cuboid geometry.

**Parameters**
* **x([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Length of the line cuboid along the `X` axis
* **y([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Length of the line cuboid along the `Y` axis
* **z([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Length of the line cuboid along the `Z` axis
* **BaseZAtZero([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Property to start or not `Z` axis from position `0.


**Extends**: <code>[ProceduralMesh](api/SceneTree\Geometry\Shapes\ProceduralMesh.md)</code>  

* [Cuboid ⇐ <code>ProceduralMesh</code>](#Cuboid)
    * [new Cuboid(x, y, z, baseZAtZero)](#new-Cuboid)
    * [setSize(x, y, z)](#setSize)
    * [setBaseSize(x, y)](#setBaseSize)

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



| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The length of the edges along the X axis. |
| y | <code>number</code> | The length of the edges along the Y axis. |
| z | <code>number</code> | The length of the edges along the Z axis. |

<a name="Cuboid+setBaseSize"></a>

### setBaseSize
Setter for the base size of the cuboid.



| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The length of the edges along the X axis. |
| y | <code>number</code> | The length of the edges along the Y axis. |



### [Class Tests](api/SceneTree\Geometry\Shapes/Cuboid.test)