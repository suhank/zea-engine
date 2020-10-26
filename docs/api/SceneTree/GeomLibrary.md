<a name="GeomLibrary"></a>

### GeomLibrary
Class representing a geometry library.



* [GeomLibrary](#GeomLibrary)
    * [new GeomLibrary()](#new-GeomLibrary)
    * [clear()](#clear)
    * [isLoaded() ⇒ <code>Boolean</code>](#isLoaded)
    * [setGenBufferOption(key, value)](#setGenBufferOption)
    * [setNumGeoms(expectedNumGeoms)](#setNumGeoms)
    * [getNumGeoms() ⇒ <code>number</code>](#getNumGeoms)
    * [getGeom(index) ⇒ <code>BaseGeom</code>](#getGeom)
    * [loadArchive(fileUrl)](#loadArchive)
    * [readBinaryBuffer(key, buffer, context) ⇒ <code>any</code>](#readBinaryBuffer)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [toString() ⇒ <code>any</code>](#toString)

<a name="new_GeomLibrary_new"></a>

### new GeomLibrary
Create a geom library.

<a name="GeomLibrary+clear"></a>

### clear
The clear method.


<a name="GeomLibrary+isLoaded"></a>

### isLoaded
The returns true if all the geometries have been loaded and the loaded event has already been emitted.


**Returns**: <code>Boolean</code> - - True if all geometries are already loaded, else false.  
<a name="GeomLibrary+setGenBufferOption"></a>

### setGenBufferOption
The setGenBufferOption method.



| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |
| value | <code>any</code> | The value param. |

<a name="GeomLibrary+setNumGeoms"></a>

### setNumGeoms
The setNumGeoms method.



| Param | Type | Description |
| --- | --- | --- |
| expectedNumGeoms | <code>any</code> | The expectedNumGeoms value. |

<a name="GeomLibrary+getNumGeoms"></a>

### getNumGeoms
Returns the number of geometries the GeomLibrary has, or will have at the end of loading.


**Returns**: <code>number</code> - - The number of geometries.  
<a name="GeomLibrary+getGeom"></a>

### getGeom
The getGeom method.


**Returns**: <code>[BaseGeom](api/SceneTree/Geometry/BaseGeom.md)</code> - - The stored geometry  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="GeomLibrary+loadArchive"></a>

### loadArchive
The loadArchive method.



| Param | Type | Description |
| --- | --- | --- |
| fileUrl | <code>any</code> | The fileUrl value. |

<a name="GeomLibrary+readBinaryBuffer"></a>

### readBinaryBuffer
The readBinaryBuffer method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |
| buffer | <code>ArrayBuffer</code> | The buffer value. |
| context | <code>object</code> | The context value. |

<a name="GeomLibrary+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  
<a name="GeomLibrary+toString"></a>

### toString
The toString method.


**Returns**: <code>any</code> - - The return value.  
