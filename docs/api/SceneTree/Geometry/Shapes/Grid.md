<a name="Grid"></a>

### Grid 
Represents a network of lines that cross each other to form a series of squares or rectangles.

```
const grid = new Grid(5, 5, 50, 50, true)
```

**Parameters**
* **X([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Length of the grid along the `X` axis.
* **Y([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Length of the grid along the `Y` axis.
* **XDivisions([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Number of divisions along `X` axis
* **YDivisions([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Number of divisions along `Y` axis
* **SkipCenterLines([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Property that indicates whether to display the center grid lines or not


**Extends**: <code>[ProceduralLines](api/SceneTree\Geometry\Shapes\ProceduralLines.md)</code>  
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



### [Class Tests](api/SceneTree\Geometry\Shapes/Grid.test)