<a name="GeomItem"></a>

### GeomItem 
Class representing a geometry item in a scene tree.


**Extends**: <code>BaseGeomItem</code>  

* [GeomItem ⇐ <code>BaseGeomItem</code>](#GeomItem)
    * [new GeomItem(name, geom, material)](#new-GeomItem)
    * [getGeometry() ⇒ <code>any</code>](#getGeometry)
    * [setGeometry(geom, mode)](#setGeometry)
    * [getGeom() ⇒ <code>any</code>](#getGeom)
    * [setGeom(geom) ⇒ <code>any</code>](#setGeom)
    * [getMaterial() ⇒ <code>Material</code>](#getMaterial)
    * [setMaterial(material, mode)](#setMaterial)
    * [getGeomOffsetXfo() ⇒ <code>Xfo</code>](#getGeomOffsetXfo)
    * [setGeomOffsetXfo(xfo)](#setGeomOffsetXfo)
    * [getGeomMat4() ⇒ <code>Xfo</code>](#getGeomMat4)
    * [getLightmapName() ⇒ <code>string</code>](#getLightmapName)
    * [getLightmapCoordsOffset() ⇒ <code>any</code>](#getLightmapCoordsOffset)
    * [applyAssetLightmapSettings(lightmapName, offset)](#applyAssetLightmapSettings)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json, context)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)
    * [toString() ⇒ <code>any</code>](#toString)
    * [clone(flags)](#clone)
    * [copyFrom(src, flags)](#copyFrom)
    * [destroy()](#destroy)

<a name="new_GeomItem_new"></a>

### new GeomItem
Create a geometry item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the geom item. |
| geom | <code>any</code> | The geom value. |
| material | <code>any</code> | The material value. |

<a name="GeomItem+getGeometry"></a>

### getGeometry
Getter for geometry.


**Returns**: <code>any</code> - - The return value.  
<a name="GeomItem+setGeometry"></a>

### setGeometry
Setter for geometry.



| Param | Type | Description |
| --- | --- | --- |
| geom | <code>any</code> | The geom value. |
| mode | <code>number</code> | The mode value. |

<a name="GeomItem+getGeom"></a>

### getGeom
Getter for geometry (getGeom is deprectated. Please use getGeometry).


**Returns**: <code>any</code> - - The return value.  
<a name="GeomItem+setGeom"></a>

### setGeom
Setter for geometry. (setGeom is deprectated. Please use setGeometry).


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>any</code> | The geom value. |

<a name="GeomItem+getMaterial"></a>

### getMaterial
Getter for material.


**Returns**: <code>Material</code> - - The return value.  
<a name="GeomItem+setMaterial"></a>

### setMaterial
Setter for material.



| Param | Type | Description |
| --- | --- | --- |
| material | <code>Material</code> | The material value. |
| mode | <code>number</code> | The mode value. |

<a name="GeomItem+getGeomOffsetXfo"></a>

### getGeomOffsetXfo
Getter for the geom offset Xfo translation.


**Returns**: <code>Xfo</code> - - Returns the geom offset Xfo.  
<a name="GeomItem+setGeomOffsetXfo"></a>

### setGeomOffsetXfo
Setter for the geom offset Xfo translation.



| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>Xfo</code> | The Xfo value. |

<a name="GeomItem+getGeomMat4"></a>

### getGeomMat4
Getter for the geom Xfo translation.


**Returns**: <code>Xfo</code> - - Returns the geom Xfo.  
<a name="GeomItem+getLightmapName"></a>

### getLightmapName
Getter for a lightmap name.


**Returns**: <code>string</code> - - Returns the lightmap name.  
<a name="GeomItem+getLightmapCoordsOffset"></a>

### getLightmapCoordsOffset
Getter for a lightmap coordinate offset.


**Returns**: <code>any</code> - - Returns the lightmap coord offset.  
<a name="GeomItem+applyAssetLightmapSettings"></a>

### applyAssetLightmapSettings
The root asset item pushes its offset to the geom items in the
tree. This offsets the light coords for each geom.



| Param | Type | Description |
| --- | --- | --- |
| lightmapName | <code>string</code> | The lightmap name. |
| offset | <code>any</code> | The offset value. |

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
The readBinary method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="GeomItem+toString"></a>

### toString
The toString method.


**Returns**: <code>any</code> - - The return value.  
<a name="GeomItem+clone"></a>

### clone
The clone method constructs a new geom item, copies its values
from this item and returns it.


**Returns**: [<code>GeomItem</code>](#GeomItem) - - Returns a new cloned geom item.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="GeomItem+copyFrom"></a>

### copyFrom
The copyFrom method.



| Param | Type | Description |
| --- | --- | --- |
| src | [<code>GeomItem</code>](#GeomItem) | The geom item to copy from. |
| flags | <code>number</code> | The flags value. |

<a name="GeomItem+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


