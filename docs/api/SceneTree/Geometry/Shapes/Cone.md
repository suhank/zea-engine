<a name="Cone"></a>

### Cone 
Represents a cone geometry.

```
const cone = new Cone(1.2, 4.0)
```

**Parameters**
* **Radius([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Specifies the radius of the base of the cone.
* **Height([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Specifies the height of the cone.
* **Detail([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Specifies the number of subdivisions around the `Z` axis.
* **Cap([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Specifies whether the base of the cone is capped or open.


**Extends**: <code>[ProceduralMesh](api/SceneTree\Geometry\Shapes\ProceduralMesh.md)</code>  
<a name="new_Cone_new"></a>

### new Cone
Create a cone.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| radius | <code>number</code> | <code>0.5</code> | The radius of the base of the cone. |
| height | <code>number</code> | <code>1</code> | The height of the cone. |
| detail | <code>number</code> | <code>32</code> | The detail of the cone. |
| cap | <code>boolean</code> | <code>true</code> | A boolean indicating whether the base of the cone is capped or open. |



### [Class Tests](api/SceneTree\Geometry\Shapes/Cone.test)