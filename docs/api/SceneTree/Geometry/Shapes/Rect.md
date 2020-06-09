<a name="Rect"></a>

## Rect ⇐ <code>Lines</code>
A class for generating a rectangle shape.

**Kind**: global class  
**Extends**: <code>Lines</code>  

* [Rect ⇐ <code>Lines</code>](#Rect)
    * [new Rect(x, y)](#new-Rect)
    * [x ⇒ <code>number</code>](#x)
    * [x](#x)
    * [y ⇒ <code>number</code>](#y)
    * [y](#y)
    * [setSize(x, y)](#setSize)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_Rect_new"></a>

### new Rect
Create a rect.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>1</code> | The length of the rect along the X axis. |
| y | <code>number</code> | <code>1</code> | The length of the rect along the Y axis. |

<a name="Rect+x"></a>

### x 
Getter for the length of the rect along the X axis.

**Kind**: instance property of [<code>Rect</code>](#Rect)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Rect+x"></a>

### rect
Setter for the length of the rect along the X axis.

**Kind**: instance property of [<code>Rect</code>](#Rect)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the X axis. |

<a name="Rect+y"></a>

### y 
Getter for the length of the rect along the Y axis.

**Kind**: instance property of [<code>Rect</code>](#Rect)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Rect+y"></a>

### rect
Setter for the length of the rect along the U axis.

**Kind**: instance property of [<code>Rect</code>](#Rect)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the Y axis. |

<a name="Rect+setSize"></a>

### setSize
Setter for the size of the rect.

**Kind**: instance method of [<code>Rect</code>](#Rect)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The length along the X axis. |
| y | <code>number</code> | The length along the Y axis. |

<a name="Rect+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Rect</code>](#Rect)  
**Returns**: <code>object</code> - - Returns the json object.  