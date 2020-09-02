<a name="Plane"></a>

### Plane 
A class for generating a plane geometry.

```
const plane = new Plane(2.0, 1.5, 10, 10)
```

**Parameters**
* **SizeX([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Length of the plane along `X` axis.
* **SizeY([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Length of the plane along `Y` axis.
* **DetailX([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Number of divisions along `X`axis.
* **DetailY([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Number of divisions along `Y`axis.


**Extends**: <code>[ProceduralMesh](api/SceneTree/Geometry/Shapes/ProceduralMesh.md)</code>  
<a name="new_Plane_new"></a>

### new Plane
Create a plane.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [SizeX] | <code>number</code> | <code>1.0</code> | The length of the plane along the X axis. |
| [SizeY] | <code>number</code> | <code>1.0</code> | The length of the plane along the Y axis. |
| [DetailX] | <code>number</code> | <code>1</code> | The number of divisions along the X axis. |
| [DetailY] | <code>number</code> | <code>1</code> | The number of divisions along the Y axis. |
| [addNormals] | <code>boolean</code> | <code>true</code> | The addNormals value. |
| [addTextureCoords] | <code>boolean</code> | <code>true</code> | The addTextureCoords value. |



### [Class Tests](api/SceneTree/Geometry/Shapes/Plane.test)