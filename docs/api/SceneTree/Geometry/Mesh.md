<a name="Mesh"></a>

### Mesh 
Class representing a mesh.

**Kind**: global class  
**Extends**: <code>BaseGeom</code>  

* [Mesh ⇐ <code>BaseGeom</code>](#Mesh)
    * [new Mesh()](#new-Mesh)
    * [init()](#init)
    * [getFaceVertexIndices() ⇒ <code>any</code>](#getFaceVertexIndices)
    * [getFaceCounts() ⇒ <code>any</code>](#getFaceCounts)
    * [clear()](#clear)
    * [setFaceCounts(faceCounts)](#setFaceCounts)
    * [setFaceVertexIndices(faceIndex)](#setFaceVertexIndices)
    * [getFaceVertexIndices(faceIndex) ⇒ <code>any</code>](#getFaceVertexIndices)
    * [getFaceVertexIndex(faceIndex, facevertex) ⇒ <code>any</code>](#getFaceVertexIndex)
    * [getNumFaces() ⇒ <code>number</code>](#getNumFaces)
    * [addVertexAttribute(name, dataType, defaultScalarValue) ⇒ <code>VertexAttribute</code>](#addVertexAttribute)
    * [addFaceAttribute(name, dataType, count) ⇒ <code>Attribute</code>](#addFaceAttribute)
    * [hasFaceAttribute(name) ⇒ <code>any</code>](#hasFaceAttribute)
    * [getFaceAttribute(name) ⇒ <code>any</code>](#getFaceAttribute)
    * [addEdgeAttribute(name, dataType, count) ⇒ <code>Attribute</code>](#addEdgeAttribute)
    * [hasEdgeAttribute(name) ⇒ <code>any</code>](#hasEdgeAttribute)
    * [getEdgeAttribute(name) ⇒ <code>any</code>](#getEdgeAttribute)
    * [genTopologyInfo()](#genTopologyInfo)
    * [computeFaceNormals()](#computeFaceNormals)
    * [generateEdgeFlags()](#generateEdgeFlags)
    * [computeVertexNormals(hardAngle) ⇒ <code>any</code>](#computeVertexNormals)
    * [computeNumTriangles() ⇒ <code>number</code>](#computeNumTriangles)
    * [generateTriangulatedIndices(totalNumVertices, numUnSplitVertices, splitIndices) ⇒ <code>any</code>](#generateTriangulatedIndices)
    * [computeHardEdgesIndices(hardAngle) ⇒ <code>any</code>](#computeHardEdgesIndices)
    * [getWireframeIndices() ⇒ <code>any</code>](#getWireframeIndices)
    * [genBuffers(opts) ⇒ <code>any</code>](#genBuffers)
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

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
<a name="Mesh+getFaceVertexIndices"></a>

### getFaceVertexIndices
The getFaceVertexIndices method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  
<a name="Mesh+getFaceCounts"></a>

### getFaceCounts
The getFaceCounts method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  
<a name="Mesh+clear"></a>

### clear
The clear method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
<a name="Mesh+setFaceCounts"></a>

### setFaceCounts
The setFaceCounts method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  

| Param | Type | Description |
| --- | --- | --- |
| faceCounts | <code>any</code> | The faceCounts value. |

<a name="Mesh+setFaceVertexIndices"></a>

### setFaceVertexIndices
The setFaceVertexIndices method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  

| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>any</code> | The faceIndex value. |

<a name="Mesh+getFaceVertexIndices"></a>

### getFaceVertexIndices
The getFaceVertexIndices method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>any</code> | The faceIndex value. |

<a name="Mesh+getFaceVertexIndex"></a>

### getFaceVertexIndex
The getFaceVertexIndex method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| faceIndex | <code>any</code> | The faceIndex value. |
| facevertex | <code>any</code> | The facevertex value. |

<a name="Mesh+getNumFaces"></a>

### getNumFaces
The getNumFaces method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>number</code> - - The return value.  
<a name="Mesh+addVertexAttribute"></a>

### addVertexAttribute
The addVertexAttribute method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>VertexAttribute</code> - - Returns a vertex attribute.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute to add. |
| dataType | <code>any</code> | The dataType value. |
| defaultScalarValue | <code>number</code> | The default scalar value. |

<a name="Mesh+addFaceAttribute"></a>

### addFaceAttribute
The addFaceAttribute method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>Attribute</code> - - Returns a face attribute.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the face attribute to add. |
| dataType | <code>any</code> | The data type. |
| count | <code>any</code> | The count value. |

<a name="Mesh+hasFaceAttribute"></a>

### hasFaceAttribute
The hasFaceAttribute method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the face attribute. |

<a name="Mesh+getFaceAttribute"></a>

### getFaceAttribute
The getFaceAttribute method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the face attribute. |

<a name="Mesh+addEdgeAttribute"></a>

### addEdgeAttribute
The addEdgeAttribute method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>Attribute</code> - - Returns an edge attribute.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the edge attribute t oadd. |
| dataType | <code>any</code> | The data type. |
| count | <code>number</code> | The default scalar value. |

<a name="Mesh+hasEdgeAttribute"></a>

### hasEdgeAttribute
The hasEdgeAttribute method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the edge attribute. |

<a name="Mesh+getEdgeAttribute"></a>

### getEdgeAttribute
The getEdgeAttribute method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the edge attribute. |

<a name="Mesh+genTopologyInfo"></a>

### genTopologyInfo
The genTopologyInfo method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
<a name="Mesh+computeFaceNormals"></a>

### computeFaceNormals
The computeFaceNormals method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
<a name="Mesh+generateEdgeFlags"></a>

### generateEdgeFlags
The generateEdgeFlags method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
<a name="Mesh+computeVertexNormals"></a>

### computeVertexNormals
Compute vertex normals.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hardAngle | <code>number</code> | <code>1</code> | The hardAngle value in radians. |

<a name="Mesh+computeNumTriangles"></a>

### computeNumTriangles
Compute the number of triangles.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>number</code> - - Returns the number of triangles.  
<a name="Mesh+generateTriangulatedIndices"></a>

### generateTriangulatedIndices
The generateTriangulatedIndices method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| totalNumVertices | <code>number</code> | The total number of vertices. |
| numUnSplitVertices | <code>number</code> | The total number of unsplit vertices. |
| splitIndices | <code>any</code> | The splitIndices value. |

<a name="Mesh+computeHardEdgesIndices"></a>

### computeHardEdgesIndices
The computeHardEdgesIndices method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hardAngle | <code>number</code> | <code>1</code> | The hardAngle value in radians. |

<a name="Mesh+getWireframeIndices"></a>

### getWireframeIndices
The getWireframeIndices method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  
<a name="Mesh+genBuffers"></a>

### genBuffers
The genBuffers method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>any</code> | The opts value. |

<a name="Mesh+freeBuffers"></a>

### freeBuffers
The freeBuffers method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
<a name="Mesh+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="Mesh+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Mesh+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Mesh</code>](#Mesh)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

