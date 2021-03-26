<a name="Disc"></a>

### Disc 
A class for generating a disc geometry.

```
const disc = new Disc(2.0, 22)
```

**Parameters**
* **Radius([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Specifies the radius of the disc.
* **Sides([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Specifies the resolution, or the disc subdivisions around `Z` axis.


**Extends**: <code>[ProceduralMesh](api/SceneTree\Geometry\Shapes\ProceduralMesh.md)</code>  
<a name="new_Disc_new"></a>

### new Disc
Creates an instance of Disc.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [radius] | <code>number</code> | <code>0.5</code> | The radius of the disc. |
| [sides] | <code>number</code> | <code>32</code> | The number of sides. |



### [Class Tests](api/SceneTree\Geometry\Shapes/Disc.test)