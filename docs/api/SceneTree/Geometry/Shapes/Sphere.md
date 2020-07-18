<a name="Sphere"></a>

### Sphere 
A class for generating a sphere geometry.

```
const sphere = new Sphere(1.4, 13)
```

**Parameters**
* **radius(`NumberParameter`):** Radius of the sphere.
* **sides(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
* **loops(`NumberParameter`):** Specifies the number of subdivisions(stacks) along the `Z` axis.

**Events**
* **geomDataTopologyChanged:** Triggered when `radius` value changes
* **geomDataChanged:** Triggered when `sides` or `loops` values change.


**Extends**: <code>Mesh</code>  
<a name="new_Sphere_new"></a>

### new Sphere
Creates an instance of Sphere.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [radius] | <code>number</code> | <code>1.0</code> | The radius of the sphere. |
| [sides] | <code>number</code> | <code>12</code> | The number of sides. |
| [loops] | <code>number</code> | <code>12</code> | The number of loops. |

