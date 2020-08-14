<a name="Grid"></a>

### Grid 
Represents a network of lines that cross each other to form a series of squares or rectangles.

```
const grid = new Grid(5, 5, 50, 50, true)
```

**Parameters**
* **x(`NumberParameter`):** Length of the grid along the `X` axis.
* **y(`NumberParameter`):** Length of the grid along the `Y` axis.
* **xDivisions(`NumberParameter`):** Number of divisions along `X` axis
* **yDivisions(`NumberParameter`):** Number of divisions along `Y` axis
* **skipCenterLines(`BooleanParameter`):** Property that indicates whether to display the center grid lines or not


**Extends**: <code>Lines</code>  

* [Grid ⇐ <code>Lines</code>](#Grid)
    * [new Grid(x, y, xDivisions, yDivisions, skipCenterLines)](#new-Grid)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_Grid_new"></a>

### new Grid
Create a grid.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>1</code> | The length of the grid along the `X` axis. |
| y | <code>number</code> | <code>1</code> | The length of the grid along the `Y` axis. |
| xDivisions | <code>number</code> | <code>10</code> | The number of divisions along `X` axis. |
| yDivisions | <code>number</code> | <code>10</code> | The number of divisions along `Y` axis. |
| skipCenterLines | <code>boolean</code> | <code>false</code> | A boolean indicating whether to display the center grid lines or not. |

<a name="Grid+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  
