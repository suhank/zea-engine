<a name="Sphere"></a>

### Sphere 
A class for generating a sphere geometry.

```
const sphere = new Sphere(1.4, 13)
```

**Parameters**
* **Radius([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Radius of the sphere.
* **Sides([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Specifies the number of subdivisions around the `Z` axis.
* **Loops([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Specifies the number of subdivisions(stacks) along the `Z` axis.


**Extends**: <code>[ProceduralMesh](api/SceneTree/Geometry/Shapes/ProceduralMesh.md)</code>  
<a name="new_Sphere_new"></a>

### new Sphere
Creates an instance of Sphere.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [radius] | <code>number</code> | <code>1.0</code> | The radius of the sphere. |
| [sides] | <code>number</code> | <code>12</code> | The number of sides. |
| [loops] | <code>number</code> | <code>12</code> | The number of loops. |



### [Class Tests](api/SceneTree/Geometry/Shapes/Sphere.test)