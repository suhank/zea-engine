<a name="Cylinder"></a>

### Cylinder 
A class for generating a cylinder geometry. It is very much like a cuboid but with `N` number of sides.

```
const cylinder = new Cylinder(1.5, 2.0, 6)
```

**Parameters**
* **Radius([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Specifies the radius of the cylinder.
* **Height([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Specifies the height of the cone.
* **Sides([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Specifies the number of subdivisions around the `Z` axis.
* **Loops([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Specifies the number of subdivisions(stacks) on the `Z` axis.
* **Caps([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Specifies whether the ends of the cylinder are capped or open.
* **BaseZAtZero([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Property to start or not `Z` axis from position `0.


**Extends**: <code>[ProceduralMesh](api/SceneTree\Geometry\Shapes\ProceduralMesh.md)</code>  
<a name="new_Cylinder_new"></a>

### new Cylinder
Create a cylinder.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| radius | <code>number</code> | <code>0.5</code> | The radius of the cylinder. |
| height | <code>number</code> | <code>1</code> | The height of the cylinder. |
| sides | <code>number</code> | <code>32</code> | The number of sides. |
| loops | <code>number</code> | <code>2</code> | The number of loops. |
| caps | <code>boolean</code> | <code>true</code> | A boolean indicating whether the ends of the cylinder are capped or open. |
| baseZAtZero | <code>boolean</code> | <code>false</code> | The baseZAtZero value. |



### [Class Tests](api/SceneTree\Geometry\Shapes/Cylinder.test)