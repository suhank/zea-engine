<a name="Rect"></a>

### Rect 
A class for generating a rectangle shape.

```
const rect = new Rect(1.5, 2.0)
```

**Parameters**
* **X([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Length of the rectangle along the `X` axis.
* **Y([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Length of the rectangle along the `Y` axis.


**Extends**: <code>[ProceduralLines](api/SceneTree/Geometry/Shapes/ProceduralLines.md)</code>  

* [Rect ⇐ <code>ProceduralLines</code>](#Rect)
    * [new Rect(x, y)](#new-Rect)
    * [x ⇒ <code>number</code>](#x)
    * [x](#x)
    * [y ⇒ <code>number</code>](#y)
    * [y](#y)
    * [setSize(x, y)](#setSize)

<a name="new_Rect_new"></a>

### new Rect
Create a rect.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>1</code> | The length of the rect along the `X` axis. |
| y | <code>number</code> | <code>1</code> | The length of the rect along the `Y` axis. |

<a name="Rect+x"></a>

### x 
Getter for the length of the rect along the `X` axis.


**Returns**: <code>number</code> - - Returns the length.  
<a name="Rect+x"></a>

### x
Setter for the length of the rect along the `X` axis.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the `X` axis. |

<a name="Rect+y"></a>

### y 
Getter for the length of the rect along the `Y` axis.


**Returns**: <code>number</code> - - Returns the length.  
<a name="Rect+y"></a>

### y
Setter for the length of the rect along the U axis.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the `Y` axis. |

<a name="Rect+setSize"></a>

### setSize
Setter for the size of the rect.



| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The length along the `X` axis. |
| y | <code>number</code> | The length along the `Y` axis. |



### [Class Tests](api/SceneTree/Geometry/Shapes/Rect.test)