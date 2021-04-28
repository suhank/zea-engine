<a name="EulerAngles"></a>

### EulerAngles 
Class representing euler angles. Euler angles describe rotating an object
around its various axis in a specified axis order.


**Extends**: <code>[AttrValue](api/Math/AttrValue.md)</code>  

* [EulerAngles ⇐ <code>AttrValue</code>](#EulerAngles)
    * [new EulerAngles(x, y, z, order)](#new-EulerAngles)
    * [x ⇒ <code>number</code>](#x)
    * [x](#x)
    * [y ⇒ <code>number</code>](#y)
    * [y](#y)
    * [z ⇒ <code>number</code>](#z)
    * [z](#z)
    * [set(x, y, z)](#set)

<a name="new_EulerAngles_new"></a>

### new EulerAngles
Create a euler angle. Receives the xyz values in radians and the order that the rotations are applied.
<br>
Order parameter values: `XYZ: 0`, `YZX: 1`, `ZXY: 2`, `XZY: 3`, `ZYX: 4`, `YXZ: 5`
<br>
It could be either the `string` or the `number` value.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>0</code> | The angle of the x axis in radians. Default is 0. |
| y | <code>number</code> | <code>0</code> | The angle of the y axis in radians. Default is 0. |
| z | <code>number</code> | <code>0</code> | The angle of the z axis in radians. Default is 0. |
| order | <code>number</code> \| <code>string</code> | <code>0</code> | The order in which the rotations are applied. |

<a name="EulerAngles+x"></a>

### x 
Getter for x axis rotation.


**Returns**: <code>number</code> - - Returns the x axis rotation.  
<a name="EulerAngles+x"></a>

### x
Setter for x axis rotation.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="EulerAngles+y"></a>

### y 
Getter for y axis rotation.


**Returns**: <code>number</code> - - Returns the y axis rotation.  
<a name="EulerAngles+y"></a>

### y
Setter for y axis rotation.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="EulerAngles+z"></a>

### z 
Getter for z axis rotation.


**Returns**: <code>number</code> - - Returns the z axis rotation.  
<a name="EulerAngles+z"></a>

### z
Setter for z axis rotation.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="EulerAngles+set"></a>

### set
Sets the EulerAngles



| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x axis rotation in radians. |
| y | <code>number</code> | The y axis rotation in radians. |
| z | <code>number</code> | The z axis rotation in radians. |



### [Class Tests](api/Math/EulerAngles.test)