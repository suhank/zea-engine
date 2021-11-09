<a name="BaseGeom"></a>

### BaseGeom 
Represents a base class for 3D geometry items.

**Events**
* **boundingBoxChanged:** Triggered when the bounding box changes.
* **geomDataChanged:** Emitted when the geometry attributes have changed. The topology did not change. The Renderer will upload the new attributes to the GPU.
* **geomDataTopologyChanged:** Emitted when the geometry attributes and topology have changed.  The Renderer will upload the new attributes and topology to the GPU.


**Extends**: <code>[ParameterOwner](api/SceneTree\ParameterOwner.md)</code>  

* [BaseGeom ⇐ <code>ParameterOwner</code>](#BaseGeom)
    * [new BaseGeom()](#new-BaseGeom)
    * ~~[.vertices](#BaseGeom+vertices)~~
    * ~~[.boundingBox](#BaseGeom+boundingBox) ⇒ <code>Vec3</code>~~
    * [clear()](#clear)
    * [setDebugName(name)](#setDebugName)
    * [addVertexAttribute(name, dataType, defaultScalarValue) ⇒ <code>Attribute</code>](#addVertexAttribute)
    * [hasVertexAttribute(name) ⇒ <code>boolean</code>](#hasVertexAttribute)
    * [getVertexAttribute(name) ⇒ <code>Attribute</code>](#getVertexAttribute)
    * [getVertexAttributes() ⇒ <code>object</code>](#getVertexAttributes)
    * [numVertices() ⇒ <code>number</code>](#numVertices)
    * [getNumVertices() ⇒ <code>number</code>](#getNumVertices)
    * [setNumVertices(count)](#setNumVertices)
    * ~~[.getVertex(index)](#BaseGeom+getVertex) ⇒ <code>Vec3</code>~~
    * ~~[.setVertex(index, value)](#BaseGeom+setVertex) ⇒ <code>Vec3</code>~~
    * ~~[.moveVertices(delta)](#BaseGeom+moveVertices)~~
    * ~~[.transformVertices(xfo)](#BaseGeom+transformVertices)~~
    * [getBoundingBox() ⇒ <code>Vec3</code>](#getBoundingBox)
    * [setBoundingBoxDirty()](#setBoundingBoxDirty)
    * [updateBoundingBox()](#updateBoundingBox)
    * [getMetadata(key) ⇒ <code>object</code>](#getMetadata)
    * [hasMetadata(key) ⇒ <code>boolean</code>](#hasMetadata)
    * [setMetadata(key, metaData)](#setMetadata)
    * [deleteMetadata(key)](#deleteMetadata)
    * [genBuffers(opts) ⇒ <code>object</code>](#genBuffers)
    * [loadBaseGeomBinary(reader)](#loadBaseGeomBinary)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json, context)](#fromJSON)
    * [toString() ⇒ <code>string</code>](#toString)

<a name="new_BaseGeom_new"></a>

### new BaseGeom
Create a base geom.

<a name="BaseGeom+vertices"></a>

### ~~baseGeom.vertices~~
***Deprecated***

Returns 'positions' vertex attribute.


<a name="BaseGeom+boundingBox"></a>

### ~~baseGeom.boundingBox ⇒ <code>Vec3</code>~~
***Deprecated***

Returns the bounding box for geometry.


**Returns**: <code>[Vec3](api/Math\Vec3.md)</code> - - The return value.  
<a name="BaseGeom+clear"></a>

### clear
The clear method.


<a name="BaseGeom+setDebugName"></a>

### setDebugName
Establishes a name for the geometry.



| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The debug name value. |

<a name="BaseGeom+addVertexAttribute"></a>

### addVertexAttribute
Adds a new vertex attribute to the geometry.


**Returns**: <code>[Attribute](api/SceneTree\Geometry\Attribute.md)</code> - - Returns an attribute.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute. |
| dataType | <code>AttrValue</code> \| <code>number</code> | The dataType value. |
| defaultScalarValue | <code>number</code> | The default scalar value. |

<a name="BaseGeom+hasVertexAttribute"></a>

### hasVertexAttribute
Checks if the the geometry has an attribute with the specified name.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute. |

<a name="BaseGeom+getVertexAttribute"></a>

### getVertexAttribute
Returns vertex attribute with the specified name.


**Returns**: <code>[Attribute](api/SceneTree\Geometry\Attribute.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute. |

<a name="BaseGeom+getVertexAttributes"></a>

### getVertexAttributes
Returns all vertex attributes in an object with their names.


**Returns**: <code>object</code> - - The return value.  
<a name="BaseGeom+numVertices"></a>

### numVertices
Returns the number of vertex attributes.


**Returns**: <code>number</code> - - The return value.  
<a name="BaseGeom+getNumVertices"></a>

### getNumVertices
Returns the number of vertex attributes.


**Returns**: <code>number</code> - - The return value.  
<a name="BaseGeom+setNumVertices"></a>

### setNumVertices
Sets the number of vertices the geometry has.



| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The count value. |

<a name="BaseGeom+getVertex"></a>

### ~~baseGeom.getVertex(index) ⇒ <code>Vec3</code>~~
***Deprecated***

Returns the position attribute value of the given vertex


**Returns**: <code>[Vec3](api/Math\Vec3.md)</code> - - Returns a Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="BaseGeom+setVertex"></a>

### ~~baseGeom.setVertex(index, value) ⇒ <code>Vec3</code>~~
***Deprecated***

Sets the position attribute value of the given vertex


**Returns**: <code>[Vec3](api/Math\Vec3.md)</code> - - Returns a Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>[index](api/index.md)</code> | The index value. |
| value | <code>[Vec3](api/Math\Vec3.md)</code> | The value value. |

<a name="BaseGeom+moveVertices"></a>

### ~~baseGeom.moveVertices(delta)~~
***Deprecated***

Applies an offset to each of the vertices in the geometry.



| Param | Type | Description |
| --- | --- | --- |
| delta | <code>[Vec3](api/Math\Vec3.md)</code> | The delta value. |

<a name="BaseGeom+transformVertices"></a>

### ~~baseGeom.transformVertices(xfo)~~
***Deprecated***

The transformVertices method.



| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>[Xfo](api/Math\Xfo.md)</code> | The xfo transform. |

<a name="BaseGeom+getBoundingBox"></a>

### getBoundingBox
Returns the bounding box for geometry.


**Returns**: <code>[Vec3](api/Math\Vec3.md)</code> - - The return value.  
<a name="BaseGeom+setBoundingBoxDirty"></a>

### setBoundingBoxDirty
The setBoundingBoxDirty method.


<a name="BaseGeom+updateBoundingBox"></a>

### updateBoundingBox
The updateBoundingBox method.


<a name="BaseGeom+getMetadata"></a>

### getMetadata
Returns metadata value of the specified name.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key value. |

<a name="BaseGeom+hasMetadata"></a>

### hasMetadata
Verifies if geometry's metadata contains a value with the specified key.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key value. |

<a name="BaseGeom+setMetadata"></a>

### setMetadata
Sets metadata value to the geometry.



| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key value. |
| metaData | <code>object</code> | The metaData value. |

<a name="BaseGeom+deleteMetadata"></a>

### deleteMetadata
Removes metadata value from the geometry with the specified key.



| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key value. |

<a name="BaseGeom+genBuffers"></a>

### genBuffers
Returns vertex attributes buffers and its count.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | The opts value. |

<a name="BaseGeom+loadBaseGeomBinary"></a>

### loadBaseGeomBinary
Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree\BinReader.md)</code> | The reader value. |

<a name="BaseGeom+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="BaseGeom+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="BaseGeom+toString"></a>

### toString
Returns geometry data value in json format.


**Returns**: <code>string</code> - - The return value.  
