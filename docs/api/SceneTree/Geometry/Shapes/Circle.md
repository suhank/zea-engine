<a name="Circle"></a>

### Circle 
A class for generating a circle shape using line segments.

```
const circle = new Circle(2.2, 12)
```

**Parameters**
* **Radius([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Radius of the circle.
* **Angle([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Number of segments used to build the circle.
* **Sides([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Segments angle in radiants.


**Extends**: <code>[ProceduralLines](api/SceneTree\Geometry\Shapes\ProceduralLines.md)</code>  
<a name="new_Circle_new"></a>

### new Circle
Creates an instance of Circle.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| radius | <code>number</code> | <code>1</code> | The radius of the circle. |
| sides | <code>number</code> | <code>32</code> | The number of segments. |
| angle | <code>number</code> |  | Arc segments angle(radians) |



### [Class Tests](api/SceneTree\Geometry\Shapes/Circle.test)