<a name="GeomItem"></a>

### GeomItem 
Class representing a geometry item in a scene tree.

**Parameters:**
* **Geometry(`GeometryParameter`):**
* **Material(`MaterialParameter`):**
* **GeomOffsetXfo(`XfoParameter`):**
* **GeomMat(`Mat4Parameter`):**

**Events:**
* **geomXfoChanged:**
* **materialAssigned:**
* **geomAssigned:**


**Extends**: <code>BaseGeomItem</code>  

* [GeomItem ⇐ <code>BaseGeomItem</code>](#GeomItem)
    * [new GeomItem(name, geom, material)](#new-GeomItem)
    * [getGeometry() ⇒ <code>BaseGeom</code>](#getGeometry)
    * [setGeometry(geom, mode)](#setGeometry)
    * ~~[.getGeom()](#GeomItem+getGeom) ⇒ <code>BaseGeom</code>~~
    * ~~[.setGeom(geom)](#GeomItem+setGeom) ⇒ <code>number</code>~~
    * [getMaterial() ⇒ <code>Material</code>](#getMaterial)
    * [setMaterial(material, mode)](#setMaterial)
    * [getGeomOffsetXfo() ⇒ <code>Xfo</code>](#getGeomOffsetXfo)
    * [setGeomOffsetXfo(xfo)](#setGeomOffsetXfo)
    * [getGeomMat4() ⇒ <code>Mat4</code>](#getGeomMat4)
    * [getLightmapName() ⇒ <code>string</code>](#getLightmapName)
    * [getLightmapCoordsOffset() ⇒ <code>Vec2</code>](#getLightmapCoordsOffset)
    * [applyAssetLightmapSettings(lightmapName, offset)](#applyAssetLightmapSettings)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json, context)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)
    * [toString() ⇒ <code>string</code>](#toString)
    * [clone(context)](#clone)
    * [copyFrom(src, context)](#copyFrom)
    * [destroy()](#destroy)

<a name="new_GeomItem_new"></a>

### new GeomItem
Creates a geometry item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the geom item. |
| geom | <code>BaseGeom</code> | The geom value. |
| material | <code>Material</code> | The material value. |

<a name="GeomItem+getGeometry"></a>

### getGeometry
Returns `Geometry` parameter value.


**Returns**: <code>BaseGeom</code> - - The return value.  
<a name="GeomItem+setGeometry"></a>

### setGeometry
Sets geometry object to `Geometry` parameter.



| Param | Type | Description |
| --- | --- | --- |
| geom | <code>BaseGeom</code> | The geom value. |
| mode | <code>number</code> | The mode value. |

<a name="GeomItem+getGeom"></a>

### ~~geomItem.getGeom() ⇒ <code>BaseGeom</code>~~
***Deprecated***

Getter for geometry (getGeom is deprectated. Please use getGeometry).


**Returns**: <code>BaseGeom</code> - - The return value.  
<a name="GeomItem+setGeom"></a>

### ~~geomItem.setGeom(geom) ⇒ <code>number</code>~~
***Deprecated***

Setter for geometry. (setGeom is deprectated. Please use setGeometry).


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>BaseGeom</code> | The geom value. |

<a name="GeomItem+getMaterial"></a>

### getMaterial
Returns the specified value of `Material`parameter.


**Returns**: <code>Material</code> - - The return value.  
<a name="GeomItem+setMaterial"></a>

### setMaterial
Sets material object to `Material` parameter.



| Param | Type | Description |
| --- | --- | --- |
| material | <code>Material</code> | The material value. |
| mode | <code>number</code> | The mode value. |

<a name="GeomItem+getGeomOffsetXfo"></a>

### getGeomOffsetXfo
Returns the offset `Xfo` object specified in `GeomOffsetXfo` parameter.


**Returns**: <code>Xfo</code> - - Returns the geom offset Xfo.  
<a name="GeomItem+setGeomOffsetXfo"></a>

### setGeomOffsetXfo
Sets `Xfo` object to `GeomOffsetXfo` parameter.



| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>Xfo</code> | The Xfo value. |

<a name="GeomItem+getGeomMat4"></a>

### getGeomMat4
Returns `Mat4` object value of `GeomMat` parameter.


**Returns**: <code>Mat4</code> - - Returns the geom Xfo.  
<a name="GeomItem+getLightmapName"></a>

### getLightmapName
Returns lightmap name of the asset item.


**Returns**: <code>string</code> - - Returns the lightmap name.  
<a name="GeomItem+getLightmapCoordsOffset"></a>

### getLightmapCoordsOffset
Returns lightmap coordinates offset object.


**Returns**: <code>Vec2</code> - - Returns the lightmap coord offset.  
<a name="GeomItem+applyAssetLightmapSettings"></a>

### applyAssetLightmapSettings
The root asset item pushes its offset to the geom items in the
tree. This offsets the light coords for each geom.



| Param | Type | Description |
| --- | --- | --- |
| lightmapName | <code>string</code> | The lightmap name. |
| offset | <code>Vec2</code> | The offset value. |

<a name="GeomItem+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="GeomItem+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="GeomItem+readBinary"></a>

### readBinary
Sets state of current Item(Including lightmap offset & material) using a binary reader object.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="GeomItem+toString"></a>

### toString
Returns string representation of current object's state.


**Returns**: <code>string</code> - - The return value.  
<a name="GeomItem+clone"></a>

### clone
The clone method constructs a new geom item, copies its values
from this item and returns it.


**Returns**: [<code>GeomItem</code>](#GeomItem) - - Returns a new cloned geom item.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>number</code> | The flags value. |

<a name="GeomItem+copyFrom"></a>

### copyFrom
Copies current GeomItem with all its children.



| Param | Type | Description |
| --- | --- | --- |
| src | [<code>GeomItem</code>](#GeomItem) | The geom item to copy from. |
| context | <code>number</code> | The flags value. |

<a name="GeomItem+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


