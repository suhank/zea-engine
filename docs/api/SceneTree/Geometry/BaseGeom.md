<a name="BaseGeom"></a>

### BaseGeom 
Represents a base class for 3D geometry items.

**Events**
* **boundingBoxChanged:** Triggered when the bounding box changes.


**Extends**: <code>ParameterOwner</code>  

* [BaseGeom ⇐ <code>ParameterOwner</code>](#BaseGeom)
    * [new BaseGeom()](#new-BaseGeom)
    * [vertices](#vertices)
    * [boundingBox ⇒ <code>Vec3</code>](#boundingBox)
    * [setDebugName(name)](#setDebugName)
    * [addVertexAttribute(name, dataType, defaultScalarValue) ⇒ <code>Attribute</code>](#addVertexAttribute)
    * [hasVertexAttribute(name) ⇒ <code>boolean</code>](#hasVertexAttribute)
    * [getVertexAttribute(name) ⇒ <code>Attribute</code>](#getVertexAttribute)
    * [getVertexAttributes() ⇒ <code>object</code>](#getVertexAttributes)
    * [numVertices() ⇒ <code>number</code>](#numVertices)
    * [getNumVertices() ⇒ <code>number</code>](#getNumVertices)
    * [setNumVertices(count)](#setNumVertices)
    * [getVertex(index) ⇒ <code>Vec3</code>](#getVertex)
    * [setVertex(index, vec3) ⇒ <code>Vec3</code>](#setVertex)
    * [moveVertices(delta)](#moveVertices)
    * [transformVertices(xfo)](#transformVertices)
    * [setBoundingBoxDirty()](#setBoundingBoxDirty)
    * [updateBoundingBox()](#updateBoundingBox)
    * [getMetadata(key) ⇒ <code>object</code>](#getMetadata)
    * [hasMetadata(key) ⇒ <code>boolean</code>](#hasMetadata)
    * [setMetadata(key, metaData)](#setMetadata)
    * [deleteMetadata(key)](#deleteMetadata)
    * [genBuffers(opts) ⇒ <code>object</code>](#genBuffers)
    * [freeBuffers()](#freeBuffers)
    * [loadBaseGeomBinary(reader)](#loadBaseGeomBinary)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json, context, flags)](#fromJSON)
    * [toString() ⇒ <code>string</code>](#toString)

<a name="new_BaseGeom_new"></a>

### new BaseGeom
Create a base geom.

<a name="BaseGeom+vertices"></a>

### vertices
Returns 'positions' vertex attribute.


<a name="BaseGeom+boundingBox"></a>

### boundingBox 
The boundingBox method.


**Returns**: <code>Vec3</code> - - The return value.  
<a name="BaseGeom+setDebugName"></a>

### setDebugName
Establishes a name for the geometry.



| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The debug name value. |

<a name="BaseGeom+addVertexAttribute"></a>

### addVertexAttribute
Adds a new vertex attribute to the geometry.


**Returns**: <code>Attribute</code> - - Returns an attribute.  

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


**Returns**: <code>Attribute</code> - - The return value.  

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

### getVertex
The getVertex method.


**Returns**: <code>Vec3</code> - - Returns a Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="BaseGeom+setVertex"></a>

### setVertex
The setVertex method.


**Returns**: <code>Vec3</code> - - Returns a Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>index</code> | The index value. |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="BaseGeom+moveVertices"></a>

### moveVertices
The moveVertices method.



| Param | Type | Description |
| --- | --- | --- |
| delta | <code>Vec3</code> | The delta value. |

<a name="BaseGeom+transformVertices"></a>

### transformVertices
The transformVertices method.



| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>Xfo</code> | The xfo tranform. |

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

<a name="BaseGeom+freeBuffers"></a>

### freeBuffers
The freeBuffers method.


<a name="BaseGeom+loadBaseGeomBinary"></a>

### loadBaseGeomBinary
Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>BinReader</code> | The reader value. |

<a name="BaseGeom+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="BaseGeom+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="BaseGeom+toString"></a>

### toString
Returns geometry data value in json format.


**Returns**: <code>string</code> - - The return value.  
