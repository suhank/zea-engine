<a name="PointGrid"></a>

### PointGrid 
Represents an ordered grid of points along `X` and `Y` axes.

```
const pointGrid = new PointGrid(2.2, 1.5, 12, 12)
```


**Extends**: <code>Points</code>  

* [PointGrid ⇐ <code>Points</code>](#PointGrid)
    * [new PointGrid([x], [y], [xDivisions], [yDivisions], [addTextureCoords])](#new-PointGrid)
    * ~~[.x](#PointGrid+x) ⇒ <code>number</code>~~
    * ~~[.x](#PointGrid+x)~~
    * ~~[.y](#PointGrid+y) ⇒ <code>number</code>~~
    * ~~[.y](#PointGrid+y)~~
    * [getX() ⇒ <code>number</code>](#getX)
    * [setX(val)](#setX)
    * [getY() ⇒ <code>number</code>](#getY)
    * [setY(val)](#setY)
    * [setSize(x, y)](#setSize)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_PointGrid_new"></a>

### new PointGrid
Creates an instance of PointGrid.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [x] | <code>number</code> | <code>1.0</code> | The length of the point grid along the X axis. |
| [y] | <code>number</code> | <code>1.0</code> | The length of the point grid along the Y axis. |
| [xDivisions] | <code>number</code> | <code>1</code> | The number of divisions along the X axis. |
| [yDivisions] | <code>number</code> | <code>1</code> | The number of divisions along the Y axis. |
| [addTextureCoords] | <code>boolean</code> | <code>false</code> | The addTextureCoords value. |

<a name="PointGrid+x"></a>

### ~~pointGrid.x ⇒ <code>number</code>~~
***Deprecated***

Getter for X.
Is deprecated. Please use "getX".


**Returns**: <code>number</code> - - Returns the length.  
<a name="PointGrid+x"></a>

### ~~pointGrid.x~~
***Deprecated***

Setter for X.
Is deprecated. Please use "setX".



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the X axis. |

<a name="PointGrid+y"></a>

### ~~pointGrid.y ⇒ <code>number</code>~~
***Deprecated***

Getter for Y.
Is deprecated. Please use "getY".


**Returns**: <code>number</code> - - Returns the length.  
<a name="PointGrid+y"></a>

### ~~pointGrid.y~~
***Deprecated***

Setter for Y.
Is deprecated. Please use "setY".



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the Y axis. |

<a name="PointGrid+getX"></a>

### getX
Getter for the length of the point grid along the `X` axis.


**Returns**: <code>number</code> - - Returns the length.  
<a name="PointGrid+setX"></a>

### setX
Setter for the length of the point grid along the `X` axis.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the `X` axis. |

<a name="PointGrid+getY"></a>

### getY
Getter for the length of the point grid along the `Y` axis.


**Returns**: <code>number</code> - - Returns the length.  
<a name="PointGrid+setY"></a>

### setY
Setter for the length of the point grid along the `Y` axis.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the Y axis. |

<a name="PointGrid+setSize"></a>

### setSize
Setter for the size of the point grid.



| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The length along the `X` axis. |
| y | <code>number</code> | The length along the `Y` axis. |

<a name="PointGrid+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  
