<a name="Circle"></a>

### Circle 
A class for generating a circle shape using line segments.

```
const circle = new Circle(2.2, 12)
```

**Parameters**
* **Radius(`NumberParameter`):** Radius of the circle.
* **Angle(`NumberParameter`):** Number of segments used to build the circle.
* **NumSegments(`NumberParameter`):** Segments angle in radiants.

**Events**
* **geomDataChanged:** Triggered when the radius of the circle is changed.
* **geomDataTopologyChanged:** Triggered when the angle or the segments of the circle changes.


**Extends**: <code>Lines</code>  
<a name="new_Circle_new"></a>

### new Circle
Creates an instance of Circle.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| radius | <code>number</code> | <code>1</code> | The radius of the circle. |
| numSegments | <code>number</code> | <code>32</code> | The number of segments. |
| angle | <code>number</code> |  | Arc segments angle(radians) |

