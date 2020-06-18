<a name="Disc"></a>

### Disc 
A class for generating a disc geometry.

**Kind**: global class  
**Extends**: <code>Mesh</code>  

* [Disc ⇐ <code>Mesh</code>](#Disc)
    * [new Disc(radius, sides)](#new-Disc)
    * [radius ⇒ <code>number</code>](#radius)
    * [radius](#radius)
    * [sides](#sides)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_Disc_new"></a>

### new Disc
Create a disc.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| radius | <code>number</code> | <code>0.5</code> | The radius of the disc. |
| sides | <code>number</code> | <code>32</code> | The number of sides. |

<a name="Disc+radius"></a>

### radius 
Getter for the disc radius.

**Kind**: instance property of [<code>Disc</code>](#Disc)  
**Returns**: <code>number</code> - - Returns the radius.  
<a name="Disc+radius"></a>

### radius
Setter for disc radius.

**Kind**: instance property of [<code>Disc</code>](#Disc)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The radius value. |

<a name="Disc+sides"></a>

### sides
Setter for the number of sides.

**Kind**: instance property of [<code>Disc</code>](#Disc)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The number of sides. |

<a name="Disc+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Disc</code>](#Disc)  
**Returns**: <code>object</code> - - Returns the json object.  
