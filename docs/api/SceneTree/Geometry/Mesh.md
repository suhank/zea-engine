<a name="Mesh"></a>

### Mesh 
Class representing a mesh(Collection of vertices, edges and faces that define the shape of a 3D object).

```
const mesh = new Mesh(geomName)
```


**Extends**: <code>BaseGeom</code>  

* [Mesh ⇐ <code>BaseGeom</code>](#Mesh)
    * [new Mesh()](#new-Mesh)
    * [init()](#init)
    * [getFaceVertexIndices() ⇒ <code>Uint32Array</code>](#getFaceVertexIndices)
    * [getFaceCounts() ⇒ <code>array</code>](#getFaceCounts)
    * [clear()](#clear)
    * [setFaceCounts(faceCounts)](#setFaceCounts)
    * [setFaceVertexIndices(faceIndex)](#setFaceVertexIndices)
    * [getFaceVertexIndices(faceIndex) ⇒ <code>array</code>](#getFaceVertexIndices)
    * [getFaceVertexIndex(faceIndex, facevertex) ⇒ <code>number</code>](#getFaceVertexIndex)
    * [getNumFaces() ⇒ <code>number</code>](#getNumFaces)
    * [addVertexAttribute(name, dataType, defaultScalarValue) ⇒ <code>VertexAttribute</code>](#addVertexAttribute)
    * [addFaceAttribute(name, dataType, count) ⇒ <code>Attribute</code>](#addFaceAttribute)
    * [hasFaceAttribute(name) ⇒ <code>boolean</code>](#hasFaceAttribute)
    * [getFaceAttribute(name) ⇒ <code>boolean</code>](#getFaceAttribute)
    * [addEdgeAttribute(name, dataType, count) ⇒ <code>Attribute</code>](#addEdgeAttribute)
    * [hasEdgeAttribute(name) ⇒ <code>boolean</code>](#hasEdgeAttribute)
    * [getEdgeAttribute(name) ⇒ <code>any</code>](#getEdgeAttribute)
    * [genTopologyInfo()](#genTopologyInfo)
    * [computeFaceNormals()](#computeFaceNormals)
    * [generateEdgeFlags()](#generateEdgeFlags)
    * [computeVertexNormals(hardAngle) ⇒ <code>VertexAttribute</code>](#computeVertexNormals)
    * [computeNumTriangles() ⇒ <code>number</code>](#computeNumTriangles)
    * [generateTriangulatedIndices(totalNumVertices, numUnSplitVertices, splitIndices) ⇒ <code>Uint32Array</code>](#generateTriangulatedIndices)
    * [computeHardEdgesIndices(hardAngle) ⇒ <code>array</code>](#computeHardEdgesIndices)
    * [genBuffers(opts) ⇒ <code>object</code>](#genBuffers)
    * [freeBuffers()](#freeBuffers)
    * [readBinary(reader, context)](#readBinary)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)

<a name="new_Mesh_new"></a>

### new Mesh
Create a mesh.

<a name="Mesh+init"></a>

### init
The init method.


<a name="Mesh+getFaceVertexIndices"></a>

### getFaceVertexIndices
The getFaceVertexIndices method.


**Returns**: <code>Uint32Array</code> - - The return value.  
<a name="Mesh+getFaceCounts"></a>

### getFaceCounts
The getFaceCounts method.


**Returns**: <code>array</code> - - The return value.  
<a name="Mesh+clear"></a>

### clear
The clear method.


<a name="Mesh+setFaceCounts"></a>

### setFaceCounts
The setFaceCounts method.



| Param | Type | Description |
| --- | --- | --- |
| faceCounts | <code>array</code> | The faceCounts value. |

<a name="Mesh+setFaceVertexIndices"></a>

### setFaceVertexIndices
The setFaceVertexIndices method.



| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>number</code> | The faceIndex value. |

<a name="Mesh+getFaceVertexIndices"></a>

### getFaceVertexIndices
The getFaceVertexIndices method.


**Returns**: <code>array</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>number</code> | The faceIndex value. |

<a name="Mesh+getFaceVertexIndex"></a>

### getFaceVertexIndex
The getFaceVertexIndex method.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>number</code> | The faceIndex value. |
| facevertex | <code>number</code> | The facevertex value. |

<a name="Mesh+getNumFaces"></a>

### getNumFaces
The getNumFaces method.


**Returns**: <code>number</code> - - The return value.  
<a name="Mesh+addVertexAttribute"></a>

### addVertexAttribute
The addVertexAttribute method.


**Returns**: <code>VertexAttribute</code> - - Returns a vertex attribute.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute to add. |
| dataType | <code>AttrValue</code> \| <code>number</code> | The dataType value. |
| defaultScalarValue | <code>number</code> | The default scalar value. |

<a name="Mesh+addFaceAttribute"></a>

### addFaceAttribute
The addFaceAttribute method.


**Returns**: <code>Attribute</code> - - Returns a face attribute.  

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


**Returns**: <code>Attribute</code> - - Returns an edge attribute.  

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


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the edge attribute. |

<a name="Mesh+genTopologyInfo"></a>

### genTopologyInfo
The genTopologyInfo method.


<a name="Mesh+computeFaceNormals"></a>

### computeFaceNormals
The computeFaceNormals method.


<a name="Mesh+generateEdgeFlags"></a>

### generateEdgeFlags
The generateEdgeFlags method.


<a name="Mesh+computeVertexNormals"></a>

### computeVertexNormals
Compute vertex normals.


**Returns**: <code>VertexAttribute</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hardAngle | <code>number</code> | <code>1</code> | The hardAngle value in radians. |

<a name="Mesh+computeNumTriangles"></a>

### computeNumTriangles
Compute the number of triangles.


**Returns**: <code>number</code> - - Returns the number of triangles.  
<a name="Mesh+generateTriangulatedIndices"></a>

### generateTriangulatedIndices
The generateTriangulatedIndices method.


**Returns**: <code>Uint32Array</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| totalNumVertices | <code>number</code> | The total number of vertices. |
| numUnSplitVertices | <code>number</code> | The total number of unsplit vertices. |
| splitIndices | <code>array</code> | The splitIndices value. |

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

<a name="Mesh+freeBuffers"></a>

### freeBuffers
The freeBuffers method.


<a name="Mesh+readBinary"></a>

### readBinary
The readBinary method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="Mesh+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Mesh+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

