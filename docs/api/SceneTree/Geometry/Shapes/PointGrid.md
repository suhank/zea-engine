<a name="PointGrid"></a>

### PointGrid 
Represents an ordered grid of points along `X` and `Y` axes.

```
const pointGrid = new PointGrid(2.2, 1.5, 12, 12)
```

**Parameters**
* **X([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Length of the grid along the `X` axis.
* **Y([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Length of the grid along the `Y` axis.
* **XDivisions([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Number of divisions along `X` axis
* **YDivisions([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Number of divisions along `Y` axis


**Extends**: <code>[ProceduralPoints](api/SceneTree/Geometry/Shapes/ProceduralPoints.md)</code>  
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



### [Class Tests](api/SceneTree/Geometry/Shapes/PointGrid.test)