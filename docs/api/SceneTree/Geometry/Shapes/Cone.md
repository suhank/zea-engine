<a name="Cone"></a>

### Cone 
Represents a cone geometry.

```
const cone = new Cone(1.2, 4.0)
```

**Parameters**
* **radius(`NumberParameter`):** Specifies the radius of the base of the cone.
* **height(`NumberParameter`):** Specifies the height of the cone.
* **detail(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
* **cap(`BooleanParameter`):** Specifies whether the base of the cone is capped or open.


**Extends**: <code>Mesh</code>  

* [Cone ⇐ <code>Mesh</code>](#Cone)
    * [new Cone(radius, height, detail, cap)](#new-Cone)
    * [radius ⇒ <code>number</code>](#radius)
    * [radius](#radius)
    * [height ⇒ <code>number</code>](#height)
    * [height](#height)
    * [detail ⇒ <code>number</code>](#detail)
    * [detail](#detail)
    * [cap ⇒ <code>boolean</code>](#cap)
    * [cap](#cap)

<a name="new_Cone_new"></a>

### new Cone
Create a cone.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| radius | <code>number</code> | <code>0.5</code> | The radius of the base of the cone. |
| height | <code>number</code> | <code>1</code> | The height of the cone. |
| detail | <code>number</code> | <code>32</code> | The detail of the cone. |
| cap | <code>boolean</code> | <code>true</code> | A boolean indicating whether the base of the cone is capped or open. |

<a name="Cone+radius"></a>

### radius 
Returns radius parameter value.


**Returns**: <code>number</code> - - Returns the radius.  
<a name="Cone+radius"></a>

### radius
Sets radius parameter value in parameter.<br>
**Note:** Resizes the cone.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The radius value. |

<a name="Cone+height"></a>

### height 
Returns height parameter value.


**Returns**: <code>number</code> - - Returns the height.  
<a name="Cone+height"></a>

### height
Sets height parameter value.<br>
**Note:** Resizes the cone.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The height value. |

<a name="Cone+detail"></a>

### detail 
Returns details parameter value(Number of subdivisions around the `Z` axis).


**Returns**: <code>number</code> - - Returns the detail.  
<a name="Cone+detail"></a>

### detail
Sets details parameter value(Number of subdivisions around the `Z` axis)



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The detail value. |

<a name="Cone+cap"></a>

### cap 
Returns cap parameter value.


**Returns**: <code>boolean</code> - - The return value.  
<a name="Cone+cap"></a>

### cap
Sets `cap` parameter value.<br>
**Note:** Resizes the cone.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

