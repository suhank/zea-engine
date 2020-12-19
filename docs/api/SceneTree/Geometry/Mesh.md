<a name="Mesh"></a>

### Mesh 
The Mesh class provides a flexible and fast polygon mesh representation. It supports polygons of arbitrary complexity,
from basic triangles and quads to pentagons more.
It supports storing per face attributes, and per edge attributes.
The Mesh class handles converting its internal representation of polygons into a simpler triangles representation for rendering.

```
const mesh = new Mesh()
```

**Events**
* **geomDataTopologyChanged:** Triggered when the topology of the mesh has been changed.
* **geomDataChanged:** Triggered when the vertices of the mesh have changed, but not necessarily the topology.


**Extends**: <code>[BaseGeom](api/SceneTree\Geometry\BaseGeom.md)</code>  

* [Mesh ⇐ <code>BaseGeom</code>](#Mesh)
    * [new Mesh()](#new-Mesh)
    * [clear()](#clear)
    * [getFaceCounts() ⇒ <code>array</code>](#getFaceCounts)
    * [getNumFaces() ⇒ <code>number</code>](#getNumFaces)
    * [setFaceCounts(faceCounts)](#setFaceCounts)
    * [getFaceVertexCount(faceIndex) ⇒ <code>number</code>](#getFaceVertexCount)
    * [getFaceVertexOffset(faceIndex) ⇒ <code>number</code>](#getFaceVertexOffset)
    * [setFaceVertexIndices(faceIndex, vertexIndices)](#setFaceVertexIndices)
    * [addFace(vertexIndices) ⇒ <code>number</code>](#addFace)
    * [getFaceVertexIndices(faceIndex) ⇒ <code>array</code>](#getFaceVertexIndices)
    * [getFaceVertexIndex(faceIndex, facevertex) ⇒ <code>number</code>](#getFaceVertexIndex)
    * [addVertexAttribute(name, dataType, defaultScalarValue) ⇒ <code>VertexAttribute</code>](#addVertexAttribute)
    * [addFaceAttribute(name, dataType, count) ⇒ <code>Attribute</code>](#addFaceAttribute)
    * [hasFaceAttribute(name) ⇒ <code>boolean</code>](#hasFaceAttribute)
    * [getFaceAttribute(name) ⇒ <code>boolean</code>](#getFaceAttribute)
    * [addEdgeAttribute(name, dataType, count) ⇒ <code>Attribute</code>](#addEdgeAttribute)
    * [hasEdgeAttribute(name) ⇒ <code>boolean</code>](#hasEdgeAttribute)
    * [getEdgeAttribute(name) ⇒ <code>Attribute</code>](#getEdgeAttribute)
    * [genTopologyInfo()](#genTopologyInfo)
    * [computeFaceNormals()](#computeFaceNormals)
    * [calculateEdgeAngles()](#calculateEdgeAngles)
    * [computeVertexNormals(hardAngle) ⇒ <code>VertexAttribute</code>](#computeVertexNormals)
    * [computeHardEdgesIndices(hardAngle) ⇒ <code>array</code>](#computeHardEdgesIndices)
    * [genBuffers(opts) ⇒ <code>object</code>](#genBuffers)
    * [computeNumTriangles() ⇒ <code>number</code>](#computeNumTriangles)
    * [generateTriangulatedIndices(totalNumVertices, numUnSplitVertices, splitIndices) ⇒ <code>TypedArray</code>](#generateTriangulatedIndices)
    * [freeBuffers()](#freeBuffers)
    * [readBinary(reader, context)](#readBinary)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)

<a name="new_Mesh_new"></a>

### new Mesh
Creates an instance of Mesh.

<a name="Mesh+clear"></a>

### clear
The clear method.


<a name="Mesh+getFaceCounts"></a>

### getFaceCounts
The getFaceCounts method.


**Returns**: <code>array</code> - - The return value.  
<a name="Mesh+getNumFaces"></a>

### getNumFaces
The getNumFaces method.


**Returns**: <code>number</code> - - The return value.  
<a name="Mesh+setFaceCounts"></a>

### setFaceCounts
Sets the number of faces on the mesh using an array specifying the counts per polygon size.
The first item in the array specifies the number of triangles, the second, the number of quads, the 3rd, the number o f5 sided polygons etc..
e.g. to specify 2 triangles, and 7 quads, we would pass [2, 7]



| Param | Type | Description |
| --- | --- | --- |
| faceCounts | <code>array</code> | The faceCounts value. |

<a name="Mesh+getFaceVertexCount"></a>

### getFaceVertexCount
Returns the number of vertices indexed by this face


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>number</code> | The faceIndex value. |

<a name="Mesh+getFaceVertexOffset"></a>

### getFaceVertexOffset
Returns the offset of the face indices within the entire index array.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>number</code> | The faceIndex value. |

<a name="Mesh+setFaceVertexIndices"></a>

### setFaceVertexIndices
The setFaceVertexIndices method.



| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>number</code> | The faceIndex value. |
| vertexIndices | <code>array</code> | The array of vertex indices for this face value. |

<a name="Mesh+addFace"></a>

### addFace
Adds a new face to the mesh


**Returns**: <code>number</code> - - The index of the face in the mesh.  

| Param | Type | Description |
| --- | --- | --- |
| vertexIndices | <code>array</code> | The vertex indices of the face. |

<a name="Mesh+getFaceVertexIndices"></a>

### getFaceVertexIndices
Returns the vertex indices of the specified face.


**Returns**: <code>array</code> - - An array of indices into the vertex attributes  

| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>number</code> | The index of the specified face |

<a name="Mesh+getFaceVertexIndex"></a>

### getFaceVertexIndex
Returns a single vertex index for a given face and facevertex.


**Returns**: <code>number</code> - - The vertex index  

| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>number</code> | The faceIndex value. |
| facevertex | <code>number</code> | The face vertex is the index within the face. So the first vertex index is 0. |

<a name="Mesh+addVertexAttribute"></a>

### addVertexAttribute
Adds a `VertexAttribute` to the geometry.


**Returns**: <code>[VertexAttribute](api/SceneTree\Geometry\VertexAttribute.md)</code> - - Returns a vertex attribute.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute to add. |
| dataType | <code>AttrValue</code> \| <code>number</code> | The dataType value. |
| defaultScalarValue | <code>number</code> | The default scalar value. |

<a name="Mesh+addFaceAttribute"></a>

### addFaceAttribute
The addFaceAttribute method.


**Returns**: <code>[Attribute](api/SceneTree\Geometry\Attribute.md)</code> - - Returns a face attribute.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the face attribute to add. |
| dataType | <code>AttrValue</code> \| <code>number</code> | The data type. |
| count | <code>number</code> \| <code>TypedArray</code> | The count value. |

<a name="Mesh+hasFaceAttribute"></a>

### hasFaceAttribute
The hasFaceAttribute method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the face attribute. |

<a name="Mesh+getFaceAttribute"></a>

### getFaceAttribute
The getFaceAttribute method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the face attribute. |

<a name="Mesh+addEdgeAttribute"></a>

### addEdgeAttribute
The addEdgeAttribute method.


**Returns**: <code>[Attribute](api/SceneTree\Geometry\Attribute.md)</code> - - Returns an edge attribute.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the edge attribute t oadd. |
| dataType | <code>AttrValue</code> \| <code>number</code> | The data type. |
| count | <code>number</code> | The default scalar value. |

<a name="Mesh+hasEdgeAttribute"></a>

### hasEdgeAttribute
The hasEdgeAttribute method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the edge attribute. |

<a name="Mesh+getEdgeAttribute"></a>

### getEdgeAttribute
The getEdgeAttribute method.


**Returns**: <code>[Attribute](api/SceneTree\Geometry\Attribute.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the edge attribute. |

<a name="Mesh+genTopologyInfo"></a>

### genTopologyInfo
The genTopologyInfo method.


<a name="Mesh+computeFaceNormals"></a>

### computeFaceNormals
Computes a normal value per face by averaging the triangle normals of the face.


<a name="Mesh+calculateEdgeAngles"></a>

### calculateEdgeAngles
Calculates the angles at each edge between the adjoining faces


<a name="Mesh+computeVertexNormals"></a>

### computeVertexNormals
Compute vertex normals.


**Returns**: <code>[VertexAttribute](api/SceneTree\Geometry\VertexAttribute.md)</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hardAngle | <code>number</code> | <code>1</code> | The hardAngle value in radians. |

<a name="Mesh+computeHardEdgesIndices"></a>

### computeHardEdgesIndices
The computeHardEdgesIndices method.


**Returns**: <code>array</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hardAngle | <code>number</code> | <code>1</code> | The hardAngle value in radians. |

<a name="Mesh+genBuffers"></a>

### genBuffers
The genBuffers method.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | The opts value. |

<a name="Mesh+computeNumTriangles"></a>

### computeNumTriangles
Compute the number of triangles. For higher degree polygons, they are divided into multiple triangles for rendering.


**Returns**: <code>number</code> - - Returns the number of triangles.  
<a name="Mesh+generateTriangulatedIndices"></a>

### generateTriangulatedIndices
To prepare data for rendering, the indices for the polygons is used to compute a new index buffer based on
only triangles. This is used during rendering and the resulting indices uploaded ot the GPU  by GLMesh class.


**Returns**: <code>TypedArray</code> - - Retures a typed array containing the triangulated indices.  

| Param | Type | Description |
| --- | --- | --- |
| totalNumVertices | <code>number</code> | The total number of vertices. |
| numUnSplitVertices | <code>number</code> | The total number of unsplit vertices. |
| splitIndices | <code>array</code> | The splitIndices value. |

<a name="Mesh+freeBuffers"></a>

### freeBuffers
The freeBuffers method.


<a name="Mesh+readBinary"></a>

### readBinary
Restores mesh properties from a binary reader.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree\BinReader.md)</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="Mesh+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="Mesh+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |



### [Class Tests](api/SceneTree\Geometry/Mesh.test)