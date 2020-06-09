<a name="EulerAngles"></a>

## EulerAngles ⇐ <code>AttrValue</code>
Class representing euler angles. Euler angles decribe rotating an object

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

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
Create a euler angle. Recieves the xyz values in degrees and the order that the rotations are applied.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>0</code> | The angle of the x axis in degrees. Default is 0. |
| y | <code>number</code> | <code>0</code> | The angle of the y axis in degrees. Default is 0. |
| z | <code>number</code> | <code>0</code> | The angle of the z axis in degrees. Default is 0. |
| order | <code>number</code> \| <code>string</code> | <code>0</code> | The order in which the rotations are applied. |

<a name="EulerAngles+x"></a>

### x 
Getter for x axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  
**Returns**: <code>number</code> - - Returns the x axis rotation.  
<a name="EulerAngles+x"></a>

### eulerAngles
Setter for x axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="EulerAngles+y"></a>

### y 
Getter for y axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  
**Returns**: <code>number</code> - - Returns the y axis rotation.  
<a name="EulerAngles+y"></a>

### eulerAngles
Setter for y axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="EulerAngles+z"></a>

### z 
Getter for z axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  
**Returns**: <code>number</code> - - Returns the z axis rotation.  
<a name="EulerAngles+z"></a>

### eulerAngles
Setter for z axis rotation.

**Kind**: instance property of [<code>EulerAngles</code>](#EulerAngles)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="EulerAngles+set"></a>

### set
Sets the EulerAngles

**Kind**: instance method of [<code>EulerAngles</code>](#EulerAngles)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x axis rotation. |
| y | <code>number</code> | The y axis rotation. |
| z | <code>number</code> | The z axis rotation. |
