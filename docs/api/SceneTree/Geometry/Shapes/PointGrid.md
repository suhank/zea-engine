<a name="PointGrid"></a>

## PointGrid ⇐ <code>Points</code>
A class for generating a point grid.

**Kind**: global class  
**Extends**: <code>Points</code>  

* [PointGrid ⇐ <code>Points</code>](#PointGrid)
    * [new PointGrid(x, y, xDivisions, yDivisions, addTextureCoords)](#new-PointGrid)
    * [x ⇒ <code>number</code>](#x)
    * [x](#x)
    * [y ⇒ <code>number</code>](#y)
    * [y](#y)
    * [getX() ⇒ <code>number</code>](#getX)
    * [setX(val)](#setX)
    * [getY() ⇒ <code>number</code>](#getY)
    * [setY(val)](#setY)
    * [setSize(x, y)](#setSize)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_PointGrid_new"></a>

### new PointGrid
Create a point grid.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>1</code> | The length of the point grid along the X axis. |
| y | <code>number</code> | <code>1</code> | The length of the point grid along the Y axis. |
| xDivisions | <code>number</code> | <code>1</code> | The number of divisions along the X axis. |
| yDivisions | <code>number</code> | <code>1</code> | The number of divisions along the Y axis. |
| addTextureCoords | <code>boolean</code> | <code>false</code> | The addTextureCoords value. |

<a name="PointGrid+x"></a>

### x 
Getter for X.Is deprectated. Please use "getX".

**Kind**: instance property of [<code>PointGrid</code>](#PointGrid)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="PointGrid+x"></a>

### pointGrid
Setter for X.Is deprectated. Please use "setX".

**Kind**: instance property of [<code>PointGrid</code>](#PointGrid)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the X axis. |

<a name="PointGrid+y"></a>

### y 
Getter for Y.Is deprectated. Please use "getY".

**Kind**: instance property of [<code>PointGrid</code>](#PointGrid)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="PointGrid+y"></a>

### pointGrid
Setter for Y.Is deprectated. Please use "setY".

**Kind**: instance property of [<code>PointGrid</code>](#PointGrid)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the Y axis. |

<a name="PointGrid+getX"></a>

### getX
Getter for the length of the point grid along the X axis.

**Kind**: instance method of [<code>PointGrid</code>](#PointGrid)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="PointGrid+setX"></a>

### setX
Setter for the length of the point grid along the X axis.

**Kind**: instance method of [<code>PointGrid</code>](#PointGrid)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the X axis. |

<a name="PointGrid+getY"></a>

### getY
Getter for the length of the point grid along the Y axis.

**Kind**: instance method of [<code>PointGrid</code>](#PointGrid)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="PointGrid+setY"></a>

### setY
Setter for the length of the point grid along the Y axis.

**Kind**: instance method of [<code>PointGrid</code>](#PointGrid)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the Y axis. |

<a name="PointGrid+setSize"></a>

### setSize
Setter for the size of the point grid.

**Kind**: instance method of [<code>PointGrid</code>](#PointGrid)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The length along the X axis. |
| y | <code>number</code> | The length along the Y axis. |

<a name="PointGrid+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>PointGrid</code>](#PointGrid)  
**Returns**: <code>object</code> - - Returns the json object.  
