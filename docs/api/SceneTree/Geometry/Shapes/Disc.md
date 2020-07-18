<a name="Disc"></a>

### Disc 
A class for generating a disc geometry.

```
const disc = new Disc(2.0, 22)
```

**Parameters**
* **radius(`NumberParameter`):** Specifies the radius of the disc.
* **sides(`NumberParameter`):** Specifies the resolution, or the disc subdivisions around `Z` axis.


**Extends**: <code>Mesh</code>  

* [Disc ⇐ <code>Mesh</code>](#Disc)
    * [new Disc([radius], [sides])](#new-Disc)
    * [radius ⇒ <code>number</code>](#radius)
    * [radius](#radius)
    * [sides](#sides)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_Disc_new"></a>

### new Disc
Creates an instance of Disc.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [radius] | <code>number</code> | <code>0.5</code> | The radius of the disc. |
| [sides] | <code>number</code> | <code>32</code> | The number of sides. |

<a name="Disc+radius"></a>

### radius 
Returns the value of the `radius` parameter.


**Returns**: <code>number</code> - - Returns the radius.  
<a name="Disc+radius"></a>

### radius
Sets the value of the `radius` parameter.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The radius value. |

<a name="Disc+sides"></a>

### sides
Sets the value of the `sides` parameter.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The number of sides. |

<a name="Disc+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  
